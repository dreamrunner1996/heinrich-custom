<template>
  <div class="nav-user-content">
    <Button v-if="!loginStatus" type="link">点击登录</Button>
    <Avatar :src="userInformation.logo">
      {{ userInformation.name ? userInformation.name : '游客' }}
    </Avatar>
    <Popover v-model:visible="poVisible" trigger="click">
      <template #title>
        <div style="height: 32px; line-height: 32px">
          {{ userInformation.name ? userInformation.name : '游客' }}
        </div>
      </template>
      <template #content>
        <div style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row; margin-top: 10px;">
            <Button type="link" style="width: 50%">切换账号</Button>
            <Button type="link" style="width: 50%">注销</Button>
          </div>
        </div>
      </template>
      <Button v-if="loginStatus" type="link" style="color: rgba(0, 0, 0, .5)">
        {{ userInformation.name ? userInformation.name : '游客' }}, 您好
      </Button>
    </Popover>
  </div>
</template>

<script>
import './nav-user.css'
import Avatar from 'ant-design-vue/lib/avatar'
import 'ant-design-vue/lib/avatar/style/index.css'
import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/lib/button/style/index.css'
import Popover from 'ant-design-vue/lib/popover'
import 'ant-design-vue/lib/popover/style/index.css'

export default {
  name: 'NavUser',
  components: { Avatar, Button, Popover },
  props: {
    userInformation: {
      default: () => ({
        name: '',
        logo: ''
      }),
      type: Object
    },
    loginStatus: {
      required: true,
      type: Boolean
    }
  },
  data: () => ({
    poVisible: false
  })
}
</script>

<style scoped>

</style>
