const regions = [
  { id: 'zlinsky', name: 'Zlínský', value: 175, x: 1420, y: 780 },
  { id: 'vysocina', name: 'Vysočina', value: 171, x: 1010, y: 705 },
  { id: 'ustecky', name: 'Ústecký', value: 170, x: 610, y: 390 },
  { id: 'jihomoravsky', name: 'Jihomoravský', value: 187, x: 1215, y: 800 },
  { id: 'jihocesky', name: 'Jihočeský', value: 181, x: 725, y: 805 },
  { id: 'praha', name: 'Praha', value: 230, x: 750, y: 485 },
  { id: 'plzensky', name: 'Plzeňský', value: 177, x: 465, y: 630 },
  { id: 'pardubicky', name: 'Pardubický', value: 169, x: 1115, y: 590 },
  { id: 'olomoucky', name: 'Olomoucký', value: 168, x: 1305, y: 625 },
  { id: 'moravskoslezsky', name: 'Moravskoslezský', value: 168, x: 1515, y: 620 },
  { id: 'liberecky', name: 'Liberecký', value: 182, x: 850, y: 270 },
  { id: 'karlovarsky', name: 'Karlovarský', value: 176, x: 350, y: 500 },
  { id: 'kralovohradecky', name: 'Královohradecký', value: 173, x: 1030, y: 430 },
  { id: 'stredocesky', name: 'Středočeský', value: 207, x: 750, y: 625 },
]

const text = {
  title: document.querySelector('#title-input'),
  subtitle: document.querySelector('#subtitle-input'),
  source: document.querySelector('#source-input'),
  unit: document.querySelector('#unit-input'),
}
const table = document.querySelector('#regions-table')
const labels = document.querySelector('#map-labels')
const labelNodes = new Map()
let drag = null
const mapArt = document.querySelector('#map-art')
const status = document.querySelector('#animation-status')
let mapPaths = []
let runId = 0

function colorAt(value) {
  const values = regions.map(region => Number(region.value) || 0)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const t = max === min ? .5 : Math.max(0, Math.min(1, (value - min) / (max - min)))
  const start = [254, 231, 234]
  const end = [248, 95, 115]
  return `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * t)).join(', ')})`
}

function renderTable() {
  table.innerHTML = regions.map((region, index) => `
    <tr>
      <td><span class="region-dot" style="background:${colorAt(region.value)}"></span>${region.name}</td>
      <td><input type="number" value="${region.value}" aria-label="${region.name} value" data-region="${region.id}"></td>
      <td><span class="order">${String(index + 1).padStart(2, '0')}</span></td>
    </tr>`).join('')
  table.querySelectorAll('input').forEach(input => input.addEventListener('input', event => {
    const region = regions.find(item => item.id === event.target.dataset.region)
    region.value = event.target.value === '' ? 0 : Number(event.target.value)
    renderTable()
    renderPreview(true)
  }))
}

// Built once and then updated in place. Rebuilding the markup every frame,
// as this did, would replace the element under the pointer mid-drag — and it
// threw away and recreated fourteen label groups on every animation frame.
function buildLabels() {
  labels.innerHTML = regions.map(region => `
    <g class="label" data-region="${region.id}" transform="translate(${region.x} ${region.y})">
      <g class="label-content">
        <rect class="value-chip" x="-61" y="-27" width="122" height="54" rx="27"></rect>
        <text class="value" y="8" text-anchor="middle"><tspan class="value-number"></tspan><tspan class="unit"></tspan></text>
        <text class="region-name" y="58" text-anchor="middle">${region.name}</text>
      </g>
    </g>`).join('')
  labels.querySelectorAll('.label').forEach(node => labelNodes.set(node.dataset.region, node))
}

function renderPreview(showAll = false, counterValues = {}) {
  document.querySelector('#preview-title').textContent = text.title.value || 'Untitled map'
  document.querySelector('#preview-subtitle').textContent = text.subtitle.value
  document.querySelector('#preview-source').textContent = text.source.value
  regions.forEach(region => {
    const node = labelNodes.get(region.id)
    if (!node) return
    const visible = showAll || Object.prototype.hasOwnProperty.call(counterValues, region.id)
    const value = showAll ? region.value : (counterValues[region.id] || 0)
    node.classList.toggle('is-visible', visible)
    node.setAttribute('transform', `translate(${region.x} ${region.y})`)
    node.querySelector('.value-number').textContent = value
    node.querySelector('.unit').textContent = ` ${text.unit.value}`
  })
  mapPaths.forEach((path, index) => {
    const region = regions[index]
    path.style.fill = showAll || Object.prototype.hasOwnProperty.call(counterValues, region.id)
      ? colorAt(region.value)
      : '#fee7ea'
  })
}

function wait(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

async function replay() {
  const currentRun = ++runId
  status.textContent = 'Playing'
  status.classList.remove('ready')
  const counterValues = {}
  renderPreview(false, counterValues)
  for (const region of regions) {
    if (currentRun !== runId) return
    const start = performance.now()
    await new Promise(resolve => {
      const frame = now => {
        if (currentRun !== runId) return resolve()
        const progress = Math.min(1, (now - start) / 760)
        counterValues[region.id] = Math.round(region.value * (1 - Math.pow(1 - progress, 3)))
        renderPreview(false, counterValues)
        progress < 1 ? requestAnimationFrame(frame) : resolve()
      }
      requestAnimationFrame(frame)
    })
    await wait(145)
  }
  if (currentRun === runId) {
    status.textContent = 'Ready'
    status.classList.add('ready')
  }
}

// --- dragging labels --------------------------------------------------------
// The preview is a 1920x1080 viewBox scaled to whatever space the panel has,
// and it is letterboxed by preserveAspectRatio. Screen pixels therefore mean
// nothing here: every pointer position goes through the SVG's own matrix so a
// label lands where the cursor is at any preview size.
function svgPoint(event) {
  const point = labels.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  return point.matrixTransform(labels.getScreenCTM().inverse())
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

labels.addEventListener('pointerdown', event => {
  const node = event.target.closest('.label')
  if (!node) return
  const region = regions.find(item => item.id === node.dataset.region)
  if (!region) return
  const point = svgPoint(event)
  // Hold the grab offset so the label does not jump its centre to the cursor.
  drag = { region, node, offsetX: region.x - point.x, offsetY: region.y - point.y, pointerId: event.pointerId }
  node.classList.add('is-dragging')
  labels.setPointerCapture(event.pointerId)
  event.preventDefault()
})

labels.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.pointerId) return
  const point = svgPoint(event)
  drag.region.x = Math.round(clamp(point.x + drag.offsetX, 0, 1920))
  drag.region.y = Math.round(clamp(point.y + drag.offsetY, 0, 1080))
  drag.node.setAttribute('transform', `translate(${drag.region.x} ${drag.region.y})`)
})

function endDrag(event) {
  if (!drag || event.pointerId !== drag.pointerId) return
  drag.node.classList.remove('is-dragging')
  if (labels.hasPointerCapture(event.pointerId)) labels.releasePointerCapture(event.pointerId)
  drag = null
}

labels.addEventListener('pointerup', endDrag)
labels.addEventListener('pointercancel', endDrag)

// Positions tuned by dragging live in memory only, so hand them back in the
// shape this file declares them in — ready to paste over the list at the top.
const copyButton = document.querySelector('#copy-positions')

copyButton.addEventListener('click', async () => {
  const body = regions
    .map(region => `  { id: '${region.id}', name: '${region.name}', value: ${region.value}, x: ${region.x}, y: ${region.y} },`)
    .join('\n')
  try {
    await navigator.clipboard.writeText(`const regions = [\n${body}\n]`)
    copyButton.textContent = 'Copied to clipboard'
  } catch {
    copyButton.textContent = 'Copy failed — see console'
    console.log(`const regions = [\n${body}\n]`)
  }
  setTimeout(() => { copyButton.textContent = 'Copy label positions' }, 1800)
})

Object.values(text).forEach(input => input.addEventListener('input', () => renderPreview(true)))
document.querySelector('#replay-button').addEventListener('click', replay)

fetch('assets/czech-regions.svg')
  .then(response => response.text())
  .then(markup => {
    mapArt.innerHTML = markup
    const svg = mapArt.querySelector('svg')
    svg.setAttribute('viewBox', '0 0 1920 1080')
    mapPaths = [...svg.querySelectorAll('path')]
    mapPaths.forEach((path, index) => { path.dataset.region = regions[index].id })
    buildLabels()
    renderTable()
    replay()
  })
  .catch(() => { status.textContent = 'Map unavailable'; status.classList.add('ready') })
