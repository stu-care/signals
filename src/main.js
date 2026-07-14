import './styles.css';
import hlData from '../site-data/germany/hl/pages.json';

const app = document.querySelector('#app');
const pages = hlData.pages;

function lamp(className, flashing = false) {
  return `<span class="lamp ${className}${flashing ? ' flashing' : ''}" aria-hidden="true"></span>`;
}

function renderSignal(slug) {
  const layouts = {
    'hl-1': [lamp('green')],
    'hl-2': [lamp('green'), lamp('yellow'), '<span class="strip green-strip"></span>'],
    'hl-3a': [lamp('green'), lamp('yellow')],
    'hl-3b': [lamp('green'), lamp('yellow'), '<span class="strip yellow-strip"></span>'],
    'hl-4': [lamp('green', true)],
    'hl-5': [lamp('green', true), lamp('yellow'), '<span class="strip green-strip"></span>'],
    'hl-6a': [lamp('green', true), lamp('yellow')],
    'hl-6b': [lamp('green', true), lamp('yellow'), '<span class="strip yellow-strip"></span>'],
    'hl-7': [lamp('yellow', true)],
    'hl-8': [lamp('yellow', true), lamp('yellow'), '<span class="strip green-strip"></span>'],
    'hl-9a': [lamp('yellow', true), lamp('yellow')],
    'hl-9b': [lamp('yellow', true), lamp('yellow'), '<span class="strip yellow-strip"></span>'],
    'hl-10': [lamp('yellow')],
    'hl-11': [lamp('yellow'), lamp('yellow'), '<span class="strip green-strip"></span>'],
    'hl-12a': [lamp('yellow'), lamp('yellow')],
    'hl-12b': [lamp('yellow'), lamp('yellow'), '<span class="strip yellow-strip"></span>'],
    'hp-0-hl': [lamp('red')]
  };

  return `<div class="signal-head" role="img" aria-label="Recognition diagram for ${slug}">${(layouts[slug] ?? []).join('')}</div>`;
}

function card(page) {
  return `
    <button class="aspect-card" type="button" data-slug="${page.slug}" aria-label="Open ${page.title}">
      <div class="signal-wrap">${renderSignal(page.slug)}</div>
      <div class="card-copy">
        <p class="eyebrow">German Hl signalling</p>
        <h2>${page.title}</h2>
        <p>${page.recognise}</p>
      </div>
    </button>`;
}

function detail(page) {
  return `
    <article class="detail-card">
      <button class="close-button" type="button" aria-label="Close detail">×</button>
      <div class="detail-visual">${renderSignal(page.slug)}</div>
      <div>
        <p class="eyebrow">${page.aspectId}</p>
        <h2>${page.title}</h2>
        <dl>
          <div><dt>Recognise it</dt><dd>${page.recognise}</dd></div>
          <div><dt>Meaning</dt><dd>${page.meaning}</dd></div>
          <div><dt>What to do</dt><dd><ol>${page.whatToDo.map((step) => `<li>${step}</li>`).join('')}</ol></dd></div>
        </dl>
      </div>
    </article>`;
}

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Signals home"><span class="brand-mark">●</span> Signals</a>
    <span class="status">TSW player reference (alpha)</span>
  </header>
  <main id="top">
    <section class="hero">
      <p class="eyebrow">Germany (Hl system)</p>
      <h1>See a signal. Know what it means. Know what to do.</h1>
      <p class="hero-copy">A player-first reference for railway signals and safety systems encountered in Train Sim World.</p>
      <label class="search-label" for="search">Search by name, colour or meaning</label>
      <input id="search" type="search" placeholder="Try ‘flashing yellow’, ‘stop’ or ‘60’" autocomplete="off" />
    </section>
    <section class="catalogue" aria-labelledby="catalogue-title">
      <div class="section-heading">
        <div><p class="eyebrow">Visual index</p><h2 id="catalogue-title">Hl aspects</h2></div>
        <p id="result-count">${pages.length} aspects</p>
      </div>
      <div id="grid" class="aspect-grid">${pages.map(card).join('')}</div>
      <p id="empty" class="empty" hidden>No matching aspects found.</p>
    </section>
  </main>
  <dialog id="detail-dialog"></dialog>
  <footer>Built from the repository’s machine-readable signalling data.</footer>`;

const search = document.querySelector('#search');
const grid = document.querySelector('#grid');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#detail-dialog');

function filterPages() {
  const query = search.value.trim().toLowerCase();
  const filtered = pages.filter((page) => [page.title, page.recognise, page.meaning, ...page.whatToDo].join(' ').toLowerCase().includes(query));
  grid.innerHTML = filtered.map(card).join('');
  count.textContent = `${filtered.length} aspect${filtered.length === 1 ? '' : 's'}`;
  empty.hidden = filtered.length !== 0;
}

search.addEventListener('input', filterPages);

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-slug]');
  if (!button) return;
  const page = pages.find((item) => item.slug === button.dataset.slug);
  if (!page) return;
  dialog.innerHTML = detail(page);
  dialog.showModal();
  dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
