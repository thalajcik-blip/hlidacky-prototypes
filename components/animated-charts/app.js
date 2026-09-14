/* Animated charts — bar, line and pie on the same artboard, the same timing
   engine and the same export pipeline as the animated maps tool.

   Two rules hold the whole file together:

   1. One artboard, one coordinate system. Every number below is in artboard
      units, never in screen pixels, so the preview is the export at a smaller
      scale. A different format only changes the artboard's dimensions.
   2. The animation is a function of time. applyFrame(t) draws the chart exactly
      as it stands t milliseconds in — nothing is left to CSS transitions, whose
      wall-clock timing cannot be asked for a specific frame. The preview, the
      MP4 and the embedded SVG are therefore the same computation rather than
      three that merely resemble each other. */

const SVG_NS = 'http://www.w3.org/2000/svg'

// --- data --------------------------------------------------------------------
const samples = {
  cities: {
    title: 'Hourly rate for babysitting',
    subtitle: 'Average hourly rate by city',
    unit: 'Kč',
    decimals: '0',
    rows: [
      ['Praha', 230], ['Brno', 187], ['Ostrava', 168], ['Plzeň', 177],
      ['Olomouc', 168], ['Liberec', 182], ['Hradec Králové', 173], ['Zlín', 175],
    ],
  },
  months: {
    title: 'Babysitting rates keep climbing',
    subtitle: 'Average hourly rate, month by month',
    unit: 'Kč',
    decimals: '0',
    rows: [
      ['Jan', 168], ['Feb', 169], ['Mar', 172], ['Apr', 176], ['May', 179], ['Jun', 184],
      ['Jul', 191], ['Aug', 188], ['Sep', 194], ['Oct', 199], ['Nov', 203], ['Dec', 211],
    ],
  },
  bookings: {
    title: 'What families book',
    subtitle: 'Share of bookings by type',
    unit: '%',
    decimals: '0',
    rows: [
      ['Regular care', 38], ['One-off', 27], ['Evenings', 16], ['Weekends', 12], ['Holidays', 7],
    ],
  },
}

let nextRowId = 0
/* labelDx/labelDy are a manual nudge for a slice label, held as an offset from
   wherever the layout would have put it — not as an absolute position. An
   absolute one would be wrong the moment the values, the artboard format or the
   type size moved the pie underneath it; an offset travels with its slice. It
   is stored in 1920-wide units and scaled by `unit`, so a label placed on the
   16:9 artboard keeps its place in a story crop. */
const makeRow = (name, value, delay) => ({ id: `row-${nextRowId += 1}`, name, value, delay, labelDx: 0, labelDy: 0 })

function loadSample(key) {
  const sample = samples[key]
  if (!sample) return
  const stagger = Number(staggerInput.value) || 0
  rows = sample.rows.map(([name, value], index) => makeRow(name, value, index * stagger))
  text.title.value = sample.title
  text.subtitle.value = sample.subtitle
  text.unit.value = sample.unit
  decimalPlacesInput.value = sample.decimals
}

let rows = []
let chartType = 'bar'

// --- artboard ----------------------------------------------------------------
/* The formats a chart actually gets posted in. Everything derives from the
   width: a headline is 52 units at 1920, so at 1080 it is 52 × (1080/1920) and
   holds the same proportion of the frame rather than ballooning in a portrait
   crop. One number — `unit` — carries that through the whole file. */
const formats = {
  '16:9': { w: 1920, h: 1080 },
  '1:1': { w: 1080, h: 1080 },
  '4:5': { w: 1080, h: 1350 },
  '9:16': { w: 1080, h: 1920 },
  /* The one format that breaks the width rule. The others are posted full
     screen, so type proportional to the frame reads the same everywhere; this
     one is embedded in a page and shown about 375px wide, where the proportional
     headline comes out at 10px and the axis at 4. So it carries its own `unit`,
     sized for that width, and — because a bigger unit would also fatten the
     margins until they ate a fifth of a phone — its own margins, in base units.
     The smallest text (axis numbers, the unit beside a value, the source) gets a
     further lift, since what is merely small on a desktop is unreadable here.
     Vertical bars run horizontally: eight category names do not fit side by
     side at any legible size, and the names need the width a phone lacks. */
  mobile: { w: 1080, h: 1350, unit: 1.25, margin: 32, top: 40, bottom: 72, smallText: 1.3, horizontalBars: true },
}
const base = {
  margin: 80, top: 72, bottom: 96,
  headline: 52, subheadline: 29, source: 18,
  value: 38, unit: 18, category: 27, axis: 22,
}
let artboardSize = { ...formats['16:9'] }
let unit = 1

const colorSchemes = {
  babysitting: { low: '#fee7ea', high: '#f85f73' },
  'pet-care': { low: '#ccf7e8', high: '#00bd79' },
  cleaning: { low: '#d7f5fb', high: '#00b8d8' },
  'senior-care': { low: '#ffe8d3', high: '#ed7000' },
  tutoring: { low: '#f1dfff', high: '#a533ff' },
}
let activeColorScheme = colorSchemes.babysitting

// --- DOM ---------------------------------------------------------------------
const text = {
  title: document.querySelector('#title-input'),
  subtitle: document.querySelector('#subtitle-input'),
  source: document.querySelector('#source-input'),
  unit: document.querySelector('#unit-input'),
}
const chartTypePicker = document.querySelector('#chart-type-picker')
const artboardPicker = document.querySelector('#artboard-picker')
const table = document.querySelector('#rows-table')
const rowCount = document.querySelector('#row-count')
const staggerInput = document.querySelector('#stagger-input')
const samplePicker = document.querySelector('#sample-picker')
const pasteInput = document.querySelector('#paste-input')
const pasteStatus = document.querySelector('#paste-status')
const decimalPlacesInput = document.querySelector('#decimal-places-input')
const colorSchemeInput = document.querySelector('#color-scheme-input')
const colorSchemeSwatch = document.querySelector('#color-scheme-swatch')
const colorModeInput = document.querySelector('#color-mode-input')
const valueStyleInput = document.querySelector('#value-style-input')
const gridInput = document.querySelector('#grid-input')
const axisValuesInput = document.querySelector('#axis-values-input')
const areaInput = document.querySelector('#area-input')
const dotsInput = document.querySelector('#dots-input')
const centerTotalInput = document.querySelector('#center-total-input')
const curveInput = document.querySelector('#curve-input')
const status = document.querySelector('#animation-status')
const previewDimensions = document.querySelector('#preview-dimensions')

const artboard = document.querySelector('#artboard')
const headline = document.querySelector('#preview-title')
const subheadline = document.querySelector('#preview-subtitle')
const sourceText = document.querySelector('#preview-source')
const sourceLink = document.querySelector('#preview-source-link')
const gridLayer = document.querySelector('#chart-grid')
const axisLayer = document.querySelector('#chart-axis')
const seriesLayer = document.querySelector('#chart-series')
const labelLayer = document.querySelector('#chart-labels')

const ranges = {
  headline: range('headline-scale'),
  subheadline: range('subheadline-scale'),
  value: range('value-scale'),
  unit: range('unit-scale'),
  category: range('category-scale'),
  barGap: range('bar-gap'),
  barRadius: range('bar-radius'),
  lineWidth: range('line-width'),
  donutThickness: range('donut-thickness'),
  sliceGap: range('slice-gap'),
  chartSize: range('chart-size'),
}

function range(name) {
  return {
    input: document.querySelector(`#${name}-input`),
    output: document.querySelector(`#${name}-output`),
  }
}

const scaleOf = control => Number(control.input.value) / 100

// --- helpers -----------------------------------------------------------------
/* Text has to be measured before it can be laid out: the width of the widest
   axis value decides the left gutter, and the width of a rendered number
   decides how wide its chip is. An off-screen SVG does the measuring, because
   a display:none element has no text length at all. */
const measureSvg = document.createElementNS(SVG_NS, 'svg')
measureSvg.setAttribute('aria-hidden', 'true')
measureSvg.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none'
const measureNode = document.createElementNS(SVG_NS, 'text')
measureSvg.appendChild(measureNode)
document.body.appendChild(measureSvg)

function measureText(value, { size, family, weight = 400, spacing = 0 }) {
  measureNode.setAttribute('font-size', size)
  measureNode.setAttribute('font-family', family)
  measureNode.setAttribute('font-weight', weight)
  measureNode.setAttribute('letter-spacing', spacing)
  measureNode.textContent = String(value)
  return measureNode.getComputedTextLength()
}

const FONT_SOLEIL = "Soleil, 'DM Sans', Arial, sans-serif"
const FONT_DM = "'DM Sans', Arial, sans-serif"

// Every country this tool draws for writes the decimal separator as a comma and
// groups thousands its own way. Intl knows all of that; a hand-written
// separator table would only be a worse copy of it. The formatter is cached
// because this runs for every label on every animation frame.
let valueFormatter = null
let valueFormatterKey = ''

function formatValue(value) {
  const decimals = Number(decimalPlacesInput.value) || 0
  const key = `cs-CZ:${decimals}`
  if (key !== valueFormatterKey) {
    valueFormatter = new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    valueFormatterKey = key
  }
  return valueFormatter.format(Number(value) || 0)
}

function parseColor(value) {
  if (value.startsWith('#')) {
    const hex = value.length === 4 ? value.slice(1).split('').map(c => c + c).join('') : value.slice(1)
    return [0, 2, 4].map(i => Number.parseInt(hex.slice(i, i + 2), 16))
  }
  return value.match(/\d+/g).slice(0, 3).map(Number)
}

function mixColor(from, to, progress) {
  const a = parseColor(from)
  const b = parseColor(to)
  return `rgb(${a.map((channel, i) => Math.round(channel + (b[i] - channel) * progress)).join(', ')})`
}

const isDark = color => {
  const [r, g, b] = parseColor(color)
  return (r * 299 + g * 587 + b * 114) / 1000 < 150
}

function colorForRow(row, index) {
  const mode = chartType === 'pie' || chartType === 'donut' ? 'series' : colorModeInput.value
  if (mode === 'value') {
    const values = rows.map(item => Number(item.value) || 0)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const t = max === min ? .5 : ((Number(row.value) || 0) - min) / (max - min)
    return mixColor(activeColorScheme.low, activeColorScheme.high, t)
  }
  if (mode === 'series') {
    // The first slice is the accent at full strength and the ramp walks toward
    // the tint — but never all the way, or the last slice would be a shade off
    // white and read as empty space rather than as data.
    const t = rows.length < 2 ? 0 : (index / (rows.length - 1)) * .72
    return mixColor(activeColorScheme.high, activeColorScheme.low, t)
  }
  return activeColorScheme.high
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

// Axis ticks land on numbers a reader recognises — 0, 50, 100 — rather than on
// whatever the data's extremes divide into.
function niceTicks(min, max, count = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max === min) {
    const only = Number.isFinite(max) ? max : 0
    return { min: Math.min(0, only), max: only || 1, ticks: [Math.min(0, only), only || 1] }
  }
  const niceNum = (value, round) => {
    const exponent = Math.floor(Math.log10(value))
    const fraction = value / Math.pow(10, exponent)
    const nice = round
      ? (fraction < 1.5 ? 1 : fraction < 3 ? 2 : fraction < 7 ? 5 : 10)
      : (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10)
    return nice * Math.pow(10, exponent)
  }
  const step = niceNum(niceNum(max - min, false) / (count - 1), true)
  const niceMin = Math.floor(min / step) * step
  const niceMax = Math.ceil(max / step) * step
  const ticks = []
  for (let value = niceMin; value <= niceMax + step / 2; value += step) {
    ticks.push(Math.abs(value) < step / 1e6 ? 0 : Number(value.toFixed(10)))
  }
  return { min: niceMin, max: niceMax, ticks }
}

function svg(name, attributes = {}, parent = null) {
  const node = document.createElementNS(SVG_NS, name)
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    node.setAttribute(key, value)
  })
  if (parent) parent.appendChild(node)
  return node
}

// SVG text does not wrap, so a name breaks where the author breaks it.
function setLines(node, value, x, lineHeight) {
  node.replaceChildren()
  String(value).split('\n').forEach((line, index) => {
    const tspan = svg('tspan', { x, dy: index ? lineHeight : 0 }, node)
    tspan.textContent = line
  })
  return String(value).split('\n').length
}

// --- timing ------------------------------------------------------------------
const TIMING = { counter: 760, grow: 640, label: 260 }

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

const easeCount = progress => 1 - Math.pow(1 - progress, 3)     // easeOutCubic
const easeGrow = cubicBezier(.2, .75, .25, 1)
const easeLabel = cubicBezier(.25, .1, .25, 1)                  // CSS 'ease'
const GROW_BEZIER = 'cubic-bezier(.2,.75,.25,1)'

/* A pie is not drawn the way a bar chart is. Bars are separate objects and can
   grow at once, staggered; a circle reads as one stroke, so the slices are
   windows onto a single pen that travels the circumference at a constant rate —
   one slice starts exactly where the previous one stopped. That is also why the
   sweep is linear: easing each slice on its own would make the pen accelerate
   and brake at every boundary, which is the one thing a continuous circle must
   not do. Per-row delays therefore do not apply to these two types.

   The sweep lengthens with the slice count so a busy chart does not flicker
   past, and is clamped at both ends so three slices are not glacial and twenty
   are not a wait. */
const SWEEP = { perSlice: 260, min: 900, max: 2600 }

function pieTiming() {
  const total = rows.reduce((sum, row) => sum + Math.max(0, Number(row.value) || 0), 0)
  const sweep = clamp(rows.length * SWEEP.perSlice, SWEEP.min, SWEEP.max)
  let cumulative = 0
  // A label arrives as the pen passes the middle of its slice — where the label
  // sits — so the numbers appear at the rhythm of the sweep rather than all at
  // the end of it.
  const labelStarts = rows.map(row => {
    const share = total > 0 ? Math.max(0, Number(row.value) || 0) / total : 1 / rows.length
    const middle = (cumulative + share / 2) * sweep
    cumulative += share
    return middle
  })
  return { sweep, labelStarts }
}

function animationDuration() {
  if (chartType === 'pie' || chartType === 'donut') {
    const { sweep, labelStarts } = pieTiming()
    return Math.max(sweep, Math.max(0, ...labelStarts) + Math.max(TIMING.counter, TIMING.label))
  }
  const longestDelay = rows.reduce((longest, row) => Math.max(longest, Number(row.delay) || 0), 0)
  return longestDelay + Math.max(TIMING.counter, TIMING.grow)
}

function sliceProgress(index, t) {
  const start = frameGeometry?.timing.labelStarts[index] ?? 0
  const elapsed = t - start
  if (elapsed <= 0) return { grow: 0, appear: 0, counted: 0 }
  return {
    grow: 1,
    appear: easeLabel(Math.min(1, elapsed / TIMING.label)),
    counted: easeCount(Math.min(1, elapsed / TIMING.counter)),
  }
}

function rowProgress(row, t) {
  const elapsed = t - (Number(row.delay) || 0)
  if (elapsed <= 0) return { grow: 0, appear: 0, counted: 0 }
  return {
    grow: easeGrow(Math.min(1, elapsed / TIMING.grow)),
    appear: easeLabel(Math.min(1, elapsed / TIMING.label)),
    counted: easeCount(Math.min(1, elapsed / TIMING.counter)),
  }
}

// --- the data table ----------------------------------------------------------
// Names reach the markup through a value="" attribute, so a quote would
// otherwise close the attribute early and take the rest of the row with it.
const escapeAttribute = value => String(value)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function renderTable() {
  rowCount.textContent = rows.length
  table.innerHTML = rows.map((row, index) => `
    <tr>
      <td><span class="row-cell"><span class="row-dot" style="background:${colorForRow(row, index)}"></span><input class="row-name-input" type="text" value="${escapeAttribute(row.name)}" aria-label="Category name" data-row="${row.id}" data-field="name"></span></td>
      <td><input type="text" inputmode="decimal" value="${row.value}" aria-label="${escapeAttribute(row.name)} value" data-row="${row.id}" data-field="value"></td>
      <td><input type="text" inputmode="numeric" value="${row.delay}" aria-label="${escapeAttribute(row.name)} delay in milliseconds" data-row="${row.id}" data-field="delay"></td>
      <td><button class="row-remove" type="button" data-remove="${row.id}" aria-label="Remove ${escapeAttribute(row.name)}" ${rows.length < 2 ? 'disabled' : ''}>×</button></td>
    </tr>`).join('')

  table.querySelectorAll('input').forEach(input => input.addEventListener('input', event => {
    const row = rows.find(item => item.id === event.target.dataset.row)
    if (!row) return
    const field = event.target.dataset.field
    if (field === 'name') {
      row.name = event.target.value
      rebuild()
      return
    }
    const value = Number(event.target.value.replace(',', '.'))
    if (!Number.isFinite(value)) return
    row[field] = event.target.value === '' ? 0 : value
    rebuild()
  }))
  // Re-rendering on every keystroke would take the field out from under the
  // cursor, so the table is rebuilt on blur — which is also when the dot
  // colours and the aria labels need to catch up.
  table.querySelectorAll('input').forEach(input => input.addEventListener('change', renderTable))
  table.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {
    if (rows.length < 2) return
    rows = rows.filter(row => row.id !== button.dataset.remove)
    renderTable()
    rebuild()
  }))
}

/* Anything pasted out of Sheets arrives tab-separated, anything saved as CSV
   arrives with commas or semicolons, and a Czech export writes decimals with a
   comma — which is why the decimal separator is only read as one when the cell
   has no other job for it. */
function parsePasted(input) {
  const parsed = []
  input.split(/\r?\n/).forEach(line => {
    if (!line.trim()) return
    const cells = line.split(/\t|;|,(?=\s*-?\d)|,/).map(cell => cell.trim().replace(/^"|"$/g, ''))
    if (cells.length < 2) return
    const name = cells[0]
    const value = Number(cells[1].replace(/\s| /g, '').replace(',', '.'))
    if (!Number.isFinite(value)) return                 // skips the header row
    const delay = Number(cells[2])
    parsed.push({ name, value, delay: Number.isFinite(delay) ? delay : null })
  })
  return parsed
}

function applyStagger() {
  const stagger = Number(staggerInput.value) || 0
  rows.forEach((row, index) => { row.delay = index * stagger })
}

// --- layout ------------------------------------------------------------------
/* Lay the artboard out top to bottom: the headline takes however many lines it
   is given, the subheadline follows it, and the chart is fitted into whatever
   vertical space is left. Driven by content rather than fixed coordinates, so a
   three-line headline does not collide with the plot. */
let plot = { x0: 0, y0: 0, x1: 0, y1: 0 }

function updateArtboardSize() {
  const format = formats[artboardPicker.value] || formats['16:9']
  artboardSize = { ...format }
  unit = artboardSize.unit ?? artboardSize.w / 1920
  artboard.setAttribute('viewBox', `0 0 ${artboardSize.w} ${artboardSize.h}`)
  artboard.querySelector('.artboard-bg').setAttribute('width', artboardSize.w)
  artboard.querySelector('.artboard-bg').setAttribute('height', artboardSize.h)
  /* The stage is width-driven, so the only way it can also respect the height
     it has been given is a max-width derived from that height — CSS has no
     min() across the two axes. The ratio goes in as a number for the calc and
     as a pair for aspect-ratio. */
  const stage = document.querySelector('.preview-stage')
  stage.style.setProperty('--stage-aspect', `${artboardSize.w} / ${artboardSize.h}`)
  stage.style.setProperty('--stage-ratio', String(artboardSize.w / artboardSize.h))
  previewDimensions.textContent = `${artboardSize.w} × ${artboardSize.h}`
  Array.from(exportScaleInput.options).forEach(option => {
    const scale = Number(option.value)
    if (!Number.isFinite(scale)) return          // the custom entry keeps its label
    option.textContent = `${artboardSize.w * scale} × ${artboardSize.h * scale}`
  })
  syncExportSize()
}

function layoutCopy() {
  const headlineSize = base.headline * unit * scaleOf(ranges.headline)
  const subheadlineSize = base.subheadline * unit * scaleOf(ranges.subheadline)
  const margin = (artboardSize.margin ?? base.margin) * unit

  headline.setAttribute('font-size', headlineSize)
  subheadline.setAttribute('font-size', subheadlineSize)
  sourceText.setAttribute('font-size', base.source * unit * (artboardSize.smallText || 1))

  const lines = (text.title.value || 'Untitled chart').split('\n')
  headline.replaceChildren()
  const lineHeight = headlineSize * 1.06
  const firstBaseline = (artboardSize.top ?? base.top) * unit + headlineSize
  lines.forEach((line, index) => {
    const tspan = svg('tspan', { x: artboardSize.w / 2, y: firstBaseline + index * lineHeight }, headline)
    tspan.textContent = line
  })

  const headlineBottom = firstBaseline + (lines.length - 1) * lineHeight
  const subheadlineBaseline = headlineBottom + subheadlineSize * 1.9
  subheadline.textContent = text.subtitle.value
  subheadline.setAttribute('x', artboardSize.w / 2)
  subheadline.setAttribute('y', subheadlineBaseline)

  const sourceMatch = text.source.value.match(/^(.*?)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*$/)
  sourceText.textContent = sourceMatch ? `${sourceMatch[1]}${sourceMatch[2]}` : text.source.value
  sourceText.setAttribute('x', artboardSize.w - margin)
  sourceText.setAttribute('y', artboardSize.h - 40 * unit)
  if (sourceMatch) sourceLink.setAttribute('href', sourceMatch[3])
  else sourceLink.removeAttribute('href')

  const box = {
    x0: margin,
    x1: artboardSize.w - margin,
    y0: subheadlineBaseline + 56 * unit,
    y1: artboardSize.h - (artboardSize.bottom ?? base.bottom) * unit,
  }
  /* Pulling the plot in about its centre is the one move that means the same
     thing to all five types: the chart gets smaller and the artboard keeps the
     room. It is what makes space for slice labels dragged clear of the pie,
     which would otherwise have nowhere to go but off the edge. */
  const shrink = scaleOf(ranges.chartSize)
  const width = (box.x1 - box.x0) * shrink
  const height = (box.y1 - box.y0) * shrink
  plot = {
    x0: (box.x0 + box.x1) / 2 - width / 2,
    x1: (box.x0 + box.x1) / 2 + width / 2,
    y0: (box.y0 + box.y1) / 2 - height / 2,
    y1: (box.y0 + box.y1) / 2 + height / 2,
  }
}

// --- building the chart ------------------------------------------------------
// Rebuilt whenever the data, the type or a setting changes; never per frame.
// applyFrame only mutates the handles this leaves behind.
let nodes = new Map()          // row id -> the elements that animate
let frameGeometry = null       // everything applyFrame needs that is not a node

function valueFontSizes() {
  const small = artboardSize.smallText || 1
  return {
    value: base.value * unit * scaleOf(ranges.value),
    unit: base.unit * unit * small * scaleOf(ranges.unit),
    category: base.category * unit * scaleOf(ranges.category),
    axis: base.axis * unit * small * scaleOf(ranges.category),
  }
}

/* One label shape for every chart type: a value, a unit beside it, an optional
   white chip behind the pair, and — for slices, which have no axis to hang a
   name off — the category name underneath. */
function buildLabel(row, { withName = false, chip = true } = {}) {
  const sizes = valueFontSizes()
  const group = svg('g', { class: `label${chip ? ' has-chip' : ''}`, 'data-row': row.id }, labelLayer)
  const content = svg('g', { class: 'label-content' }, group)
  if (chip) svg('rect', { class: 'value-chip' }, content)
  const value = svg('text', {
    class: 'value', y: Math.round(sizes.value * .21), 'text-anchor': 'middle',
    'font-size': sizes.value, 'font-family': FONT_SOLEIL,
  }, content)
  svg('tspan', { class: 'value-number' }, value)
  svg('tspan', { class: 'unit', dx: 4 * unit, 'font-size': sizes.unit }, value)
  if (withName) {
    const name = svg('text', { class: 'slice-name', 'text-anchor': 'middle', 'font-size': sizes.category }, content)
    setLines(name, row.name, 0, `1.1em`)
  }
  return { group, content, value, number: value.querySelector('.value-number'), unit: value.querySelector('.unit') }
}

// SVG measures the rendered number and unit, so a longer value gets only the
// width it needs while the label stays centred on what it labels.
function resizeChip(node) {
  const chip = node.group.querySelector('.value-chip')
  const sizes = valueFontSizes()
  const name = node.group.querySelector('.slice-name')
  if (!chip) {
    // Without a chip there is no box to hang the name off, so it follows the
    // value's own line height instead.
    if (name) name.setAttribute('y', Math.ceil(sizes.value * .9) + Math.ceil(sizes.category * 1.1))
    return
  }
  const width = Math.ceil(node.value.getComputedTextLength() + 40 * unit * scaleOf(ranges.value))
  const height = Math.max(Math.ceil(60 * unit * scaleOf(ranges.value)), Math.ceil(Math.max(sizes.value, sizes.unit) * 1.58))
  chip.setAttribute('width', width)
  chip.setAttribute('x', -width / 2)
  chip.setAttribute('y', -Math.ceil(Math.max(sizes.value, sizes.unit) * .92))
  chip.setAttribute('height', height)
  chip.setAttribute('rx', height / 2)
  if (name) name.setAttribute('y', Number(chip.getAttribute('y')) + height + Math.ceil(sizes.category * 1.1))
}

function clearChart() {
  gridLayer.replaceChildren()
  axisLayer.replaceChildren()
  seriesLayer.replaceChildren()
  labelLayer.replaceChildren()
  nodes = new Map()
  frameGeometry = null
}

function rebuild() {
  layoutCopy()
  clearChart()
  if (!rows.length) return
  if (chartType === 'bar' || chartType === 'bar-h') buildBars()
  else if (chartType === 'line') buildLine()
  else buildPie()
  labelLayer.classList.toggle('is-draggable', chartType === 'pie' || chartType === 'donut')
  applyFrame(animationDuration())
  // Leaders are measured off the chips, which only have a size once a frame has
  // been applied.
  if (frameGeometry?.kind === 'pie') rows.forEach(placeSliceLabel)
}

/* --- bars -------------------------------------------------------------------
   Vertical and horizontal share every decision except which axis carries the
   values, so they share the builder and swap the two at the end. */
function buildBars() {
  const horizontal = chartType === 'bar-h' || (chartType === 'bar' && artboardSize.horizontalBars === true)
  const sizes = valueFontSizes()
  const values = rows.map(row => Number(row.value) || 0)
  const scale = niceTicks(Math.min(0, ...values), Math.max(0, ...values))
  const showAxis = axisValuesInput.checked
  const showGrid = gridInput.checked
  const gap = Number(ranges.barGap.input.value) / 100
  const radiusRatio = Number(ranges.barRadius.input.value) / 100

  // The gutters are measured from what will actually be drawn in them: the
  // widest axis number on one side, the longest category name on the other.
  const axisWidth = showAxis
    ? Math.max(...scale.ticks.map(tick => measureText(formatValue(tick), { size: sizes.axis, family: FONT_DM, weight: 500 }))) + 18 * unit
    : 0
  const nameWidth = Math.max(...rows.map(row => Math.max(...String(row.name).split('\n')
    .map(line => measureText(line, { size: sizes.category, family: FONT_SOLEIL, weight: 600, spacing: -.7 }))))) + 20 * unit
  const nameLines = Math.max(...rows.map(row => String(row.name).split('\n').length))
  const valueWidth = Math.max(...rows.map(row =>
    measureText(`${formatValue(row.value)} ${text.unit.value}`, { size: sizes.value, family: FONT_SOLEIL }))) + 34 * unit

  const area = { ...plot }
  if (horizontal) {
    area.x0 = plot.x0 + nameWidth
    area.x1 = plot.x1 - (valueStyleInput.value === 'none' ? 0 : valueWidth)
    if (showAxis) area.y1 = plot.y1 - sizes.axis * 1.6
  } else {
    area.x0 = plot.x0 + axisWidth
    area.y1 = plot.y1 - sizes.category * 1.25 * nameLines - 16 * unit
    // Room for the value label riding above the tallest bar.
    if (valueStyleInput.value !== 'none') area.y0 += 44 * unit * scaleOf(ranges.value)
  }

  // The gutters are measured off text, which does not shrink with the plot, so
  // a small enough chart would otherwise invert the drawing area.
  area.x1 = Math.max(area.x1, area.x0 + 1)
  area.y1 = Math.max(area.y1, area.y0 + 1)

  const span = scale.max - scale.min || 1
  const across = horizontal ? area.y1 - area.y0 : area.x1 - area.x0
  const along = horizontal ? area.x1 - area.x0 : area.y1 - area.y0
  const positionOf = value => horizontal
    ? area.x0 + ((value - scale.min) / span) * along
    : area.y1 - ((value - scale.min) / span) * along
  const zero = positionOf(clamp(0, scale.min, scale.max))

  if (showGrid) {
    scale.ticks.forEach(tick => {
      const at = positionOf(tick)
      svg('line', {
        class: tick === 0 ? 'zero-line' : null,
        'stroke-width': 2 * unit,
        x1: horizontal ? at : area.x0, x2: horizontal ? at : area.x1,
        y1: horizontal ? area.y0 : at, y2: horizontal ? area.y1 : at,
      }, gridLayer)
    })
  }
  if (showAxis) {
    scale.ticks.forEach(tick => {
      const at = positionOf(tick)
      const node = svg('text', {
        'font-size': sizes.axis, 'font-family': FONT_DM,
        'text-anchor': horizontal ? 'middle' : 'end',
        x: horizontal ? at : area.x0 - 14 * unit,
        y: horizontal ? area.y1 + sizes.axis * 1.4 : at + sizes.axis * .36,
      }, axisLayer)
      node.textContent = formatValue(tick)
    })
  }

  const slot = across / rows.length
  const thickness = slot * (1 - gap)
  const geometry = new Map()

  rows.forEach((row, index) => {
    const value = Number(row.value) || 0
    const center = (horizontal ? area.y0 : area.x0) + slot * index + slot / 2
    const end = positionOf(value)
    const color = colorForRow(row, index)
    const radius = Math.min(thickness * radiusRatio, Math.abs(end - zero) || 0)

    const rect = svg('rect', {
      fill: color, rx: radius, ry: radius,
      x: horizontal ? Math.min(zero, end) : center - thickness / 2,
      y: horizontal ? center - thickness / 2 : Math.min(zero, end),
      width: horizontal ? Math.abs(end - zero) : thickness,
      height: horizontal ? thickness : Math.abs(end - zero),
    }, seriesLayer)

    const name = svg('text', {
      class: 'category-name', 'font-size': sizes.category, 'font-family': FONT_SOLEIL,
      'text-anchor': horizontal ? 'end' : 'middle',
      x: horizontal ? area.x0 - 20 * unit : center,
      y: horizontal ? center + sizes.category * .34 : area.y1 + sizes.category * 1.1 + 16 * unit,
    }, axisLayer)
    setLines(name, row.name, Number(name.getAttribute('x')), `${sizes.category * 1.15}px`)

    const node = valueStyleInput.value === 'none'
      ? null
      : buildLabel(row, { chip: valueStyleInput.value === 'chip' })
    if (node) nodes.set(row.id, node)

    geometry.set(row.id, { rect, center, zero, end, value, negative: value < 0, color, thickness })
  })

  frameGeometry = { kind: 'bars', horizontal, zero, geometry, sizes }
}

/* --- line -------------------------------------------------------------------
   Points are spread across the full width rather than sitting in slots: a line
   chart is read as a continuous run, and a half-slot of dead air at each end
   makes the first and last readings look like they happened off-frame. */
function buildLine() {
  const sizes = valueFontSizes()
  const values = rows.map(row => Number(row.value) || 0)
  const scale = niceTicks(Math.min(...values), Math.max(...values))
  const showGrid = gridInput.checked
  const strokeWidth = 9 * unit * (Number(ranges.lineWidth.input.value) / 100)

  const axisWidth = Math.max(...scale.ticks.map(tick =>
    measureText(formatValue(tick), { size: sizes.axis, family: FONT_DM, weight: 500 }))) + 18 * unit
  const nameLines = Math.max(...rows.map(row => String(row.name).split('\n').length))

  const area = { ...plot }
  area.x0 = plot.x0 + axisWidth
  area.y1 = plot.y1 - sizes.category * 1.25 * nameLines - 16 * unit
  if (valueStyleInput.value !== 'none') area.y0 += 46 * unit * scaleOf(ranges.value)
  // The first and last labels hang over the ends of the line, so the plot is
  // inset by half of one rather than letting them run off the artboard.
  const overhang = Math.max(...rows.map(row =>
    measureText(`${formatValue(row.value)} ${text.unit.value}`, { size: sizes.value, family: FONT_SOLEIL }))) / 2 + 22 * unit
  area.x0 += Math.min(overhang, (area.x1 - area.x0) * .12)
  area.x1 -= Math.min(overhang, (area.x1 - area.x0) * .12)

  area.x1 = Math.max(area.x1, area.x0 + 1)
  area.y1 = Math.max(area.y1, area.y0 + 1)

  const span = scale.max - scale.min || 1
  const yOf = value => area.y1 - ((value - scale.min) / span) * (area.y1 - area.y0)

  // The two are separate switches everywhere else, and a line chart is no
  // different: the numbers can stay after the rules are turned off.
  scale.ticks.forEach(tick => {
    if (showGrid) {
      svg('line', { 'stroke-width': 2 * unit, x1: plot.x0 + axisWidth, x2: area.x1 + overhang * .4, y1: yOf(tick), y2: yOf(tick) }, gridLayer)
    }
    if (!axisValuesInput.checked) return
    const node = svg('text', {
      'font-size': sizes.axis, 'font-family': FONT_DM, 'text-anchor': 'end',
      x: plot.x0 + axisWidth - 14 * unit, y: yOf(tick) + sizes.axis * .36,
    }, axisLayer)
    node.textContent = formatValue(tick)
  })

  const step = rows.length > 1 ? (area.x1 - area.x0) / (rows.length - 1) : 0
  const points = rows.map((row, index) => ({
    x: rows.length > 1 ? area.x0 + step * index : (area.x0 + area.x1) / 2,
    y: yOf(Number(row.value) || 0),
  }))

  const d = curveInput.value === 'smooth' ? smoothPath(points) : points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ')

  let areaPath = null
  let clipRect = null
  if (areaInput.checked) {
    const clipId = 'line-area-clip'
    const defs = svg('defs', {}, seriesLayer)
    const clip = svg('clipPath', { id: clipId }, defs)
    clipRect = svg('rect', { x: area.x0 - overhang, y: plot.y0 - overhang, width: (area.x1 - area.x0) + overhang * 2, height: (area.y1 - plot.y0) + overhang * 2 }, clip)
    areaPath = svg('path', {
      d: `${d} L${points[points.length - 1].x} ${area.y1} L${points[0].x} ${area.y1} Z`,
      fill: activeColorScheme.high, 'fill-opacity': .12, 'clip-path': `url(#${clipId})`,
    }, seriesLayer)
  }

  const path = svg('path', {
    d, fill: 'none', stroke: activeColorScheme.high, 'stroke-width': strokeWidth,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, seriesLayer)

  // Cumulative length per point, measured off the real path so a smooth curve
  // is timed by the distance the stroke actually travels.
  const ruler = svg('path', { d: '' })
  measureSvg.appendChild(ruler)
  const cumulative = points.map((_, index) => {
    if (!index) return 0
    const slice = points.slice(0, index + 1)
    ruler.setAttribute('d', curveInput.value === 'smooth' ? smoothPath(slice) : slice.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '))
    return ruler.getTotalLength()
  })
  const totalLength = cumulative[cumulative.length - 1] || 1
  ruler.remove()
  path.setAttribute('stroke-dasharray', totalLength)

  /* A narrow artboard has more labels than room: twelve chips side by side need
     more width than a phone has, and numbers printed over numbers are worse than
     numbers left out. So labels are placed by priority — the latest reading
     first, because a trend is read to its end, then the first, the peak and the
     low, then the rest left to right — and one that would land on a label
     already placed is not drawn. Its point stays; only the number goes. Where
     there is room nothing is dropped. Category names get the same treatment
     along the axis, anchored on the last one. */
  const valueScale = scaleOf(ranges.value)
  const labelUnit = text.unit.value ? ` ${text.unit.value}` : ''
  const labelBoxes = rows.map((row, index) => ({
    x: points[index].x,
    y: points[index].y - 34 * unit * valueScale,
    // Measured the way the chip is built: number and unit at their own sizes and
    // letter-spacing, the gap between them, and the chip's padding.
    w: measureText(formatValue(row.value), { size: sizes.value, family: FONT_SOLEIL, spacing: -2 })
      + measureText(labelUnit, { size: sizes.unit, family: FONT_DM, weight: 700, spacing: -1 })
      + 4 * unit + 40 * unit * valueScale,
    h: Math.max(60 * unit * valueScale, Math.max(sizes.value, sizes.unit) * 1.58),
  }))
  const ranked = rows.map((_, index) => index).sort((a, b) => values[b] - values[a])
  const priority = [rows.length - 1, 0, ranked[0], ranked[ranked.length - 1], ...rows.map((_, index) => index)]
  const placed = []
  const keepLabel = new Set()
  priority.forEach(index => {
    if (keepLabel.has(index)) return
    const box = labelBoxes[index]
    const collides = placed.some(other =>
      Math.abs(other.x - box.x) < (other.w + box.w) / 2 + 4 * unit &&
      Math.abs(other.y - box.y) < (other.h + box.h) / 2)
    if (collides) return
    placed.push(box)
    keepLabel.add(index)
  })

  const nameWidths = rows.map(row => Math.max(...String(row.name).split('\n')
    .map(line => measureText(line, { size: sizes.category, family: FONT_SOLEIL, weight: 600, spacing: -.7 }))))
  const namesClear = (a, b) => Math.abs(points[a].x - points[b].x) >= (nameWidths[a] + nameWidths[b]) / 2 + 16 * unit
  const lastIndex = rows.length - 1
  const keepName = new Set([lastIndex])
  let previousName = null
  rows.forEach((_, index) => {
    if (index === lastIndex) return
    if (previousName !== null && !namesClear(index, previousName)) return
    if (!namesClear(index, lastIndex)) return
    keepName.add(index)
    previousName = index
  })

  const geometry = new Map()
  rows.forEach((row, index) => {
    const point = points[index]
    const dot = dotsInput.checked
      ? svg('circle', { cx: point.x, cy: point.y, r: strokeWidth * .78, fill: '#fff', stroke: activeColorScheme.high, 'stroke-width': strokeWidth * .58 }, seriesLayer)
      : null

    if (keepName.has(index)) {
      const name = svg('text', {
        class: 'category-name', 'font-size': sizes.category, 'font-family': FONT_SOLEIL, 'text-anchor': 'middle',
        x: point.x, y: area.y1 + sizes.category * 1.1 + 16 * unit,
      }, axisLayer)
      setLines(name, row.name, point.x, `${sizes.category * 1.15}px`)
    }

    const node = valueStyleInput.value === 'none' || !keepLabel.has(index)
      ? null
      : buildLabel(row, { chip: valueStyleInput.value === 'chip' })
    if (node) {
      node.group.setAttribute('transform', `translate(${point.x} ${point.y - 34 * unit * scaleOf(ranges.value)})`)
      nodes.set(row.id, node)
    }
    geometry.set(row.id, { point, dot, index, dotRadius: strokeWidth * .78 })
  })

  frameGeometry = { kind: 'line', path, areaPath, clipRect, points, cumulative, totalLength, geometry, sizes, area }
}

// Catmull-Rom through the points, converted to the cubic segments SVG speaks.
function smoothPath(points) {
  if (points.length < 3) return points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ')
  let d = `M${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const previous = points[i - 1] || points[i]
    const current = points[i]
    const next = points[i + 1]
    const after = points[i + 2] || next
    d += ` C${current.x + (next.x - previous.x) / 6} ${current.y + (next.y - previous.y) / 6}` +
         ` ${next.x - (after.x - current.x) / 6} ${next.y - (after.y - current.y) / 6}` +
         ` ${next.x} ${next.y}`
  }
  return d
}

/* --- pie and donut ----------------------------------------------------------
   Both are drawn as arcs stroked onto one circle: stroke width r and radius r/2
   fill the whole disc, a narrower stroke leaves a hole. It costs nothing in
   fidelity and buys a sweep that is a single dash length — which is what makes
   the same animation expressible in a CSS keyframe for the embedded SVG, where
   no script runs and an arc path could not be recomputed. */
function buildPie() {
  const sizes = valueFontSizes()
  const donut = chartType === 'donut'
  const total = rows.reduce((sum, row) => sum + Math.max(0, Number(row.value) || 0), 0)
  const sliceGap = Number(ranges.sliceGap.input.value) * unit
  const shares = rows.map(row => (total > 0 ? Math.max(0, Number(row.value) || 0) / total : 1 / rows.length))
  // A slice under this share cannot hold a chip, so its label goes outside —
  // and the moment any label does, the pie shrinks to make room for it.
  const outsideThreshold = .075
  const anyOutside = shares.some(share => share < outsideThreshold)

  const available = Math.min(plot.x1 - plot.x0, plot.y1 - plot.y0)
  const rOuter = available / 2 * (anyOutside ? .8 : .94)
  const cx = (plot.x0 + plot.x1) / 2
  const cy = (plot.y0 + plot.y1) / 2
  const strokeWidth = donut ? rOuter * (Number(ranges.donutThickness.input.value) / 100) : rOuter
  const rMid = rOuter - strokeWidth / 2
  const circumference = 2 * Math.PI * rMid

  const group = svg('g', { transform: `rotate(-90 ${cx} ${cy})` }, seriesLayer)   // start at twelve o'clock
  const geometry = new Map()
  let offset = 0

  rows.forEach((row, index) => {
    const share = shares[index]
    const length = share * circumference
    const color = colorForRow(row, index)
    const arc = svg('circle', {
      cx, cy, r: rMid, fill: 'none', stroke: color, 'stroke-width': strokeWidth,
      'stroke-dasharray': `0 ${circumference}`, 'stroke-dashoffset': -offset,
    }, group)

    const middle = (offset + share * circumference / 2) / circumference * Math.PI * 2
    const outside = share < outsideThreshold
    const labelRadius = outside ? rOuter + 52 * unit : (donut ? rMid : rOuter * .62)
    const baseX = cx + Math.sin(middle) * labelRadius
    const baseY = cy - Math.cos(middle) * labelRadius
    const x = baseX + (row.labelDx || 0) * unit
    const y = baseY + (row.labelDy || 0) * unit

    const hideValue = valueStyleInput.value === 'none'
    const node = buildLabel(row, { withName: true, chip: !hideValue && (valueStyleInput.value === 'chip' || outside) })
    node.group.setAttribute('transform', `translate(${x} ${y})`)
    // A plain label inside a slice has to survive whatever colour it lands on.
    if (valueStyleInput.value !== 'chip' && !outside && isDark(color)) {
      node.value.setAttribute('fill', '#fff')
      node.group.querySelector('.slice-name').setAttribute('fill', 'rgba(255,255,255,.86)')
    }
    if (hideValue) node.value.setAttribute('display', 'none')
    nodes.set(row.id, node)

    // Every slice gets a leader, drawn or not depending on where its label ends
    // up. A dragged label is no different from one the layout pushed out: both
    // need the line the moment they stop sitting on their own slice.
    const leader = svg('path', { class: 'leader', 'stroke-width': 2 * unit, d: '' }, axisLayer)

    geometry.set(row.id, { arc, length, offset, leader, baseX, baseY, middle })
    offset += share * circumference
  })

  /* A dash gap is a constant *angle*, so on a full pie it opens from nothing at
     the centre to a wedge at the rim — which is what this used to look like.
     The slices therefore meet edge to edge now and the gap is cut on top
     afterwards: a radial line in the artboard's own white, one per boundary,
     whose stroke width is the gap. Same width at every radius, and centred on
     the boundary rather than taken off the end of each slice.

     Nothing about it needs to animate. It is white on white until a slice is
     drawn underneath it, so it can be laid down once and left alone — which
     also keeps it out of the sweep's way in the embedded SVG. */
  if (sliceGap > 0 && rows.length > 1) {
    const separators = svg('g', {}, seriesLayer)
    const inner = donut ? rOuter - strokeWidth : 0
    let boundary = 0
    rows.forEach((row, index) => {
      const angle = boundary / circumference * Math.PI * 2
      svg('line', {
        stroke: '#fff', 'stroke-width': sliceGap, 'stroke-linecap': 'butt',
        x1: cx + Math.sin(angle) * inner, y1: cy - Math.cos(angle) * inner,
        x2: cx + Math.sin(angle) * rOuter, y2: cy - Math.cos(angle) * rOuter,
      }, separators)
      boundary += shares[index] * circumference
    })
  }

  let center = null
  if (donut && centerTotalInput.checked) {
    const totalSize = Math.min(rMid * .62, base.value * unit * 1.5 * scaleOf(ranges.value))
    const group = svg('g', { class: 'center-total' }, labelLayer)
    const value = svg('text', { class: 'total-value', 'text-anchor': 'middle', 'font-size': totalSize, y: totalSize * .2 }, group)
    const caption = svg('text', { class: 'total-caption', 'text-anchor': 'middle', 'font-size': totalSize * .26, y: totalSize * .78 }, group)
    caption.textContent = 'TOTAL'
    group.setAttribute('transform', `translate(${cx} ${cy})`)
    center = { value, total }
  }

  frameGeometry = { kind: 'pie', geometry, circumference, center, sizes, cx, cy, rOuter, timing: pieTiming() }
}

function placeSliceLabel(row) {
  if (frameGeometry?.kind !== 'pie') return
  const geometry = frameGeometry.geometry.get(row.id)
  const node = nodes.get(row.id)
  if (!geometry || !node) return
  const { cx, cy, rOuter } = frameGeometry
  const x = geometry.baseX + (row.labelDx || 0) * unit
  const y = geometry.baseY + (row.labelDy || 0) * unit
  node.group.setAttribute('transform', `translate(${x} ${y})`)
  if (!geometry.leader) return

  // The line runs from the slice's own edge, not from wherever the label was
  // dragged to — it is there to say which slice this is, and a ray through the
  // centre would point at the wrong one as soon as a label moved sideways.
  const startX = cx + Math.sin(geometry.middle) * (rOuter + 6 * unit)
  const startY = cy - Math.cos(geometry.middle) * (rOuter + 6 * unit)
  const chip = node.group.querySelector('.value-chip')
  const pull = (chip ? Number(chip.getAttribute('height')) / 2 : 22 * unit) + 10 * unit
  const distance = Math.hypot(x - startX, y - startY)
  // No line while the label still sits on the pie, and none for a gap too short
  // to read as a line rather than as a smudge against the chip.
  if (Math.hypot(x - cx, y - cy) < rOuter || distance < pull + 16 * unit) {
    geometry.leader.setAttribute('d', '')
    return
  }
  const endX = startX + (x - startX) * ((distance - pull) / distance)
  const endY = startY + (y - startY) * ((distance - pull) / distance)
  geometry.leader.setAttribute('d', `M${startX} ${startY} L${endX} ${endY}`)
}

// --- the animation as a function of time -------------------------------------
function applyFrame(t) {
  if (!frameGeometry) return
  const unitText = text.unit.value ? ` ${text.unit.value}` : ''

  if (frameGeometry.kind === 'line') {
    // One stroke carries every point, so the path's own progress is the sum of
    // what each segment has drawn — which keeps per-row delays meaningful.
    const { points, cumulative, totalLength, path, areaPath, clipRect } = frameGeometry
    let drawn = 0
    let leadX = points[0].x
    for (let index = 1; index < points.length; index += 1) {
      const segment = cumulative[index] - cumulative[index - 1]
      const progress = rowProgress(rows[index], t).grow
      drawn += segment * progress
      if (progress > 0) leadX = points[index - 1].x + (points[index].x - points[index - 1].x) * progress
    }
    // Nothing is drawn before the first point's delay, and after it the stroke
    // needs a visible head even where the first segment has not started.
    const started = rowProgress(rows[0], t).grow > 0
    path.setAttribute('stroke-dashoffset', started ? totalLength - drawn : totalLength)
    if (areaPath && clipRect) {
      const anchor = points[0].x
      const right = Number(clipRect.getAttribute('x')) + Number(clipRect.getAttribute('width'))
      const scale = started ? clamp((leadX - anchor) / (right - anchor || 1), 0.0001, 1) : 0.0001
      clipRect.setAttribute('transform', `translate(${anchor} 0) scale(${scale} 1) translate(${-anchor} 0)`)
      areaPath.setAttribute('fill-opacity', started ? .12 : 0)
    }
  }

  // How far the pen has travelled, for the pie types. Each slice draws the part
  // of that distance which falls inside its own arc, so the stroke never stops
  // and never doubles up at a boundary.
  const swept = frameGeometry.kind === 'pie'
    ? clamp(t / frameGeometry.timing.sweep, 0, 1) * frameGeometry.circumference
    : 0

  rows.forEach((row, index) => {
    const geometry = frameGeometry.geometry.get(row.id)
    if (!geometry) return
    const { grow, appear, counted } = frameGeometry.kind === 'pie'
      ? sliceProgress(index, t)
      : rowProgress(row, t)
    const node = nodes.get(row.id)
    const value = Number(row.value) || 0

    if (frameGeometry.kind === 'bars') {
      const { rect, center, zero, end } = geometry
      const tip = zero + (end - zero) * grow
      const size = Math.abs(tip - zero)
      if (frameGeometry.horizontal) {
        rect.setAttribute('x', Math.min(zero, tip))
        rect.setAttribute('width', size)
      } else {
        rect.setAttribute('y', Math.min(zero, tip))
        rect.setAttribute('height', size)
      }
      if (node) {
        const away = (value < 0 ? -1 : 1) * (34 * unit * scaleOf(ranges.value))
        node.group.setAttribute('transform', frameGeometry.horizontal
          ? `translate(${tip + away + 14 * unit} ${center + frameGeometry.sizes.value * .1})`
          : `translate(${center} ${tip - away})`)
      }
    } else if (frameGeometry.kind === 'line') {
      const { point, dot, dotRadius } = geometry
      if (dot) {
        dot.setAttribute('r', dotRadius * appear)
        dot.setAttribute('opacity', appear)
      }
      if (node) node.group.setAttribute('transform', `translate(${point.x} ${point.y - 34 * unit * scaleOf(ranges.value)})`)
    } else {
      const { arc, length, offset } = geometry
      arc.setAttribute('stroke-dasharray', `${clamp(swept - offset, 0, length)} ${frameGeometry.circumference}`)
      if (geometry.leader) geometry.leader.setAttribute('opacity', appear)
      void grow
    }

    if (node) {
      node.group.classList.toggle('is-visible', appear > 0)
      node.content.style.cssText = `opacity:${appear};transform:translateY(${(1 - appear) * 4 * unit}px)`
      node.number.textContent = formatValue(value * counted)
      node.unit.textContent = unitText
      resizeChip(node)
    }
  })

  if (frameGeometry.kind === 'pie' && frameGeometry.center) {
    // The total counts up with the slice that finishes last, so the number in
    // the middle lands with the ring rather than ahead of it.
    const counted = rows.reduce((slowest, row, index) => Math.min(slowest, sliceProgress(index, t).counted), 1)
    frameGeometry.center.value.textContent = `${formatValue(frameGeometry.center.total * counted)}${unitText}`
  }
}

function wait(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

let runId = 0

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

// --- export ------------------------------------------------------------------
// A rasterised SVG is an isolated document: no external stylesheet, no webfont
// fetch, no access to the page it came from. Whatever the export needs has to
// travel inside the file, which is why the styles are inlined and the fonts are
// carried as base64 rather than referenced.
const EXPORT_FONTS = [
  { family: 'Soleil', weight: 400, file: 'soleil-book.otf', format: 'opentype', mime: 'font/otf' },
  { family: 'Soleil', weight: 600, file: 'soleil-600.woff2' },
  { family: 'Soleil', weight: 700, file: 'soleil-700.woff2' },
  { family: 'DM Sans', weight: 400, file: 'dmsans-400.woff2' },
  { family: 'DM Sans', weight: 700, file: 'dmsans-700.woff2' },
  { family: 'DM Mono', weight: 500, file: 'dmmono-500.woff2' },
]
const EXPORT_STYLE_PROPS = [
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-linejoin',
  'stroke-linecap', 'stroke-opacity', 'opacity', 'font-family', 'font-size', 'font-weight',
  'font-style', 'letter-spacing', 'font-variant-numeric', 'font-feature-settings',
  'text-anchor', 'filter',
]
const exportStatus = document.querySelector('#export-status')
const exportScaleInput = document.querySelector('#export-scale-input')
const exportCustom = document.querySelector('#export-custom')
const exportWidthInput = document.querySelector('#export-width-input')
const exportHeightOutput = document.querySelector('#export-height-output')
let embeddedFontCss = null

async function fontCss() {
  if (embeddedFontCss) return embeddedFontCss
  const faces = await Promise.all(EXPORT_FONTS.map(async face => {
    const bytes = new Uint8Array(await (await fetch(`assets/fonts/${face.file}`)).arrayBuffer())
    let binary = ''
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
    return `@font-face{font-family:'${face.family}';font-style:normal;font-weight:${face.weight};` +
           `src:url(data:${face.mime || 'font/woff2'};base64,${btoa(binary)}) format('${face.format || 'woff2'}');}`
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
    .filter(([, value]) => value && value !== 'none')
    .map(([prop, value]) => `${prop}:${value}`)
  if (declarations.length) clone.setAttribute('style', declarations.join(';'))
  for (let i = 0; i < source.children.length; i += 1) {
    inlineStyles(source.children[i], clone.children[i])
  }
}

// Serialises whatever the artboard shows right now, mid-animation or not.
async function buildFrameSvg() {
  const clone = artboard.cloneNode(true)
  clone.setAttribute('xmlns', SVG_NS)
  clone.setAttribute('width', artboardSize.w)
  clone.setAttribute('height', artboardSize.h)
  inlineStyles(artboard, clone)
  const style = document.createElementNS(SVG_NS, 'style')
  style.textContent = await fontCss()
  clone.insertBefore(style, clone.firstChild)   // after inlining, so indices stayed aligned
  return new XMLSerializer().serializeToString(clone)
}

/* The aspect ratio belongs to the artboard, which is not always 16:9. So a
   custom size asks for a width and derives the height, rather than letting the
   two be set independently and quietly distort the chart. */
function exportDimensions() {
  if (exportScaleInput.value === 'custom') {
    const requested = Math.round(Number(exportWidthInput.value) || artboardSize.w)
    const width = clamp(requested, 200, 8000)
    return { w: width, h: Math.round(width * artboardSize.h / artboardSize.w) }
  }
  const scale = Number(exportScaleInput.value) || 1
  return { w: Math.round(artboardSize.w * scale), h: Math.round(artboardSize.h * scale) }
}

function syncExportSize() {
  const custom = exportScaleInput.value === 'custom'
  exportCustom.hidden = !custom
  const { w, h } = exportDimensions()
  exportHeightOutput.textContent = `× ${h}`
  if (custom && Number(exportWidthInput.value) !== w) exportWidthInput.value = w
}

async function rasterize(markup, width, height, type, quality) {
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const image = new Image()
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = () => reject(new Error('the SVG could not be rendered'))
      image.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
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
  const slug = (text.title.value || 'animated-chart')
    .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').slice(0, 60)
  return `${slug || 'animated-chart'}.${extension}`
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
    if (format === 'svg') {
      applyFrame(animationDuration())              // a still shows the finished chart
      saveBlob(new Blob([await buildFrameSvg()], { type: 'image/svg+xml;charset=utf-8' }), exportFileName('svg'))
    } else if (format === 'embed') {
      await fontCss()
      saveBlob(new Blob([buildEmbedSvg()], { type: 'image/svg+xml;charset=utf-8' }), exportFileName('animated.svg'))
      rebuild()                                    // the embed rewrites the live DOM
    } else if (format === 'web') {
      await fontCss()
      saveBlob(await buildWebBundle(), exportFileName('web.zip'))
    } else if (format === 'mp4') {
      saveBlob(await exportVideo(), exportFileName('mp4'))
    } else {
      applyFrame(animationDuration())
      const { w, h } = exportDimensions()
      const type = format === 'jpg' ? 'image/jpeg' : 'image/png'
      const blob = await rasterize(await buildFrameSvg(), w, h, type, format === 'jpg' ? 0.92 : undefined)
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

// --- video -------------------------------------------------------------------
// Chrome and Safari both record H.264 in an MP4 container directly, so no muxer
// is vendored. captureStream(0) hands frame timing over: nothing is captured
// until requestFrame() is called, so the recorder sees exactly the frames
// applyFrame produced and never samples a half-drawn canvas.
const VIDEO_FPS = 30
const VIDEO_TAIL_MS = 700          // hold the finished chart before cutting

// avc3 is preferred over avc1 deliberately: with avc1 the codec description
// lives in the container header and may not change for the length of the
// recording, and a mid-recording encoder reconfiguration then writes a subtly
// malformed file. avc3 carries its parameter sets in-band.
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

  // H.264 encodes in 2x2 blocks, so an odd canvas dimension gets silently
  // rounded down and the last row or column never makes it into the file. Pad
  // up to even and leave the extra strip background.
  const { w: drawWidth, h: drawHeight } = exportDimensions()
  const canvas = document.createElement('canvas')
  canvas.width = drawWidth + drawWidth % 2
  canvas.height = drawHeight + drawHeight % 2
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const stream = canvas.captureStream(0)
  const [track] = stream.getVideoTracks()
  const chunks = []
  const pixelRatio = (canvas.width * canvas.height) / (1920 * 1080)
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: Math.round(clamp(16 * pixelRatio, 4, 48) * 1000000),
  })
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
      context.drawImage(image, 0, 0, drawWidth, drawHeight)
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
// scripted — each value is pre-rendered as a stack of texts and one is revealed
// at a time.
const EMBED_STEPS = 20
const EMBED_SAMPLES = 24

function buildEmbedSvg() {
  const duration = animationDuration()
  applyFrame(duration)                      // the final state supplies geometry and colour
  const clone = artboard.cloneNode(true)
  clone.setAttribute('xmlns', SVG_NS)
  /* The embed carries a viewBox and nothing else — no width, no height. With
     them the file has an intrinsic size of 1920 x 1080 and overflows anything
     that does not size it in CSS: an inline <svg>, or an <img> dropped in bare.
     Without them it takes the width of whatever holds it and keeps the
     viewBox's proportions, whichever way the page embeds it. The still SVG
     keeps its size, because it goes to design tools rather than to a page. */
  inlineStyles(artboard, clone)

  const keyframes = ['@keyframes label-appear{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hold{from{opacity:1}to{opacity:1}}']
  const append = (node, css) => node.setAttribute('style', `${node.getAttribute('style') || ''};${css}`)

  // A sampled keyframe is how a per-row delay survives the trip into CSS: the
  // property is read back out of the same applyFrame the preview uses, at
  // EMBED_SAMPLES points across the timeline, and written as percentage stops.
  const sampled = (name, property, read) => {
    const stops = []
    for (let step = 0; step <= EMBED_SAMPLES; step += 1) {
      const at = step / EMBED_SAMPLES
      applyFrame(at * duration)
      stops.push(`${Math.round(at * 100)}%{${property}:${read()}}`)
    }
    applyFrame(duration)
    keyframes.push(`@keyframes ${name}{${stops.join('')}}`)
    return `animation:${name} ${duration}ms linear forwards`
  }

  rows.forEach((row, index) => {
    const geometry = frameGeometry.geometry.get(row.id)
    if (!geometry) return
    // The pie types run off the sweep, not off the row's own delay.
    const delay = frameGeometry.kind === 'pie'
      ? frameGeometry.timing.labelStarts[index]
      : Number(row.delay) || 0

    if (frameGeometry.kind === 'bars') {
      const bar = clone.querySelectorAll('#chart-series rect')[index]
      const grows = frameGeometry.horizontal ? 'scaleX' : 'scaleY'
      const origin = frameGeometry.horizontal
        ? (geometry.end < geometry.zero ? 'right center' : 'left center')
        : (geometry.value < 0 ? 'center top' : 'center bottom')
      if (bar) {
        append(bar, `transform-box:fill-box;transform-origin:${origin};` +
          `animation:bar-grow ${TIMING.grow}ms ${delay}ms ${GROW_BEZIER} backwards`)
      }
      const label = clone.querySelectorAll('#chart-labels .label')[labelIndex(index)]
      if (label) {
        // The label rides the bar's tip, and a CSS transform replaces the
        // element's transform attribute outright — so the whole translate has
        // to be written into the keyframe, not just the part that moves.
        const from = transformAt(row, 0)
        const to = transformAt(row, duration)
        keyframes.push(`@keyframes bar-label-${index}{from{transform:${from}}to{transform:${to}}}`)
        append(label, `transform:${to};animation:bar-label-${index} ${TIMING.grow}ms ${delay}ms ${GROW_BEZIER} backwards`)
      }
    } else if (frameGeometry.kind === 'pie') {
      const arc = clone.querySelectorAll('#chart-series circle')[index]
      if (arc) {
        // Start and duration come off the same pen the preview uses: a slice
        // occupies the stretch of the sweep between its own offset and its end,
        // and it is linear for the same reason it is linear on screen.
        const { sweep } = frameGeometry.timing
        const start = geometry.offset / frameGeometry.circumference * sweep
        const duration = geometry.length / frameGeometry.circumference * sweep
        append(arc, `animation:slice-${index} ${duration}ms ${start}ms linear backwards`)
        keyframes.push(`@keyframes slice-${index}{from{stroke-dasharray:0 ${frameGeometry.circumference}}` +
          `to{stroke-dasharray:${geometry.length} ${frameGeometry.circumference}}}`)
      }
    } else if (frameGeometry.kind === 'line' && geometry.dot) {
      const dot = clone.querySelectorAll('#chart-series circle')[index]
      if (dot) {
        append(dot, `transform-box:fill-box;transform-origin:center;` +
          `animation:dot-pop ${TIMING.label}ms ${delay}ms ease backwards`)
      }
    }

    const label = clone.querySelectorAll('#chart-labels .label')[labelIndex(index)]
    const content = label?.querySelector('.label-content')
    if (content) {
      append(content, `opacity:1;transform-box:fill-box;transform-origin:center;` +
        `animation:label-appear ${TIMING.label}ms ${delay}ms ease backwards`)
    }
    if (label) buildEmbedCounter(label, row, delay)
  })

  if (frameGeometry.kind === 'line') {
    const path = clone.querySelector('#chart-series path:not(.leader)')
    const strokePath = Array.from(clone.querySelectorAll('#chart-series path'))
      .find(candidate => candidate.getAttribute('stroke-dasharray'))
    const target = strokePath || path
    if (target) {
      append(target, sampled('line-draw', 'stroke-dashoffset',
        () => frameGeometry.path.getAttribute('stroke-dashoffset')))
    }
    const clipRect = clone.querySelector('#chart-series clipPath rect')
    if (clipRect) {
      append(clipRect, sampled('area-draw', 'transform',
        () => frameGeometry.clipRect.getAttribute('transform')))
    }
    keyframes.push('@keyframes dot-pop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}')
  }

  if (frameGeometry.kind === 'pie' && frameGeometry.center) {
    const totalNode = clone.querySelector('.center-total .total-value')
    if (totalNode) buildEmbedTotal(totalNode, frameGeometry.center.total, duration)
  }

  if (frameGeometry.kind === 'bars') {
    keyframes.push(frameGeometry.horizontal
      ? '@keyframes bar-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}'
      : '@keyframes bar-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}')
  }

  const style = document.createElementNS(SVG_NS, 'style')
  style.textContent = embeddedFontCss + keyframes.join('')
  clone.insertBefore(style, clone.firstChild)
  return new XMLSerializer().serializeToString(clone)
}

// Labels are only built for rows that have one, so the index into the DOM is
// not the index into the data whenever a value label is switched off.
function labelIndex(rowIndex) {
  let count = 0
  for (let i = 0; i < rowIndex; i += 1) if (nodes.has(rows[i].id)) count += 1
  return nodes.has(rows[rowIndex].id) ? count : -1
}

function transformAt(row, t) {
  applyFrame(t)
  const node = nodes.get(row.id)
  const transform = node?.group.getAttribute('transform') || 'translate(0 0)'
  const [x, y] = transform.match(/-?[\d.]+/g).map(Number)
  return `translate(${x}px, ${y}px)`
}

/* CSS cannot count, so each value is pre-rendered as a stack of texts and one
   is revealed at a time. Stacking tspans inside a single <text> does not work:
   they lay out horizontally, and opacity:0 hides a tspan without taking it out
   of the line, so twenty invisible numbers drag the visible one aside. */
function buildEmbedCounter(label, row, delay) {
  const valueText = label.querySelector('.value')
  if (!valueText) return
  const step = TIMING.counter / EMBED_STEPS
  const unitText = text.unit.value ? ` ${text.unit.value}` : ''
  for (let i = 0; i < EMBED_STEPS; i += 1) {
    const frameText = valueText.cloneNode(true)
    const progress = easeCount((i + 1) / EMBED_STEPS)
    frameText.querySelector('.value-number').textContent = formatValue((Number(row.value) || 0) * progress)
    frameText.querySelector('.unit').textContent = unitText
    const last = i === EMBED_STEPS - 1
    // fill-mode must stay none for every step but the last: 'both' would apply
    // the keyframe's opacity outside the window too, leaving all twenty numbers
    // on screen at once.
    frameText.setAttribute('style', `${valueText.getAttribute('style') || ''};opacity:0;` +
      `animation:hold ${step}ms ${delay + i * step}ms linear ${last ? 'forwards' : ''}`)
    valueText.parentNode.insertBefore(frameText, valueText)
  }
  valueText.remove()
}

function buildEmbedTotal(totalNode, total, duration) {
  const step = duration / EMBED_STEPS
  const unitText = text.unit.value ? ` ${text.unit.value}` : ''
  for (let i = 0; i < EMBED_STEPS; i += 1) {
    const frameText = totalNode.cloneNode(true)
    frameText.textContent = `${formatValue(total * easeCount((i + 1) / EMBED_STEPS))}${unitText}`
    const last = i === EMBED_STEPS - 1
    frameText.setAttribute('style', `${totalNode.getAttribute('style') || ''};opacity:0;` +
      `animation:hold ${step}ms ${i * step}ms linear ${last ? 'forwards' : ''}`)
    totalNode.parentNode.insertBefore(frameText, totalNode)
  }
  totalNode.remove()
}

// --- web embed: one file for wide screens, one for phones ---------------------
/* A single SVG can scale, but it cannot reflow: every position in it was
   computed at export from measured text, and its aspect ratio is a viewBox,
   which CSS cannot reach. So a chart that has to read on a phone ships as two
   files and lets the page choose. <picture> fetches only the one whose media
   query matches and takes that file's aspect ratio with it — which is exactly
   what a media query inside the SVG cannot do. The mobile file is laid out on
   its own format rather than scaled down from the wide one. */
const WEB_BREAKPOINT = 600

async function buildWebBundle() {
  const chosen = artboardPicker.value
  const files = []
  try {
    for (const [variant, format] of [['desktop', '16:9'], ['mobile', 'mobile']]) {
      artboardPicker.value = format
      updateArtboardSize()
      rebuild()
      files.push({ name: exportFileName(`${variant}.svg`), data: buildEmbedSvg() })
    }
  } finally {
    // The export borrowed the preview's format; hand it back as it was.
    artboardPicker.value = chosen
    updateArtboardSize()
    rebuild()
  }
  files.push({ name: exportFileName('html'), data: webPage(files[0].name, files[1].name) })
  return zipFiles(files)
}

function webPage(desktop, mobile) {
  const title = text.title.value.replace(/\s*\n\s*/g, ' ').trim()
  const alt = [title, text.subtitle.value.trim()].filter(Boolean).join(' — ')
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeAttribute(title || 'Chart')}</title>
</head>
<body style="margin:0;padding:24px">
<!--
  Copy the <picture> element into your page and put the two SVG files next to it.
  Below ${WEB_BREAKPOINT}px of window width the browser loads the mobile file, above
  it the desktop one, and never both. Opened as it is, this file is a preview:
  narrow the window past ${WEB_BREAKPOINT}px to watch it switch.
-->
<picture>
  <source media="(max-width: ${WEB_BREAKPOINT}px)" srcset="${mobile}">
  <img src="${desktop}" alt="${escapeAttribute(alt || 'Chart')}" style="display:block;width:100%;height:auto">
</picture>
</body>
</html>
`
}

/* Three files, so a zip rather than three downloads — Chrome asks before a
   page may start several. No library: the format is a header per file and a
   directory at the end, and the browser deflates natively. Anything that does
   not shrink is stored as it is. */
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(bytes) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < bytes.length; i += 1) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8)
  return (crc ^ 0xFFFFFFFF) >>> 0
}

async function deflateRaw(bytes) {
  if (typeof CompressionStream === 'undefined') return null
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function zipFiles(files) {
  const encoder = new TextEncoder()
  const now = new Date()
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()
  const parts = []
  const directory = []
  let offset = 0
  for (const file of files) {
    const name = encoder.encode(file.name)
    const raw = encoder.encode(file.data)
    const packed = await deflateRaw(raw)
    const method = packed && packed.length < raw.length ? 8 : 0
    const body = method ? packed : raw
    const crc = crc32(raw)

    const local = new DataView(new ArrayBuffer(30))
    local.setUint32(0, 0x04034b50, true)
    local.setUint16(4, 20, true)                  // version needed
    local.setUint16(6, 0x0800, true)              // names are UTF-8
    local.setUint16(8, method, true)
    local.setUint16(10, time, true)
    local.setUint16(12, date, true)
    local.setUint32(14, crc, true)
    local.setUint32(18, body.length, true)
    local.setUint32(22, raw.length, true)
    local.setUint16(26, name.length, true)
    parts.push(local, name, body)

    const entry = new DataView(new ArrayBuffer(46))
    entry.setUint32(0, 0x02014b50, true)
    entry.setUint16(4, 20, true)                  // version made by
    entry.setUint16(6, 20, true)                  // version needed
    entry.setUint16(8, 0x0800, true)
    entry.setUint16(10, method, true)
    entry.setUint16(12, time, true)
    entry.setUint16(14, date, true)
    entry.setUint32(16, crc, true)
    entry.setUint32(20, body.length, true)
    entry.setUint32(24, raw.length, true)
    entry.setUint16(28, name.length, true)
    entry.setUint32(42, offset, true)             // where its local header starts
    directory.push(entry, name)

    offset += 30 + name.length + body.length
  }
  const directorySize = directory.reduce((sum, part) => sum + part.byteLength, 0)
  const end = new DataView(new ArrayBuffer(22))
  end.setUint32(0, 0x06054b50, true)
  end.setUint16(8, files.length, true)
  end.setUint16(10, files.length, true)
  end.setUint32(12, directorySize, true)
  end.setUint32(16, offset, true)
  return new Blob([...parts, ...directory, end], { type: 'application/zip' })
}

// --- panels ------------------------------------------------------------------
const chartSettings = {
  toggle: document.querySelector('#chart-settings-toggle'),
  panel: document.querySelector('#chart-settings-panel'),
  close: document.querySelector('#chart-settings-close'),
}
const exportPanel = {
  toggle: document.querySelector('#export-toggle'),
  panel: document.querySelector('#export-panel'),
  close: document.querySelector('#export-panel-close'),
}

function setPanelOpen(panel, other, isOpen) {
  panel.panel.hidden = !isOpen
  panel.toggle.setAttribute('aria-expanded', String(isOpen))
  if (!isOpen) return
  other.panel.hidden = true
  other.toggle.setAttribute('aria-expanded', 'false')
  panel.panel.querySelector('select')?.focus()
}

chartSettings.toggle.addEventListener('click', () => setPanelOpen(chartSettings, exportPanel, chartSettings.panel.hidden))
chartSettings.close.addEventListener('click', () => { setPanelOpen(chartSettings, exportPanel, false); chartSettings.toggle.focus() })
exportPanel.toggle.addEventListener('click', () => setPanelOpen(exportPanel, chartSettings, exportPanel.panel.hidden))
exportPanel.close.addEventListener('click', () => { setPanelOpen(exportPanel, chartSettings, false); exportPanel.toggle.focus() })
document.addEventListener('pointerdown', event => {
  ;[[chartSettings, exportPanel], [exportPanel, chartSettings]].forEach(([panel, other]) => {
    if (!panel.panel.hidden && !panel.panel.contains(event.target) && !panel.toggle.contains(event.target)) {
      setPanelOpen(panel, other, false)
    }
  })
})
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return
  ;[[chartSettings, exportPanel], [exportPanel, chartSettings]].forEach(([panel, other]) => {
    if (panel.panel.hidden) return
    setPanelOpen(panel, other, false)
    panel.toggle.focus()
  })
})

// Only the settings that mean something for the current type are shown; a bar
// gap on a pie chart is a control that does nothing, which is worse than a
// control that is not there.
const mobileBarsHint = document.querySelector('#mobile-bars-hint')

function syncTypeControls() {
  mobileBarsHint.hidden = !(chartType === 'bar' && artboardPicker.value === 'mobile')
  document.querySelectorAll('[data-types]').forEach(node => {
    node.hidden = !node.dataset.types.split(' ').includes(chartType)
  })
}

// --- events ------------------------------------------------------------------
Object.values(text).forEach(input => input.addEventListener('input', rebuild))

chartTypePicker.addEventListener('change', () => {
  chartType = chartTypePicker.value
  syncTypeControls()
  renderTable()
  rebuild()
  replay()
})
artboardPicker.addEventListener('change', () => {
  updateArtboardSize()
  syncTypeControls()
  rebuild()
})

document.querySelector('#add-row').addEventListener('click', () => {
  const stagger = Number(staggerInput.value) || 0
  rows.push(makeRow(`Category ${rows.length + 1}`, 0, rows.length * stagger))
  renderTable()
  rebuild()
})
document.querySelector('#restagger').addEventListener('click', () => {
  applyStagger()
  renderTable()
  rebuild()
  replay()
})
samplePicker.addEventListener('change', () => {
  if (!samplePicker.value) return
  loadSample(samplePicker.value)
  samplePicker.value = ''
  renderTable()
  rebuild()
  replay()
})
document.querySelector('#paste-apply').addEventListener('click', () => {
  const parsed = parsePasted(pasteInput.value)
  if (!parsed.length) {
    pasteStatus.textContent = 'Nothing recognised — each line needs a name and a number.'
    return
  }
  const stagger = Number(staggerInput.value) || 0
  rows = parsed.map((item, index) => makeRow(item.name, item.value, item.delay ?? index * stagger))
  pasteStatus.textContent = `${parsed.length} rows loaded.`
  renderTable()
  rebuild()
  replay()
})

const appearanceInputs = [decimalPlacesInput, colorModeInput, valueStyleInput, gridInput,
  axisValuesInput, areaInput, dotsInput, centerTotalInput, curveInput]
appearanceInputs.forEach(input => input.addEventListener('change', () => {
  renderTable()
  rebuild()
}))
decimalPlacesInput.addEventListener('input', rebuild)

colorSchemeInput.addEventListener('input', () => {
  activeColorScheme = colorSchemes[colorSchemeInput.value]
  colorSchemeSwatch.style.background = activeColorScheme.high
  renderTable()
  rebuild()
})

Object.entries(ranges).forEach(([name, control]) => {
  control.input.addEventListener('input', () => {
    const raw = Number(control.input.value)
    control.output.value = name === 'sliceGap' ? raw : `${raw}%`
    rebuild()
  })
})

document.querySelector('#replay-button').addEventListener('click', replay)
document.querySelectorAll('[data-export]').forEach(button => {
  button.addEventListener('click', () => runExport(button.dataset.export))
})

// Values and delays tuned here live in memory only, so hand them back in a
// shape that can be pasted straight back in — or into a spreadsheet.
const copyButton = document.querySelector('#copy-data')
copyButton.addEventListener('click', async () => {
  const body = rows.map(row => `${row.name}\t${row.value}\t${row.delay}`).join('\n')
  try {
    await navigator.clipboard.writeText(body)
    copyButton.textContent = 'Copied to clipboard'
  } catch {
    copyButton.textContent = 'Copy failed — see console'
    console.log(body)
  }
  setTimeout(() => { copyButton.textContent = 'Copy dataset' }, 1800)
})

exportScaleInput.addEventListener('change', syncExportSize)
exportWidthInput.addEventListener('input', syncExportSize)


// --- dragging slice labels ---------------------------------------------------
/* The preview is an artboard viewBox scaled to whatever space the panel has, so
   screen pixels mean nothing here: every pointer position goes through the SVG's
   own matrix, and a label lands where the cursor is at any preview size.
   Only slices are draggable — a bar or a line label rides geometry that moves
   during playback, so a hand-placed one would be overwritten on the next frame. */
function svgPoint(event) {
  const point = artboard.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  return point.matrixTransform(labelLayer.getScreenCTM().inverse())
}

let drag = null

labelLayer.addEventListener('pointerdown', event => {
  if (frameGeometry?.kind !== 'pie') return
  const node = event.target.closest('.label')
  if (!node) return
  const row = rows.find(item => item.id === node.dataset.row)
  const geometry = row && frameGeometry.geometry.get(row.id)
  if (!geometry) return
  const point = svgPoint(event)
  // Hold the grab offset so the label does not jump its centre to the cursor.
  drag = {
    row,
    node,
    offsetX: geometry.baseX + (row.labelDx || 0) * unit - point.x,
    offsetY: geometry.baseY + (row.labelDy || 0) * unit - point.y,
    pointerId: event.pointerId,
  }
  node.classList.add('is-dragging')
  labelLayer.setPointerCapture(event.pointerId)
  event.preventDefault()
})

labelLayer.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.pointerId) return
  const geometry = frameGeometry?.geometry.get(drag.row.id)
  if (!geometry) return
  const point = svgPoint(event)
  drag.row.labelDx = Math.round((clamp(point.x + drag.offsetX, 0, artboardSize.w) - geometry.baseX) / unit)
  drag.row.labelDy = Math.round((clamp(point.y + drag.offsetY, 0, artboardSize.h) - geometry.baseY) / unit)
  placeSliceLabel(drag.row)
})

function endDrag(event) {
  if (!drag || event.pointerId !== drag.pointerId) return
  drag.node.classList.remove('is-dragging')
  if (labelLayer.hasPointerCapture(event.pointerId)) labelLayer.releasePointerCapture(event.pointerId)
  drag = null
}

labelLayer.addEventListener('pointerup', endDrag)
labelLayer.addEventListener('pointercancel', endDrag)

document.querySelector('#reset-labels').addEventListener('click', () => {
  rows.forEach(row => { row.labelDx = 0; row.labelDy = 0 })
  rebuild()
})

// --- start -------------------------------------------------------------------
colorSchemeSwatch.style.background = activeColorScheme.high
loadSample('cities')
syncTypeControls()
updateArtboardSize()
renderTable()
rebuild()

// Layout is measured from rendered text, so the first build has to wait for the
// webfonts — with fallback metrics the gutters come out wrong and every label
// is a few units off where it belongs.
document.fonts.ready.then(() => {
  rebuild()
  replay()
})
