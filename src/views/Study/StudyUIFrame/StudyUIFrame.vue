<template>
  <div class="study-ui-frame-content">
    <div class="title">
      <Html5Outlined /> Study-UI-Frame Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyUIFrameItem in studyUIFrameList" :key="studyUIFrameItem.key">
          <template #header>
            <div class="ui-frame-item-title">{{ studyUIFrameItem.title }}</div>
            <div v-if="studyUIFrameItem.description" class="ui-frame-item-description">—— {{ studyUIFrameItem.description }} ——</div>
          </template>
          <div class="ui-frame-item-content">
            <div class="ui-frame-item-context">{{ studyUIFrameItem.context }}</div>
            <div v-if="studyUIFrameItem.url" class="ui-frame-item-url">
              <span @click="ClickStudyUIFrameUrl(studyUIFrameItem.url)">来自: {{ studyUIFrameItem.url }}</span>
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
import './study-ui-frame.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyUIFrame',
  components: { Collapse, CollapsePanel, Html5Outlined },
  data: () => ({
    activeKey: [],
    studyUIFrameList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    console.log('Views -> Study.StudyUIFrame -> mounted')
    this.GetStudyUIFrame()
  },
  methods: {
    GetStudyUIFrame: async function () {
      console.log('Views -> Study.StudyUIFrame -> methods -> GetStudyUIFrame')
      this.studyUIFrameList = []
      await Axios.get(this.$store.getters.getUIFrameUrl).then(res => {
        const resData = res.data
        resData.forEach((studyUIFrameItem, studyUIFrameIndex) => {
          this.studyUIFrameList.push({ ...studyUIFrameItem, id: studyUIFrameIndex + 1 })
          this.activeKey.push(studyUIFrameItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyUIFrameUrl: function (url) {
      console.log('Views -> Study.StudyUIFrame -> methods -> ClickStudyUIFrameUrl')
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
