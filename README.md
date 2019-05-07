# vue-cli3.0-vueadmin
  技术栈主要使用vue-cli3.0+vue+elementUI+vuex+axios。<br>
  这是一个基于手摸手系列，<a target="_blank" href="https://github.com/PanJiaChen/vueAdmin-template">vueadmin-template</a>进行改造的版本----感谢作者风骚花裤衩。
  
  由于是基于vue-cli3.0为基础进行的开发，所以同比vue-cli2会有区别：<br>
 1、项目的目录结构发生了变化，vue-cli3.0隐藏了webpack的配置文件，目录看起来非常的清爽简洁，在目标上追求0配置进行开发，将大部分时间用在开发上，避免在配置上浪费过多时间。但是个人风格配置无法避免，这里提供了一个<a href="https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md">vue.config.js</a>进行项目的配置；<br><br>
 
 2、<h5><a target="_blank" href="http://vue.wtodd.wang">线上预览地址</a> 登陆：admin 123456 </h5> 
 
 ##注意事项：<br><br>
 1、由于个人风格原因，该项目去掉了eslint限制，需要的同学可以自己增加；<br><br>
 2、为了跑通整个项目，这里我使用nodejs写了几个接口进行验证，包括token、userinfo、list，并且使用cors开放了跨域，需要的同学可以直接使用，无需代理；<br><br>
 3、后端使用的是express + mongodb,地址为： <a href="https://github.com/adouwt/nodejsAPI">https://github.com/adouwt/nodejsAPI</a>，用的是es6的语法写的后端服务,这个项目都在一直更新，如有需要，可以关注，私聊讨论。
 4、可以直接注册用户，默认为dev角色，<a target="_blank" href="http://localhost:8080/register">注册</a>,admin登录进去，可以新建用户
 <strong>如果这个项目对觉得OK，可以点击右上角的star啊</strong>
 
 ## 简单的描述下，从注册页面到注册成功跳转页面的数据流程
 ### views/register/index.vue 触发actions Register 
 ### --> store/user.js的Register, 这个js调用了 api/login.js register方法 ，register方法返回一个request的promise对象 
 ### --> utils/request.js promise resolve（或者reject）数据 给 store/user.js
 ### --> store/user.js register promise then（或者catch）方法接收到返回数据，然后 resolve（reject）response给 view/resgiter/index.vue 
 ### --> view/resgiter/index.vue  接受到注册成功信息
 ### 其中，错误信息会在 request.js 进行拦截处理，在每次页面路由跳转时候，都会经过permission.js 
 
### todo 
#### ~~新增一个接口 配置用户角色能访问的路由， 每次当用户登录成功，permission.js 拉取用户信息时，限制用户的访问路由，没有权限时强制跳转到一个没有权限的提示页面~~
#### ~~用户管理那里新增用户，修改密码，修改权限等功能

#### 接口访问权限
##### 接口访问时候需要接口校验，简单的传递，在参数里面校验是否是 role
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production to analyze the component percent
```
npm run analyze
```
 
