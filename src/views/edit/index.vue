<template>
  <div class="app-container">
    <el-form ref="article" :model="article" label-width="85px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <vue-editor v-model="article.content"></vue-editor>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.topping"></el-switch>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-checkbox-group v-model="article.type">
          <el-checkbox label="技术" name="type"></el-checkbox>
          <el-checkbox label="小说" name="type"></el-checkbox>
          <el-checkbox label="八卦" name="type"></el-checkbox>
          <el-checkbox label="艺术" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="roles.indexOf('admin')>-1 || roles.indexOf('boss')>-1">发布</el-button>
        <el-button @click="onSave">保存草稿</el-button>
        <el-button @click="testMethods">保存草稿ceshi</el-button>
      </el-form-item>

      <div>
        <h3>下面是tinymce</h3>
        <div>
          <editor v-model="content"></editor>
          <hr>
          <el-button @click="onSave">tinymce保存草稿</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import Editor from '@tinymce/tinymce-vue';
import { mapGetters } from 'vuex';
import './test.js';
export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      article: {
        title: '',
        type: [],
      },
      content: '<div><div>134567890</div></div>'
    }
  },
  components: {
    VueEditor,
    Editor
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onSave() {
      this.$message({
        message: 'save!!!!!  ok',
        type: 'warning'
      })
    },
    testMethods() {
      add();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
label{
  text-align: left;
}
.el-form-item__label {
  text-align: left;
}
.tox-notification.tox-notification--in.tox-notification--warning {
  display: none;
}
</style>

