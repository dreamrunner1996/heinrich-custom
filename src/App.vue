<template>
  <audio src=""
         id="music-audio"
         controls="controls"
         style="display: none"
         @ended="MusicPlayEnd"
         @timeupdate="MusicTimeUpdate" />
  <div class="app-content">
    <div class="left-nav-content">
      <Nav :routeNav="selectedNav" />
    </div>
    <div class="page-content">
      <div class="user-content">
        <NavBreadcrumb :routeNav="selectedNav" />
        <div class="user-end-content">
          <NavUser :login-status="true" user-information />
          <div style="height: 32px; width: 1px; background-color: #dadada" />
          <NavMusic />
        </div>
      </div>
      <div class="page-dashboard">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav/Nav.vue'
import NavBreadcrumb from '@/components/NavBreadcrumb/NavBreadcrumb.vue'
import NavMusic from '@/components/NavMusic/NavMusic.vue'
import NavUser from '@/components/NavUser/NavUser.vue'
import './app.css'

export default {
  components: { Nav, NavBreadcrumb, NavMusic, NavUser },
  name: 'App',
  data: () => ({
    selectedNav: '',
    playMusicItem: {}
  }),
  watch: {
    $route: function () {
      console.log('App - watch - $route')
      if (this.$route.matched[0].path.split('/')[1] === ':catchAll(.*)') {
        this.selectedNav = 'none'
      } else if (this.$route.matched.length > 1) {
        this.selectedNav = this.$route.matched[this.$route.matched.length - 1].path.split('/')[this.$route.matched[this.$route.matched.length - 1].path.split('/').length - 1]
      } else {
        this.selectedNav = this.$route.matched[0].path.split('/')[1]
      }
    }
  },
  mounted: function () {
    console.log('App -> mounted')
  },
  methods: {
    MusicPlayEnd: function () {
      console.log('App -> methods -> MusicPlayEnd')
      // 停止播放 - 提交无
      this.$store.dispatch('CommitEndPlayMusic')
    },
    MusicTimeUpdate: function () {
      console.log('App - methods - MusicTimeUpdate')
      const audio = document.getElementById('music-audio')
      this.$store.dispatch('CommitUpdatePlayingMusicTime', { duration: audio.duration, currentTime: audio.currentTime })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
