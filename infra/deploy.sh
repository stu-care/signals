#!/usr/bin/env bash
#
# Deploy Signals to AWS: cert stack (us-east-1) -> app stack (eu-west-2) ->
# build -> sync to S3 -> invalidate CloudFront.
#
#   ./infra/deploy.sh
#
# Requires the AWS CLI, an authenticated `stu-personal` profile, and Node.
set -euo pipefail

PROFILE="${AWS_PROFILE:-stu-personal}"
APP_REGION="eu-west-2"
CERT_REGION="us-east-1"
DOMAIN="signals.stu.care"
HOSTED_ZONE_ID="Z02914921H811KF9VQ747"
CERT_STACK="signals-cert"
APP_STACK="signals-app"

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$HERE")"

echo "==> [1/5] Certificate stack ($CERT_REGION)"
aws cloudformation deploy \
  --profile "$PROFILE" --region "$CERT_REGION" \
  --stack-name "$CERT_STACK" \
  --template-file "$HERE/cert-stack.yaml" \
  --parameter-overrides DomainName="$DOMAIN" HostedZoneId="$HOSTED_ZONE_ID" \
  --no-fail-on-empty-changeset

CERT_ARN="$(aws cloudformation describe-stacks \
  --profile "$PROFILE" --region "$CERT_REGION" --stack-name "$CERT_STACK" \
  --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" --output text)"
echo "    certificate: $CERT_ARN"

echo "==> [2/5] App stack ($APP_REGION)"
aws cloudformation deploy \
  --profile "$PROFILE" --region "$APP_REGION" \
  --stack-name "$APP_STACK" \
  --template-file "$HERE/signals-stack.yaml" \
  --parameter-overrides \
    DomainName="$DOMAIN" HostedZoneId="$HOSTED_ZONE_ID" CertificateArn="$CERT_ARN" \
  --no-fail-on-empty-changeset

read_output() {
  aws cloudformation describe-stacks \
    --profile "$PROFILE" --region "$APP_REGION" --stack-name "$APP_STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}
BUCKET="$(read_output BucketName)"
DIST_ID="$(read_output DistributionId)"
echo "    bucket: $BUCKET   distribution: $DIST_ID"

echo "==> [3/5] Build"
( cd "$ROOT" && npm ci && npm run build )

echo "==> [4/5] Sync to s3://$BUCKET"
# Long-cache the fingerprinted assets...
aws s3 sync "$ROOT/dist/" "s3://$BUCKET/" --delete \
  --profile "$PROFILE" --region "$APP_REGION" \
  --exclude "index.html" --exclude "*.webmanifest" \
  --exclude "sw.js" --exclude "registerSW.js" \
  --cache-control "public,max-age=31536000,immutable"
# ...but never cache the entry point / SW so updates ship immediately.
aws s3 sync "$ROOT/dist/" "s3://$BUCKET/" \
  --profile "$PROFILE" --region "$APP_REGION" \
  --exclude "*" --include "index.html" --include "*.webmanifest" \
  --include "sw.js" --include "registerSW.js" \
  --cache-control "no-cache"

echo "==> [5/5] Invalidate CloudFront"
aws cloudfront create-invalidation \
  --profile "$PROFILE" --distribution-id "$DIST_ID" --paths "/*" >/dev/null

echo "Done → https://$DOMAIN"
