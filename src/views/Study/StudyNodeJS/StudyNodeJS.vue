<template>
  <div class="study-node-js-content">
    <div class="title">
      <BookOutlined /> Study-NodeJS Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyNodeJSItem in studyNodeJSList" :key="studyNodeJSItem.key">
          <template #header>
            <div class="node-js-item-title">{{ studyNodeJSItem.title }}</div>
            <div v-if="studyNodeJSItem.description" class="node-js-item-description">—— {{ studyNodeJSItem.description }} ——</div>
          </template>
          <div class="node-js-item-content">
            <div class="node-js-item-context">{{ studyNodeJSItem.context }}</div>
            <div v-if="studyNodeJSItem.url" class="node-js-item-url">
              <span @click="ClickStudyNodeJSUrl(studyNodeJSItem.url)">来自: {{ studyNodeJSItem.url }}</span>
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
import { BookOutlined } from '@ant-design/icons-vue'
import './study-nodejs.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyNodeJS',
  components: { Collapse, CollapsePanel, BookOutlined },
  data: () => ({
    activeKey: [],
    studyNodeJSList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    console.log('Views -> Study.StudyNodeJS -> mounted')
    this.GetStudyNodeJS()
  },
  methods: {
    GetStudyNodeJS: async function () {
      console.log('Views -> Study.StudyNodeJS -> methods -> GetStudyNodeJS')
      this.studyNodeJSList = []
      await Axios.get(this.$store.getters.getNodeJSUrl).then(res => {
        const resData = res.data
        resData.forEach((studyNodeJSItem, studyNodeJSIndex) => {
          this.studyNodeJSList.push({ ...studyNodeJSItem, id: studyNodeJSIndex + 1 })
          this.activeKey.push(studyNodeJSItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyNodeJSUrl: function (url) {
      console.log('Views -> Study.StudyNodeJS -> methods -> ClickStudyNodeJSUrl')
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
