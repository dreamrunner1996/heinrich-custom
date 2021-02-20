<template>
  <div class="dashboard-content">
    <iframe v-if="dashboardIframeUrl" :src="dashboardIframeUrl" :frameborder="0"></iframe>
    <div v-else class="dashboard-Title">
      <span><DesktopOutlined /></span>
      <br>
      WelCome to Dashboard Page
    </div>
  </div>
</template>

<script>
import { DesktopOutlined } from '@ant-design/icons-vue'
import './dashboard.css'

export default {
  name: 'Dashboard',
  components: { DesktopOutlined },
  data: () => ({
    dashboardIframeUrl: ''
  }),
  watch: {
    '$route.params.dashboardUrl': function () {
      console.log('Views -> Dashboard -> watch -> `$route.params.dashboardUrl`')
      this.dashboardIframeUrl = this.$route.params.dashboardUrl
    }
  },
  mounted: function () {
    console.log('Views -> Dashboard -> mounted')
    this.dashboardIframeUrl = this.$route.params.dashboardUrl
  }
}
</script>

<style scoped>

</style>
