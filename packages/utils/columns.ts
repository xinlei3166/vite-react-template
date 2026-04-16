type PlainObject = Record<string, any>

const isPlainObject = (value: unknown): value is PlainObject => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const deepMerge = <T>(target: T, source: Partial<T>): T => {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return (source as T) ?? target
  }

  const result: PlainObject = { ...target }

  Object.keys(source).forEach(key => {
    const targetValue = result[key]
    const sourceValue = (source as PlainObject)[key]

    if (sourceValue === undefined) return

    if (Array.isArray(sourceValue)) {
      result[key] = sourceValue
      return
    }

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = deepMerge(targetValue, sourceValue)
      return
    }

    result[key] = sourceValue
  })

  return result as T
}

export const createColumnsFactory = (sourceColumns: any[] = []) => {
  return (columns: any[] = []) => {
    const nextColumns = sourceColumns.map(item => deepMerge({}, item))

    for (const column of columns) {
      const index = nextColumns.findIndex((c: any) => c.key === column.key)

      if (index > -1) {
        nextColumns[index] = deepMerge(nextColumns[index], column)
      } else {
        nextColumns.push(deepMerge({}, column))
      }
    }

    return nextColumns
  }
}
