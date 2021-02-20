<template>
  <div class="study-html-content">
    <div class="title">
      <Html5Outlined /> Study-Html Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyHtmlItem in studyHtmlList" :key="studyHtmlItem.key">
          <template #header>
            <div class="html-item-title">{{ studyHtmlItem.title }}</div>
            <div v-if="studyHtmlItem.description" class="html-item-description">—— {{ studyHtmlItem.description }} ——</div>
          </template>
          <div class="html-item-content">
            <div class="html-item-context">{{ studyHtmlItem.context }}</div>
            <div v-if="studyHtmlItem.url" class="html-item-url">
              <span @click="ClickStudyHtmlUrl(studyHtmlItem.url)">来自: {{ studyHtmlItem.url }}</span>
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
import './study-html.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyHtml',
  components: { Collapse, CollapsePanel, Html5Outlined },
  data: () => ({
    activeKey: [],
    studyHtmlList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    console.log('Views -> Study.StudyHtml -> mounted')
    this.GetStudyHtml()
  },
  methods: {
    GetStudyHtml: async function () {
      console.log('Views -> Study.StudyHtml -> methods -> GetStudyHtml')
      this.studyHtmlList = []
      await Axios.get(this.$store.getters.getHtmlUrl).then(res => {
        const resData = res.data
        resData.forEach((studyHtmlItem, studyHtmlIndex) => {
          this.studyHtmlList.push({ ...studyHtmlItem, id: studyHtmlIndex + 1 })
          this.activeKey.push(studyHtmlItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyHtmlUrl: function (url) {
      console.log('Views -> Study.StudyHtml -> methods -> ClickStudyHtmlUrl')
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
