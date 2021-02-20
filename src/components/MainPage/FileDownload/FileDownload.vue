<template>
  <Card class="file-download-content" style="width: 300px" size="small">
    <template #title>
      <div class="card-title">文件保险柜</div>
    </template>
    <template #extra>
      <Tooltip>
        <template #title>
          <div style="height: 30px; line-height: 30px">刷新文件列表</div>
        </template>
        <SyncOutlined id="xs" style="margin-right: 15px; cursor: pointer" :style="styleList.flash" @click="FlashFileList" />
      </Tooltip>
      <Tooltip>
        <template #title>
          <div style="height: 60px; line-height: 30px">文件保管的地方, 需要时点击项目即可下载</div>
        </template>
        <QuestionCircleOutlined style="cursor: default" />
      </Tooltip>
    </template>
    <div class="card-content">
      <div v-for="item in fileList" :key="'fileList - ' + item.belong">
        <div class="file-title">{{ item.belong }}</div>
        <div v-for="fileItem in item.fileList"
             class="file-item"
             :key="'file - ' + fileItem.id"
             @click="DownLoadFile(fileItem)">
          {{ fileItem.name }}
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
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons-vue'

import './file-download.css'
import Axios from 'axios'
import { saveAs } from 'save-as'

export default {
  name: 'FileDownload',
  components: { Card, Tooltip, QuestionCircleOutlined, SyncOutlined },
  data: () => ({
    styleList: {
      flash: {}
    },
    fileList: []
  }),
  mounted () {
    console.log('Components -> MainPage.FileDownload -> mounted')
    this.GetFileList()
  },
  methods: {
    FlashFileList: function () {
      console.log('Components -> MainPage.FileDownload -> methods -> FlashFileList')
      this.styleList.flash = {
        animation: 'xs-flash 1s linear'
      }
      this.GetFileList()
      window.setTimeout(() => {
        this.styleList.flash = {}
      }, 1000)
    },
    GetFileList: function () {
      console.log('Components -> MainPage.FileDownload -> methods -> GetFileList')
      this.fileList = []
      Axios.get(this.$store.getters.fileListUrl).then(res => {
        const fileListArr = JSON.parse(JSON.stringify(res.data))
        if (fileListArr && fileListArr instanceof Array && fileListArr.length) {
          fileListArr.forEach((fileRes, fileIndex) => {
            let fileBelongState = false
            if (this.fileList.length) {
              this.fileList.forEach(fileListRes => {
                if (fileListRes.belong === fileRes.path.split('/')[3]) {
                  fileBelongState = true
                  fileListRes.fileList.push({ id: fileIndex + 1, name: fileRes.filename, url: `${fileRes.path}${fileRes.filename}` })
                }
              })
            }
            if (!fileBelongState) {
              const fileArr = []
              fileArr.push({ id: fileIndex + 1, name: fileRes.filename, url: `${fileRes.path}${fileRes.filename}` })
              this.fileList.push({
                belong: fileRes.path.split('/')[3],
                fileList: JSON.parse(JSON.stringify(fileArr))
              })
            }
          })
        }
      })
    },
    DownLoadFile: function (item) {
      console.log('Components -> MainPage.FileDownload -> methods -> DownLoadFile')
      const str = `?name=${item.name}&url=${item.url}`
      Axios.get(this.$store.getters.downloadUrl + str, {
        responseType: 'blob'
      }).then(res => {
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        })
        saveAs(blob, item.name)
      })
    }
  }
}
</script>

<style scoped>

</style>
