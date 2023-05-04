/**
 *
 * @param {*} departments 部门列表
 * @param {*} flag // 如果传入true 则设置元素是否为disabled
 * @returns Arr
 */
function createTree (departments, flag) {
  // root虚拟根
  var root = { 'children': [] }
  var dptMap = {}
  var dpt = {}
  for (var i = departments.length - 1; i >= 0; i--) {
    dpt = departments[i]
    dptMap[dpt['id']] = dpt
  }

  for (var k = departments.length - 1; k >= 0; k--) {
    dpt = departments[k]
    dpt['label'] = dpt.name
    dpt['value'] = dpt.id
    if (flag && !dpt.enabled) {
      dpt['disabled'] = true
    }
    // 多根与无根节点
    if (!dptMap[dpt['parentId']]) {
      root['children'].push(dpt)
      continue
    }
    if (!dptMap[dpt['parentId']]['children']) {
      dptMap[dpt['parentId']]['children'] = []
    }
    if (!dptMap[dpt['parentId']]['children'].includes(dpt)) {
      dptMap[dpt['parentId']]['children'].push(dpt)
    }
  }

  return root.children.reverse()
}

export default createTree
