<template>
  <a-drawer
    class="modal"
    :title="roleId ? '角色修改': '创建角色'"
    :width="776"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <div class="role-content">
      <div class="card-content">
        <a-form layout="inline" :form="form">
          <a-row>
            <a-col :md="24" :sm="24">
              <a-form-item :required="false" class="item-role" label="角色名称">
                <a-input
                  style="width:240px;"
                  v-decorator="['name', {rules: [{ required: true, message: '角色名称不能为空' }, { validator: formatLength }], initialValue: roleName }]"
                  placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <tab-content class="tab-content" :title="item.detail" :titleLine="true" v-for="(item, index) in seeData" :key="index">
          <a-row class="item-content item-content-parent" v-if="item.child">
            <a-col
              class="item-child item-child-parent"
              :md="24"
              v-for="(it, idx) in item.child"
              :key="idx"
            >
              <div class="box box-parent clearfix">
                <a-checkbox :checked="it.isSelected" @change="checkHandle(it.id)" class="check-box" />
                {{ it.detail }}
              </div>
              <a-row class="item-content item-content-child" v-if="it.child.length > 0">
                <a-col
                  class="item-child item-child2"
                  :md="24"
                  v-for="(itChild, idxx) in it.child"
                  :key="idxx"
                >
                  <div class="box">
                    <a-checkbox :checked="itChild.isSelected" @change="checkHandle(itChild.id)" class="check-box" />
                    {{ itChild.detail }}
                  </div>
                  <a-row class="item-content" v-if="itChild.child.length > 0">
                    <a-col
                      class="item-child item-child2"
                      :md="24"
                      v-for="(grandson, idxxx) in itChild.child"
                      :key="idxxx"
                    >
                      <div class="box">
                        <a-checkbox :checked="grandson.isSelected" @change="checkHandle(grandson.id)" class="check-box" />
                        {{ grandson.detail }}
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </tab-content>
      </div>
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="createHandle()">
        {{ roleId ? '确认修改': '确认创建' }}
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { getAuthList, createRole, editRole } from '@/api/system'
import TabContent from './TabContent'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: [Number, String],
      default: 0
    }
  },
  components: {
    TabContent
  },
  data () {
    return {
      form: this.$form.createForm(this),
      roleName: '',
      seeData: []
    }
  },

  methods: {
    onClose () {
      this.roleName = ''
      this.seeData = []
      this.form.resetFields()
      this.$emit('cancel')
    },

    formatLength (rule, value, callback) {
      if (value && value.trim() === '') {
        callback(new Error('角色名称不能为空'))
      } else if (value && value.trim().length > 20) {
        callback(new Error('角色名称不能超过20个字符'))
      } else {
        callback()
      }
    },

    // 获取权限详情
    getAuthData () {
      this.getAuthHandle(1).then(res => {
        this.seeData = res.permissionTreeDTOS
        this.roleName = res.roleName
      })
    },

    getAuthHandle (type) {
      return getAuthList({
        roleIds: this.roleId,
        type: type
      }).then(res => {
        return res
      })
    },

    checkHandle (id) {
      this.seeData = this.checkFilter(this.seeData, id)
    },

    // 过滤选中id
    checkFilter (data, id) {
      data.forEach((item, pIndex) => {
        item.child.forEach((it, cIndex) => {
          if (it.id === id) {
            it.isSelected = !it.isSelected
            this.setChildSelect(pIndex, cIndex, it.isSelected)
          }
          it.child.forEach((itx, gIndex) => {
            if (itx.id === id) {
              itx.isSelected = !itx.isSelected
              this.setParentSelect(pIndex, cIndex)
              this.setGrandSelect(pIndex, cIndex, gIndex, itx.isSelected)
            }
            itx.child.forEach((itxx, ggIndex) => {
              if (itxx.id === id) {
                itxx.isSelected = !itxx.isSelected
                this.setParentSelect2(pIndex, cIndex, gIndex)
              }
            })
          })
        })
      })

      return data
    },

    // 父级连选子级
    setChildSelect (pIndex, cIndex, checked) {
      this.seeData = this.setChildSelectDo(this.seeData, pIndex, cIndex, checked)
    },

    setChildSelectDo (data, pIndex, cIndex, checked) {
      data[pIndex].child[cIndex].child.forEach(item => {
        if (checked) {
          item.isSelected = true
        } else {
          item.isSelected = false
        }
        if (item.child.length > 0) {
          item.child.forEach(it => {
            if (checked) {
              it.isSelected = true
            } else {
              it.isSelected = false
            }
          })
        }
      })

      return data
    },

    // 父级连选子级
    setGrandSelect (pIndex, cIndex, gIndex, checked) {
      this.seeData = this.setGrandSelectDo(this.seeData, pIndex, cIndex, gIndex, checked)
    },

    setGrandSelectDo (data, pIndex, cIndex, gIndex, checked) {
      data[pIndex].child[cIndex].child[gIndex].child.forEach(item => {
        if (checked) {
          item.isSelected = true
        } else {
          item.isSelected = false
        }
        if (item.child.length > 0) {
          item.child.forEach(it => {
            if (checked) {
              it.isSelected = true
            } else {
              it.isSelected = false
            }
          })
        }
      })

      return data
    },

    // 子级连选父级
    setParentSelect (pIndex, cIndex) {
      const flag = this.hasChildChecked(this.seeData, pIndex, cIndex)
      if (flag) {
        this.seeData[pIndex].child[cIndex].isSelected = true
      } else {
        this.seeData[pIndex].child[cIndex].isSelected = false
      }

      // this.setChildSelect(pIndex, cIndex, flag)
    },

    setParentSelect2 (pIndex, cIndex, gIndex) {
      const flag = this.hasChildChecked2(this.seeData, pIndex, cIndex, gIndex)
      if (flag) {
        this.seeData[pIndex].child[cIndex].child[gIndex].isSelected = true
      } else {
        this.seeData[pIndex].child[cIndex].child[gIndex].isSelected = false
      }

      const flag2 = this.hasChildChecked(this.seeData, pIndex, cIndex)
      if (flag2) {
        this.seeData[pIndex].child[cIndex].isSelected = true
      } else {
        this.seeData[pIndex].child[cIndex].isSelected = false
      }
    },
    // 判断子集是否有选中项
    hasChildChecked (data, pIndex, cIndex) {
      const checkedArr = data[pIndex].child[cIndex].child.filter(item => item.isSelected)
      return checkedArr.length > 0
    },
    hasChildChecked2 (data, pIndex, cIndex, gIndex) {
      const checkedArr = data[pIndex].child[cIndex].child[gIndex].child.filter(item => item.isSelected)
      return checkedArr.length > 0
    },

    createAuthIds (data) {
      const arr = []
      data.forEach(item => {
        item.child.forEach(it => {
          if (it.isSelected) {
            arr.push(it.id)
          }
          it.child.forEach(itx => {
            if (itx.isSelected) {
              arr.push(itx.id)
            }
            itx.child.forEach(itxx => {
              if (itxx.isSelected) {
                arr.push(itxx.id)
              }
            })
          })
        })
      })

      return arr
    },

    createHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const authIds = this.createAuthIds(this.seeData)
          const model = {
            name: values.name,
            permissionIds: authIds
          }
          if (this.roleId) {
            const data = {
              ...model,
              id: this.roleId
            }
            this.editRoleHandle(data)
          } else {
            this.createRoleHandle(model)
          }
        }
      })
    },

    createRoleHandle (data) {
      createRole(data).then(() => {
        this.optSuccess('创建成功')
      })
    },
    editRoleHandle (data) {
      editRole(data).then(() => {
        this.optSuccess('修改成功')
      })
    },
    optSuccess (msg) {
      this.$message.success(msg)
      this.$emit('success')
      this.onClose()
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getAuthData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .modal {
    /deep/ .ant-modal-body {
      padding: 0;
    }
    /deep/ .ant-card-head {
      border-bottom: 0;
      .ant-tabs-bar {
        border-bottom: 0;
      }
    }
    .item-role {
      height: 60px;
      &.ant-form-item-with-help {
        margin-bottom: 0;
      }
      /deep/ .ant-form-item-label {
        font-weight: 700;
      }
    }
    .tab-content {
      /deep/ h1 {
        margin-bottom: 15px;
      }
    }
    .item-content {
      padding: 0 25px;
      .check-box {
        margin-right: 5px;
      }
    }
    .item-content-child {
      .item-child {
        margin-top: 8px;
      }
    }
    .item-child-parent {
      margin-bottom: 20px;
      .box-parent {
        font-weight: 700;
      }
    }
    .item-child2 {
      float: left;
      width: auto !important;
      margin-right: 24px;
    }
  }
</style>
