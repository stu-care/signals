import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { BuilderPage } from '@/pages/BuilderPage'
import { CataloguePage } from '@/pages/CataloguePage'
import { AspectDetailPage } from '@/pages/AspectDetailPage'
import { SafetySystemsPage } from '@/pages/SafetySystemsPage'
import { SafetySystemPage } from '@/pages/SafetySystemPage'
import { AboutPage } from '@/pages/AboutPage'
import { SourcesPage } from '@/pages/SourcesPage'
import { EditorPage } from '@/pages/EditorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/uk" replace /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/sources', element: <SourcesPage /> },
      { path: '/editor', element: <EditorPage /> },
      { path: '/:country', element: <HomePage /> },
      { path: '/:country/build', element: <BuilderPage /> },
      { path: '/:country/catalogue', element: <CataloguePage /> },
      {
        path: '/:country/aspect/:familyId/:variantId/:aspectId',
        element: <AspectDetailPage />,
      },
      { path: '/:country/safety', element: <SafetySystemsPage /> },
      { path: '/:country/safety/:systemId', element: <SafetySystemPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
