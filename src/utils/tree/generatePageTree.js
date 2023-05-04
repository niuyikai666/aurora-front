import createTree from './generateTree'

// 标准结构数
let currId = ''
let expandedId = ''
const expandedKeys = []
const defaultSelectKeys = []
function generateTree (arr) {
  arr.forEach(item => {
    if (item.enabled && expandedId === '') {
      expandedId = item.id
      expandedKeys.push(item.id)
      defaultSelectKeys.push(item.id)
      currId = item.id
    }
    item['title'] = item.name
    item['key'] = item.id
    item['scopedSlots'] = { title: 'custom' }
    item['slots'] = { icon: 'sec' }
    item['disableCheckbox'] = !item.enabled
    item['disabled'] = !item.enabled

    if (item.children) {
      generateTree(item.children)
    }
    return item
  })
  return arr
}

function getTreePageData (data) {
  return {
    treeData: generateTree(createTree(data)),
    expandedKeys: expandedKeys,
    defaultSelectKeys: defaultSelectKeys,
    currId: currId
  }
}

export default getTreePageData
