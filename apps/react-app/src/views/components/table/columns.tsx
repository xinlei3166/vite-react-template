import { createColumnsFactory } from '@packages/utils'

// search columns
export const columns: Record<string, any>[] = [
  {
    label: '姓名',
    searchType: 'input',
    type: 'text',
    colKey: 'name1',
    clearable: true,
    placeholder: '请输入姓名'
  },
  {
    label: '年龄',
    searchType: 'input',
    type: 'number',
    colKey: 'name2',
    clearable: true,
    placeholder: '请输入年龄'
  },
  {
    label: '爱好',
    searchType: 'select',
    mode: undefined, // multiple | tags
    options: {
      1: '玩游戏',
      2: '听音乐'
    },
    colKey: 'name3',
    clearable: true,
    placeholder: '请选择爱好'
  },
  {
    label: '城市',
    searchType: 'select',
    mode: undefined, // multiple | tags
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '成都', value: 'chengdu' }
    ],
    colKey: 'name4',
    clearable: true,
    placeholder: '请选择城市'
  },
  {
    label: '性别',
    colKey: 'name5'
  }
]

export const createColumns = createColumnsFactory(columns)

// table columns
const tableColumns: Record<string, any>[] = [
  {
    title: 'ID',
    colKey: 'id'
  },
  {
    title: '姓名',
    colKey: 'name'
  },
  {
    title: '年龄',
    colKey: 'age',
    defaultSortOrder: null,
    sorter: (a: Record<string, any>, b: Record<string, any>) => a.age - b.age
  },
  {
    title: '爱好',
    colKey: 'hobby'
  },
  {
    title: '更新时间',
    colKey: 'updateTime'
  },
  {
    title: '操作',
    colKey: 'operation',
    width: 150
  }
]

export const createTableColumns = createColumnsFactory(tableColumns)
