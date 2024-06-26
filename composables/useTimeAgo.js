export default function (input) {
  const date = (input instanceof Date) ? input : new Date(input)
  const formatter = new Intl.RelativeTimeFormat('en')
  const ranges = new Map([
    ['years', 3600 * 24 * 365],
    ['months', 3600 * 24 * 30],
    ['weeks', 3600 * 24 * 7],
    ['days', 3600 * 24],
    ['hours', 3600],
    ['minutes', 60],
    ['seconds', 1]
  ])
  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  for (const [k, value] of ranges) {
    if (value < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / value
      return formatter.format(Math.round(delta), k)
    }
  }
}
