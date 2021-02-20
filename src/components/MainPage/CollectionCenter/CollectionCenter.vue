<template>
  <Card class="collection-center-content" size="small">
    <template #title>
      <div class="card-title">收藏中心</div>
    </template>
    <template #extra>
      <Tooltip>
        <template #title>
          <div style="height: 30px; line-height: 30px">刷新收藏中心列表</div>
        </template>
        <SyncOutlined id="xs" style="cursor: pointer" :style="styleList.flash" @click="FlashCollectionCenter" />
      </Tooltip>
    </template>
  </Card>
</template>

<script>
import Card from 'ant-design-vue/lib/card'
import 'ant-design-vue/lib/card/style/index.css'
import Tooltip from 'ant-design-vue/lib/tooltip/Tooltip'
import 'ant-design-vue/lib/tooltip/style/index.css'
import { SyncOutlined } from '@ant-design/icons-vue'
import './collection-center.css'

export default {
  name: 'CollectionCenter',
  components: { Card, Tooltip, SyncOutlined },
  data: () => ({
    styleList: {
      flash: {}
    }
  }),
  mounted () {
    console.log('Components -> MainPage.CollectionCenter -> mounted')
    this.GetCollectionCenter()
  },
  methods: {
    FlashCollectionCenter: function () {
      console.log('Components -> MainPage.CollectionCenter -> methods -> CollectionCenter')
      this.styleList.flash = { animation: 'xs-flash 1s linear' }
      this.GetCollectionCenter()
      window.setTimeout(() => {
        this.styleList.flash = {}
      }, 1000)
    },
    // 获取收藏中心列表
    GetCollectionCenter: async function () {
      console.log('Components -> MainPage.CollectionCenter -> methods -> GetCollectionCenter')
    }
  }
}
</script>

<style scoped>

</style>
