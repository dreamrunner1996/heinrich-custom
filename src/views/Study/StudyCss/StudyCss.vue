<template>
  <div class="study-css-content">
    <div class="title">
      <Html5Outlined /> Study-Css Page
    </div>
    <div class="divider" />
    <div class="context">
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel v-for="studyCssItem in studyCssList" :key="studyCssItem.key">
          <template #header>
            <div class="css-item-title">{{ studyCssItem.title }}</div>
            <div v-if="studyCssItem.description" class="css-item-description">—— {{ studyCssItem.description }} ——</div>
          </template>
          <div class="css-item-content">
            <div class="css-item-context">{{ studyCssItem.context }}</div>
            <div v-if="studyCssItem.url" class="css-item-url">
              <span @click="ClickStudyCssUrl(studyCssItem.url)">来自: {{ studyCssItem.url }}</span>
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
import './study-css.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyCss',
  components: { Collapse, CollapsePanel, Html5Outlined },
  data: () => ({
    activeKey: [],
    studyCssList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    this.GetStudyCss()
  },
  methods: {
    GetStudyCss: async function () {
      console.log('Views -> Study.StudyCss -> methods -> GetStudyCss')
      this.studyCssList = []
      await Axios.get(this.$store.getters.getCssUrl).then(res => {
        const resData = res.data
        resData.forEach((studyCssItem, studyCssIndex) => {
          this.studyCssList.push({ ...studyCssItem, id: studyCssIndex + 1 })
          this.activeKey.push(studyCssItem.key)
        })
      })
    },
    // 点击来自网站
    ClickStudyCssUrl: function (url) {
      console.log('Views -> Study.StudyCss -> methods -> ClickStudyCssUrl')
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
