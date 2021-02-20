<template>
  <Card class="life-diary-content" size="small">
    <template #title>
      <div class="card-title">生活日记</div>
    </template>
    <template #extra>
      <Tooltip>
        <template #title>
          <div style="height: 30px; line-height: 30px">生活日记</div>
        </template>
        <SyncOutlined id="xs" style="cursor: pointer" :style="styleList.flash" @click="FlashLifeDiary" />
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
import './life-diary.css'

export default {
  name: 'LifeDiary',
  components: { Card, Tooltip, SyncOutlined },
  data: () => ({
    styleList: {
      flash: {}
    }
  }),
  methods: {
    FlashLifeDiary: function () {
      console.log('components -> MainPage.LifeDiary -> methods -> FlashLifeDiary')
      this.styleList.flash = {
        animation: 'xs-flash 1s linear'
      }
      this.GetLifeDiary()
      window.setTimeout(() => {
        this.styleList.flash = {}
      }, 1000)
    },
    // 获取收藏中心列表
    GetLifeDiary: async function () {
      console.log('Components -> MainPage.LifeDiary -> methods -> GetLifeDiary')
    }
  }
}
</script>

<style scoped>

</style>
