import { createColumnsFactory } from '@packages/utils'

// search columns
export const columns: Record<string, any>[] = [
  {
    label: '姓名',
    searchType: 'input',
    key: 'name1',
    props: {
      type: 'text',
      placeholder: '请输入姓名'
    }
  },
  {
    label: '年龄',
    searchType: 'input-number',
    key: 'name2',
    props: {
      placeholder: '请输入年龄'
    }
  },
  {
    label: '爱好',
    searchType: 'select',
    key: 'name3',
    props: {
      options: [
        { name: '玩游戏', codename: 1 },
        { name: '听音乐', codename: 2 }
      ],
      keys: { label: 'name', value: 'codename' },
      placeholder: '请选择爱好'
    }
  },
  {
    label: '城市',
    searchType: 'select',
    key: 'name4',
    props: {
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '成都', value: 'chengdu' }
      ],
      placeholder: '请选择城市'
    }
  },
  {
    label: '性别',
    key: 'name5'
  }
]

export const createSearchColumns = createColumnsFactory(columns)

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

export const createTableColumns = createColumnsFactory(tableColumns, 'colKey')
