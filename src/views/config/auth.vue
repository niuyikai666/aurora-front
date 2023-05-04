<template>
  <page-header-wrapper class="container">
    <template v-slot:content>
      对权限进行操作
    </template>
    <template v-slot:extraContent>
      <a-button type="primary" class="custom" @click="addPermission">添加权限</a-button>
    </template>
    <div class="content">
      <a-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data-source="tableSource"
      >
      </a-table>
    </div>

    <a-modal
      v-if="visible"
      title="添加权限"
      :width="380"
      :visible="visible"
      @cancel="cancelHandle"
    >
      <template slot="footer">
        <a-button key="cancel" @click="cancelHandle">取 消</a-button>
        <a-button key="create" type="primary" @click="confirmHandle">确 定</a-button>
      </template>
      <div class="d-content">
        <a-form :form="form" :autocomplete="false" class="form">
          <a-form-item label="权限名称">
            <a-input placeholder="请输入" v-decorator="['detail', { rules: [{ required: true, message: '权限名称不能为空' }] }]" />
          </a-form-item>
          <a-form-item label="权限code">
            <a-input placeholder="请输入" v-decorator="['code', { rules: [{ required: true, message: 'code不能为空' }] }]" />
          </a-form-item>
          <a-form-item label="父级ID">
            <a-auto-complete
              v-decorator="['parentId']"
              style="width: 100%"
              placeholder="请选择父级权限"
              option-label-prop="title"
              @search="onSearch"
              @select="onSelect"
            >
              <template slot="dataSource">
                <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
                  <span>{{ item.name }}</span>
                </a-select-option>
              </template>
              <a-input>
                <a-icon slot="suffix" type="search" />
              </a-input>
            </a-auto-complete>
          </a-form-item>
          <a-form-item label="权限类型" >
            <a-select
              v-decorator="['insertType', { rules: [{ required: true, message: '权限类型不能为空' }] }]"
              placeholder="请选择"
            >
              <a-select-option :value="1">
                查看权限
              </a-select-option>
              <a-select-option :value="2">
                操作类型
              </a-select-option>
              <a-select-option :value="3">
                数据类型
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="排序">
            <a-input placeholder="请输入" v-decorator="['indexOrder', { rules: [{ required: true, message: '排序不能为空' }] }]"/>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getPermissons, modifyAuth } from '@/api/personnel'

const columns = [
  {
    title: '权限ID',
    dataIndex: 'id'
  },
  {
    title: '权限名称',
    dataIndex: 'detail'
  },
  {
    title: '权限类型',
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '是否可用',
    dataIndex: 'enabled',
    customRender: (text, row, index) => {
      return text ? '可用' : '不可用'
    }
  },
  {
    title: '是否可选择',
    dataIndex: 'enableCheck',
    customRender: (text, row, index) => {
      return text ? '可选择' : '不可选择'
    }
  }
]

export default {
  name: 'ConfitAuth',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      columns: columns,
      visible: false,
      dataSource: [],
      tableSource: [],
      permissionId: ''
    }
  },
  mounted () {
    this.getPermissonsHandle()
  },
  methods: {
    getPermissonsHandle () {
      getPermissons().then(res => {
        this.tableSource = res
      })
    },
    addPermission () {
      this.visible = true
    },
    cancelHandle () {
      this.visible = false
    },
    confirmHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(values)
          modifyAuth(values).then(() => {
            this.$message.success('创建成功')
            this.getPermissonsHandle()
            this.visible = false
          })
        }
      })
    },

    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.permissionId = data.id
    },
    onSearch (query) {
      clearTimeout(this.timer)
      if (query.trim() === '') return
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    dataSearchHandle (query) {
      getPermissons(query).then(res => {
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = item.detail
            return item
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    /deep/ .ant-pro-page-header-wrap-page-header-warp {
      /deep/ .ant-breadcrumb {
        display: none;
      }
    }
  }
  .auto-complete-dashed {
    /deep/ .ant-select-selection__clear {
      right: 36px;
    }
  }
  .d-content {
    margin-top: -5px;
    .item {
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .d-title,
      .crip {
        font-size: 14px;
        color: rgba(115,115,115, .85);
        .text {
          font-size: 16px;
          color: #755DD7;
          font-weight: 700;
        }
      }
      .d-title {
        margin-bottom: 10px;
      }
      .label {
        color: #595959;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .flex-box {
        border-bottom: solid 1px rgba(0,0,0,.06);
        padding-bottom: 16px;
      }
      .bold {
        color: rgba(0,0,0,.85);
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
</style>
