<template>
  <div class="study-vue-content">
    <div class="title">
      <Html5Outlined /> Study-Vue Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyVueItem in studyVueList" :key="studyVueItem.key">
          <template #header>
            <div class="vue-item-title">{{ studyVueItem.title }}</div>
            <div v-if="studyVueItem.description" class="vue-item-description">—— {{ studyVueItem.description }} ——</div>
          </template>
          <div class="vue-item-content">
            <div class="vue-item-context">{{ studyVueItem.context }}</div>
            <div v-if="studyVueItem.url" class="vue-item-url">
              <span @click="ClickStudyVueUrl(studyVueItem.url)">来自: {{ studyVueItem.url }}</span>
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
import './study-vue.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyVue',
  components: { Collapse, CollapsePanel, Html5Outlined },
  data: () => ({
    activeKey: [],
    studyVueList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    console.log('Views -> Study.StudyVue -> mounted')
    this.GetStudyVue()
  },
  methods: {
    GetStudyVue: async function () {
      console.log('Views -> Study.StudyVue -> methods -> GetStudyVue')
      this.studyVueList = []
      await Axios.get(this.$store.getters.getVueUrl).then(res => {
        const resData = res.data
        resData.forEach((studyVueItem, studyVueIndex) => {
          this.studyVueList.push({ ...studyVueItem, id: studyVueIndex + 1 })
          this.activeKey.push(studyVueItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyVueUrl: function (url) {
      console.log('Views -> Study.StudyVue -> methods -> ClickStudyVueUrl')
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
