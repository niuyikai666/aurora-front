// 外站优质任务暂停规则
export const columnsOuter = [
  {
    title: '年月',
    dataIndex: 'date'
  },
  {
    title: '外站优质任务是否暂停',
    dataIndex: 'skip',
    customRender: (text, row, index) => {
      return text === 1 ? '是' : '否'
    }
  }
]
