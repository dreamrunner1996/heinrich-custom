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
            <div class="photo-wall-show-img-mb">
              <img class="photo-wall-show-img" :src="imgShow.url" alt="#" />
            </div>
            <div class="photo-wall-show-information">
              <div class="title">{{ imgShow.title ? imgShow.title : imgShow.name }}&nbsp;</div>
              <div class="description">{{ imgShow.description ? imgShow.description : '没有描述' }}&nbsp;</div>
              <div class="divider" />
              <div class="author-time">
                <div class="author">{{ imgShow.author ? imgShow.author: '作者: 空' }}&nbsp;</div>
                <div class="time">{{ imgShow.time ? imgShow.time : '时间: 空' }}&nbsp;</div>
              </div>
              <div class="features-list">
                <div class="features-item" @click="ShowBigPhoto(imgShow)"><EyeOutlined /> 查看大图</div>
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
          <div class="content-item" v-for="imgListItem in imgList" :key="'img-list-' + imgListItem">
            <div class="photo-list-item-title">{{ imgListItem.pathName }}</div>
            <div class="photo-list-item-content">
              <div v-for="imgItem in imgListItem.list"
                   class="photo-list-item-list"
                   :key="'img-item-' + imgItem.id"
                   @mouseenter="CheckPhoto(imgItem.id)"
                   @mouseleave="LeaveCheck(imgItem.id)"
                   @click="ClickPhoto(imgItem)">
                <div class="photo-list-item-list-item-mb">
                  <img :src="imgItem.url" alt="#" />
                </div>
                <div :id="'photo-item-name-content-' + imgItem.id" class="img-name">
                  <span :style="styleList.hoverImg[imgItem.id]" :id="'photo-item-' + imgItem.id">{{ imgItem.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
  <div class="photo-wall-big-content" v-if="bigPhoto.show" @click="DisappearBigPhoto">
    <img :src="bigPhoto.url" alt="#" />
  </div>
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
    MenuUnfoldOutlined
  },
  data: () => ({
    intervalList: {
      photoCheckInt: null
    },
    styleList: {
      flash: {},
      hoverImg: []
    },
    imgShow: {},
    imgList: [],
    bigPhoto: {
      show: false,
      url: ''
    }
  }),
  mounted () {
    this.GetPhotoWallList()
  },
  methods: {
    // 查看 内容是否超过容器 --  如果超过就左右晃动
    CheckPhoto: function (id) {
      console.log('Components -> MainPage.PhotoWall -> methods -> CheckPhoto')
      this.styleList.hoverImg[id] = { color: '#1890FF' }
      const photoContentDom = document.getElementById('photo-item-name-content-' + id)
      const photoTitleDom = document.getElementById('photo-item-' + id)
      // 如果 容器宽度 < 内容宽度  左右晃动
      if (photoContentDom.offsetWidth < photoTitleDom.offsetWidth) {
        // 清空定时器
        if (this.intervalList.photoCheckInt) {
          window.clearInterval(this.intervalList.photoCheckInt)
          this.intervalList.photoCheckInt = null
        }
        // 判断是否再最右边 - 标志位
        let rigMax = false
        let secR = 0
        let secL = 0
        this.intervalList.photoCheckInt = window.setInterval(() => {
          // 如果 容器宽度 + 向左偏移数值 < 内容宽度 + 容器宽度
          if ((photoContentDom.offsetWidth + photoContentDom.scrollLeft < photoTitleDom.offsetWidth + photoContentDom.offsetWidth) && !rigMax) {
            photoContentDom.scrollLeft += 1
          }
          // 如果 容器宽度 + 向左偏移数值 >= 内容宽度 + 容器宽度
          if (photoContentDom.offsetWidth + photoContentDom.scrollLeft >= photoTitleDom.offsetWidth) {
            rigMax = true
          }
          // 如果已经达到最右边, 向左滑动
          if (rigMax) {
            secR += 1
            if (secR >= 20) photoContentDom.scrollLeft -= 1
            if (photoContentDom.scrollLeft <= 0) {
              photoContentDom.scrollLeft = 0
              secL += 1
              if (secL >= 20) {
                rigMax = false
                secR = 0
                secL = 0
              }
            }
          }
        }, 50)
      }
      // 如果 容器宽度 > 内容宽度  停止晃动并恢复
      if (photoContentDom.offsetWidth >= photoTitleDom.offsetWidth) {
        photoContentDom.scrollLeft = 0
        // 清空定时器
        if (this.intervalList.photoCheckInt) {
          window.clearInterval(this.intervalList.photoCheckInt)
          this.intervalList.photoCheckInt = null
        }
      }
    },
    // 取消内容超过容器左右晃动效果，并把它恢复默认
    LeaveCheck: function (id) {
      console.log('Components -> MainPage.PhotoWall -> methods -> LeaveCheck')
      this.styleList.hoverImg = []
      const photoContentDom = document.getElementById('photo-item-' + id)
      photoContentDom.scrollLeft = 0
      if (this.intervalList.photoCheckInt) {
        window.clearInterval(this.intervalList.photoCheckInt)
        this.intervalList.photoCheckInt = null
      }
    },
    // 点击 照片内容
    ClickPhoto: async function (photoItem) {
      console.log('Components -> MainPage.PhotoWall -> methods -> ClickPhoto')
      console.log(this.$store.getters.photoInformationUrl)
      this.imgShow = photoItem
      await Axios.get(this.$store.getters.photoInformationUrl).then(res => {
        const resData = JSON.parse(JSON.stringify(res.data))
        let existImgStatus = false
        if (resData && resData instanceof Array && resData.length) {
          resData.forEach(getPhotoRes => {
            if (getPhotoRes.path === photoItem.path) {
              existImgStatus = true
              this.imgShow = { ...this.imgShow, ...getPhotoRes }
            }
          })
        }
        if (!existImgStatus) this.imgShow = { ...this.imgShow }
      })
      console.warn(photoItem)
    },
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
        console.log(photoListArray)
        if (photoListArray && photoListArray instanceof Array && photoListArray.length) {
          photoListArray.forEach((photoRes, photoIndex) => {
            const documentStr = photoRes.path.split('/')[2]
            const photoShowUrl = this.$store.getters.photoShowUrl + '/' + documentStr + '/' + photoRes.filename
            const pathUrl = photoRes.path + photoRes.filename
            if (this.imgList.length) {
              let existDocument = false
              this.imgList.forEach(imgListItem => {
                if (documentStr === imgListItem.pathName) {
                  existDocument = true
                  imgListItem.list.push({ id: photoIndex + 1, name: photoRes.filename, url: photoShowUrl, path: pathUrl })
                }
              })
              if (!existDocument) {
                this.imgList.push({
                  id: this.imgList.length + 1,
                  pathName: documentStr,
                  list: [{ id: photoIndex + 1, name: photoRes.filename, url: photoShowUrl, path: pathUrl }]
                })
              }
            } else {
              this.imgList.push({
                id: this.imgList.length + 1,
                pathName: documentStr,
                list: [{ id: photoIndex + 1, name: photoRes.filename, url: photoShowUrl, path: pathUrl }]
              })
            }
          })
        }
      })
    },
    // 切换上一张图片
    PhotoListPrev: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> PhotoListPrev')
      if (this.imgList.length && (this.imgShow.id !== undefined)) {
        let beLongPath = ''
        this.imgList.forEach(imgListItem => {
          if (imgListItem.list && imgListItem.list instanceof Array && imgListItem.list.length) {
            imgListItem.list.forEach(imgListItemListRes => {
              if (imgListItemListRes.id === this.imgShow.id) beLongPath = imgListItem.pathName
            })
          }
        })
        const beLongList = this.imgList.find(imgListItem => { return imgListItem.pathName === beLongPath }).list
        let showImgId = this.imgShow.id - 1
        if (showImgId < beLongList[0].id) showImgId = beLongList[beLongList.length - 1].id
        this.imgShow = beLongList.find(beLongListItem => { return beLongListItem.id === showImgId })
        this.ClickPhoto(this.imgShow)
      }
    },
    // 切换下一张图片
    PhotoListNext: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> PhotoListNext')
      if (this.imgList.length && (this.imgShow.id !== undefined)) {
        let beLongPath = ''
        this.imgList.forEach(imgListItem => {
          if (imgListItem.list && imgListItem.list instanceof Array && imgListItem.list.length) {
            imgListItem.list.forEach(imgListItemListRes => {
              if (imgListItemListRes.id === this.imgShow.id) beLongPath = imgListItem.pathName
            })
          }
        })
        const beLongList = this.imgList.find(imgListItem => { return imgListItem.pathName === beLongPath }).list
        let showImgId = this.imgShow.id + 1
        if (showImgId > beLongList[beLongList.length - 1].id) showImgId = beLongList[0].id
        this.imgShow = beLongList.find(beLongListItem => { return beLongListItem.id === showImgId })
        this.ClickPhoto(this.imgShow)
      }
    },
    // 点击查看大图
    ShowBigPhoto: function (photoItem) {
      console.log('Components -> MainPage.PhotoWall -> methods -> ShowBigPhoto')
      console.error(photoItem)
      if (photoItem.url) {
        this.bigPhoto.url = photoItem.url
        this.bigPhoto.show = true
      }
    },
    // 取消 大图显示
    DisappearBigPhoto: function () {
      console.log('Components -> MainPage.PhotoWall -> methods -> DisappearBigPhoto')
      this.bigPhoto.show = false
    }
  }
}
</script>

<style scoped>

</style>
