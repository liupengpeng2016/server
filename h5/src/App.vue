<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['fetchUserInfo'])
  },
  mounted () {
    this.fetchUserInfo({
      resEnd: (isok) => {
        if (isok) {
          this.$router.push('/apilist/')
        } else {
          this.$router.push('/access/login')
        }
      }
    })
  }
}
</script>

<style>
</style>
