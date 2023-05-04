export const columns = [
  {
    title: '字段',
    dataIndex: 'field',
    width: '220px'
  },
  {
    title: '字段说明',
    dataIndex: 'description',
    width: '320px'
  },
  {
    title: '统计逻辑',
    dataIndex: 'static',
    scopedSlots: { customRender: 'static' }
  }
]

export const columusData = [
 {
  field: '总音浪(元)',
  description: '总收入/10',
  static: '总收入/10'
 },
 {
  field: '有效开播时长(小时)',
  description: '单场直播≥25min 的开播时长求和',
  static: '有效开播时长的总和(单场直播≥25min 的开播时长)'
 },
 {
  field: '总主播数(人)',
  description: '全部主播数量',
  static: '单日：统计当日的总主播数 ;>1天：统计所选时间内的的去重主播数'
 },
 {
  field: '有效开播主播(人)',
  description: '单次开播≥25min的主播数量',
  static: '单日：统计当日单次开播≥25min的主播数 ;>1天：统计所选时间内的单次开播≥25min的去重主播数'
 },
 {
  field: '新入驻主播(人)',
  description: '新加入公会的主播数量',
  static: '入会时间在所选时间内的主播数'
 },
 {
  field: '新入驻且有效开播主播(人)',
  description: '所选时间加入公会且主播单次开播≥25min的主播数量',
  static: '单日：统计当日加入公会且单次开播≥25min的主播数 ;>1天：所选时间加入公会且单次开播≥25min的去重主播数'
 },
 {
  field: '开播有效天数(日)',
  description: '单场直播>1小时的开播天',
  static: '单场直播>1小时的开播天'
 },
 {
  field: '开播主播(人)',
  description: '开播主播数',
  static: '单日：当日开播主播数 ;>1天：所选时间开播的去重主播数'
 },
 {
  field: '有效开播率(%)',
  description: '有效开播天数≥1的主播数*100%/总主播数',
  static: '单日：当日单场直播>1小时的开播主播数*100%/当日总主播数 ;>1天：所选时间有效开播天数≥1的去重主播数/所选时间去重总主播数'
 },
 {
  field: '新入驻主播有效开播率(%)',
  description: '新入驻且有效开播天数≥1的主播数*100%/新入驻主播数',
  static: '单日：当日加入公会且单场开播>1小时的开播主播数*100%/当日新入驻主播数 ;>1天：所选时间加入公会且有效开播天数≥1的去重主播数/所选时间去重新入驻主播数'
 }
]
