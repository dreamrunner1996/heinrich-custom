<template>
  <Card class="photo-wall-content" size="small">
    <template #title>
      <div class="card-title">照片墙</div>
    </template>
    <template #extra>
      <Tooltip>
        <template #title>
          <div style="height: 30px; line-height: 30px">刷新照片墙列表</div>
        </template>
        <SyncOutlined id="xs" style="cursor: pointer" :style="styleList.flash" @click="FlashPhotoWallList" />
      </Tooltip>
    </template>
    <div class="card-content">
      <div class="photo-show-content">
        <div class="photo-show-button-item" @click="PhotoListPrev"><LeftOutlined /></div>
        <div class="photo-wall-show-content">
          <div class="photo-wall-show-img-information">
            <img class="photo-wall-show-img" :src="imgShow" alt="#" />
            <div class="photo-wall-show-information">
              <div class="title">这是标题</div>
              <div class="description">这是我开心的一天</div>
              <div class="divider" />
              <div class="author-time">
                <div class="author">Heinrich</div>
                <div class="time">2021-01-20 19:46:44</div>
              </div>
              <div class="features-list">
                <div class="features-item" @click="ShowBigPhoto"><EyeOutlined /> 查看大图</div>
                <div class="features-item" @click="DownloadPhoto"><VerticalAlignBottomOutlined /> 下载图片</div>
              </div>
            </div>
          </div>
        </div>
        <div class="photo-show-button-item" @click="PhotoListNext"><RightOutlined /></div>
      </div>
      <div class="divider"></div>
      <div class="photo-file-content">
        <div class="title"><MenuUnfoldOutlined /> 照片列表</div>
        <div class="content">
          <div class="content-item"></div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from 'ant-design-vue/lib/card'
import 'ant-design-vue/lib/card/style/index.css'
import Tooltip from 'ant-design-vue/lib/tooltip'
import 'ant-design-vue/lib/tooltip/style/index.css'
import {
  SyncOutlined,
  LeftOutlined,
  RightOutlined,
  EyeOutlined,
  VerticalAlignBottomOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'

import './photo-wall.css'
import Axios from 'axios'

export default {
  name: 'PhotoWall',
  components: {
    Card,
    Tooltip,
    SyncOutlined,
    LeftOutlined,
    RightOutlined,
    EyeOutlined,
    VerticalAlignBottomOutlined,
    MenuUnfoldOutlined
  },
  data: () => ({
    styleList: {
      flash: {}
    },
    imgShow: '',
    imgList: []
  }),
  mounted () {
    this.GetPhotoWallList()
  },
  methods: {
    // 照片墙列表刷新 - 动画
    FlashPhotoWallList: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> FlashPhotoWallList')
      this.styleList.flash = {
        animation: 'xs-flash 1s linear'
      }
      this.GetPhotoWallList()
      window.setTimeout(() => {
        this.styleList.flash = {}
      }, 1000)
    },
    // 获取照片墙列表
    GetPhotoWallList: async function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> GetPhotoWallList')
      this.imgList = []
      await Axios.get(this.$store.getters.photoListUrl).then(res => {
        const photoListArray = JSON.parse(JSON.stringify(res.data))
        if (photoListArray && photoListArray instanceof Array && photoListArray.length) {
          photoListArray.forEach((photoRes, photoIndex) => {
            this.imgList.push({
              id: photoIndex + 1,
              name: photoRes.filename,
              url: photoRes.path
            })
          })
        }
        console.log(photoListArray)
      })
    },
    // 切换上一张图片
    PhotoListPrev: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> PhotoListPrev')
    },
    // 切换下一张图片
    PhotoListNext: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> PhotoListNext')
    },
    // 点击查看大图
    ShowBigPhoto: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> ShowBigPhoto')
    },
    // 点击下载图片
    DownloadPhoto: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> DownloadPhoto')
    }
  }
}
</script>

<style scoped>

</style>
