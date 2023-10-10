// gen create columns hook
export const useCreateColumns = (sourceColumns: Record<string, any>[] = []) => {
  const _columns = [...sourceColumns]

  return function createColumns(columns: Record<string, any>[] = []) {
    for (const column of columns) {
      const index = _columns.findIndex(c => c.key === column.key)
      if (index !== -1) {
        _columns[index] = { ..._columns[index], ...column }
      }
    }

    return _columns
  }
}
