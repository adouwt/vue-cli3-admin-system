<template>
  <div class="pd-md">
      <p>
        个人中心
      </p>

      <div class="flex">
        <div class="">
            <div class="avatar">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-change="onchange"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" width="200" height="200">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </div>
        </div>
        <div class="msg">
            <div>
                <span>姓名： 而恶</span>
                <span>角色： 管理员</span>
            </div>
            <p>注册已经有 <i>12</i> 个月</p>
            <ul>
                <li>ff</li>
                <li>ff</li>
                <li>ff</li>
                <li>ff</li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Layout from '../layout/Layout'
import { constants } from 'crypto';
export default {
    data () {
        return {
            imageUrl: 'http://p3.pstatp.com/large/pgc-image/15337177846531748ac16fb'
        }
    },
    components: {
        Layout
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res)
            console.log(file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(file)
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onchange(file,fileList){
          var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader(); 
            //转base64
            reader.onload = function(e) {
                _this.imageUrl = e.target.result //将图片路径赋值给src
            }
            reader.readAsDataURL(file);
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .pd-md {
        padding: 0 20px;
    }
    .flex {
        display: flex;
        justify-content: flex-start;
        >div {
            
        }
        .avatar {
            margin-right: 30px;
            position: relative;
            img {
                width: 100;
                border-radius: 50%;
            }
        }
        .msg {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

        }
        
    }


    .el-upload-dragger {
        width: 100px;
        height: 40px;
        line-height: 40px;
        position: relative;
        top: -43px;
        left: 45px;
    }

</style>
