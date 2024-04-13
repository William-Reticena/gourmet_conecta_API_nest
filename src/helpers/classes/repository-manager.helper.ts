import { Repository } from 'typeorm'

export class RepositoryManager {
  private static extractFromArray = <T>(queryReturn: T[]) => {
    if (!Array.isArray(queryReturn)) return queryReturn

    if (queryReturn.length > 0) return queryReturn[0]

    return null
  }

  private static extractQueryParams(query: string) {
    return query
      .replace(/\n/g, '')
      .match(/(?<!\$)\((.*?)\)/)[1]
      .split(', ')
      .map((param) => param.replace(/"/g, '').trim())
  }

  private static mapOriginalParamsKeysWithExpectedOnes(params: Record<string, any>, expectedNamingConvention = 'snake_case') {
    const entries = Object.entries(params)

    return entries.reduce(
      (acc, [key, value]) => {
        acc.push({ originalKey: key, value, transformedKey: this.transformIntoExpectedKeys(key, expectedNamingConvention) })

        return acc
      },
      [] as Array<Record<string, any>>,
    )
  }

  private static transformIntoExpectedKeys(key: string, namingConvention = 'snake_case') {
    switch (namingConvention) {
      case 'snake_case':
        return this.snakeCase(key)
      default:
        return key
    }
  }

  private static snakeCase(key: string) {
    return key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }

  private static ensureParamsValuesMatchQuery(paramsFromQuery: Array<string>, expectedKeys: Array<Record<string, any>>) {
    if (paramsFromQuery.length !== expectedKeys.length) throw new Error(`Expected ${expectedKeys.length} parameters, but received ${paramsFromQuery.length}`)

    return paramsFromQuery.map((param) => {
      const expectedKey = expectedKeys.find((key) => key.transformedKey === param)

      if (expectedKey && param !== expectedKey.transformedKey) {
        throw new Error(`Expected "${param}" but received "${expectedKey.transformedKey}"`)
      }

      return expectedKey.value
    })
  }

  private static guaranteeValuesOrder(createQuery: string, params: Record<string, any>) {
    const paramsFromQuery = this.extractQueryParams(createQuery)
    const expectedKeys = this.mapOriginalParamsKeysWithExpectedOnes(params, 'snake_case')
    const guaranteedValues = this.ensureParamsValuesMatchQuery(paramsFromQuery, expectedKeys)

    return guaranteedValues
  }

  static async create<T>(repository: Repository<T>, createQuery: string, params: Partial<T>) {
    try {
      const guaranteedValuesOrder = this.guaranteeValuesOrder(createQuery, params)

      const entityCreated = await repository.query(createQuery, guaranteedValuesOrder)

      return this.extractFromArray<T>(entityCreated)
    } catch (e) {
      console.error(e)
    }
  }
}
