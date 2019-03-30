<template>
    <div class="login-container">
        <el-form class="login-form" autoComplete="on" :model="registerForm" :rules="loginRules" ref="registerForm" label-position="left">
            <h3 class="title">vue-cli3 admin--注册</h3>
            <el-form-item prop="username">
                <span class="fontcontainer">
                    <span class="iconfont icon-yonghu"></span>
                </span>
                <!-- <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span> -->
                <el-input name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="fontcontainer">
                    <span class="iconfont icon-mima"></span>
                </span>
                <!-- <span class="svg-container">
                <svg-icon icon-class="password"></svg-icon>
                </span> -->
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="registerForm.password" autoComplete="on"
                placeholder="password"></el-input>
                <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
                <span class="show-pwd iconfont icon-yanjing" @click="showPwd"></span>
            </el-form-item>

            <el-form-item prop="email"  ref="email">
                <span class="fontcontainer">
                    <span class="iconfont icon-mima"></span>
                </span>
                <el-input name="email" type="email" @keyup.enter.native="handleLogin" v-model="registerForm.email" autoComplete="on"
                placeholder="请输入邮箱地址 email"></el-input>
                <el-button type="primary"  :disabled="disabled" style="width:100%;" :loading="loading" @click.native.prevent="sendEmail">
                发送验证码
                </el-button>
            </el-form-item>

            <el-form-item prop="registerCode">
                <span class="fontcontainer">
                    <span class="iconfont icon-mima"></span>
                </span>
                <el-input name="registerCode" type="text" @keyup.enter.native="handleLogin" v-model="registerForm.registerCode" autoComplete="on"
                placeholder="请输入邮箱验证码"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                Sign up
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
    name: "register",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error("密码不能小于5位"));
            } else {
                callback();
            }
        };
        const validateEmail = (rule, value, callback) => {
            let emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
            if (!emailReg.test(value)) {
                callback(new Error("请输入正确的邮箱"));
            } else {
                callback();
            }
        };

        const registerCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入正确的邮箱验证码"));
            } else {
                callback();
            }
        };

        return {
            disabled: false,
            registerForm: {
                username: "admin",
                password: "123456",
                type: 'signup',
                roles: ['dev'],
                email:'',
                registerCode: ''
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    { required: true, trigger: "blur", validator: validatePass }
                ],
                email: [
                    { required: true, trigger: "blur", validator: validateEmail }
                ],
                registerCode: [
                    { required: true, trigger: "blur", validator: registerCode }
                ]
            },
            loading: false,
            pwdType: "password"
        };
    },
    methods: {
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            console.log(this.registerForm)
            this.$refs.registerForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("Register", this.registerForm)
                        .then((res) => {
                            // console.log(res, '注册成功') // 这里 res 接收了来自 actions 里面 resolve(response)
                            this.loading = false;
                            this.$router.push({ path: "/" }); // 这里会触发permission.js 的路由导航守卫，拉取用户信息等
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        sendEmail(){
            this.disabled = true
            let that = this
            setTimeout(()=>{
                this.disabled = false;
            },1000)
            if (this.registerForm.email) {
                this.loading = true;
                this.$store
                    .dispatch("SendEmail", this.registerForm.email)
                    .then((res) => {
                        this.loading = false;
                        this.disabled = true
                    })
                    .catch(() => {
                        this.loading = false;
                        this.disabled = false;
                    });
            } else {
                console.log("请输入邮箱!!");
                return false;
            }
            
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 90%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .fontcontainer{
        color:#889aa4;
        padding-left:10px;
    }
}
</style>
