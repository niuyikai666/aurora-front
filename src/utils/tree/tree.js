
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
function toTree (data) {
  const arr = []
  var temp = 1
  function createTree (id, array, list) {
    if (id > 500) return
    var newArr = list.filter(item => item.parentId === id)
    if (newArr.length <= 0) {
      temp = temp + 1
      if (!checkExist(list, temp)) {
        createTree(temp, arr, list)
      } else {
        temp = temp + 1
        if (!checkExist(list, temp)) {
          createTree(temp, arr, list)
        }
      }
      return array
    } else {
      newArr.forEach(item => {
        const arr = []
        item.children = createTree(item.id, arr, list)
        array.push(item)
      })
      return array
    }
  }
  createTree(temp, arr, data)
  return arr
}
function checkExist (data, id) {
  var ids = []
  for (var i = 0; i < data.length; i++) {
    ids.push(data[i].id)
  }
  if (ids.indexOf(id) > -1) {
    return true
  } else {
    return false
  }
}

function createTree (arr) {
  const tree = toTree(arr)
  const treeData = generateTree(tree)
  return {
    treeData: treeData,
    expandedKeys: expandedKeys,
    defaultSelectKeys: defaultSelectKeys,
    currId: currId
  }
}

export default createTree
