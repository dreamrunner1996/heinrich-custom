<template>
  <div class="study-vue-content">
<!--    <div class="title">-->
<!--      <Html5Outlined /> Study-Vue Page-->
<!--    </div>-->
<!--    <div class="divider" />-->
    <div class="context">
      <div class="study-vue-item" v-for="studyVueItem in studyVueList" :key="'study-vue-item' + studyVueItem.key">
        <div class="study-vue-item-title">—— {{ studyVueItem.key }} ——</div>
        <Collapse v-model:activeKey="activeKey">
          <CollapsePanel v-for="studyVueChildrenItem in studyVueItem.children" :key="'study-vue-item-children-' + studyVueChildrenItem.key">
            <template #header>
              <div class="study-vue-item-children-title">{{ studyVueChildrenItem.title }}</div>
              <div v-if="studyVueItem.description" class="study-vue-item-children-description">—— {{ studyVueChildrenItem.description }} ——</div>
            </template>
            <div class="study-vue-item-children-content">
              <div class="study-vue-item-children-context">{{ studyVueChildrenItem.context }}</div>
              <div v-if="studyVueChildrenItem.url" class="study-vue-item-children-url">
                <span @click="ClickStudyVueUrl(studyVueChildrenItem.url)">来自: {{ studyVueChildrenItem.url }}</span>
              </div>
            </div>
          </CollapsePanel>
        </Collapse>
      </div>
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
import './study-vue.css'
import Axios from 'axios'
const CollapsePanel = Collapse.Panel

export default {
  name: 'StudyVue',
  components: { Collapse, CollapsePanel },
  data: () => ({
    activeKey: [],
    studyVueList: {},
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
      console.error(this.studyVueList)
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
