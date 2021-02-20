<template>
  <div class="nav-content">
    <div class="left-nav-header-content">
      <div class="img-content">
        <img :src="logoImg" alt="logo" />
      </div>
      <div class="title-content">
        <div class="title">{{ content.header.title }}</div>
        <div class="description">{{ content.header.description }}</div>
      </div>
    </div>
    <div class="left-nav-body-content">
      <div>
        <Menu v-model:selectedKeys="selectedNav"
              mode="inline"
              theme="dark"
              @select="NavSelect"
              :inline-collapsed="false">
          <template v-for="item in navList" :key="item.key">
            <template v-if="!item.children">
              <MenuItem :key="item.key">
                <span>
                  <component :is="item.icon" />
                  {{ item.title }}
                </span>
              </MenuItem>
            </template>
            <template v-else>
              <SubMenu :menu-info="item" :key="item.key">
                <template #title>
                  <div style="width: 100%; display: flex; flex-direction: row">
                    <div>
                      <span><component :is="item.icon" />{{ item.title }}</span>
                    </div>
                  </div>
                </template>
                <MenuItem v-for="itemA in item.children" :key="itemA.key">
                  <span>
                    <component :is="itemA.icon" />
                    {{ itemA.title }}
                  </span>
                </MenuItem>
              </SubMenu>
            </template>
          </template>
        </Menu>
      </div>
    </div>
    <div class="left-nav-footer-content">
      <div class="left-nav-footer-description">
        <component :is="content.footer.icon" />
        {{ content.footer.description }}
      </div>
      <div class="left-nav-footer-author">
        {{ content.footer.context }}
      </div>
    </div>
  </div>
</template>

<script>
import Menu from 'ant-design-vue/lib/menu'
import MenuItem from 'ant-design-vue/lib/menu/MenuItem'
import SubMenu from 'ant-design-vue/lib/menu/SubMenu'
import 'ant-design-vue/lib/menu/style/index.css'
import {
  BookOutlined,
  UserOutlined,
  FrownOutlined,
  HighlightOutlined,
  HomeOutlined,
  Html5Outlined,
  ReadOutlined,
  WindowsOutlined,
  CodepenOutlined,
  UngroupOutlined,
  AccountBookOutlined
} from '@ant-design/icons-vue'
import navContent from '@/router/nav'

import './nav.css'
const logoImg = require('./../../assets/header.jpg')

export default {
  name: 'Nav',
  components: {
    Menu,
    MenuItem,
    SubMenu,
    BookOutlined,
    UserOutlined,
    FrownOutlined,
    HighlightOutlined,
    HomeOutlined,
    Html5Outlined,
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
    logoImg,
    navList: navContent.routeNav,
    content: navContent.content,
    selectedNav: []
  }),
  mounted () {
    console.log('components -> Nav -> mounted')
  },
  watch: {
    routeNav: function (newVal) {
      console.log('components -> Nav -> watch -> routeNav')
      this.selectedNav = [newVal]
    }
  },
  methods: {
    NavSelect: function (nav) {
      console.log('components -> Nav -> methods -> NavSelect')
      // this.$router.push({ path: nav.key })
      this.navList.forEach(navRes => {
        if (navRes.children) {
          navRes.children.forEach(navChRes => {
            if (navChRes.key === nav.key) {
              if (navRes.key === 'dashboard') this.$router.push({ name: 'dashboard', params: { dashboardUrl: this.DashboardKeyUrl(nav.key) } })
              else this.$router.push({ name: `${navChRes.key}` })
            }
          })
        } else {
          if (navRes.key === nav.key) this.$router.push({ name: `${navRes.key}` })
        }
      })
    },
    // dashboard 显示看板 根据key获取 显示url
    DashboardKeyUrl: function (dashboardKey) {
      console.log('components -> Nav -> methods -> DashboardKeyUrl')
      switch (dashboardKey) {
        case 'dashboard-homeAssistant': return this.$store.state.dashboard.homeAssistant
        case 'dashboard-baidu': return this.$store.state.dashboard.baidu
        case 'dashboard-google': return this.$store.state.dashboard.google
        default: return '/'
      }
    }
  }
}
</script>

<style scoped>

</style>
