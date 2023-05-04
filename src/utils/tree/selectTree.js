
// 标准结构数
function generateTree (arr, flag) {
  arr.forEach(item => {
    item['label'] = item.name
    item['value'] = item.id
    if (flag && !item.enabled) {
      item['disabled'] = true
    }
    if (item.children.length <= 0) {
      item.children = undefined
    }
    if (item.children) {
      generateTree(item.children, flag)
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

// flag 如果传入true 则设置元素是否为disabled
function createTree (arr, flag) {
  const tree = toTree(arr)
  const treeData = generateTree(tree, flag)
  return treeData
}

export {
  createTree,
  toTree
}
