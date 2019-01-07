<template>
  <div class="dashboard-container">
    <h4>用户管理：</h4>
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span >{{role}}</span></div>
    <div v-if="role === 'admin' || role === 'boss'">
      <h3>所有用户</h3>
      <div>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="头像"
            prop="avatar_url" 
            width="120">
              <template slot-scope="scope">
                <img :src="scope.row.avatar_url" alt="" width="100">
              </template>
          </el-table-column>
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>
          <el-table-column
            label="Role"
            prop="role">
          </el-table-column>
          <el-table-column
            label="密码"
            prop="password" 
            >
          </el-table-column>
          <el-table-column
            v-if="role === 'admin'"
            align="right"
            label="操作"
            prop="_id">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope" >
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
        <el-dialog title="修改角色" :visible.sync="dialogFormVisible"
        width="30%"
        center>
          <div>
            <span>姓名：<b>{{currentUser}}</b></span>
            <div class="role-wrapper">
                <p>当前角色：<b>{{currentRole}}</b></p>
                <span>修改：</span>
                <el-form ref="form" :model="form">
                  <el-form-item>
                    <el-radio-group v-model="form.role">
                      <el-radio label="admin"></el-radio>
                      <el-radio label="boss"></el-radio>
                      <el-radio label="dev"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="edited('cancel')">取 消</el-button>
            <el-button type="primary" @click="edited('ok')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog, notify, MessageBox } from 'element-ui'
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
        userName: '',
        currentUser: '',
        currentRole: '',
        currentId: '',
        form: {}
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
              this.tableData = res.users
            })
            .catch(() => {
              this.loading = false;
            });
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.id = row._id
        this.currentId = row._id
        this.currentUser = row.name
        this.currentRole = row.role
      },
      handleDelete(index, row) {
        this.handleClose(row._id)
      },
      handleClose(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '放弃删除',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store
            .dispatch("DeleteOneUser", {id:id})
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.initData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
        });
      },
      edited (name) {
        this.dialogFormVisible = false
        if(name === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        } else if(name === 'ok'){
          this.$store
            .dispatch("UpdateSomeOneRole", {id: this.currentId, role: this.form.role})
            .then((res) => {
              this.initData()
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            })
            .catch(() => {
              this.$message({
                  type: 'warning',
                  message: '修改失败，请稍后再试!'
              });
            });
          
        }
        
      },
      handleSelectionChange () {
        console.log(1)
      }
    }
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
.role-wrapper {
  label {
    // margin-right: 2em;
    // cursor: pointer;
  }
}
</style>
