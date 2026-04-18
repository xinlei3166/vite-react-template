import type { PropsWithChildren, HTMLAttributes } from 'react'
import type { TableProps } from 'tdesign-react'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import { useEffect, useCallback, memo, useMemo, useState } from 'react'
import { Table, Card, Pagination } from 'tdesign-react'
import { useData } from '@packages/hooks'
import { deepClone } from '@packages/utils'
import type { SearchProps } from '../search'
import type { SearchTableInstance } from './hooks/useSearchTable'
import Search from '../search'

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
  callback?: (...args: any[]) => void
  requestApi: (...args: any[]) => Promise<any>
  autoRequest?: boolean
  _onTableChange?: (...args: any[]) => void
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
    callback,
    requestApi,
    _onTableChange,
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
      // console.log('transformTableParams', data)
      if (_transformTableParams) {
        return _transformTableParams(data)
      }
      return {}
    },
    [_transformTableParams]
  )

  // useData
  const params = useMemo(() => {
    const overrideParams = transformTableParams ? transformTableParams({ sorter, filter }) : {}
    return { ...searchModel, ...extraParams, ...overrideParams }
  }, [searchModel, extraParams, sorter, filter, transformTableParams])

  const useDataParams = useMemo(() => {
    const mergedParams = deepClone(_useDataParams || {})
    if (_pagination !== undefined) {
      mergedParams.pagination = _pagination
    }
    return { callback, ...mergedParams, params }
  }, [_useDataParams, params, _pagination, callback])

  const {
    loading,
    data,
    pagination,
    init,
    onSearch: onSearchMethod,
    onReset: onResetMethod,
    onTableChange: onTableChangeMethod
  } = useData(requestApi, useDataParams)

  const onTableChange = useCallback(
    (data: any, context: any) => {
      setSorter(data.sorter)
      setFilter(data.filter)
      const overrideParams = transformTableParams ? transformTableParams(data) : {}
      onTableChangeMethod(data, context, overrideParams)
      _onTableChange?.(data, context)
    },
    [onTableChangeMethod, _onTableChange, setSorter, setFilter, transformTableParams]
  )
  const onPaginationChange = useCallback(
    (pageInfo: any) => {
      return onTableChangeMethod(
        { pagination: pageInfo },
        { trigger: 'pagination', currentData: [] }
      )
    },
    [onTableChangeMethod]
  )

  // 方法回调
  const onSearch = useCallback(async () => {
    await onSearchMethod()
    _onSearch?.()
  }, [onSearchMethod, _onSearch])

  const onReset = useCallback(async () => {
    const _state = { ...searchModel }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
    setSearchModel?.(_state)
    await onResetMethod(_state)
    _onReset?.()
  }, [onResetMethod, _onReset, searchModel, setSearchModel])

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

  // content
  const content = (
    <>
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
        pagination={fixedPagination ? undefined : pagination}
        data={data}
        onChange={onTableChange}
      />
      {fixedPagination && pagination && (
        <Pagination className="!my-4" {...pagination} onChange={onPaginationChange} />
      )}
    </>
  )

  // wrapper
  const renderWrapper = (children: React.ReactNode) => {
    if (card) {
      return (
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
          {children}
        </Card>
      )
    }
    return (
      <div
        className={classNames(['search-table-wrap', 'h-full', 'flex', 'flex-col', className])}
        style={style}
      >
        {children}
      </div>
    )
  }

  return renderWrapper(content)
}

export default memo(SearchTable)
