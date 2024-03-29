import { useCreateColumns } from '@packages/hooks'

// search columns
export const columns: Record<string, any>[] = [
  {
    label: '姓名',
    searchType: 'input',
    type: 'text',
    key: 'name1',
    allowClear: true,
    placeholder: '请输入姓名'
  },
  {
    label: '年龄',
    searchType: 'input',
    type: 'number',
    key: 'name2',
    allowClear: true,
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
    key: 'name3',
    allowClear: true,
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
    key: 'name4',
    allowClear: true,
    placeholder: '请选择城市'
  },
  {
    label: '性别',
    key: 'name5'
  }
]

export const createColumns = useCreateColumns(columns)

// table columns
const tableColumns: Record<string, any>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    defaultSortOrder: null,
    sorter: (a: Record<string, any>, b: Record<string, any>) => a.age - b.age
  },
  {
    title: '爱好',
    dataIndex: 'hobby',
    key: 'hobby'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 150
  }
]

export const createTableColumns = useCreateColumns(tableColumns)
