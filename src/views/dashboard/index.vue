<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">role:<span>{{role}}</span></div>
    <h4>按钮权限限制</h4>
    <div v-if="role === 'admin'">
      <el-button>admin</el-button>
      <el-button type="primary">admin</el-button>

    </div>
    <div v-if="role === 'dev'">
      <el-button type="success">dev</el-button>
      <el-button type="danger">dev</el-button>
    </div>
    <div v-if="role === 'boss'">
      <el-button type="success">boss</el-button>
      <el-button type="danger">boss</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
  },
  created () {

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
</style>
