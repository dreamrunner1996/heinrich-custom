<template>
  <div class="main-content">
    <div>
      <FileDownload />
      <MusicPlay @play-music="GetPlayMusic" />
    </div>
    <div style="margin-left: 10px">
      <PhotoWall />
    </div>
    <LifeCalendar />
  </div>
</template>

<script>
import FileDownload from '@/components/MainPage/FileDownload/FileDownload'
import LifeCalendar from '@/components/MainPage/LifeCalendar/LifeCalendar'
import MusicPlay from '@/components/MainPage/MusicPlay/MusicPlay'
import PhotoWall from '@/components/MainPage/PhotoWall/PhotoWall'

import './main.css'

export default {
  name: 'Main',
  components: { FileDownload, LifeCalendar, MusicPlay, PhotoWall },
  data: () => ({}),
  emits: ['get-play-music'],
  mounted () {},
  methods: {
    GetPlayMusic: function (musicItem) {
      console.log('views - Main - methods - GetPlayMusic')
      this.$emit('get-play-music', musicItem)
      this.$store.dispatch('CommitUpdatePlayMusic', musicItem).then(() => {
        console.log(this.$store.state.musicPlayItem)
        console.log('finish')
      })
      console.warn(musicItem)
    }
  }
}
</script>
