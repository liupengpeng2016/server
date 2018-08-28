<template lang="html">
  <div class="bg" v-show='isShowAdd'>
    <div class="container">
      <h3>添加api(若输入的是不规范json,则返回字符串)</h3>
      <p>
        <label>baseUrl://172.17.20.136</label>
        <br/>
        <label>请输入路径(格式：/abc/def):</label>
        <input type="text" v-model='path' placeholder="请在此处输入路径">
      </p>
      <span>请输入要返回的数据</span>
      <textarea v-model='json'></textarea>
      <ul>
        <li class='btn' @click='cancelHandler'>取消</li>
        <li class='btn' @click='submitHandler'>确定</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      path: '',
      json: ''
    }
  },
  props: ['isShowAdd'],
  methods: {
    ...mapActions(['saveApi', 'fetchApiList']),
    cancelHandler () {
      this.clearInput()
      this.$emit('update:isShowAdd', false)
    },
    clearInput () {
      this.path = ''
      this.json = ''
    },
    checkInput () {
      var msg = ''
      if (!/\/\w+/.test(this.path)) {
        msg = '路径格式不正确'
      }
      return msg
    },
    submitHandler () {
      var msg = this.checkInput()
      if (msg) {
        return alert(msg)
      }
      this.saveApi({
        path: this.path,
        json: this.json,
        resEnd: (isOk, data) => {
          this.cancelHandler()
          if (isOk) {
            this.fetchApiList({})
            alert('添加成功')
          } else {
            alert(data)
          }
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="css" scoped>
.bg{
  width:100%;
  height:100%;
  position: fixed;
  left:0;
  top:0;
  background: rgba(0,0,0,0.6);
}
.container{
  width:500px;
  height:600px;
  background: white;
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  border-radius: 20px;
  margin:auto;
}
.container>span{
  display: block;
  margin:10px 20px;
}
.container>h3{
  text-align: center;
  margin:10px auto;
}
.container>p{
  margin:10px 20px;
}
.container>p>input{
  width:300px;
  border:none;
  font-family: inherit;
}
textarea{
  padding: 10px;
  width:90%;
  border:none;
  background: black;
  margin:0 auto;
  display: block;
  color:white;
  height:400px;
  resize: none;
}
textarea+ul{
  display: flex;
  justify-content: center;
}
textarea+ul>li{
  width:150px;
  line-height:40px;
  background: #5cc1df;
  text-align: center;
  margin:16px;
  color:white;
  border-radius:20px;
}
</style>
