<template>
  <div class="main-content">
    <FileDownload />
    <MusicPlay @play-music="GetPlayMusic" />
  </div>
</template>

<script>
import FileDownload from '@/components/MainPage/FileDownload/FileDownload.vue'
import MusicPlay from '@/components/MainPage/MusicPlay/MusicPlay.vue'

import './main.css'

export default {
  name: 'Main',
  components: { FileDownload, MusicPlay },
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
