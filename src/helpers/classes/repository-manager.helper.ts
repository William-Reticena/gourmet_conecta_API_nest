import { Repository } from 'typeorm'

export class RepositoryManager {
  private static extractFromArray<T>(queryReturn: T[]): T | null {
    if (!Array.isArray(queryReturn)) return queryReturn

    if (queryReturn.length > 0) return queryReturn[0]

    return null
  }

  private static extractQueryParams(query: string): string[] {
    const detectParenthesesRegex = /\([^()]*\)/

    if (detectParenthesesRegex.test(query))
      return query
        .replace(/\n/g, '')
        .match(/(?<!\$)\((.*?)\)/g)[1]
        .split(', ')
        .map((param) => param.replace(/"/g, '').trim())
    else {
      const getParamCtxRegex = /(\w+)\s*=\s*(\$\d+)/g
      const paramsList: string[] = []

      let paramCtx: RegExpExecArray
      while ((paramCtx = getParamCtxRegex.exec(query)) !== null) {
        const paramName = paramCtx[1]

        paramsList.push(paramName)
      }

      return paramsList
    }
  }

  private static mapOriginalParamsKeysWithExpectedOnes(params: Record<string, any>, expectedNamingConvention = 'snake_case'): Record<string, any>[] {
    const entries = Object.entries(params)

    return entries.reduce(
      (acc, [key, value]) => {
        acc.push({ originalKey: key, value, transformedKey: this.transformIntoExpectedKeys(key, expectedNamingConvention) })

        return acc
      },
      [] as Record<string, any>[],
    )
  }

  private static transformIntoExpectedKeys(key: string, namingConvention = 'snake_case'): string {
    switch (namingConvention) {
      case 'snake_case':
        return this.snakeCase(key)
      default:
        return key
    }
  }

  private static snakeCase(key: string): string {
    return key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }

  private static ensureParamsValuesMatchQuery(paramsFromQuery: string[], expectedKeys: Record<string, any>[]): any[] {
    if (paramsFromQuery.length !== expectedKeys.length) throw new Error(`Expected ${expectedKeys.length} parameters, but received ${paramsFromQuery.length}`)

    return paramsFromQuery.map((param) => {
      const expectedKey = expectedKeys.find((key) => key.transformedKey === param)

      if (expectedKey && param !== expectedKey.transformedKey) throw new Error(`Expected "${param}" but received "${expectedKey.transformedKey}"`)

      return expectedKey.value
    })
  }

  private static guaranteeValuesOrder(query: string, params: Record<string, any>): any[] {
    const paramsFromQuery = this.extractQueryParams(query)
    const expectedKeys = this.mapOriginalParamsKeysWithExpectedOnes(params, 'snake_case')
    const guaranteedValues = this.ensureParamsValuesMatchQuery(paramsFromQuery, expectedKeys)

    return guaranteedValues
  }

  private static async execQuery<T>(repository: Repository<T>, query: string, params: Partial<T>): Promise<T> {
    try {
      const guaranteedValuesOrder = this.guaranteeValuesOrder(query, params)

      const entity = await repository.query(query, guaranteedValuesOrder)

      return this.extractFromArray<T>(entity)
    } catch (e) {
      console.error(e)
    }
  }

  static async create<T>(repository: Repository<T>, createQuery: string, params: Partial<T>): Promise<T> {
    try {
      return this.execQuery<T>(repository, createQuery, params)
    } catch (e) {
      console.error(e)
    }
  }

  static async find<T>(repository: Repository<T>, findQuery: string, params: Partial<T>): Promise<T> {
    try {
      return this.execQuery<T>(repository, findQuery, params)
    } catch (e) {
      console.error(e)
    }
  }
}
