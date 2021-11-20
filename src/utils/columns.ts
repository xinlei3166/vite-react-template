// gen get columns func
export const createGetColumns = (sourceColumns: Record<string, any>[] = []) => {
  const _columns = [...sourceColumns]

  return function _getColumns(columns: Record<string, any>[] = []) {
    for (const column of columns) {
      const index = _columns.findIndex(c => c.key === column.key)
      if (index !== -1) {
        _columns[index] = { ..._columns[index], ...column }
      }
    }

    return _columns
  }
}
