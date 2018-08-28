<template lang="html">
  <div class="login">
    <div class="login-tab">
      <router-link class='btn' :to="{path: '/access/login'}">登录</router-link>
      <router-link class='btn' :to="{path: '/access/register'}">注册</router-link>
    </div>
    <div class="input">
      <p>
        <label>name</label>
        <input v-model='name' @focus='resetNotice("name")'/>
        <span v-text='errorInfo.name'></span>
      </p>
      <p>
        <label>password</label>
        <input type='password' v-model='password' @focus='resetNotice("password")'/>
        <span v-text='errorInfo.password'></span>
      </p>
      <p v-show='action === "register"'>
        <label>password again</label>
        <input type='password' v-model='passwordAgain' @focus='resetNotice("passwordAgain")'/>
        <span v-text='errorInfo.passwordAgain'></span></p>
      <span class='submit btn' @click='submitHandler'>提交</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'access',
  data: function () {
    return {
      name: '',
      password: '',
      passwordAgain: '',
      errorInfo: {
        name: '',
        password: '',
        passwordAgain: ''
      }
    }
  },
  props: ['action'],
  methods: {
    ...mapActions(['register', 'fetchUserInfo', 'login']),
    submitHandler () {
      if (!this.checkInput()) {
        return
      }
      if (this.action === 'login') {
        this.login({
          name: this.name,
          password: this.password,
          resEnd: (isok, data) => {
            if (isok) {
              this.$router.push('/apilist')
            } else {
              alert(data)
            }
          }
        })
      } else if (this.action === 'register') {
        this.register({
          name: this.name,
          password: this.password,
          resEnd: (isSuccess, data) => {
            if (isSuccess) {
              this.$router.push('/apilist')
            } else {
              alert(data.msg)
            }
          }
        })
      }
    },
    clearData () {
      this.name = ''
      this.password = ''
      this.passwordAgain = ''
      this.errorInfo = {
        name: '',
        password: '',
        passwordAgain: ''
      }
    },
    resetNotice (key) {
      this.errorInfo[key] = ''
    },
    checkInput () {
      let pass = true
      if (!this.name) {
        this.errorInfo.name = '用户名不能为空'
        pass = false
      } else if (!/^\w+$/.test(this.name)) {
        this.errorInfo.name = '只能数字字母下划线'
        pass = false
      }
      if (!this.password) {
        this.errorInfo.password = '密码不能为空'
        pass = false
      } else if (!/^\w+$/.test(this.name)) {
        this.errorInfo.password = '只能数字字母下划线'
        pass = false
      }
      if (this.passwordAgain !== this.password) {
        this.errorInfo.passwordAgain = '两次输入密码不一致'
        if (this.action === 'register') {
          pass = false
        }
      }
      return pass
    }
  },
  watch: {
    action: function () {
      this.clearData()
    }
  }
}
</script>

<style lang="css" scoped>
.login{
  width:500px;
  height:300px;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
.login .input p{
  margin: 20px 0;
}
.login .input p span{
  color:red;
  font-size: 10px;
}
.login .input label{
  width:150px;
  display: inline-block;
  vertical-align: baseline;
}
.login .input input{
  width:200px;
  height:30px;
  border-radius:15px;
  border:1px solid #ccc;
  padding:0 15px;
  display: inline-block;
  vertical-align: baseline;
}
.login .input input:focus{
  outline: none;
}
.login-tab{
  display: flex;
  width:100%;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  text-align: center;
  margin-bottom:60px;
}
.login-tab a{
  text-decoration: none;
  width:200px;
}
.router-link-active{
  border-bottom:2px solid #5cc1df;
  margin-bottom:-2px;
}
.submit{
  text-align: center;
  display: block;
  width:200px;
  background: #5cc1df;
  color:white;
  line-height: 40px;
  margin: 10px auto 0px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
