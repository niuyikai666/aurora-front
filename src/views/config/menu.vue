<template>
  <page-header-wrapper class="container">
    <template v-slot:content>
      对菜单进行操作
    </template>
    <template v-slot:extraContent>
      <a-button type="primary" class="custom" @click="addPermission">添加菜单</a-button>
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
      title="添加菜单"
      :width="400"
      :visible="visible"
      @cancel="cancelHandle"
    >
      <template slot="footer">
        <a-button key="cancel" @click="cancelHandle">取 消</a-button>
        <a-button key="create" type="primary" @click="confirmHandle">确 定</a-button>
      </template>
      <div class="d-content">
        <a-form :form="form" :autocomplete="false" class="form">
          <a-form-item label="菜单名称">
            <a-input placeholder="请输入" v-decorator="['detail', { rules: [{ required: true, message: '权限名称不能为空' }] }]" />
          </a-form-item>
          <a-form-item label="路径">
            <a-input placeholder="请输入" v-decorator="['path', { rules: [{ required: true, message: '路径不能为空' }] }]" />
          </a-form-item>
          <a-form-item label="父级">
            <a-select v-decorator="['parentId']">
              <a-select-option v-for="(item, index) in tableSource" :key="index" :value="item.id">
                {{ item.detail }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="权限ID">
            <a-auto-complete
              v-decorator="['permissionId']"
              style="width: 100%"
              placeholder="请选择权限"
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
          <a-form-item label="位置">
            <a-radio-group v-decorator="['position', { rules: [{ required: true, message: '位置不能为空' }] }]">
              <a-radio :style="radioStyle" :value="1">
                左侧
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                顶部
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="是否为公共页面">
            <a-radio-group v-decorator="['commonPage', { rules: [{ required: true, message: '是否为公共页面不能为空' }] }]">
              <a-radio :style="radioStyle" :value="true">
                是
              </a-radio>
              <a-radio :style="radioStyle" :value="false">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="排序">
            <a-input placeholder="请输入" v-decorator="['indexs', { rules: [{ required: true, message: '排序不能为空' }] }]"/>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getMenus, createMenu, getPermissons } from '@/api/personnel'

const columns = [
  {
    title: '菜单ID',
    dataIndex: 'id'
  },
  {
    title: '菜单名称',
    dataIndex: 'detail'
  },
  {
    title: '路径',
    dataIndex: 'path'
  },
  {
    title: '位置',
    dataIndex: 'position',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '是否公共页面',
    dataIndex: 'commonPage',
    customRender: (text, row, index) => {
      return text ? '是' : '否'
    }
  }
  // {
  //   title: '权限类型',
  //   dataIndex: 'type',
  //   customRender: (text, row, index) => {
  //     return text.msg
  //   }
  // }
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
      getMenus().then(res => {
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
          createMenu(values).then(() => {
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
