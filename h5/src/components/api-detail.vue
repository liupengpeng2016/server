<template lang="html">
  <div class="detail">
    <p class='title'>接口返回的数据(可直接编辑)</p>
    <textarea v-model='json'></textarea>
    <p class='detail-btn'><span class='btn' @click='saveHandler'>保存</span></p>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      json: ''
    }
  },
  props: ['path', 'order'],
  computed: {
    ...mapState(['apiList'])
  },
  mounted () {
    this.json = (this.apiList[this.order] || {}).json
  },
  watch: {
    path (newV) {
      this.json = (this.apiList[this.order] || {}).json
    },
    apiList (newV) {
      this.json = (this.apiList[this.order] || {}).json
    }
  },
  methods: {
    ...mapActions(['editorApi', 'fetchApiList']),
    saveHandler () {
      if (this.path === undefined) return
      this.editorApi({
        path: this.path,
        json: this.json,
        resEnd: (isok, data) => {
          if (isok) {
            this.fetchApiList({})
            alert('操作成功')
          } else {
            alert('操作失败')
          }
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.detail{
  width:400px;
  height:100%;
}
.detail textarea{
  box-sizing: border-box;
  padding: 10px;
  display: block;
  width:100%;
  height:100%;
  resize: none;
  border:none;
  background: black;
  color:white;
  outline: none;
}
.title{
  margin:10px;
}
.detail-btn{
  display: flex;
  justify-content: space-around;
  line-height: 40px;
}
.detail-btn>span{
  width:160px;
  background: #5cc1df;
  color:white;
  border-radius: 20px;
  text-align: center;
  margin:20px 0;
}
</style>
