import type { PropsWithChildren, HTMLAttributes } from 'react'
import type { TableProps } from 'tdesign-react'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import { useEffect, useCallback, memo, useMemo, useState } from 'react'
import { Table, Card, Pagination } from 'tdesign-react'
import type { SearchProps } from '@packages/components/search'
import Search from '@packages/components/search'
import { useData } from '@packages/hooks'
import type { SearchTableInstance } from './hooks/useSearchTable'

export interface SearchTableProps extends Partial<TableProps> {
  // table
  table?: SearchTableInstance
  card?: boolean
  cardBordered?: boolean
  cardBodyStyle?: React.CSSProperties
  fixedPagination?: boolean

  // search
  showSearch?: boolean
  searchProps?: Partial<SearchProps>
  searchColumns?: Record<string, any>[]
  searchModel?: Record<string, any>
  setSearchModel?: (...args: any[]) => void

  // method
  extraParams?: Record<string, any>
  transformTableParams?: (data: any) => Record<string, any>
  useDataParams?: Record<string, any>
  requestApi: (...args: any[]) => Promise<any>
  autoRequest?: boolean
  init?: (...args: any[]) => void
  onSearch?: (...args: any[]) => void
  onReset?: (...args: any[]) => void
  onEnter?: (...args: any[]) => void
  [key: string]: any
}

function SearchTable(props: PropsWithChildren<SearchTableProps> & HTMLAttributes<HTMLDivElement>) {
  const {
    // table
    table,
    card = true,
    cardBordered = false,
    cardBodyStyle = {},
    fixedPagination = true,
    className,
    style,
    rowKey = 'id',
    tableColumns = [],
    pagination: _pagination,

    // search
    showSearch = true,
    searchProps,
    searchColumns = [],
    searchModel,
    setSearchModel,

    // method
    extraParams,
    transformTableParams: _transformTableParams,
    useDataParams: _useDataParams,
    requestApi,
    init: _init,
    onSearch: _onSearch,
    onReset: _onReset,
    onEnter: _onEnter,
    autoRequest = true,
    ...tableProps
  } = props

  // sorter, filter
  const [sorter, setSorter] = useState<any>(undefined)
  const [filter, setFilter] = useState<any>(undefined)
  const transformTableParams = useCallback(
    (data: any) => {
      console.log('transformTableParams', data)
      if (_transformTableParams) {
        return _transformTableParams(data)
      }
      return { sorterParams: {}, filterParams: {} }
    },
    [_transformTableParams]
  )

  // useData
  const params = useMemo(() => {
    const overrideParams = transformTableParams ? transformTableParams({ sorter, filter }) : {}
    return { ...searchModel, ...extraParams, ...overrideParams }
  }, [searchModel, extraParams, sorter, filter, transformTableParams])
  const useDataParams = useMemo(() => {
    const mergedParams = _useDataParams || {}
    if (_pagination !== undefined) {
      mergedParams.pagination = _pagination
    }
    return { ...mergedParams, params }
  }, [_useDataParams, params, _pagination])

  // 请求数据后处理，例如清空selectedRowKeys可以传cb
  const {
    loading,
    data,
    pagination,
    init,
    onSearch: onSearchMethod,
    onReset: onResetMethod,
    onTableChange: _onTableChange
  } = useData(requestApi, useDataParams)

  const onTableChange = useCallback(
    (data: any, context: any) => {
      setSorter(data.sorter)
      setFilter(data.filter)
      const overrideParams = transformTableParams ? transformTableParams(data) : {}
      _onTableChange(data, context, overrideParams)
    },
    [_onTableChange, setSorter, setFilter, transformTableParams]
  )
  const onPaginationChange = useCallback(
    (pageInfo: any) => {
      return _onTableChange({ pagination: pageInfo }, { trigger: 'pagination', currentData: [] })
    },
    [_onTableChange]
  )

  // 方法回调
  const onSearch = useCallback(async () => {
    await onSearchMethod()
    _onSearch?.()
  }, [onSearchMethod, _onSearch])

  const onReset = useCallback(async () => {
    await onResetMethod()
    _onReset?.()
  }, [onResetMethod, _onReset])
  const onEnter = useCallback(
    (...args: any[]) => {
      _onEnter?.(...args)
    },
    [_onEnter]
  )

  // 初始化
  useMount(() => {
    if (autoRequest) {
      init()
    }
  })

  // 将方法暴露给外部
  useEffect(() => {
    if (!table) return
    table.init = init
    table.onSearch = onSearch
    table.onReset = onReset
    table.onEnter = onEnter
    table.setSearchModel = setSearchModel!
    table.getSearchModel = () => searchModel!
    table.setSorter = setSorter!
    table.getSorter = () => sorter!
    table.setFilter = setFilter!
    table.getFilter = () => filter!
  }, [
    table,
    init,
    onSearch,
    onReset,
    searchModel,
    setSearchModel,
    onEnter,
    sorter,
    setSorter,
    filter,
    setFilter
  ])

  return card ? (
    <Card
      bordered={cardBordered}
      className={classNames(['search-table-card', 'search-table-wrap', 'h-full', className])}
      bodyStyle={{
        padding: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...cardBodyStyle
      }}
      style={style}
    >
      {showSearch && searchColumns.length > 0 && (
        <Search
          {...searchProps}
          card={false}
          style={{ marginBottom: '16px', ...searchProps?.style }}
          columns={searchColumns}
          model={searchModel!}
          setModel={setSearchModel!}
          onSearch={onSearch}
          onReset={onReset}
          onEnter={onEnter}
        />
      )}
      <Table
        {...tableProps}
        className={classNames('search-table', 'flex-1', 'min-h-0', tableProps.tableClass)}
        maxHeight={tableProps.maxHeight ?? (fixedPagination ? '100%' : undefined)}
        rowKey={rowKey}
        resizable={tableProps.resizable ?? true}
        loading={loading}
        columns={tableColumns}
        pagination={fixedPagination ? undefined : tableProps.pagination}
        data={data}
        onChange={onTableChange}
      />
      {fixedPagination && pagination && (
        <Pagination className="my-4" {...pagination} onChange={onPaginationChange} />
      )}
    </Card>
  ) : (
    <div
      className={classNames(['search-table-wrap', 'h-full', 'flex', 'flex-col', className])}
      style={style}
    >
      {showSearch && searchColumns.length > 0 && (
        <Search
          {...searchProps}
          card={false}
          style={{ marginBottom: '16px', ...searchProps?.style }}
          columns={searchColumns}
          model={searchModel!}
          setModel={setSearchModel!}
          onSearch={onSearch}
          onReset={onReset}
          onEnter={onEnter}
        />
      )}
      <Table
        {...tableProps}
        className={classNames('search-table', 'flex-1', 'min-h-0', tableProps.tableClass)}
        maxHeight={tableProps.maxHeight ?? (fixedPagination ? '100%' : undefined)}
        rowKey={rowKey}
        resizable={tableProps.resizable ?? true}
        loading={loading}
        columns={tableColumns}
        pagination={fixedPagination ? undefined : tableProps.pagination}
        data={data}
        onChange={onTableChange}
      />
      {fixedPagination && pagination && (
        <Pagination className="my-4" {...pagination} onChange={onPaginationChange} />
      )}
    </div>
  )
}

export default memo(SearchTable)
