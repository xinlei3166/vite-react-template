import type { PropsWithChildren, HTMLAttributes } from 'react'
import type { TableProps, TableChangeData, SortInfo } from 'tdesign-react'
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
  tableEllipsis?: boolean
  pagination?: TableProps['pagination'] | false

  // toolbar
  toolbar?: React.ReactNode

  // search
  showSearch?: boolean
  searchProps?: Partial<SearchProps & { class?: string; style?: React.CSSProperties }>
  searchSpan?: SearchProps['span']
  searchBtnSpan?: SearchProps['btnSpan']
  searchColumns?: Record<string, any>[]
  searchModel?: Record<string, any>
  setSearchModel?: (...args: any[]) => void
  searchLabelWidth?: SearchProps['labelWidth']
  searchShowResetBtn?: SearchProps['showResetBtn']
  searchExtraBtn?: SearchProps['extraBtn']

  // method
  extraParams?: Record<string, any>
  transformTableParams?: ((...args: any[]) => Record<string, any>) | true
  useDataParams?: Record<string, any>
  requestApi: (...args: any[]) => Promise<any>
  requestOnMount?: boolean // 是否在组件挂载后自动请求数据，默认为 true
  requestOnChange?: boolean // 是否在搜索条件改变时自动请求数据，默认为 true
  onTableChange?: (...args: any[]) => void
  init?: (...args: any[]) => void
  onSearch?: (...args: any[]) => void
  onReset?: (...args: any[]) => void
  onSearchEnter?: (...args: any[]) => void
  onSearchChange?: (...args: any[]) => void
  onTriggerSearch?: (...args: any[]) => void
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
    tableColumns: _tableColumns = [],
    tableEllipsis = false,
    pagination: _pagination,

    // toolbar
    toolbar,

    // search
    showSearch = true,
    searchProps: _searchProps,
    searchSpan = 3,
    searchBtnSpan,
    searchColumns = [],
    searchModel,
    setSearchModel,
    searchLabelWidth,
    searchShowResetBtn,
    searchExtraBtn,

    // method
    extraParams,
    transformTableParams: _transformTableParams,
    useDataParams: _useDataParams,
    requestApi,
    requestOnMount = true,
    requestOnChange = true,
    onTableChange: _onTableChange,
    init: _init,
    onSearch: _onSearch,
    onReset: _onReset,
    onSearchEnter: _onSearchEnter,
    onSearchChange: _onSearchChange,
    onTriggerSearch: _onTriggerSearch,
    ...tableProps
  } = props

  const searchProps = useMemo(
    () => ({
      span: searchSpan,
      btnSpan: searchBtnSpan,
      labelWidth: searchLabelWidth,
      showResetBtn: searchShowResetBtn,
      ..._searchProps
    }),
    [_searchProps, searchLabelWidth, searchShowResetBtn, searchBtnSpan, searchSpan]
  )

  const actionColKeys = useMemo(() => ['row-select', 'operation'], [])
  const tableColumns = useMemo(() => {
    return _tableColumns.map((col: any) => {
      if (tableEllipsis && col.ellipsis === undefined && !actionColKeys.includes(col.colKey)) {
        return { ...col, ellipsis: true }
      }
      return col
    })
  }, [_tableColumns, tableEllipsis, actionColKeys])

  // sorter, filter
  const [sorter, setSorter] = useState<any>(undefined)
  const [filter, setFilter] = useState<any>(undefined)
  const defaultTransformTableParams = (data: TableChangeData) => {
    const sorter = data.sorter as SortInfo
    const sortBy = sorter?.sortBy
      ? sorter.descending
        ? `-${sorter.sortBy}`
        : sorter.sortBy
      : undefined
    return { sortBy }
  }
  const transformTableParams = useCallback(
    (data: TableChangeData) => {
      // console.log('transformTableParams', typeof _transformTableParams.value, data)
      if (_transformTableParams === true) {
        return defaultTransformTableParams(data)
      } else if (typeof _transformTableParams === 'function') {
        return _transformTableParams(data)
      } else {
        return {}
      }
    },
    [_transformTableParams]
  )
  const tableParams = useMemo(() => {
    return transformTableParams({ sorter, filter })
  }, [sorter, filter, transformTableParams])

  // useData
  const params = useMemo(() => {
    return { ...searchModel, ...extraParams, ...tableParams }
  }, [searchModel, extraParams, tableParams])

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
    setPagination,
    init: initMethod,
    onSearch: onSearchMethod,
    onTriggerSearch: onTriggerSearchMethod,
    onTableChange: onTableChangeMethod
  } = useData(requestApi, useDataParams)

  const onTableChange = useCallback(
    (data: any, context: any) => {
      setSorter(data.sorter)
      setFilter(data.filter)
      const tableParams = transformTableParams ? transformTableParams(data) : {}
      onTableChangeMethod(data, context, tableParams)
      _onTableChange?.(data, context)
    },
    [onTableChangeMethod, _onTableChange, setSorter, setFilter, transformTableParams]
  )
  const onPaginationChange = useCallback(
    (pageInfo: any) => {
      onTableChangeMethod({ pagination: pageInfo }, { trigger: 'pagination', currentData: [] })
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
      const col = searchColumns.find((item: any) => item.key === key)
      if (col && col.defaultValue !== undefined) {
        _state[key] = col.defaultValue
      } else if (Array.isArray(_state[key])) {
        _state[key] = []
      } else {
        _state[key] = undefined
      }
    })
    setSearchModel?.(_state)
    await onSearchMethod(_state)
    _onReset?.()
  }, [onSearchMethod, _onReset, searchModel, setSearchModel, searchColumns])

  const onSearchEnter = useCallback(
    (...args: []) => {
      _onSearchEnter?.(...args)
    },
    [_onSearchEnter]
  )

  const onSearchChange = useCallback(
    (...args: []) => {
      _onSearchChange?.(...args)
    },
    [_onSearchChange]
  )

  const onTriggerSearch = useCallback(
    async (...args: []) => {
      if (requestOnChange) {
        await onTriggerSearchMethod(...args)
      }
      _onTriggerSearch?.(...args)
    },
    [requestOnChange, _onTriggerSearch, onTriggerSearchMethod]
  )

  // 初始化
  useMount(() => {
    if (requestOnMount) {
      init()
    }
  })

  // 将方法暴露给外部
  useEffect(() => {
    if (!table) return
    table.init = init
    table.onSearch = onSearch
    table.onReset = onReset
    table.getSearchModel = () => searchModel!
    table.setSearchModel = setSearchModel!
    table.getPagination = () => pagination!
    table.setPagination = setPagination!
    table.getSorter = () => sorter!
    table.setSorter = setSorter!
    table.getFilter = () => filter!
    table.setFilter = setFilter!
  }, [
    table,
    init,
    onSearch,
    onReset,
    searchModel,
    setSearchModel,
    pagination,
    setPagination,
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
          style={{ marginBottom: '16px', ...searchProps.style }}
          extraBtn={searchExtraBtn}
          columns={searchColumns}
          model={searchModel!}
          setModel={setSearchModel!}
          onSearch={onSearch}
          onReset={onReset}
          onEnter={onSearchEnter}
          onChange={onSearchChange}
          onTriggerSearch={onTriggerSearch}
        />
      )}
      {toolbar && (
        <div className="search-table-toolbar flex items-center justify-between gap-4 mb-4">
          {toolbar}
        </div>
      )}
      <Table
        {...tableProps}
        className={classNames('search-table', '!min-h-0', 'flex-1', tableProps.tableClass)}
        maxHeight={tableProps.maxHeight ?? (fixedPagination ? '100%' : 'undefined')}
        rowKey={rowKey}
        resizable={tableProps.resizable ?? true}
        hover={tableProps.hover ?? true}
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
            className={classNames('search-table-card', '!h-full')}
            bordered={cardBordered}
            bodyStyle={{
              padding: pagination ? '16px 16px 0' : '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              ...cardBodyStyle
            }}
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
