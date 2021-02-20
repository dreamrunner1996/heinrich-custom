const content = {
  header: {
    title: 'Heinrich',
    description: '个人主页'
  },
  footer: {
    icon: 'HighlightOutlined',
    context: '—— Heinrich',
    description: '记录生活上的点点滴滴'
  }
}
const routeNav = [
  {
    key: 'index',
    title: '个人主页',
    icon: 'UserOutlined'
  },
  {
    key: 'study',
    title: '学习方向',
    icon: 'ReadOutlined',
    children: [
      {
        key: 'study-html',
        title: 'Html',
        icon: 'Html5Outlined'
      },
      {
        key: 'study-css',
        title: 'Css',
        icon: 'WindowsOutlined'
      },
      {
        key: 'study-vue',
        title: 'Vue',
        icon: 'BookOutlined'
      },
      {
        key: 'study-electron',
        title: 'Electron',
        icon: 'BookOutlined'
      },
      {
        key: 'study-node-js',
        title: 'NodeJS',
        icon: 'BookOutlined'
      }
    ]
  },
  {
    key: 'other',
    title: '其它知识',
    icon: 'CodepenOutlined',
    children: [
      {
        key: 'other-piano',
        title: 'Piano',
        icon: 'UngroupOutlined'
      },
      {
        key: 'other-invest',
        title: 'Invest',
        icon: 'AccountBookOutlined'
      }
    ]
  },
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: 'ReadOutlined',
    children: [
      {
        key: 'dashboard-homeAssistant',
        title: 'HomeAssistant',
        icon: 'HomeOutlined'
      },
      {
        key: 'dashboard-baidu',
        title: 'Baidu',
        icon: 'HomeOutlined'
      },
      {
        key: 'dashboard-google',
        title: 'Google',
        icon: 'HomeOutlined'
      }
    ]
  }
]

const navContent = {
  content, routeNav
}

export default navContent
