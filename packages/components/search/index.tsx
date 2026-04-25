import type { Property } from 'csstype'
import type { PropsWithChildren, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import {
  Row,
  Col,
  Card,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  Button,
  DateRangePicker
} from 'tdesign-react'

export interface SearchProps {
  // search
  card?: boolean
  cardBordered?: boolean
  cardBodyStyle?: React.CSSProperties
  span?: number
  searchClass?: string
  searchStyle?: React.CSSProperties
  columns: Record<string, any>[]
  model: Record<string, any>
  setModel: (...args: any[]) => void
  searchOnChange?: boolean

  // label
  labelAlign?: Property.TextAlign // left | right
  labelWidth?: string // auto | px
  showLabel?: boolean

  // component
  componentStyle?: React.CSSProperties

  // btn
  showSearchBtn?: boolean
  showResetBtn?: boolean
  showBtn?: boolean
  searchBtnLabel?: string
  resetBtnLabel?: string
  showBtnPlaceholder?: string
  btnPlaceholderWidth?: string
  btnAlign?: Property.JustifyContent
  btnSpan?: number
  btnClass?: string
  btnStyle?: React.CSSProperties
  btnInnerStyle?: React.CSSProperties
  extraBtn?: ReactNode

  // method
  onSearch?: (...args: any) => unknown
  onQuery?: (...args: any) => unknown
  onReset?: (...args: any) => unknown
  onEnter?: (...args: any) => unknown
  onChange?: (...args: any) => unknown
  [key: string]: any
}

function _Search(
  props: PropsWithChildren<SearchProps> & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
) {
  const {
    // search
    span = 3,
    searchClass = '',
    searchStyle = {},
    columns: _columns = [],
    model = {},
    setModel,
    searchOnChange,

    // label
    labelAlign = 'right',
    labelWidth = 'auto',
    showLabel = true,

    // component
    componentStyle = {},

    // btn
    showSearchBtn = true,
    showResetBtn = true,
    showBtn = true,
    searchBtnLabel = '查询',
    resetBtnLabel = '重置',
    showBtnPlaceholder = false,
    btnPlaceholderWidth = '',
    btnAlign = 'start',
    btnSpan = undefined,
    btnClass = '',
    btnStyle = {},
    btnInnerStyle = {},
    extraBtn,

    // method
    onSearch: _onSearch,
    onQuery: _onQuery,
    onReset: _onReset,
    onEnter: _onEnter,
    onChange: _onChange
  } = props

  const columns = useMemo<Record<string, any>[]>(
    () =>
      (_columns || []).map(column => {
        const col = {
          ...column,
          props: column.props || {},
          searchOnChange: column.searchOnChange ?? searchOnChange
        }
        return col
      }),
    [_columns, searchOnChange]
  )

  const mergeColumnStyle = (...styles: any[]) => {
    return Object.assign({}, componentStyle, ...styles.filter(Boolean))
  }

  const ignoreSearchOnChangeKeys = useMemo(() => ['input', 'input-number'], [])
  const onSearch = useCallback(
    (trigger: string, payload: Record<string, any>, column?: Record<string, any>) => {
      if (column?.searchOnChange === false) {
        return
      }
      _onSearch?.(trigger, payload)
    },
    [_onSearch]
  )

  const onQuery = useCallback(() => {
    const payload = { model }
    _onQuery?.(payload)
    onSearch('query', payload)
  }, [model, _onQuery, onSearch])

  const onReset = useCallback(() => {
    const payload = { model }
    _onReset?.(payload)
    onSearch('reset', payload)
  }, [model, _onReset, onSearch])

  const buildPayload = useCallback(
    (column: Record<string, any>, value: any, context: any) => {
      return { key: column.key, value, model: { ...model, [column.key]: value } }
    },
    [model]
  )

  const onEnter = useCallback(
    (column: Record<string, any>, value: any, context: any) => {
      const payload = buildPayload(column, value, context)
      _onEnter?.(payload)
      onSearch('enter', payload)
    },
    [buildPayload, _onEnter, onSearch]
  )

  const onChange = useCallback(
    (column: Record<string, any>, value: any, context: any) => {
      setModel((state: Record<string, any>) => ({ ...state, [column.key]: value }))
      const payload = buildPayload(column, value, context)
      _onChange?.(payload)
      if (ignoreSearchOnChangeKeys.includes(column.searchType)) {
        return
      }
      onSearch('change', payload)
    },
    [buildPayload, _onChange, setModel, onSearch, ignoreSearchOnChangeKeys]
  )

  const contents: Record<string, Function> = {
    input: (column: Record<string, any>) => (
      <Input
        value={model[column.key]}
        className="search-item-input search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
        onEnter={(value: any, context: any) => onEnter(column, value, context)}
      />
    ),
    'input-number': (column: Record<string, any>) => (
      <InputNumber
        value={model[column.key]}
        className="search-item-input-number search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        theme={column.props.theme || 'normal'}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
        onEnter={(value: any, context: any) => onEnter(column, value, context)}
      />
    ),
    select: (column: Record<string, any>) => (
      <Select
        value={model[column.key]}
        className="search-item-select search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
        onEnter={(context: any) => onEnter(column, null, context)}
      />
    ),
    'tree-select': (column: Record<string, any>) => (
      <TreeSelect
        value={model[column.key]}
        className="search-item-tree-select search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
        onEnter={(context: any) => onEnter(column, null, context)}
      />
    ),
    cascader: (column: Record<string, any>) => (
      <Cascader
        value={model[column.key]}
        className="search-item-cascader search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
      />
    ),
    'date-picker': (column: Record<string, any>) => (
      <DatePicker
        value={model[column.key]}
        className="search-item-date-picker search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
      />
    ),
    'range-picker': (column: Record<string, any>) => (
      <DateRangePicker
        value={model[column.key]}
        className="search-item-range-picker search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column, value, context)}
      />
    )
  }

  return (
    <Row className={classNames(['search', searchClass])} style={searchStyle} gutter={[16, 16]}>
      {columns.map((column, index) => (
        <Col
          span={column.span || span}
          key={`column_${index}_${column.key}`}
          className={classNames(['search-item', '!flex', '!items-center', column.class])}
        >
          {showLabel && column.label ? (
            <span
              className={classNames([
                'search-item-label',
                'flex-shrink-0',
                'mr-2',
                { 'label-required': column.required }
              ])}
              style={{
                textAlign: labelAlign,
                width: column.labelWidth || labelWidth
              }}
            >
              {column.label}
            </span>
          ) : null}
          {column.render
            ? column.render({
                model,
                column,
                onChange,
                className: classNames(['search-item-component', '!w-full']),
                style: mergeColumnStyle(column.style)
              })
            : contents[column.searchType]?.(column)}
        </Col>
      ))}
      {showBtn && (
        <Col
          {...(btnSpan ? { span: btnSpan } : { flex: '1' })}
          className={classNames(['search-btn', btnClass])}
          style={btnStyle}
        >
          {showLabel && showBtnPlaceholder && (
            <span
              className={classNames(['search-item-label', 'flex-shrink-0', 'mr-2'])}
              style={{ width: btnPlaceholderWidth || labelWidth }}
            ></span>
          )}
          <div
            className={classNames([
              'search-btn-inner',
              'flex',
              '!items-center',
              'gap-4',
              `!justify-${btnAlign}`
            ])}
            style={btnInnerStyle}
          >
            {showSearchBtn && (
              <Button className="search-btn-btn" theme="primary" onClick={onQuery}>
                {searchBtnLabel}
              </Button>
            )}
            {showResetBtn && (
              <Button className="search-btn-btn" theme="default" onClick={onReset}>
                {resetBtnLabel}
              </Button>
            )}
            {extraBtn}
          </div>
        </Col>
      )}
    </Row>
  )
}

function Search(
  props: PropsWithChildren<SearchProps> & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
) {
  const {
    className,
    style,
    card = true,
    cardBordered = false,
    cardBodyStyle = {},
    ...searchProps
  } = props

  return (
    <div className={classNames(['search-wrap', className])} style={style}>
      {card ? (
        <Card
          className="search-card"
          bordered={cardBordered}
          bodyStyle={{ padding: '16px', ...cardBodyStyle }}
        >
          <_Search {...searchProps} />
        </Card>
      ) : (
        <_Search {...searchProps} />
      )}
    </div>
  )
}

export default memo(Search)
