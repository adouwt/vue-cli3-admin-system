<template>
  <div class="dashboard-container">
    <h4>用户管理：</h4>
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span v-for="role in role" >{{role}}</span></div>
    <div v-if="role === 'admin' || role === 'boss'">
      <h3>所有用户</h3>
      <div>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="avatar_url"
            prop="avatar_url">
          </el-table-column>
          <el-table-column
            label="name"
            prop="name">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            prop="_id">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope" v-if="role === 'admin'">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                :id="scope._id"
                @click="handleDelete(scope._id, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 删除弹框的提示 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        center
        :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑用户的弹框 -->
    <div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible"
        width="30%"
        center>
          <div>
            <span>姓名：{{name}}</span>:
            <div>
                <p>角色：</p>
                  <input type="radio" name="roles" value= "管理员">管理员
                  <input type="radio" name="roles" value= "Boss">Boss
                  <input type="radio" name="roles" value= "普通开发">普通开发
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog, notify, From } from 'element-ui'
export default {
  name: 'ManageUsers',
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
  },
  data() {
      return {
        tableData: [],
        search: '',
        dialogVisible: false,
        dialogFormVisible: false,
        id: '',
        userRole: '',
        userName: ''
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData() {
        this.$store
            .dispatch("GetAllUser", {})
            .then((res) => {
              console.log(res)
              this.tableData = res.users
            })
            .catch(() => {
              this.loading = false;
            });
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.id = row._id
        this.userName = row.name
        console.log(row._id)
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.handleClose(row._id)
      },
      handleClose(id) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.$store
            .dispatch("DeleteOneUser", {id:id})
            .then((res) => {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                });
                this.initData()
            })
            .catch(() => {
              this.loading = false;
            });
          })
          .catch(_ => {
            this.$notify.error({
              title: '取消',
              message: '取消删除'
            });
          });
      }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
