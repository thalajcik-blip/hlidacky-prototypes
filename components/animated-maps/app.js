const regions = [
  { id: 'zlinsky', name: 'Zlínský', value: 175, delay: 750, x: 1478, y: 764 },
  { id: 'vysocina', name: 'Vysočina', value: 171, delay: 500, x: 1005, y: 672 },
  { id: 'ustecky', name: 'Ústecký', value: 170, delay: 0, x: 552, y: 264 },
  { id: 'jihomoravsky', name: 'Jihomoravský', value: 187, delay: 750, x: 1215, y: 800 },
  { id: 'jihocesky', name: 'Jihočeský', value: 181, delay: 500, x: 725, y: 805 },
  { id: 'praha', name: 'Praha', value: 230, delay: 250, x: 683, y: 437 },
  { id: 'plzensky', name: 'Plzeňský', value: 177, delay: 250, x: 398, y: 596 },
  { id: 'pardubicky', name: 'Pardubický', value: 169, delay: 500, x: 1088, y: 503 },
  { id: 'olomoucky', name: 'Olomoucký', value: 168, delay: 750, x: 1342, y: 589 },
  { id: 'moravskoslezsky', name: 'Moravskoslezský', value: 168, delay: 750, x: 1528, y: 509 },
  { id: 'liberecky', name: 'Liberecký', value: 182, delay: 0, x: 819, y: 162 },
  { id: 'karlovarsky', name: 'Karlovarský', value: 176, delay: 0, x: 297, y: 400 },
  { id: 'kralovohradecky', name: 'Královohradecký', value: 173, delay: 0, x: 1024, y: 326 },
  { id: 'stredocesky', name: 'Středočeský', value: 207, delay: 250, x: 750, y: 539 },
]

const colorSchemes = {
  babysitting: { low: '#fee7ea', high: '#f85f73' },
  'pet-care': { low: '#ccf7e8', high: '#00bd79' },
  cleaning: { low: '#d7f5fb', high: '#00b8d8' },
  'senior-care': { low: '#ffe8d3', high: '#ed7000' },
  tutoring: { low: '#f1dfff', high: '#a533ff' },
}
let activeColorScheme = colorSchemes.babysitting

const text = {
  title: document.querySelector('#title-input'),
  subtitle: document.querySelector('#subtitle-input'),
  source: document.querySelector('#source-input'),
  unit: document.querySelector('#unit-input'),
}
const colorSchemeInput = document.querySelector('#color-scheme-input')
const colorSchemeSwatch = document.querySelector('#color-scheme-swatch')
const decimalPlacesInput = document.querySelector('#decimal-places-input')
const mapSettings = {
  toggle: document.querySelector('#map-settings-toggle'),
  panel: document.querySelector('#map-settings-panel'),
  close: document.querySelector('#map-settings-close'),
}
const labelScaleControls = {
  headline: {
    input: document.querySelector('#headline-scale-input'),
    output: document.querySelector('#headline-scale-output'),
  },
  subheadline: {
    input: document.querySelector('#subheadline-scale-input'),
    output: document.querySelector('#subheadline-scale-output'),
  },
  valuePill: {
    input: document.querySelector('#value-scale-input'),
    output: document.querySelector('#value-scale-output'),
  },
  regionName: {
    input: document.querySelector('#region-name-scale-input'),
    output: document.querySelector('#region-name-scale-output'),
  },
}
const table = document.querySelector('#regions-table')
const labels = document.querySelector('#map-labels')
const artboard = document.querySelector('#artboard')
const chart = document.querySelector('#chart')
const headline = document.querySelector('#preview-title')
const subheadline = document.querySelector('#preview-subtitle')
const sourceText = document.querySelector('#preview-source')

// Everything below is in artboard units of the 1920x1080 viewBox — never in
// screen pixels. That is the whole point of the single artboard: one scale for
// the entire composition, so what the preview shows is what an export at any
// resolution produces.
const ARTBOARD = { w: 1920, h: 1080, margin: 80, top: 72, bottom: 96 }
const baseCopySize = { headline: 52, subheadline: 29, source: 18 }
let mapContentBox = null
const labelNodes = new Map()
let drag = null
const mapArt = document.querySelector('#map-art')
const status = document.querySelector('#animation-status')
let mapPaths = []
let runId = 0
const minimumLabelFontSize = 10

function setMapSettingsOpen(isOpen) {
  mapSettings.panel.hidden = !isOpen
  mapSettings.toggle.setAttribute('aria-expanded', String(isOpen))
  if (isOpen) mapSettings.panel.querySelector('select').focus()
}

mapSettings.toggle.addEventListener('click', () => setMapSettingsOpen(mapSettings.panel.hidden))
mapSettings.close.addEventListener('click', () => {
  setMapSettingsOpen(false)
  mapSettings.toggle.focus()
})
document.addEventListener('pointerdown', event => {
  if (!mapSettings.panel.hidden && !mapSettings.panel.contains(event.target) && !mapSettings.toggle.contains(event.target)) {
    setMapSettingsOpen(false)
  }
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mapSettings.panel.hidden) {
    setMapSettingsOpen(false)
    mapSettings.toggle.focus()
  }
})

const editorAccordions = [...document.querySelectorAll('.editor-accordion')]
editorAccordions.forEach(accordion => accordion.addEventListener('toggle', () => {
  if (accordion.open) editorAccordions.forEach(other => {
    if (other !== accordion) other.open = false
  })
}))

function colorAt(value) {
  const values = regions.map(region => Number(region.value) || 0)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const t = max === min ? .5 : Math.max(0, Math.min(1, (value - min) / (max - min)))
  const toRgb = hex => [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16))
  const start = toRgb(activeColorScheme.low)
  const end = toRgb(activeColorScheme.high)
  return `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * t)).join(', ')})`
}

function formatValue(value) {
  const decimals = Number(decimalPlacesInput.value)
  return Number(value || 0).toFixed(decimals)
}

function renderTable() {
  table.innerHTML = regions.map(region => `
    <tr>
      <td><span class="region-dot" style="background:${colorAt(region.value)}"></span>${region.name}</td>
      <td><input type="text" inputmode="decimal" value="${region.value}" aria-label="${region.name} value" data-region="${region.id}" data-field="value"></td>
      <td><input type="text" inputmode="numeric" value="${region.delay}" aria-label="${region.name} delay in milliseconds" data-region="${region.id}" data-field="delay"></td>
    </tr>`).join('')
  table.querySelectorAll('input').forEach(input => input.addEventListener('input', event => {
    const region = regions.find(item => item.id === event.target.dataset.region)
    const value = Number(event.target.value.replace(',', '.'))
    if (!Number.isFinite(value)) return
    region[event.target.dataset.field] = event.target.value === '' ? 0 : value
    renderPreview(true)
  }))
  table.querySelectorAll('input').forEach(input => input.addEventListener('change', renderTable))
}

// Built once and then updated in place. Rebuilding the markup every frame,
// as this did, would replace the element under the pointer mid-drag — and it
// threw away and recreated fourteen label groups on every animation frame.
function buildLabels() {
  labels.innerHTML = `
    <defs>
      <filter id="value-chip-shadow" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feMorphology in="SourceAlpha" operator="erode" radius="4" result="shadow-spread" />
        <feGaussianBlur in="shadow-spread" stdDeviation="12" result="shadow-blur" />
        <feOffset in="shadow-blur" dy="8" result="shadow-offset" />
        <feFlood flood-color="#2a3539" flood-opacity=".2" result="shadow-color" />
        <feComposite in="shadow-color" in2="shadow-offset" operator="in" result="shadow" />
        <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  ` + regions.map(region => `
    <g class="label" data-region="${region.id}" transform="translate(${region.x} ${region.y})">
      <g class="label-content">
        <rect class="value-chip" y="-35" height="60" rx="30"></rect>
        <text class="value" y="8" text-anchor="middle"><tspan class="value-number"></tspan><tspan class="unit" dx="4"></tspan></text>
        <text class="region-name" y="58" text-anchor="middle">${region.name}</text>
      </g>
    </g>`).join('')
  labels.querySelectorAll('.label').forEach(node => labelNodes.set(node.dataset.region, node))
}

function resizeValueChip(node) {
  const value = node.querySelector('.value')
  const chip = node.querySelector('.value-chip')
  // SVG measures the rendered number and unit, so longer values receive only
  // the width they need while the label remains centred over its region.
  const valuePillScale = Number(labelScaleControls.valuePill.input.value) / 100
  const width = Math.ceil(value.getComputedTextLength() + 40 * valuePillScale)
  chip.setAttribute('width', width)
  chip.setAttribute('x', -width / 2)
}

// Sizes are plain artboard units now. The old version raised them as the
// preview panel got narrower, to keep on-screen text legible — a compensation
// for the copy being measured in viewport pixels while the map was measured in
// artboard units. With one coordinate system the whole composition scales
// together, and that clamp would have made the exported font size depend on
// the width of the browser window.
function updateLabelSizing() {
  const styles = getComputedStyle(labels)
  const baseSize = name => Number.parseFloat(styles.getPropertyValue(name)) || 0
  const valuePillScale = Number(labelScaleControls.valuePill.input.value) / 100
  const regionNameScale = Number(labelScaleControls.regionName.input.value) / 100
  const valueSize = baseSize('--value-base-size') * valuePillScale
  const unitSize = baseSize('--unit-base-size') * valuePillScale
  const regionNameSize = baseSize('--region-name-base-size') * regionNameScale
  const chipTextSize = Math.max(valueSize, unitSize)
  const chipY = -Math.ceil(chipTextSize * .92)
  const chipHeight = Math.max(Math.ceil(60 * valuePillScale), Math.ceil(chipTextSize * 1.58))

  labels.style.setProperty('--value-font-size', `${valueSize}px`)
  labels.style.setProperty('--unit-font-size', `${unitSize}px`)
  labels.style.setProperty('--region-name-font-size', `${regionNameSize}px`)

  labelNodes.forEach(node => {
    node.querySelector('.value').setAttribute('y', Math.round(valueSize * .21))
    node.querySelector('.value-chip').setAttribute('y', chipY)
    node.querySelector('.value-chip').setAttribute('height', chipHeight)
    node.querySelector('.value-chip').setAttribute('rx', chipHeight / 2)
    node.querySelector('.region-name').setAttribute('y', chipY + chipHeight + Math.ceil(regionNameSize * 1.25))
    resizeValueChip(node)
  })
}

/* Lay the artboard out top to bottom: the headline takes however many lines it
   is given, the subheadline follows it, and the map is fitted into whatever
   vertical space is left. Driven by content rather than fixed coordinates, so
   a three-line headline does not collide with the map. */
function layoutArtboard() {
  const headlineSize = baseCopySize.headline * (Number(labelScaleControls.headline.input.value) / 100)
  const subheadlineSize = baseCopySize.subheadline * (Number(labelScaleControls.subheadline.input.value) / 100)

  headline.setAttribute('font-size', headlineSize)
  subheadline.setAttribute('font-size', subheadlineSize)
  sourceText.setAttribute('font-size', baseCopySize.source)

  const lineHeight = headlineSize * 1.06
  const firstBaseline = ARTBOARD.top + headlineSize
  Array.from(headline.querySelectorAll('tspan')).forEach((line, index) => {
    line.setAttribute('x', ARTBOARD.w / 2)
    line.setAttribute('y', firstBaseline + index * lineHeight)
  })

  const headlineLines = Math.max(headline.querySelectorAll('tspan').length, 1)
  const headlineBottom = firstBaseline + (headlineLines - 1) * lineHeight
  const subheadlineBaseline = headlineBottom + subheadlineSize * 1.9
  subheadline.setAttribute('x', ARTBOARD.w / 2)
  subheadline.setAttribute('y', subheadlineBaseline)
  sourceText.setAttribute('x', ARTBOARD.w - ARTBOARD.margin)
  sourceText.setAttribute('y', ARTBOARD.h - 40)

  if (!mapContentBox) return
  // Fit the map's own ink, not its viewBox: the source file carries padding of
  // its own, and fitting the box would leave the country floating small.
  const top = subheadlineBaseline + 46
  const bottom = ARTBOARD.h - ARTBOARD.bottom
  const availableWidth = ARTBOARD.w - ARTBOARD.margin * 2
  const availableHeight = Math.max(bottom - top, 1)
  const scale = Math.min(availableWidth / mapContentBox.width, availableHeight / mapContentBox.height)
  const x = ARTBOARD.w / 2 - (mapContentBox.x + mapContentBox.width / 2) * scale
  const y = (top + bottom) / 2 - (mapContentBox.y + mapContentBox.height / 2) * scale
  chart.setAttribute('transform', `translate(${x} ${y}) scale(${scale})`)
}

Object.values(labelScaleControls).forEach(control => {
  control.input.addEventListener('input', () => {
    control.output.value = `${control.input.value}%`
    updateLabelSizing()
    renderPreview(true)
    layoutArtboard()
  })
})

// SVG text does not wrap, so the headline breaks where the author breaks it.
// For a chart headline that is the better deal anyway: where a line turns is a
// typographic decision, not something to hand to a measuring algorithm.
// Written separately from the per-frame render because it changes when someone
// types, not sixty times a second — and because it is what forces a relayout.
function renderCopy() {
  const lines = (text.title.value || 'Untitled map').split('\n')
  headline.textContent = ''
  lines.forEach(line => {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    tspan.textContent = line
    headline.appendChild(tspan)
  })
  subheadline.textContent = text.subtitle.value
  sourceText.textContent = text.source.value
  layoutArtboard()
}

function renderPreview(showAll = false, counterValues = {}) {
  regions.forEach(region => {
    const node = labelNodes.get(region.id)
    if (!node) return
    const visible = showAll || Object.prototype.hasOwnProperty.call(counterValues, region.id)
    const value = showAll ? region.value : (counterValues[region.id] || 0)
    node.classList.toggle('is-visible', visible)
    node.setAttribute('transform', `translate(${region.x} ${region.y})`)
    node.querySelector('.value-number').textContent = formatValue(value)
    node.querySelector('.unit').textContent = ` ${text.unit.value}`
    resizeValueChip(node)
  })
  mapPaths.forEach((path, index) => {
    const region = regions[index]
    path.style.fill = showAll || Object.prototype.hasOwnProperty.call(counterValues, region.id)
      ? colorAt(region.value)
      : activeColorScheme.low
  })
}

function wait(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

async function replay() {
  const currentRun = ++runId
  status.textContent = 'Playing'
  status.classList.remove('ready')
  const counterValues = {}
  renderPreview(false, counterValues)
  await Promise.all(regions.map(async region => {
    await wait(region.delay)
    if (currentRun !== runId) return
    const start = performance.now()
    await new Promise(resolve => {
      const frame = now => {
        if (currentRun !== runId) return resolve()
        const progress = Math.min(1, (now - start) / 760)
        counterValues[region.id] = region.value * (1 - Math.pow(1 - progress, 3))
        renderPreview(false, counterValues)
        progress < 1 ? requestAnimationFrame(frame) : resolve()
      }
      requestAnimationFrame(frame)
    })
  }))
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
  // createSVGPoint lives on the <svg> root, so it comes from the artboard —
  // but the matrix has to come from the labels group, because that group now
  // sits inside the chart's fit transform. Its screen CTM carries that
  // transform, which is what keeps a drag landing under the cursor.
  const point = artboard.createSVGPoint()
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
    .map(region => `  { id: '${region.id}', name: '${region.name}', value: ${region.value}, delay: ${region.delay}, x: ${region.x}, y: ${region.y} },`)
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

Object.values(text).forEach(input => input.addEventListener('input', () => {
  renderCopy()
  renderPreview(true)
}))
const updateDecimalPlaces = () => renderPreview(true)
decimalPlacesInput.addEventListener('input', updateDecimalPlaces)
decimalPlacesInput.addEventListener('change', updateDecimalPlaces)
colorSchemeSwatch.style.background = activeColorScheme.high
colorSchemeInput.addEventListener('input', () => {
  activeColorScheme = colorSchemes[colorSchemeInput.value]
  colorSchemeSwatch.style.background = activeColorScheme.high
  renderTable()
  renderPreview(true)
})
document.querySelector('#replay-button').addEventListener('click', replay)

fetch('assets/czech-regions.svg')
  .then(response => response.text())
  .then(markup => {
    // The map's own <svg> wrapper and its white backing rect are dropped: the
    // artboard supplies the background, and the paths belong directly in the
    // chart group so a single transform moves map and labels together — which
    // is what keeps the dragged label positions correct.
    const holder = document.createElement('div')
    holder.innerHTML = markup
    const source = holder.querySelector('svg')
    Array.from(source.querySelectorAll('path')).forEach(path => mapArt.appendChild(path))
    mapPaths = [...mapArt.querySelectorAll('path')]
    mapPaths.forEach((path, index) => { path.dataset.region = regions[index].id })
    mapContentBox = mapArt.getBBox()
    buildLabels()
    updateLabelSizing()
    renderTable()
    renderCopy()
    replay()
  })
  .catch(() => { status.textContent = 'Map unavailable'; status.classList.add('ready') })
