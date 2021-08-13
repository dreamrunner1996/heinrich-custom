<template>
  <div class="nav-music-content">
    <Popover>
      <template #title> </template>
      <template #content>
        <MusicPlay @play-music="GetPlayMusic" />
      </template>
      <Button type="link" style="display: flex; flex-direction: row; line-height: 32px; color: coral">
        <div style="margin-right: 15px"><CustomerServiceOutlined /> 正在播放</div>
        <div id="music-name-content" style="width: 140px; overflow-x: hidden; word-break: keep-all; text-align: right">
          <span id="music-name" style="width: auto;">{{ $store.state.musicPlayItem.name }}</span>
        </div>
      </Button>
    </Popover>
  </div>
</template>

<script>
import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/lib/button/style/index.css'
import Popover from 'ant-design-vue/lib/popover'
import 'ant-design-vue/lib/popover/style/index.css'
import { CustomerServiceOutlined } from '@ant-design/icons-vue'
import MusicPlay from './../../components/MainPage/MusicPlay/MusicPlay'
import './nav-music.css'

export default {
  name: 'NavMusic',
  components: { Button, CustomerServiceOutlined, MusicPlay, Popover },
  data: () => ({
    musicTitle: '无',
    intervalList: {
      musicInt: null
    }
  }),
  emits: ['get-play-music'],
  watch: {
    '$store.state.musicPlayItem.name': function (newVal) {
      console.log('Components -> NavMusic -> watch -> `$store.state.musicPlayItem.name`')
      this.musicTitle = newVal
    },
    musicTitle: function () {
      console.log('Components -> NavMusic -> watch -> musicTitle')
      this.$nextTick(() => {
        this.CheckMusic()
      })
    }
  },
  methods: {
    CheckMusic: function () {
      console.log('Components -> NavMusic -> methods -> CheckMusic')
      const musicContentDom = document.getElementById('music-name-content')
      const musicTitleDom = document.getElementById('music-name')
      // 如果 容器宽度 < 内容宽度  左右晃动
      if (musicContentDom.offsetWidth < musicTitleDom.offsetWidth) {
        // 清空定时器
        if (this.intervalList.musicInt) {
          window.clearInterval(this.intervalList.musicInt)
          this.intervalList.musicInt = null
        }
        // 判断是否再最右边 - 标志位
        let rigMax = false
        let secR = 0
        let secL = 0
        this.intervalList.musicInt = window.setInterval(() => {
          // 如果 容器宽度 + 向左偏移数值 < 内容宽度 + 容器宽度
          if ((musicContentDom.offsetWidth + musicContentDom.scrollLeft < musicTitleDom.offsetWidth + musicContentDom.offsetWidth) && !rigMax) {
            musicContentDom.scrollLeft += 1
          }
          // 如果 容器宽度 + 向左偏移数值 >= 内容宽度 + 容器宽度
          if (musicContentDom.offsetWidth + musicContentDom.scrollLeft >= musicTitleDom.offsetWidth) {
            rigMax = true
          }
          // 如果已经达到最右边, 向左滑动
          if (rigMax) {
            secR += 1
            if (secR >= 20) musicContentDom.scrollLeft -= 1
            if (musicContentDom.scrollLeft <= 0) {
              musicContentDom.scrollLeft = 0
              secL += 1
              if (secL >= 20) {
                rigMax = false
                secR = 0
                secL = 0
              }
            }
          }
        }, 50)
      }
      // 如果 容器宽度 > 内容宽度  停止晃动并恢复
      if (musicContentDom.offsetWidth >= musicTitleDom.offsetWidth) {
        musicContentDom.scrollLeft = 0
        // 清空定时器
        if (this.intervalList.musicInt) {
          window.clearInterval(this.intervalList.musicInt)
          this.intervalList.musicInt = null
        }
      }
    },
    GetPlayMusic: function (musicItem) {
      console.log('Components -> NavMusic -> methods -> GetPlayMusic')
      this.$emit('get-play-music', musicItem)
      this.$store.dispatch('CommitUpdatePlayMusic', musicItem)
    }
  }
}
</script>

<style scoped>

</style>
