import type { Property } from 'csstype'
import type { PropsWithChildren, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { memo } from 'react'
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
import { typeOf } from '@packages/utils'

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
  onEnter?: (...args: any) => unknown
  onChange?: (...args: any) => unknown
  onSearch?: (...args: any) => unknown
  onReset?: (...args: any) => unknown
  [key: string]: any
}

function _Search(
  props: PropsWithChildren<SearchProps> & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
) {
  const {
    span = 3,
    searchClass = '',
    searchStyle = {},
    columns = [],
    model = {},
    setModel,
    labelAlign = 'right',
    labelWidth = 'auto',
    showLabel = true,
    componentStyle = {},
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
    onEnter: _onEnter,
    onChange: _onChange,
    onSearch: _onSearch,
    onReset: _onReset
  } = props

  const mergeColumnStyle = (...styles: any[]) => {
    return Object.assign({}, componentStyle, ...styles.filter(Boolean))
  }

  const onChange = (key: string, value: any, context: any) => {
    setModel((state: Record<string, any>) => ({ ...state, [key]: value }))
    _onChange?.(key, value, { ...model, [key]: value }, context)
  }

  const onSearch = () => {
    _onSearch?.()
  }

  const onReset = () => {
    _onReset?.()
  }

  const onEnter = (key: string, value: any, context: any) => {
    _onEnter?.(key, value, { ...model, [key]: value }, context)
  }

  const contents: Record<string, Function> = {
    input: (column: Record<string, any>) => (
      <Input
        value={model[column.key]}
        className="search-item-input search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        showLimitNumber={column.props?.showLimitNumber !== false}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
        onEnter={(value: any, context: any) => onEnter(column.key, value, context)}
      />
    ),
    'input-number': (column: Record<string, any>) => (
      <InputNumber
        value={model[column.key]}
        className="search-item-input-number search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        theme={column.props?.theme || 'normal'}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
        onEnter={(value: any, context: any) => onEnter(column.key, value, context)}
      />
    ),
    select: (column: Record<string, any>) => (
      <Select
        value={model[column.key]}
        className="search-item-select search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
        onEnter={(context: any) => onEnter(column.key, null, context)}
      />
    ),
    'tree-select': (column: Record<string, any>) => (
      <TreeSelect
        value={model[column.key]}
        className="search-item-tree-select search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
        onEnter={(context: any) => onEnter(column.key, null, context)}
      />
    ),
    cascader: (column: Record<string, any>) => (
      <Cascader
        value={model[column.key]}
        className="search-item-cascader search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
      />
    ),
    'date-picker': (column: Record<string, any>) => (
      <DatePicker
        value={model[column.key]}
        className="search-item-date-picker search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
      />
    ),
    'range-picker': (column: Record<string, any>) => (
      <DateRangePicker
        value={model[column.key]}
        className="search-item-range-picker search-item-component !w-full"
        style={mergeColumnStyle(column.style)}
        clearable={column.props?.clearable !== false}
        {...column.props}
        onChange={(value: any, context: any) => onChange(column.key, value, context)}
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
              <Button className="search-btn-btn" theme="primary" onClick={onSearch}>
                {searchBtnLabel}
              </Button>
            )}
            {showResetBtn && (
              <Button className="search-btn-btn" onClick={onReset}>
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
