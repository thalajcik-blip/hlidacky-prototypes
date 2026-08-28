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
const exportPanel = {
  toggle: document.querySelector('#export-toggle'),
  panel: document.querySelector('#export-panel'),
  close: document.querySelector('#export-panel-close'),
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
  unit: {
    input: document.querySelector('#unit-scale-input'),
    output: document.querySelector('#unit-scale-output'),
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
  if (isOpen) {
    exportPanel.panel.hidden = true
    exportPanel.toggle.setAttribute('aria-expanded', 'false')
    mapSettings.panel.querySelector('select').focus()
  }
}

function setExportPanelOpen(isOpen) {
  exportPanel.panel.hidden = !isOpen
  exportPanel.toggle.setAttribute('aria-expanded', String(isOpen))
  if (isOpen) {
    mapSettings.panel.hidden = true
    mapSettings.toggle.setAttribute('aria-expanded', 'false')
    exportPanel.panel.querySelector('select').focus()
  }
}

mapSettings.toggle.addEventListener('click', () => setMapSettingsOpen(mapSettings.panel.hidden))
mapSettings.close.addEventListener('click', () => {
  setMapSettingsOpen(false)
  mapSettings.toggle.focus()
})
exportPanel.toggle.addEventListener('click', () => setExportPanelOpen(exportPanel.panel.hidden))
exportPanel.close.addEventListener('click', () => {
  setExportPanelOpen(false)
  exportPanel.toggle.focus()
})
document.addEventListener('pointerdown', event => {
  if (!mapSettings.panel.hidden && !mapSettings.panel.contains(event.target) && !mapSettings.toggle.contains(event.target)) {
    setMapSettingsOpen(false)
  }
  if (!exportPanel.panel.hidden && !exportPanel.panel.contains(event.target) && !exportPanel.toggle.contains(event.target)) {
    setExportPanelOpen(false)
  }
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!mapSettings.panel.hidden) {
      setMapSettingsOpen(false)
      mapSettings.toggle.focus()
    }
    if (!exportPanel.panel.hidden) {
      setExportPanelOpen(false)
      exportPanel.toggle.focus()
    }
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
  const unitScale = Number(labelScaleControls.unit.input.value) / 100
  const regionNameScale = Number(labelScaleControls.regionName.input.value) / 100
  const valueSize = baseSize('--value-base-size') * valuePillScale
  const unitSize = baseSize('--unit-base-size') * unitScale
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

// --- the animation as a function of time -------------------------------------
// It used to be CSS transitions plus a rAF counter: fine on screen, useless for
// export, because a transition is driven by the wall clock and asking for "the
// frame at 400ms" gets whatever the clock happens to say. Every channel is now
// interpolated explicitly, so the preview and the exported video are the same
// computation rather than two that merely resemble each other.
const TIMING = { counter: 760, fill: 460, label: 260 }

function cubicBezier(x1, y1, x2, y2) {
  const curve = (a, b, t) => (((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t + 3 * a) * t
  return x => {
    let low = 0
    let high = 1
    let t = x
    for (let i = 0; i < 24; i += 1) {          // bisection: exact enough, no derivatives
      const current = curve(x1, x2, t)
      if (Math.abs(current - x) < 1e-5) break
      if (current < x) low = t; else high = t
      t = (low + high) / 2
    }
    return curve(y1, y2, t)
  }
}

const easeOutCubic = progress => 1 - Math.pow(1 - progress, 3)
const easeFill = cubicBezier(.2, .75, .25, 1)      // was the CSS fill transition
const easeLabel = cubicBezier(.25, .1, .25, 1)     // CSS 'ease'

function parseColor(value) {
  if (value.startsWith('#')) {
    const hex = value.length === 4
      ? value.slice(1).split('').map(channel => channel + channel).join('')
      : value.slice(1)
    return [0, 2, 4].map(i => Number.parseInt(hex.slice(i, i + 2), 16))
  }
  return value.match(/\d+/g).slice(0, 3).map(Number)
}

function mixColor(from, to, progress) {
  const a = parseColor(from)
  const b = parseColor(to)
  return `rgb(${a.map((channel, i) => Math.round(channel + (b[i] - channel) * progress)).join(', ')})`
}

function animationDuration() {
  return regions.reduce((longest, region) => Math.max(longest, region.delay), 0) + TIMING.counter
}

// Renders the chart exactly as it stands t milliseconds into the animation.
function applyFrame(t) {
  regions.forEach((region, index) => {
    const node = labelNodes.get(region.id)
    const path = mapPaths[index]
    const elapsed = t - region.delay
    if (elapsed < 0) {
      if (path) path.style.fill = activeColorScheme.low
      if (node) {
        node.classList.remove('is-visible')
        node.querySelector('.label-content').style.cssText = 'opacity:0;transform:translateY(4px)'
      }
      return
    }
    if (path) {
      path.style.fill = mixColor(activeColorScheme.low, colorAt(region.value),
        easeFill(Math.min(1, elapsed / TIMING.fill)))
    }
    if (!node) return
    const appear = easeLabel(Math.min(1, elapsed / TIMING.label))
    node.classList.add('is-visible')
    node.querySelector('.label-content').style.cssText =
      `opacity:${appear};transform:translateY(${(1 - appear) * 4}px)`
    node.querySelector('.value-number').textContent =
      formatValue(region.value * easeOutCubic(Math.min(1, elapsed / TIMING.counter)))
    node.querySelector('.unit').textContent = ` ${text.unit.value}`
    resizeValueChip(node)
  })
}

function wait(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

async function replay() {
  const currentRun = ++runId
  status.textContent = 'Playing'
  status.classList.remove('ready')
  const total = animationDuration()
  const start = performance.now()
  await new Promise(resolve => {
    const frame = now => {
      if (currentRun !== runId) return resolve()
      const elapsed = now - start
      applyFrame(Math.min(elapsed, total))
      if (elapsed < total) requestAnimationFrame(frame)
      else resolve()
    }
    requestAnimationFrame(frame)
  })
  if (currentRun === runId) {
    status.textContent = 'Ready'
    status.classList.add('ready')
  }
}

// --- export -----------------------------------------------------------------
// A rasterised SVG is an isolated document: no external stylesheet, no webfont
// fetch, no access to the page it came from. Whatever the export needs has to
// travel inside the file, which is why the styles are inlined and the fonts
// are carried as base64 rather than referenced.
const SVG_NS = 'http://www.w3.org/2000/svg'
const EXPORT_FONTS = [
  { family: 'Soleil', weight: 600, file: 'soleil-600.woff2' },
  { family: 'Soleil', weight: 700, file: 'soleil-700.woff2' },
  { family: 'DM Sans', weight: 400, file: 'dmsans-400.woff2' },
  { family: 'DM Sans', weight: 700, file: 'dmsans-700.woff2' },
  { family: 'DM Mono', weight: 500, file: 'dmmono-500.woff2' },
]
const EXPORT_STYLE_PROPS = [
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-linejoin',
  'opacity', 'font-family', 'font-size', 'font-weight', 'font-style',
  'letter-spacing', 'text-anchor', 'filter',
]
const exportStatus = document.querySelector('#export-status')
const exportScaleInput = document.querySelector('#export-scale-input')
let embeddedFontCss = null

async function fontCss() {
  if (embeddedFontCss) return embeddedFontCss
  const faces = await Promise.all(EXPORT_FONTS.map(async face => {
    const bytes = new Uint8Array(await (await fetch(`assets/fonts/${face.file}`)).arrayBuffer())
    let binary = ''
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
    return `@font-face{font-family:'${face.family}';font-style:normal;font-weight:${face.weight};` +
           `src:url(data:font/woff2;base64,${btoa(binary)}) format('woff2');}`
  }))
  embeddedFontCss = faces.join('')
  return embeddedFontCss
}

// Computed styles are read from the live elements and written onto the matching
// clone, walked in step. Copying the stylesheet instead would mean re-deciding
// which selectors apply, and getting that subtly wrong is invisible until the
// export is already out of the building.
function inlineStyles(source, clone) {
  const computed = getComputedStyle(source)
  const declarations = EXPORT_STYLE_PROPS
    .map(prop => [prop, computed.getPropertyValue(prop)])
    .filter(([, value]) => value && value !== 'none' || false)
    .map(([prop, value]) => `${prop}:${value}`)
  const filter = computed.getPropertyValue('filter')
  if (filter && filter !== 'none') declarations.push(`filter:${filter}`)
  if (declarations.length) clone.setAttribute('style', declarations.join(';'))
  for (let i = 0; i < source.children.length; i += 1) {
    inlineStyles(source.children[i], clone.children[i])
  }
}

async function buildExportSvg() {
  renderPreview(true)                 // stills show the finished chart
  return buildFrameSvg()
}

// Serialises whatever the artboard shows right now, mid-animation or not.
async function buildFrameSvg() {
  const clone = artboard.cloneNode(true)
  clone.setAttribute('xmlns', SVG_NS)
  clone.setAttribute('width', ARTBOARD.w)
  clone.setAttribute('height', ARTBOARD.h)
  inlineStyles(artboard, clone)
  const style = document.createElementNS(SVG_NS, 'style')
  style.textContent = await fontCss()
  clone.insertBefore(style, clone.firstChild)   // after inlining, so indices stayed aligned
  return new XMLSerializer().serializeToString(clone)
}

async function rasterize(markup, scale, type, quality) {
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const image = new Image()
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = () => reject(new Error('the SVG could not be rendered'))
      image.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = ARTBOARD.w * scale
    canvas.height = ARTBOARD.h * scale
    const context = canvas.getContext('2d')
    // JPEG has no alpha, and an unpainted canvas is transparent black — which
    // encodes as a black background rather than the white one on screen.
    if (type === 'image/jpeg') {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    return await new Promise(resolve => canvas.toBlob(resolve, type, quality))
  } finally {
    URL.revokeObjectURL(url)
  }
}

function exportFileName(extension) {
  const slug = (text.title.value || 'animated-map')
    .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').slice(0, 60)
  return `${slug || 'animated-map'}.${extension}`
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function runExport(format) {
  exportStatus.textContent = 'Preparing…'
  try {
    const markup = format === 'mp4' || format === 'embed' ? null : await buildExportSvg()
    if (format === 'svg') {
      saveBlob(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }), exportFileName('svg'))
    } else if (format === 'embed') {
      await fontCss()
      saveBlob(new Blob([buildEmbedSvg()], { type: 'image/svg+xml;charset=utf-8' }),
        exportFileName('animated.svg'))
    } else if (format === 'mp4') {
      saveBlob(await exportVideo(), exportFileName('mp4'))
    } else {
      const scale = Number(exportScaleInput.value) || 1
      const type = format === 'jpg' ? 'image/jpeg' : 'image/png'
      const blob = await rasterize(markup, scale, type, format === 'jpg' ? 0.92 : undefined)
      if (!blob) throw new Error('the canvas produced nothing')
      saveBlob(blob, exportFileName(format))
    }
    exportStatus.textContent = 'Saved'
  } catch (error) {
    exportStatus.textContent = `Failed — ${error.message}`
    console.error(error)
  }
  setTimeout(() => { exportStatus.textContent = '' }, 2600)
}

// --- video ------------------------------------------------------------------
// Chrome and Safari both record H.264 in an MP4 container directly, so no muxer
// is vendored. MediaRecorder is realtime by nature, which suits this animation:
// it runs a second and a half, and a frame costs about 10ms to serialise and
// draw — comfortably inside a 33ms budget at 30fps.
//
// captureStream(0) hands frame timing over: nothing is captured until
// requestFrame() is called, so the recorder sees exactly the frames applyFrame
// produced and never samples a half-drawn canvas.
const VIDEO_FPS = 30
const VIDEO_TAIL_MS = 700          // hold the finished chart before cutting

// avc3 is preferred over avc1 deliberately. With avc1 the codec description
// lives in the container header and may not change for the length of the
// recording; Chrome warns that a mid-recording encoder reconfiguration breaks
// that promise, and the file it writes is then subtly malformed. avc3 carries
// its parameter sets in-band, so a reconfiguration is legal. Both are H.264 and
// play in the same places; avc1 stays as the fallback.
function videoMimeType() {
  return [
    'video/mp4;codecs=avc3.640028',
    'video/mp4;codecs=avc3.42E01E',
    'video/mp4;codecs=avc1.640028',
    'video/mp4',
  ].find(type => MediaRecorder.isTypeSupported(type)) || null
}

async function exportVideo() {
  const mimeType = videoMimeType()
  if (!mimeType) throw new Error('this browser cannot record MP4')

  const scale = Number(exportScaleInput.value) || 1
  const canvas = document.createElement('canvas')
  canvas.width = ARTBOARD.w * scale
  canvas.height = ARTBOARD.h * scale
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const stream = canvas.captureStream(0)
  const [track] = stream.getVideoTracks()
  const chunks = []
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 16000000 * scale })
  recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data) }
  const finished = new Promise(resolve => { recorder.onstop = resolve })

  const total = animationDuration()
  const frameCount = Math.round((total + VIDEO_TAIL_MS) / 1000 * VIDEO_FPS)
  const image = new Image()

  const drawFrameAt = async time => {
    applyFrame(Math.min(time, total))
    const url = URL.createObjectURL(new Blob([await buildFrameSvg()], { type: 'image/svg+xml;charset=utf-8' }))
    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = () => reject(new Error('a frame could not be rendered'))
        image.src = url
      })
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  await drawFrameAt(0)            // paint frame zero before the recorder starts
  recorder.start()
  const startedAt = performance.now()

  for (let index = 0; index < frameCount; index += 1) {
    const target = index / VIDEO_FPS * 1000
    await drawFrameAt(target)
    track.requestFrame()
    exportStatus.textContent = `Recording ${Math.round((index + 1) / frameCount * 100)}%`
    // Pace to the wall clock: MediaRecorder timestamps by it, so running ahead
    // would yield a video shorter than the animation it represents.
    const drift = target - (performance.now() - startedAt)
    if (drift > 0) await wait(drift)
  }

  recorder.stop()
  track.stop()
  await finished
  applyFrame(total)
  return new Blob(chunks, { type: mimeType })
}

// --- embeddable animated SVG -------------------------------------------------
// One file a developer can drop in an <img>, an <object>, or inline: no script,
// no dependencies, vector at any size, fonts already inside it. CSS animations
// run in an <img>-loaded SVG; script does not, which is why the counter is not
// scripted.
//
// CSS cannot count, so each value is pre-rendered as a stack of tspans and one
// is revealed at a time. Twenty steps reads as a smooth tick and costs a few
// kilobytes, which is a better trade than shipping a script that half the
// embedding contexts refuse to run.
const EMBED_STEPS = 20

function buildEmbedSvg() {
  applyFrame(animationDuration())          // final state supplies colours and chip widths
  const clone = artboard.cloneNode(true)
  clone.setAttribute('xmlns', SVG_NS)
  clone.setAttribute('width', ARTBOARD.w)
  clone.setAttribute('height', ARTBOARD.h)
  inlineStyles(artboard, clone)

  const keyframes = []
  regions.forEach((region, index) => {
    const finalFill = colorAt(region.value)
    const path = clone.querySelectorAll('#map-art path')[index]
    if (path) {
      path.setAttribute('style',
        `${path.getAttribute('style') || ''};fill:${activeColorScheme.low};` +
        `animation:fill-${region.id} ${TIMING.fill}ms ${region.delay}ms cubic-bezier(.2,.75,.25,1) forwards`)
      keyframes.push(`@keyframes fill-${region.id}{to{fill:${finalFill}}}`)
    }

    const label = clone.querySelector(`.label[data-region="${region.id}"]`)
    if (!label) return
    const content = label.querySelector('.label-content')
    content.setAttribute('style',
      `opacity:0;transform:translateY(4px);transform-box:fill-box;transform-origin:center;` +
      `animation:label-appear ${TIMING.label}ms ${region.delay}ms ease forwards`)

    // One <text> per step of the count-up, stacked at the same coordinates and
    // revealed in turn. Stacking tspans inside a single <text> does not work:
    // they lay out horizontally, and opacity:0 hides a tspan without taking it
    // out of the line, so twenty invisible numbers drag the visible one aside.
    const valueText = label.querySelector('.value')
    const step = TIMING.counter / EMBED_STEPS
    for (let i = 0; i < EMBED_STEPS; i += 1) {
      const frameText = valueText.cloneNode(true)
      const progress = easeOutCubic((i + 1) / EMBED_STEPS)
      frameText.querySelector('.value-number').textContent = formatValue(region.value * progress)
      const last = i === EMBED_STEPS - 1
      frameText.setAttribute('style',
        `${valueText.getAttribute('style') || ''};opacity:0;` +
        // fill-mode must stay none for every step but the last: 'both' would
        // apply the keyframe's opacity outside the window too, leaving all
        // twenty numbers on screen at once.
        `animation:hold ${step}ms ${region.delay + i * step}ms linear ${last ? 'forwards' : ''}`)
      valueText.parentNode.insertBefore(frameText, valueText)
    }
    valueText.remove()
  })

  keyframes.push('@keyframes label-appear{to{opacity:1;transform:translateY(0)}}')
  keyframes.push('@keyframes hold{from{opacity:1}to{opacity:1}}')

  const style = document.createElementNS(SVG_NS, 'style')
  style.textContent = embeddedFontCss + keyframes.join('')
  clone.insertBefore(style, clone.firstChild)
  return new XMLSerializer().serializeToString(clone)
}

document.querySelectorAll('[data-export]').forEach(button => {
  button.addEventListener('click', () => runExport(button.dataset.export))
})

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
