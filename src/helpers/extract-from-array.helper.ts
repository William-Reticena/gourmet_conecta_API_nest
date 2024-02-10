export const extractFromArray = <T>(queryReturn: T[]) => {
  console.log('queryReturn', queryReturn)

  if (!Array.isArray(queryReturn)) return queryReturn

  if (queryReturn.length > 0) return queryReturn[0]

  return null
}
