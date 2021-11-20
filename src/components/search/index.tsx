import { memo } from 'react'
import type { PropsWithChildren, HTMLAttributes, ReactNode } from 'react'
import type { Property } from 'csstype'
import {
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
import { typeOf } from '@/utils'

interface SearchProps {
  card?: boolean
  columns: Record<string, any>[]
  model: Record<string, any>
  setModel: Function
  labelAlign?: Property.TextAlign // left | right
  labelWidth?: string // auto | px
  showSearchBtn?: boolean
  showResetBtn?: boolean
  showBtn?: boolean
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
    columns = [],
    model = {},
    setModel,
    labelAlign = 'right',
    labelWidth = 'auto',
    showSearchBtn = true,
    showResetBtn = true,
    showBtn = true,
    extraBtn,
    onEnter: _onEnter,
    onChange: _onChange,
    onSearch: _onSearch,
    onReset: _onReset
  } = props

  const parseValue = (value: string, int: true) => {
    // eslint-disable-next-line
    return int ? parseInt(value) : value
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
        className="input !w-240px"
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
        className="input !w-240px"
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
        className="select !w-240px"
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
        className="select !w-240px"
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
        className="select !w-240px"
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
        className="datepicker  !w-240px"
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
        className="datepicker !w-240px"
        allowClear={column.allowClear}
        format={column.format || 'YYYY-MM-DD'}
        showTime={column.showTime}
        placeholder={column.placeholder}
        onChange={value => onChange(column.key, value)}
      />
    )
  }

  return (
    <div
      className={classNames(['search', 'flex', 'flex-wrap', 'items-center'])}
    >
      {columns.map((column, index) => (
        <div
          key={`column${index}`}
          className={classNames([
            'search-item',
            'mr-20px',
            'mb-4',
            column.class ? column.class : ''
          ])}
        >
          {column.label ? (
            <span
              className={classNames([
                'label',
                { 'label-required': column.required },
                'inline-block',
                'mr-2'
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
        </div>
      ))}
      {showBtn && (
        <div className="search-item search-btn mb-4 mr-0 ml-auto space-x-4">
          {showSearchBtn && (
            <Button type="primary" onClick={onSearch}>
              查询
            </Button>
          )}
          {showResetBtn && <Button onClick={onReset}>重置</Button>}
          {extraBtn}
        </div>
      )}
    </div>
  )
}

function Search(
  props: PropsWithChildren<SearchProps> & HTMLAttributes<HTMLDivElement>
) {
  const { className, card = true } = props

  return (
    <div className={classNames('search-wrap', className)}>
      {card ? (
        <Card bodyStyle={{ padding: '20px 24px 4px' }}>
          <_Search {...props} />
        </Card>
      ) : (
        <_Search {...props} />
      )}
    </div>
  )
}

export default memo(Search)
