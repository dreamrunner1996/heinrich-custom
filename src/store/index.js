import { createStore } from 'vuex'

const store = createStore({
  state: {
    // url: 'http://172.16.1.245',
    url: 'http://localhost',
    port: '1144',
    fileList: '/fileList',
    download: '/download',
    musicList: '/musicList',
    musicPlay: '/music',
    musicPlayItem: {
      playMode: 'order',
      musicName: '无',
      name: '无',
      status: 'stop',
      duration: 0,
      currentTime: 0
    },
    musicPlayName: '无',
    photoList: '/photoList',
    photoFile: '/photo',
    photoInformation: '/photoInformation',
    study: {
      getHtml: '/studyHtml',
      getCss: '/studyCss',
      getVue: '/studyVue',
      getElectron: '/studyElectron',
      getNodeJS: '/studyNodeJS'
    },
    dashboard: {
      homeAssistant: 'http://172.16.1.245:8123',
      baidu: 'https://www.baidu.com',
      google: 'https://www.sohu.com'
    }
  },
  getters: {
    serverUrl: state => `${state.url}:${state.port}`,
    fileListUrl: state => `${state.url}:${state.port}${state.fileList}`,
    downloadUrl: state => `${state.url}:${state.port}${state.download}`,
    musicListUrl: state => `${state.url}:${state.port}${state.musicList}`,
    musicPlayUrl: state => `${state.url}:${state.port}${state.musicPlay}`,
    photoListUrl: state => `${state.url}:${state.port}${state.photoList}`,
    photoShowUrl: state => `${state.url}:${state.port}${state.photoFile}`,
    photoInformationUrl: state => `${state.url}:${state.port}${state.photoInformation}`,
    getHtmlUrl: state => `${state.url}:${state.port}${state.study.getHtml}`,
    getCssUrl: state => `${state.url}:${state.port}${state.study.getCss}`,
    getVueUrl: state => `${state.url}:${state.port}${state.study.getVue}`,
    getElectronUrl: state => `${state.url}:${state.port}${state.study.getElectron}`,
    getNodeJSUrl: state => `${state.url}:${state.port}${state.study.getNodeJS}`
  },
  mutations: {
    // 更新 播放音乐状态
    UpdatePlayMusic: (state, musicItem) => {
      console.log('store - mutations - UpdatePlayMusic')
      let musicName = ''
      if (musicItem.name.split('.').length > 2) {
        musicItem.name.split('.').forEach((splitRes, splitIndex) => {
          if (splitIndex < (musicItem.name.split('.').length - 2)) {
            musicName = `${musicName}${splitRes}.`
          } else if (splitIndex === (musicItem.name.split('.').length - 2)) {
            musicName = `${musicName}${splitRes}`
          }
        })
      } else {
        musicName = musicItem.name.split('.')[0]
      }
      state.musicPlayItem.name = musicName
      state.musicPlayItem.musicName = musicItem.name
      state.musicPlayItem.status = 'playing'
    },
    // 音乐播放结束 - 下一首
    EndPlayMusic: (state) => {
      console.log('store - mutations - EndPlayMusic')
      state.musicPlayItem.name = '无'
      state.musicPlayItem.status = 'end'
      state.musicPlayItem.duration = state.musicPlayItem.currentTime
    },
    // 音乐播放时的最新状态
    UpdatePlayingMusicTime: (state, musicTime) => {
      // console.log('store - mutations - UpdatePlayingMusicTime')
      state.musicPlayItem.duration = musicTime.duration
      state.musicPlayItem.currentTime = musicTime.currentTime
    },
    // 改变播放模式
    ChangePlayMode: (state) => {
      console.log('store - mutations - ChangePlayMode')
      switch (state.musicPlayItem.playMode) {
        case 'order': state.musicPlayItem.playMode = 'only'; break
        case 'only': state.musicPlayItem.playMode = 'list'; break
        case 'list': state.musicPlayItem.playMode = 'random'; break
        case 'random': state.musicPlayItem.playMode = 'order'; break
        default: state.musicPlayItem.playMode = 'order'; break
      }
    },
    // 暂停当前音乐
    PausePlayingMusic: (state) => {
      console.log('store - mutations - PausePlayingMusic')
      state.musicPlayItem.status = 'pause'
    },
    // 播放当前音乐
    PlayPlayingMusic: (state) => {
      console.log('store - mutations - PlayPlayingMusic')
      state.musicPlayItem.status = 'playing'
    },
    // 播放音乐 - 停止时
    PlayStopMusic: (state) => {
      console.log('store - mutations - PlayStopMusic')
      state.musicPlayItem.status = 'playing'
    }
  },
  actions: {
    CommitUpdatePlayMusic: (context, musicItem) => {
      console.log('store - actions - CommitUpdatePlayMusic')
      context.commit('UpdatePlayMusic', musicItem)
    },
    CommitEndPlayMusic: (context) => {
      console.log('store - actions - CommitEndPlayMusic')
      context.commit('EndPlayMusic')
    },
    CommitUpdatePlayingMusicTime: (context, musicTime) => {
      // console.log('store - actions - CommitUpdatePlayingMusicTime')
      context.commit('UpdatePlayingMusicTime', musicTime)
    },
    CommitPausePlayingMusic: (context) => {
      console.log('store - actions - CommitPausePlayingMusic')
      context.commit('PausePlayingMusic')
    },
    CommitPlayPlayingMusic: (context) => {
      console.log('store - actions - CommitPlayPlayingMusic')
      context.commit('PlayPlayingMusic')
    },
    CommitChangePlayMode: (context) => {
      console.log('store - actions - CommitChangePlayMode')
      context.commit('ChangePlayMode')
    },
    CommitPlayStopMusic: (context) => {
      console.log('store - actions - CommitPlayStopMusic')
      context.commit('PlayStopMusic')
    }
  },
  modules: {}
})

export default store
