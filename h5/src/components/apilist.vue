<template lang="html">
  <div class="apilist">
    <div class="list-container">
      <p class='title'>接口url列表(点击查看详情)</p>
      <ul class='list'>
        <li v-for='(item, i) in apiList' :key='i'>
          <router-link :to="{ name: 'apidetail', params: {path: item.path, order: i} }">
            {{item.path}}
          </router-link>
          <span class='del btn' @click.stop='delHandler(i)'>删除</span>
        </li>
        <li v-show='!apiList || !apiList.length'>暂无数据</li>
      </ul>
      <p class='btn' @click='addApi'>添加</p>
    </div>
    <router-view/>
    <add-api-layer :is-show-add.sync='isShowAdd' :name="name"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import addApiLayer from './addapi'
export default {
  name: 'apilist',
  data () {
    return {
      isShowAdd: false
    }
  },
  props: ['name'],
  computed: {
    ...mapState(['apiList'])
  },
  components: {
    addApiLayer
  },
  watch: {
    apiList (newV) {
      this.$router.push({ name: 'apidetail', params: {path: (this.apiList[0] || []).path, order: 0} })
    }
  },
  methods: {
    ...mapActions(['fetchApiList', 'editorApi', 'delApi']),
    addApi () {
      this.isShowAdd = true
    },
    delHandler (index) {
      this.delApi({
        path: this.apiList[index].path,
        resEnd: (isok, data) => {
          if (isok) {
            alert('操作成功')
            this.fetchApiList({})
          }
        }
      })
    }
  },
  mounted () {
    this.fetchApiList({
      name: this.name,
      resEnd: (isok, data) => {
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .title{
    font-weight: bold;
    margin:10px;
  }
  .apilist{
    width: 900px;
    display: flex;
    justify-content: space-between;
    height:500px;
    margin:60px auto;
  }
  .list{
    width:400px;
    line-height: 40px;
    height:100%;
    border:1px solid;
    overflow: auto;
    position: relative;
  }
  .list>li{
    height:50px;
    border-bottom:1px solid;
    background: #5cc1df;
    color:white;
  }
  .list>li:last-child{
    position: absolute;
    width:200px;
    height:40px;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    text-align: center;
    border-radius: 20px;
  }
  .list-container p.btn{
    width:200px;
    line-height:40px;
    border-radius: 20px;
    text-align: center;
    margin:30px auto;
    background: #5cc1df;
    color:white;
  }
  .list .router-link-active{
    background:blue;
  }
  .list>li{
    position: relative;
    >a{
      box-sizing: border-box;
      display: block;
      width:100%;
      height:100%;
      padding: 0 20px;
    }
  }
  .list .del{
    width:100px;
    display: block;
    height:30px;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    background: red;
    color: white;
    height:30px;
    position: absolute;
    right:10px;
    top:0;
    bottom:0;
    margin:auto;
  }

</style>
