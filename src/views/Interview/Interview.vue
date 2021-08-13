<template>
  <div class="interview-content">
    <div class="title"></div>
    <div class="context">
      <div class="context-item"
           v-for="interviewItem in interviewList"
           :key="interviewItem.type">
        <div class="title">面试题方向 - {{ interviewItem.type }}</div>
        <Collapse v-model:activeKey="activeKey">
          <CollapsePanel v-for="interviewItemItem in interviewItem.list" :key="interviewItemItem.key">
            <template #header>
              <div class="interview-item-title">{{ interviewItemItem.title }}</div>
              <div class="interview-item-description">—— {{ interviewItem.type }} ——</div>
            </template>
            <div class="interview-item-content">
              <div class="interview-item-ask">{{ interviewItemItem.question }}</div>
              <div class="interview-item-url-content">
                <span class="interview-item-url" @click="ClickStudyHtmlUrl(interviewItemItem.url + '.html')">
                  <AimOutlined /> 效果浏览
                </span>
              </div>
            </div>
          </CollapsePanel>
        </Collapse>
      </div>
    </div>
  </div>
  <div class="url-iframe-content" v-if="IframeShow" @click="IframeShow = false">
    <div class="iframe-context">
      <iframe :src="iframeSrc" :frameborder="0" />
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import Collapse from 'ant-design-vue/lib/collapse/index'
import 'ant-design-vue/lib/collapse/style/index.css'
import { EditOutlined, AimOutlined } from '@ant-design/icons-vue'
import './interview.css'

const CollapsePanel = Collapse.Panel
const AntDesignVueList = { Collapse, CollapsePanel }
const AntDesignIconList = { EditOutlined, AimOutlined }

export default {
  name: 'Interview',
  components: { ...AntDesignVueList, ...AntDesignIconList },
  data: () => ({
    activeKey: [],
    interviewList: [],
    IframeShow: false,
    iframeSrc: ''
  }),
  mounted: function () {
    console.log('Views -> Interview -> mounted')
    this.GetInterview()
  },
  methods: {
    GetInterview: async function () {
      console.log('Views -> Interview -> methods -> GetInterview')
      this.interviewList = []
      await Axios.get(this.$store.getters.getInterviewUrl).then(res => {
        const resData = res.data
        console.log(resData)
        this.interviewList = JSON.parse(JSON.stringify(resData))
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击来自网站
    ClickStudyHtmlUrl: function (url) {
      console.log('Views -> Interview -> methods -> ClickStudyHtmlUrl')
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
