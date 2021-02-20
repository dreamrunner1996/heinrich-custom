<template>
  <div class="study-electron-content">
    <div class="title">
      <Html5Outlined /> Study-Electron Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyElectronItem in studyElectronList" :key="studyElectronItem.key">
          <template #header>
            <div class="electron-item-title">{{ studyElectronItem.title }}</div>
            <div v-if="studyElectronItem.description" class="electron-item-description">—— {{ studyElectronItem.description }} ——</div>
          </template>
          <div class="electron-item-content">
            <div class="electron-item-context">{{ studyElectronItem.context }}</div>
            <div v-if="studyElectronItem.url" class="electron-item-url">
              <span @click="ClickStudyElectronUrl(studyElectronItem.url)">来自: {{ studyElectronItem.url }}</span>
            </div>
          </div>
        </CollapsePanel>
      </Collapse>
    </div>
  </div>
  <div class="url-iframe-content" v-if="IframeShow" @click="IframeShow = false">
    <div class="iframe-context">
      <iframe :src="iframeSrc" :frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import Collapse from 'ant-design-vue/lib/collapse/index'
import 'ant-design-vue/lib/collapse/style/index.css'
import { Html5Outlined } from '@ant-design/icons-vue'
import './study-electron.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyElectron',
  components: { Collapse, CollapsePanel, Html5Outlined },
  data: () => ({
    activeKey: [],
    studyElectronList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    this.GetStudyElectron()
  },
  methods: {
    GetStudyElectron: async function () {
      this.studyElectronList = []
      await Axios.get(this.$store.getters.getElectronUrl).then(res => {
        const resData = res.data
        resData.forEach((studyElectronItem, studyElectronIndex) => {
          this.studyElectronList.push({ ...studyElectronItem, id: studyElectronIndex + 1 })
          this.activeKey.push(studyElectronItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyElectronUrl: function (url) {
      console.log('Views -> Study.StudyElectron -> methods -> ClickStudyElectronUrl')
      console.error(url)
      this.iframeSrc = url
      this.$nextTick(() => {
        this.IframeShow = true
      })
    }
  }
}
</script>

<style scoped>

</style>
