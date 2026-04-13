import type { Property } from 'csstype'
import type { PropsWithChildren, HTMLAttributes, ReactNode } from 'react'
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
  Button
} from 'antd'
import classNames from 'classnames'
import { memo } from 'react'
import { typeOf } from '@packages/utils'

interface SearchProps {
  card?: boolean
  span?: number
  searchClass?: string
  searchStyle?: React.CSSProperties
  columns: Record<string, any>[]
  model: Record<string, any>
  setModel: Function
  labelAlign?: Property.TextAlign // left | right
  labelWidth?: string // auto | px
  showLabel?: boolean
  componetStyle?: React.CSSProperties
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
  onEnter?: (...args: any) => {}
  onChange?: (...args: any) => {}
  onSearch?: (...args: any) => {}
  onReset?: (...args: any) => {}
}

type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'range-picker'

function _Search(
  props: PropsWithChildren<SearchProps> & HTMLAttributes<HTMLDivElement>
) {
  const {
    span = 6,
    searchClass = '',
    searchStyle = {},
    columns = [],
    model = {},
    setModel,
    labelAlign = 'right',
    labelWidth = 'auto',
    showLabel = true,
    componetStyle = {},
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
    return Object.assign({}, componetStyle, ...styles.filter(Boolean))
  }

  const parseValue = (value: string, number: true) => {
    return number ? parseInt(value) : value
  }

  const onChange = (key: string, value: any) => {
    setModel((state: Record<string, any>) => ({ ...state, [key]: value }))
    _onChange?.(key, value, { ...model, [key]: value })
  }

  const onSearch = () => {
    _onSearch?.(model)
  }

  const onReset = () => {
    _onReset?.(model)
  }

  const onPressEnter = (e: any, key: string) => {
    _onEnter?.(key, e.target.value, model)
  }

  const getSelectOptions = (column: Record<string, any>) => {
    if (typeOf(column.options) === 'array') {
      return column.options.map(
        (option: Record<string, any>, optionIndex: number) => (
          <Select.Option
            key={optionIndex}
            value={option[column.valueKey || 'value']}
          >
            {option[column.labelKey || 'label']}
          </Select.Option>
        )
      )
    }

    if (typeOf(column.options) === 'object') {
      return Object.entries(column.options).map(([value, label]: any) => (
        <Select.Option
          key={value}
          value={parseValue(value, column.int || true)}
        >
          {label}
        </Select.Option>
      ))
    }
  }

  const contents: Record<string, Function> = {
    input: (column: Record<string, any>) => (
      <Input
        value={model[column.key]}
        className="search-item-input search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        allowClear={column.allowClear}
        type={column.type}
        maxLength={column.maxLength}
        placeholder={column.placeholder}
        onChange={e => onChange(column.key, e.target.value)}
        onPressEnter={(e: any) => onPressEnter(e, column.key)}
      />
    ),
    'input-number': (column: Record<string, any>) => (
      <InputNumber
        value={model[column.key]}
        className="search-item-input-number search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        min={column.min}
        max={column.max}
        precision={column.precision}
        decimalSeparator={column.decimalSeparator}
        step={column.step}
        placeholder={column.placeholder}
        onChange={value => onChange(column.key, value)}
        onPressEnter={(e: any) => onPressEnter(e, column.key)}
      />
    ),
    select: (column: Record<string, any>) => (
      <Select
        value={model[column.key]}
        className="search-item-select search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        allowClear={column.allowClear}
        mode={column.mode}
        showSearch={column.showSearch}
        labelInValue={column.labelInValue || false}
        placeholder={column.placeholder}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onChange={value => onChange(column.key, value)}
      >
        {getSelectOptions(column)}
      </Select>
    ),
    'tree-select': (column: Record<string, any>) => (
      <TreeSelect
        value={model[column.key]}
        className="search-item-tree-select search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        placeholder={column.placeholder}
        fieldNames={
          column.fieldNames || {
            children: 'children',
            key: 'key',
            value: 'value'
          }
        }
        treeData={column.treeData}
        treeCheckable={column.treeCheckable}
        multiple={column.multiple}
        allowClear={column.allowClear}
        showSearch={column.showSearch}
        showCheckedStrategy={column.showCheckedStrategy}
        treeDefaultExpandAll={column.treeDefaultExpandAll}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onChange={value => onChange(column.key, value)}
      />
    ),
    cascader: (column: Record<string, any>) => (
      <Cascader
        value={model[column.key]}
        className="search-item-cascader search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        allowClear={column.allowClear}
        fieldNames={
          column.fieldNames || {
            label: 'label',
            value: 'value',
            children: 'children'
          }
        }
        options={column.options}
        placeholder={column.placeholder}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        onChange={(value: any) => onChange(column.key, value)}
      />
    ),
    'date-picker': (column: Record<string, any>) => (
      // YYYY-MM-DD HH:mm:ss
      <DatePicker
        value={model[column.key]}
        className="search-item-date-picker search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        allowClear={column.allowClear}
        format={column.format || 'YYYY-MM-DD'}
        showTime={column.showTime}
        placeholder={column.placeholder}
        onChange={value => onChange(column.key, value)}
      />
    ),
    'range-picker': (column: Record<string, any>) => (
      <DatePicker.RangePicker
        value={model[column.key]}
        className="search-item-range-picker search-item-component w-full"
        style={mergeColumnStyle(column.style)}
        allowClear={column.allowClear}
        format={column.format || 'YYYY-MM-DD'}
        showTime={column.showTime}
        placeholder={column.placeholder}
        onChange={value => onChange(column.key, value)}
      />
    )
  }

  return (
    <Row
      className={classNames(['search', searchClass])}
      style={searchStyle}
      gutter={[16, 16]}
    >
      {columns.map((column, index) => (
        <Col
          span={column.span || span}
          key={`column${column.index || index}`}
          className={classNames([
            'search-item',
            'flex',
            'items-center',
            column.class
          ])}
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
            ? column.render({ model, column, onChange })
            : contents[column.searchType]?.(column)}
        </Col>
      ))}
      {showBtn && (
        <Col
          flex="1"
          className={classNames(['search-btn', btnClass])}
          style={btnStyle}
        >
          {showLabel && showBtnPlaceholder && (
            <span
              className={classNames([
                'search-item-label',
                'flex-shrink-0',
                'mr-2'
              ])}
              style={{ width: btnPlaceholderWidth || labelWidth }}
            ></span>
          )}
          <div
            className={classNames([
              'search-btn-inner',
              'flex',
              'items-center',
              'gap-4',
              `justify-${btnAlign}`
            ])}
            style={btnInnerStyle}
          >
            {showSearchBtn && (
              <Button
                className="search-btn-btn"
                type="primary"
                onClick={onSearch}
              >
                查询
              </Button>
            )}
            {showResetBtn && (
              <Button className="search-btn-btn" onClick={onReset}>
                重置
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
  props: PropsWithChildren<SearchProps> & HTMLAttributes<HTMLDivElement>
) {
  const { className, card = true } = props

  return card ? (
    <Card
      className={classNames(['search-card', 'search-wrap', className])}
      styles={{ body: { padding: '20px' } }}
    >
      <_Search {...props} />
    </Card>
  ) : (
    <div className={classNames(['search-wrap', className])}>
      <_Search {...props} />
    </div>
  )
}

export default memo(Search)
