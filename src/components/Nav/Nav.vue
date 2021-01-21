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
  UserOutlined,
  FrownOutlined,
  HighlightOutlined,
  Html5Outlined,
  ReadOutlined,
  WindowsOutlined
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
    UserOutlined,
    FrownOutlined,
    HighlightOutlined,
    Html5Outlined,
    ReadOutlined,
    WindowsOutlined
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
    console.warn(this.navList)
  },
  watch: {
    routeNav: function (newVal, oldVal) {
      console.error(newVal)
      this.selectedNav = [newVal]
      console.warn(this.selectedNav)
    }
  },
  methods: {
    // ChangeIcon: function () {},
    NavSelect: function (nav) {
      // this.$router.push({ path: nav.key })
      this.navList.forEach(navRes => {
        console.log(nav.key)
        if (navRes.children) {
          navRes.children.forEach(navChRes => {
            console.log(`${navRes.key}/${navChRes.key}`)
            if (navChRes.key === nav.key) this.$router.push({ name: `${navChRes.key}` })
          })
        } else {
          if (navRes.key === nav.key) this.$router.push({ name: `${navRes.key}` })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
