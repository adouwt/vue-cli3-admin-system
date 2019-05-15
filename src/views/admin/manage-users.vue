<template>
  <div class="dashboard-container">
    <h4>用户管理：</h4>
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span >{{roles}}</span></div>
    <div >
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
                <img :src="scope.row.avatar_url" alt="" width="50">
              </template>
          </el-table-column>
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>
          <el-table-column
            label="Role"
            prop="roles">
              <template slot-scope="scope">
                <span v-for="item in scope.row.roles" :key="item" class="role-span">{{item}}</span>
              </template>
          </el-table-column>
          <el-table-column
            v-if="roles[0] === 'admin'"
            align="right"
            label="操作"
            prop="_id">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="scope.row._id"
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

      <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total=totalNumber>
          </el-pagination>
      </div>
      <hr>
      <div v-if="roles[0] === 'admin'">
        <h3>添加用户</h3>
        <div class="add-user">
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userInfo.password" type="txt"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="userInfo.age" type="txt"></el-input>
            </el-form-item>

            <el-form-item label="角色" prop="roles">
              <el-checkbox-group v-model="userInfo.roles">
                <el-checkbox label="dev" name="roles"></el-checkbox>
                <el-checkbox label="admin" name="roles"></el-checkbox>
                <el-checkbox label="boss" name="roles"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="激活用户" prop="delivery">
              <el-switch v-model="userInfo.delivery"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userInfo')">立即创建</el-button>
              <el-button @click="resetForm('userInfo')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
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
                    <el-radio-group v-model="form.roles">
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
import { constants } from 'crypto';
export default {
  name: 'ManageUsers',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
      return {
        tableData: [],
        totalNumber: 20,
        search: '',
        dialogVisible: false,
        dialogFormVisible: false,
        id: '',
        userRole: '',
        userName: '',
        currentUser: '',
        currentRole: '',
        currentId: '',
        form: {},
        userInfo: {
          username: '',
          password: '',
          roles: [],
          delivery: false,
          type: 'signup'
        },
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入6-20位数字、字母、或下划线', trigger: 'blur', pattern: /^(\w){6,20}$/ }
          ],
          age: [
            { required: true, message: '请输入正确的年龄', trigger: 'blur', pattern: /^\d{1,2}$/ }
          ],
          roles: [
            { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData() {
        this.$store
          .dispatch("GetAllUserFromPage", {page: 1})
          .then((res) => {
            this.totalNumber = res.allDataLength
            this.tableData = res.users
          })
          .catch(() => {
            this.loading = false;
          });


      },
      handleEdit(index, row) {
        console.log(row)
        this.dialogFormVisible = true
        this.id = row._id
        this.currentId = row._id
        this.currentUser = row.name
        this.currentRole = row.roles
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
        console.log(this.form.roles, 'this.form.roles')
        if(name === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        } else if(name === 'ok'){
          this.$store
            .dispatch("UpdateSomeOneRole", {id: this.currentId, roles: this.form.roles})
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 注册的接口
            this.$store
                .dispatch("adminRegister", this.userInfo)
                .then((res) => {
                    console.log(res, '添加用户成功') // 这里 res 接收了来自 actions 里面 resolve(response)
                    this.$message({
                      type: 'success',
                      message: '添加用户成功!'
                    });
                    // this.$router.push({ path: "/" }); // 这里会触发permission.js 的路由导航守卫，拉取用户信息等
                    this.initData()
                })
                .catch((err) => {
                    // console.log(err)
                    // this.$message.error(`错误信息${err.message}`);
                });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange(val) {
        console.log(val)
      },
      handleCurrentChange(val) {
        this.$store
          .dispatch("GetAllUserFromPage", {page: val})
          .then((res) => {
            this.tableData = res.users
          })
          .catch(() => {
            this.loading = false;
          });
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
.add-user {
  width: 50%;
}
.role-span {
  margin-right: 15px;
}
</style>
