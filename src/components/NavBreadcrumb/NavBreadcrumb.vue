<template>
  <div class="nav-breadcrumb-content">
    <Breadcrumb separator=">">
      你的位置: <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
      <BreadcrumbItem v-for="item in showNav" :key="'head-nav-' + item.key">
        <a :href="item.url"><component :is="item.icon" /> {{ item.title }}</a>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from 'ant-design-vue/lib/breadcrumb'
// import BreadcrumbItem from 'ant-design-vue/lib/breadcrumb/BreadcrumbItem'
import 'ant-design-vue/lib/breadcrumb/style/index.css'
import './nav-breadcrumb.css'
import {
  BookOutlined,
  UserOutlined,
  FrownOutlined,
  HighlightOutlined,
  Html5Outlined,
  HomeOutlined,
  ReadOutlined,
  WindowsOutlined,
  CodepenOutlined,
  UngroupOutlined,
  AccountBookOutlined
} from '@ant-design/icons-vue'
import navContent from '@/router/nav.js'
const BreadcrumbItem = Breadcrumb.Item

export default {
  name: 'NavBreadcrumb',
  components: {
    Breadcrumb,
    BreadcrumbItem,
    BookOutlined,
    UserOutlined,
    FrownOutlined,
    HighlightOutlined,
    Html5Outlined,
    HomeOutlined,
    ReadOutlined,
    WindowsOutlined,
    CodepenOutlined,
    UngroupOutlined,
    AccountBookOutlined
  },
  props: {
    routeNav: { required: true, type: String }
  },
  data: () => ({
    navContent,
    showNav: []
  }),
  watch: {
    routeNav: function (newVal) {
      console.log('components -> NavBreadcrumb -> watch -> routeNav')
      this.showNav = []
      this.navContent.routeNav.forEach(res => {
        if (res.children) {
          res.children.forEach(resCh => {
            if (res.key === newVal) {
              this.showNav = []
              this.showNav.push({ ...res, url: `/#/${res.key}` })
            } else if (resCh.key === newVal) {
              this.showNav.push({ ...res, url: `/#/${res.key}` })
              this.showNav.push({ ...resCh, url: `/#/${res.key}/${resCh.key}` })
            }
          })
        } else {
          if (res.key === newVal) this.showNav.push({ ...res, url: `/#/${res.key}` })
        }
      })
      this.showNav = JSON.parse(JSON.stringify(this.showNav))
    }
  }
}
</script>
