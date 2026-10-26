const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  });
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

if (window.matchMedia('(pointer:fine)').matches) {
  glow.style.opacity = '1';
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected);
    });
  });
});

const projectData = {
  langley: {
    kicker: 'Landscape strategy · Birmingham, UK',
    title: 'Langley Flow',
    summary: 'A research-led masterplan for the Langley Sustainable Urban Extension, using water as the organising framework for ecology, movement, public space and climate resilience.',
    focus: 'Blue-green infrastructure, flood adaptation, connected open space and people-first mobility.',
    methods: 'Annotated masterplan, landscape strategy, movement network and illustrated sections A1–A2 and B1–B2.',
    outcome: 'Restored Langley Brook, retention ponds, pollinator meadow, woodland buffer, community hub, wellness centre, shared growing landscapes and pedestrian/cycle routes.'
  },
  carbon: {
    kicker: 'Ecological research · Unpublished paper · Coimbatore, India',
    title: 'Carbon in Turfgrass',
    summary: 'A research programme investigating how turfgrass systems store carbon in plant biomass and soil, with attention to soil depth and microbial activity.',
    focus: 'Carbon sequestration, soil organic carbon and microbial biomass carbon.',
    methods: 'Field sampling, Walkley–Black analysis, fumigation-extraction, bulk density measurement and statistical comparison.',
    outcome: 'Research paper status: unpublished. The work investigates the carbon sequestration potential of turfgrass systems; no journal publication or peer-reviewed findings are claimed.'
  },
  hydroponics: {
    kicker: 'Product innovation · BIRAC E-YUVA',
    title: 'Root Retainer Unit',
    summary: 'A compact hydroponic insert designed to catch roots early and distribute them across multiple perforated levels instead of allowing dense downward tangling.',
    focus: 'Root stability, aeration, nutrient access and compact food-growing systems.',
    methods: 'Plant-growth observation, concept sketching, 3D modelling and monocot/dicot design variants.',
    outcome: 'A modular prototype concept supporting even root distribution and reduced clogging in home hydroponic kits.'
  },
  bees: {
    kicker: 'Habitat design · Urban ecology',
    title: 'Solitary Bee Mosaic',
    summary: 'A habitat strategy combining bare ground, cavity nesting, seasonal forage and connected movement corridors for a range of solitary bee groups.',
    focus: 'Pollinator resilience, seasonal planting and habitat connectivity.',
    methods: 'Species research, nesting typology mapping, forage calendars and corridor overlays.',
    outcome: 'A distributed habitat mosaic integrated with hedgerows, meadows, cycle routes and public open space.'
  }
};

const modal = document.querySelector('.project-modal');
const closeModal = document.querySelector('.modal-close');
const modalProjectLink = document.querySelector('#modal-project-link');

function openProject(key) {
  const data = projectData[key];
  if (!data) return;
  document.querySelector('#modal-kicker').textContent = data.kicker;
  document.querySelector('#modal-title').textContent = data.title;
  document.querySelector('#modal-summary').textContent = data.summary;
  document.querySelector('#modal-focus').textContent = data.focus;
  document.querySelector('#modal-methods').textContent = data.methods;
  document.querySelector('#modal-outcome').textContent = data.outcome;
  modalProjectLink.hidden = key !== 'langley';
  modal.showModal();
}

cards.forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('a, button')) return;
    openProject(card.dataset.project);
  });
  card.addEventListener('keydown', event => {
    if (event.target !== card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});
closeModal.addEventListener('click', () => modal.close());
modalProjectLink.addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) modal.close();
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1300;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: .7 });

counters.forEach(counter => counterObserver.observe(counter));
document.querySelector('#year').textContent = new Date().getFullYear();


// Interactive Langley Flow masterplan — data transcribed from the supplied sheet.
// Coordinates are relative to the clean original image extracted from the PDF.
const planZones = [
  { id:'meadow', title:'Pollinator meadow park', category:'ecology', x:58.7, y:23.7,
    description:'The centrally located pollinator meadow park is intended to provide biodiversity value within the connected landscape.' },
  { id:'brook', title:'Restored Langley Brook', category:'water', x:64.7, y:12.4,
    description:'Langley Brook is restored with vegetated edges, linking water and habitat through the site.' },
  { id:'stormwater', title:'Stormwater retention pond', category:'water', x:35.3, y:37.2,
    description:'A large stormwater pond feeds into the brook, supporting flood control, habitat and the identity of the landscape.' },
  { id:'hub', title:'Community hub', category:'community', x:63.3, y:29.0,
    description:'A cluster of flexible community uses: workshop or makerspace, co-working hub, children’s indoor activity centre, small market and café with outdoor seating.' },
  { id:'wellness', title:'Wellness centre and sensory garden', category:'community', x:54.0, y:34.1,
    description:'A wellness centre with a sensory-rich outdoor garden, designed around recovery and inclusive wellbeing.' },
  { id:'woodland', title:'Eastern woodland buffer', category:'ecology', x:85.2, y:27.3,
    description:'Woodland softens the urban edge, providing screening, a noise barrier, windbreak and a scenic walking connection.' },
  { id:'wetland', title:'Seasonal ponds and wet meadows', category:'water', x:60.4, y:60.8,
    description:'A landscape inspired by Serralves Gardens combines seasonal ponds, wet meadows and stepped seating decks.' },
  { id:'growing', title:'Northern community growing', category:'community', x:74.7, y:17.4,
    description:'A shared growing and gathering space at the heart of the northern neighbourhood, framed by woodland and housing.' },
  { id:'fleet', title:'Fleet houses near the brook', category:'homes', x:48.0, y:20.1,
    description:'Riverside residences positioned for views and natural drainage, with an intended relationship to the brook ecosystem.' },
  { id:'cluster', title:'Cluster housing and shared gardens', category:'homes', x:60.7, y:48.6,
    description:'Compact homes arranged around shared gardens, with south-facing views toward the ponds.' },
  { id:'learning', title:'Hands-on learning landscape', category:'community', x:54.7, y:73.8,
    description:'A landscape for food growing, nature trails and informal gathering, bringing learning and outdoor activity together.' },
  { id:'townhouses', title:'Southern townhouses', category:'homes', x:54.7, y:88.3,
    description:'Townhouse streets are framed with hedgerows for privacy, with access to the primary school and woodland paths.' },
  { id:'mobility', title:'People-first movement network', category:'movement', x:34.0, y:46.3,
    description:'Fox Hollies Boulevard includes shaded pedestrian and cycle paths. Secondary walking and cycling loops complement the vehicle access network.' }
];
const planViewport = document.getElementById('plan-viewport');
const planWorld = document.getElementById('plan-world');
const planImage = document.getElementById('plan-image');
const planMarkers = document.getElementById('plan-markers');
const planList = document.getElementById('plan-zone-list');
const planCategoryButtons = [...document.querySelectorAll('[data-plan-category]')];
const planZoomLabel = document.getElementById('plan-zoom-level');
let planCategory = 'all';
let activePlanZone = 'meadow';
let planScale = 1, planFitScale = 1, planMinScale = 1, planMaxScale = 1;
let planTx = 0, planTy = 0;
let planReady = false;
let dragState = null;

function planVisibleZones() {
  return planZones.filter(zone => planCategory === 'all' || zone.category === planCategory);
}
function renderPlanElements() {
  planMarkers.replaceChildren();
  planList.replaceChildren();
  planZones.forEach((zone, i) => {
    const number = String(i + 1).padStart(2, '0');
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'plan-pin';
    pin.dataset.zone = zone.id;
    pin.style.setProperty('--x', zone.x + '%');
    pin.style.setProperty('--y', zone.y + '%');
    pin.textContent = number;
    pin.setAttribute('aria-label', number + ': ' + zone.title);
    pin.title = zone.title;
    pin.addEventListener('click', () => selectPlanZone(zone.id, true));
    planMarkers.append(pin);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'plan-zone-item';
    item.dataset.zone = zone.id;
    item.innerHTML = '<span class="plan-zone-item-num"></span><span class="plan-zone-item-copy"><span class="plan-zone-item-name"></span><span class="plan-zone-item-cat"></span></span><span class="plan-zone-item-arrow" aria-hidden="true">↗</span>';
    item.querySelector('.plan-zone-item-num').textContent = number;
    item.querySelector('.plan-zone-item-name').textContent = zone.title;
    item.querySelector('.plan-zone-item-cat').textContent = zone.category;
    item.addEventListener('click', () => selectPlanZone(zone.id, true));
    planList.append(item);
  });
}
function updatePlanVisibility() {
  planMarkers.querySelectorAll('.plan-pin').forEach(pin => {
    const zone = planZones.find(item => item.id === pin.dataset.zone);
    pin.hidden = planCategory !== 'all' && zone.category !== planCategory;
  });
  planList.querySelectorAll('.plan-zone-item').forEach(item => {
    const zone = planZones.find(z => z.id === item.dataset.zone);
    item.hidden = planCategory !== 'all' && zone.category !== planCategory;
  });
  planCategoryButtons.forEach(button => {
    const active = button.dataset.planCategory === planCategory;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function constrainPlanPan() {
  const w = planImage.naturalWidth * planScale;
  const h = planImage.naturalHeight * planScale;
  const sw = planViewport.clientWidth, sh = planViewport.clientHeight;
  planTx = w <= sw ? (sw - w) / 2 : Math.max(sw - w, Math.min(0, planTx));
  planTy = h <= sh ? (sh - h) / 2 : Math.max(sh - h, Math.min(0, planTy));
}
function applyPlanTransform() {
  if (!planReady) return;
  constrainPlanPan();
  planWorld.style.transform = `translate3d(${planTx}px, ${planTy}px, 0) scale(${planScale})`;
  planWorld.style.setProperty('--pin-inverse', String(1 / planScale));
  planZoomLabel.textContent = (planScale / planFitScale).toFixed(1) + '×';
}
function zoomPlanTo(nextScale, focusX, focusY) {
  if (!planReady) return;
  const old = planScale;
  planScale = Math.min(planMaxScale, Math.max(planMinScale, nextScale));
  const ratio = planScale / old;
  planTx = focusX - (focusX - planTx) * ratio;
  planTy = focusY - (focusY - planTy) * ratio;
  applyPlanTransform();
}
function focusPlanZone(zone, zoom) {
  if (!planReady) return;
  if (zoom) planScale = Math.max(planScale, planFitScale * 1.4);
  const pointX = planImage.naturalWidth * zone.x / 100;
  const pointY = planImage.naturalHeight * zone.y / 100;
  planTx = planViewport.clientWidth / 2 - pointX * planScale;
  planTy = planViewport.clientHeight / 2 - pointY * planScale;
  applyPlanTransform();
}
function selectPlanZone(id, zoom) {
  const zone = planZones.find(item => item.id === id);
  if (!zone) return;
  activePlanZone = id;
  const visible = planVisibleZones();
  const pos = visible.findIndex(item => item.id === id);
  document.getElementById('plan-detail-title').textContent = zone.title;
  document.getElementById('plan-detail-description').textContent = zone.description;
  document.getElementById('plan-detail-type').textContent = zone.category;
  document.getElementById('plan-detail-index').textContent = String(pos + 1).padStart(2,'0') + ' / ' + String(visible.length).padStart(2,'0');
  document.querySelectorAll('[data-zone]').forEach(el => {
    const active = el.dataset.zone === id;
    el.classList.toggle('active', active);
    if (el.classList.contains('plan-zone-item')) el.setAttribute('aria-pressed', String(active));
  });
  focusPlanZone(zone, zoom);
}
function setPlanCategory(category) {
  planCategory = category;
  updatePlanVisibility();
  const zones = planVisibleZones();
  if (!zones.some(zone => zone.id === activePlanZone)) selectPlanZone(zones[0].id, true);
  else selectPlanZone(activePlanZone, false);
}
function resetPlanView() {
  if (!planReady) return;
  planScale = planFitScale;
  focusPlanZone(planZones.find(zone => zone.id === activePlanZone), false);
}
function initPlan() {
  if (!planImage.naturalWidth) return;
  planWorld.style.width = planImage.naturalWidth + 'px';
  planWorld.style.height = planImage.naturalHeight + 'px';
  planFitScale = Math.min(planViewport.clientWidth * .94 / planImage.naturalWidth, 1);
  planMinScale = planFitScale * .75;
  planMaxScale = Math.max(1.15, planFitScale * 5);
  planScale = planFitScale * 1.15;
  planReady = true;
  updatePlanVisibility();
  selectPlanZone(activePlanZone, false);
}
renderPlanElements();
planCategoryButtons.forEach(button => button.addEventListener('click', () => setPlanCategory(button.dataset.planCategory)));
if (planImage.complete && planImage.naturalWidth) initPlan();
else planImage.addEventListener('load', initPlan, {once:true});
document.getElementById('plan-zoom-in').addEventListener('click', () => zoomPlanTo(planScale * 1.3, planViewport.clientWidth / 2, planViewport.clientHeight / 2));
document.getElementById('plan-zoom-out').addEventListener('click', () => zoomPlanTo(planScale / 1.3, planViewport.clientWidth / 2, planViewport.clientHeight / 2));
document.getElementById('plan-reset').addEventListener('click', resetPlanView);
document.getElementById('plan-prev').addEventListener('click', () => {
  const zones = planVisibleZones(); const idx = zones.findIndex(zone => zone.id === activePlanZone);
  selectPlanZone(zones[(idx - 1 + zones.length) % zones.length].id, true);
});
document.getElementById('plan-next').addEventListener('click', () => {
  const zones = planVisibleZones(); const idx = zones.findIndex(zone => zone.id === activePlanZone);
  selectPlanZone(zones[(idx + 1) % zones.length].id, true);
});
planViewport.addEventListener('pointerdown', event => {
  if (!planReady || event.target.closest('.plan-pin')) return;
  if (event.button !== 0 && event.pointerType === 'mouse') return;
  dragState = { id:event.pointerId, x:event.clientX, y:event.clientY, tx:planTx, ty:planTy };
  planViewport.setPointerCapture(event.pointerId);
});
planViewport.addEventListener('pointermove', event => {
  if (!dragState || dragState.id !== event.pointerId) return;
  planTx = dragState.tx + event.clientX - dragState.x;
  planTy = dragState.ty + event.clientY - dragState.y;
  applyPlanTransform();
});
function endPlanDrag(event) {
  if (dragState && dragState.id === event.pointerId) dragState = null;
}
planViewport.addEventListener('pointerup', endPlanDrag);
planViewport.addEventListener('pointercancel', endPlanDrag);
planViewport.addEventListener('wheel', event => {
  // Do not hijack ordinary page scrolling. Ctrl/Cmd + wheel zooms the map.
  if (!event.ctrlKey && !event.metaKey) return;
  event.preventDefault();
  const rect = planViewport.getBoundingClientRect();
  zoomPlanTo(planScale * (event.deltaY < 0 ? 1.15 : 1/1.15), event.clientX - rect.left, event.clientY - rect.top);
}, {passive:false});
if (window.ResizeObserver) {
  const ro = new ResizeObserver(() => {
    if (!planReady) return;
    const ratio = planScale / planFitScale;
    planFitScale = Math.min(planViewport.clientWidth * .94 / planImage.naturalWidth, 1);
    planMinScale = planFitScale * .75;
    planMaxScale = Math.max(1.15, planFitScale * 5);
    planScale = Math.min(planMaxScale, Math.max(planMinScale, planFitScale * ratio));
    focusPlanZone(planZones.find(zone => zone.id === activePlanZone), false);
  });
  ro.observe(planViewport);
}
const posterDialog = document.getElementById('poster-dialog');
document.getElementById('plan-sheet-open').addEventListener('click', () => posterDialog.showModal());
document.getElementById('poster-dialog-close').addEventListener('click', () => posterDialog.close());
posterDialog.addEventListener('click', event => {
  if (event.target === posterDialog) posterDialog.close();
});
