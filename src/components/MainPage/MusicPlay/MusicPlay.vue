<template>
  <Card class="music-play-content" size="small">
    <template #title>
      <div class="card-title">音乐播放器</div>
    </template>
    <template #extra>
      <Tooltip>
        <template #title>
          <div style="height: 30px; line-height: 30px">刷新音乐播放列表</div>
        </template>
        <SyncOutlined id="xs" style="cursor: pointer" :style="styleList.flash" @click="FlashMusicList" />
      </Tooltip>
    </template>
    <div class="music-audio-content">
      <div class="music-information-content">
        <div class="music-information-title">正在播放</div>
        <div class="music-information-name-content">
          <span>{{ $store.state.musicPlayItem.musicName }}</span>
        </div>
      </div>
      <Progress strokeColor="#FF7F50" :percent="player.percent" :show-info="false" status="active" />
<!--      <div>{{ $store.state.musicPlayItem.status }}</div>-->
      <div class="music-control-content">
        <div class="music-control-button">
          <div class="music-control-button-item" @click="PrevMusic"> <FastBackwardOutlined /> </div>
          <div v-if="$store.state.musicPlayItem.status === 'playing'" class="music-control-button-item" @click="PausePlayingMusic"> <PauseCircleOutlined /> </div>
          <div v-else class="music-control-button-item" @click="PlayPlayingMusic"> <PlayCircleOutlined /> </div>
          <div class="music-control-button-item" @click="NextMusic"> <FastForwardOutlined /> </div>
<!--          <div style="margin-left: 20px;"> {{ $store.state.musicPlayItem.status }} </div>-->
        </div>
        <div class="music-control-time">{{ TimeToMinSec(player.currentTime) }} - {{ TimeToMinSec(player.duration) }}</div>
        <div class="music-control-button">
          <!--     单曲循环: only, 列表循环: list, 随机播放: random, 顺序播放: order     -->
          <!--     单曲循环     -->
          <div class="music-control-button-mode" v-if="$store.state.musicPlayItem.playMode === 'only'" @click="ChangePlayMode"> <RetweetOutlined /> </div>
          <!--     列表循环     -->
          <div class="music-control-button-mode" v-if="$store.state.musicPlayItem.playMode === 'list'" @click="ChangePlayMode"> <RollbackOutlined /> </div>
          <!--     随机     -->
          <div class="music-control-button-mode" v-if="$store.state.musicPlayItem.playMode === 'random'" @click="ChangePlayMode"> <SwapOutlined /> </div>
          <!--     顺序播放     -->
          <div class="music-control-button-mode" v-if="$store.state.musicPlayItem.playMode === 'order'" @click="ChangePlayMode"> <SwapRightOutlined /> </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 1px; background-color: #dadada" />
    <div class="music-item-title"><MenuUnfoldOutlined /> 音乐列表</div>
    <div class="music-context">
      <div v-for="item in musicList"
           class="music-item"
           :key="'music - ' + item.id"
           @click="PlayMusic(item)">
        <div class="music-item-status">
          <ArrowRightOutlined style="color: coral" v-if="item.name === $store.state.musicPlayItem.musicName" />
          <PauseOutlined style="color: #dadada" v-else />
        </div>
        <div :id="'music-item-name-content-' + item.id"
             class="music-item-name"
             :style="item.name === $store.state.musicPlayItem.musicName ? { color: 'coral' } : {}"
             @mouseenter="CheckMusic(item.id)"
             @mouseleave="LeaveCheck(item.id)">
          <span :id="'music-item-name-' + item.id">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from 'ant-design-vue/lib/card'
import 'ant-design-vue/lib/card/style/index.css'
import Progress from 'ant-design-vue/lib/progress'
import 'ant-design-vue/lib/progress/style/css'
import Tooltip from 'ant-design-vue/lib/tooltip'
import 'ant-design-vue/lib/tooltip/style/css'
import Message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style/css'
import {
  SyncOutlined,
  MenuUnfoldOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  RetweetOutlined,
  RollbackOutlined,
  SwapOutlined,
  SwapRightOutlined,
  ArrowRightOutlined,
  PauseOutlined
} from '@ant-design/icons-vue'

import './music-play.css'
import Axios from 'axios'

export default {
  name: 'MusicPlay',
  components: {
    Card,
    Progress,
    Tooltip,
    SyncOutlined,
    MenuUnfoldOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    FastBackwardOutlined,
    FastForwardOutlined,
    RetweetOutlined,
    RollbackOutlined,
    SwapOutlined,
    SwapRightOutlined,
    ArrowRightOutlined,
    PauseOutlined
  },
  data: () => ({
    intervalList: {
      musicCheckInt: null
    },
    styleList: {
      flash: {}
    },
    playingMusic: {},
    musicList: [],
    player: {
      percent: 0,
      duration: 0,
      currentTime: 0
    }
  }),
  emits: ['play-music'],
  mounted () {
    console.log('Components -> MainPage.MusicPlay -> mounted')
    this.GetMusicList()
  },
  watch: {
    // 监听播放音乐的播放时间
    '$store.state.musicPlayItem.currentTime': function (newVal) {
      console.log('Components -> MainPage.MusicPlay -> watch -> `$store.state.musicPlayItem.currentTime`')
      this.$nextTick(() => {
        this.player.percent = (newVal / this.$store.state.musicPlayItem.duration * 100).toFixed(0) * 1
        this.player.currentTime = newVal
        this.player.duration = this.$store.state.musicPlayItem.duration
      })
    },
    // 监听播放音乐结束时候情况
    '$store.state.musicPlayItem.status': function (newVal) {
      console.log('Components -> MainPage.MusicPlay -> watch -> `$store.state.musicPlayItem.status`')
      // 刷新音乐列表
      this.GetMusicList().then(() => {
        // 如果歌曲已经播放完毕
        if (newVal === 'end') {
          // 单曲循环: only, 列表循环: list, 随机播放: random, 顺序播放: order
          let musicIndex
          const nowMusic = this.musicList.find(musicRes => {
            return musicRes.name === this.$store.state.musicPlayItem.musicName
          })
          if (nowMusic) musicIndex = nowMusic.id - 1
          else musicIndex = 0
          switch (this.$store.state.musicPlayItem.playMode) {
            case 'only': {
              this.PlayMusic(this.musicList[musicIndex])
              break
            }
            case 'list': {
              if ((musicIndex + 1) > this.musicList.length) this.PlayMusic(this.musicList[0])
              else this.PlayMusic(this.musicList[musicIndex + 1])
              break
            }
            case 'random': {
              const musicIndexNum = Math.floor(Math.random() * this.musicList.length)
              this.PlayMusic(this.musicList[musicIndexNum])
              break
            }
            case 'order': {
              if ((musicIndex + 1) > this.musicList.length) this.StopMusic()
              else this.PlayMusic(this.musicList[musicIndex + 1])
              break
            }
            default: {
              this.PlayMusic(this.musicList[0])
              this.ChangePlayMode()
              break
            }
          }
        }
      })
    }
  },
  methods: {
    // 取消内容超过容器左右晃动效果，并把它恢复默认
    LeaveCheck: function (id) {
      console.log('Components -> MainPage.MusicPlay -> methods -> LeaveCheck')
      const musicContentDom = document.getElementById('music-item-name-content-' + id)
      musicContentDom.scrollLeft = 0
      if (this.intervalList.musicCheckInt) {
        window.clearInterval(this.intervalList.musicCheckInt)
        this.intervalList.musicCheckInt = null
      }
    },
    // 查看 内容是否超过容器 --  如果超过就左右晃动
    CheckMusic: function (id) {
      console.log('Components -> MainPage.MusicPlay -> methods -> CheckMusic')
      const musicContentDom = document.getElementById('music-item-name-content-' + id)
      const musicTitleDom = document.getElementById('music-item-name-' + id)
      // 如果 容器宽度 < 内容宽度  左右晃动
      if (musicContentDom.offsetWidth < musicTitleDom.offsetWidth) {
        // 清空定时器
        if (this.intervalList.musicCheckInt) {
          window.clearInterval(this.intervalList.musicCheckInt)
          this.intervalList.musicCheckInt = null
        }
        // 判断是否再最右边 - 标志位
        let rigMax = false
        let secR = 0
        let secL = 0
        this.intervalList.musicCheckInt = window.setInterval(() => {
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
        if (this.intervalList.musicCheckInt) {
          window.clearInterval(this.intervalList.musicCheckInt)
          this.intervalList.musicCheckInt = null
        }
      }
    },
    // 音乐列表刷新 - 动画
    FlashMusicList: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> FlashMusicList')
      this.styleList.flash = { animation: 'xs-flash 1s linear' }
      this.GetMusicList()
      window.setTimeout(() => {
        this.styleList.flash = {}
      }, 1000)
    },
    // 获取音乐列表
    GetMusicList: async function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> GetMusicList')
      this.musicList = []
      await Axios.get(this.$store.getters.musicListUrl).then(res => {
        const musicListArr = JSON.parse(JSON.stringify(res.data))
        if (musicListArr && musicListArr instanceof Array && musicListArr.length) {
          musicListArr.forEach((musicRes, musicIndex) => {
            this.musicList.push({ id: musicIndex + 1, url: `${musicRes.path}${musicRes.filename}`, name: musicRes.filename })
          })
        }
      })
    },
    // 上一曲
    PrevMusic: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> PrevMusic')
      const musicPlayingItem = this.musicList.find(musicListRes => {
        return musicListRes.name === this.$store.state.musicPlayItem.musicName
      })
      if (musicPlayingItem.id === 1) {
        this.PlayMusic(this.musicList[this.musicList.length - 1])
      } else {
        this.PlayMusic(this.musicList[musicPlayingItem.id - 2])
      }
    },
    // 下一曲
    NextMusic: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> NextMusic')
      this.$store.commit('EndPlayMusic')
    },
    // 播放音乐
    PlayMusic: function (music) {
      console.log('Components -> MainPage.MusicPlay -> methods -> PlayMusic')
      this.$emit('play-music', music)
      const musicUrl = `${this.$store.getters.musicPlayUrl}/${music.name}`
      const audio = document.getElementById('music-audio')
      audio.src = musicUrl
      audio.play()
    },
    // 暂停当前音乐
    PausePlayingMusic: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> PausePlayingMusic')
      const audio = document.getElementById('music-audio')
      audio.pause()
      this.$store.commit('PausePlayingMusic')
    },
    // 播放音乐
    PlayPlayingMusic: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> PlayPlayingMusic')
      // 播放当前音乐
      if (this.$store.state.musicPlayItem.status === 'pause') {
        const audio = document.getElementById('music-audio')
        audio.play()
        this.$store.commit('PlayPlayingMusic')
      }
      // 停止时 播放音乐
      if (this.$store.state.musicPlayItem.status === 'stop') {
        // 第一首开始
        this.PlayMusic(this.musicList[0])
        this.$store.commit('PlayStopMusic')
      }
    },
    // 停止音乐
    StopMusic: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> StopMusic')
    },
    // 改变播放模式
    ChangePlayMode: function () {
      console.log('Components -> MainPage.MusicPlay -> methods -> ChangePlayMode')
      this.$store.dispatch('CommitChangePlayMode').then(() => {
        let str = ''
        // 单曲循环: only, 列表循环: list, 随机播放: random, 顺序播放: order
        switch (this.$store.state.musicPlayItem.playMode) {
          case 'only': { str = '单曲循环'; break }
          case 'list': { str = '列表循环'; break }
          case 'random': { str = '随机播放'; break }
          case 'order': { str = '顺序播放'; break }
        }
        Message.success(str)
      })
    },
    // 时间格式转换 - 秒 > 分:秒
    TimeToMinSec: function (sec) {
      console.log('Components -> MainPage.MusicPlay -> methods -> TimeToMinSec')
      let minute = '00'
      let second = '00'
      if (sec !== 0 && sec > 0) {
        minute = parseInt((sec / 60).toString()) < 10 ? '0' + parseInt((sec / 60).toString()) : parseInt((sec / 60).toString())
        second = parseInt((sec % 60).toString()) < 10 ? '0' + parseInt((sec % 60).toString()) : parseInt((sec % 60).toString())
      }
      return `${minute}:${second}`
    }
  }
}
</script>

<style scoped>

</style>
