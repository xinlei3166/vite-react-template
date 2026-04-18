import type { PropsWithChildren, HTMLAttributes } from 'react'
import type { TableProps, TableChangeData } from 'tdesign-react'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import { useEffect, useCallback, memo, useMemo, useState } from 'react'
import { Table, Card, Pagination } from 'tdesign-react'
import { useData } from '@packages/hooks'
import { deepClone } from '@packages/utils'
import type { SearchProps } from '../search'
import type { SearchTableInstance } from './hooks/useSearchTable'
import Search from '../search'

export interface SearchTableProps extends Partial<Omit<TableProps, 'pagination'>> {
  // table
  table?: SearchTableInstance
  card?: boolean
  cardBordered?: boolean
  cardBodyStyle?: React.CSSProperties
  fixedPagination?: boolean
  rowKey?: TableProps['rowKey']
  tableColumns?: TableProps['columns']
  pagination?: TableProps['pagination'] | false

  // search
  showSearch?: boolean
  searchProps?: Partial<SearchProps>
  searchColumns?: Record<string, any>[]
  searchModel?: Record<string, any>
  setSearchModel?: (...args: any[]) => void

  // method
  extraParams?: Record<string, any>
  transformTableParams?: (...args: any[]) => Record<string, any>
  useDataParams?: Record<string, any>
  requestApi: (...args: any[]) => Promise<any>
  autoRequest?: boolean
  onTableChange?: (...args: any[]) => void
  init?: (...args: any[]) => void
  onSearch?: (...args: any[]) => void
  onReset?: (...args: any[]) => void
  onEnter?: (...args: any[]) => void
  [key: string]: any
}

function SearchTable(props: PropsWithChildren<SearchTableProps> & HTMLAttributes<HTMLDivElement>) {
  const {
    // element
    className,
    style,

    // table
    table,
    card = true,
    cardBordered = false,
    cardBodyStyle = {},
    fixedPagination = true,
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
    autoRequest = true,
    onTableChange: _onTableChange,
    init: _init,
    onSearch: _onSearch,
    onReset: _onReset,
    onEnter: _onEnter,
    ...tableProps
  } = props

  // sorter, filter
  const [sorter, setSorter] = useState<any>(undefined)
  const [filter, setFilter] = useState<any>(undefined)
  const transformTableParams = useCallback(
    (data: TableChangeData) => {
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
    return { ...mergedParams, params }
  }, [_useDataParams, params, _pagination])

  const {
    loading,
    data,
    pagination,
    init: initMethod,
    onSearch: onSearchMethod,
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
  const init = useCallback(async () => {
    await initMethod()
    _init?.()
  }, [initMethod, _init])

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
    await onSearchMethod(_state)
    _onReset?.()
  }, [onSearchMethod, _onReset, searchModel, setSearchModel])

  const onEnter = useCallback(
    async (...args: any[]) => {
      await init()
      _onEnter?.(...args)
    },
    [_onEnter, init]
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
        className={classNames('search-table', '!min-h-0', 'flex-1', tableProps.tableClass)}
        maxHeight={tableProps.maxHeight ?? (fixedPagination ? '100%' : 'undefined')}
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
    return (
      <div
        className={classNames([
          'search-table-wrap',
          { '!h-full': fixedPagination, '!h-auto': !fixedPagination, 'pb-4': !fixedPagination },
          'flex',
          '!flex-col',
          className
        ])}
        style={style}
      >
        {card ? (
          <Card
            bordered={cardBordered}
            bodyStyle={{
              padding: pagination ? '16px 16px 0' : '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              ...cardBodyStyle
            }}
            className={classNames(['search-table-card', '!h-full', className])}
            style={style}
          >
            {children}
          </Card>
        ) : (
          children
        )}
      </div>
    )
  }

  return renderWrapper(content)
}

export default memo(SearchTable)
