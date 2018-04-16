export const numberWithSpace = (num) => (
  Number(num.toFixed(0))
    .toLocaleString().split(/\s/)
    .join(',') +
  '.' +
  Number(
    num.toString()
    .slice(num.toString().indexOf('.') + 1)
  ).toLocaleString()
)
