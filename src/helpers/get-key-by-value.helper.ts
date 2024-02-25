export const getKeyByValue = (value: number | string, object: Record<string, unknown>): string | undefined => {
  return Object.keys(object).find((key) => object[key] === value)
}
