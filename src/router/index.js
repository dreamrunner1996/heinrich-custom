import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './../views/Main/Main.vue'
import Login from '../views/Login/Login.vue'
import Err from './../views/Err/Err.vue'
import Study from './../views/Study/Study.vue'
import StudyHtml from './../views/Study/StudyHtml/StudyHtml.vue'
import StudyCss from './../views/Study/StudyCss/StudyCss.vue'
import StudyVue from './../views/Study/StudyVue/StudyVue.vue'
import StudyElectron from './../views/Study/StudyElectron/StudyElectron.vue'
import StudyNodeJS from './../views/Study/StudyNodeJS/StudyNodeJS.vue'
import StudyUIFrame from './../views/Study/StudyUIFrame/StudyUIFrame.vue'
import Interview from '../views/Interview/Interview.vue'
import Dashboard from './../views/Dashboard/Dashboard.vue'
// import DashboardIndex from './../views/Dashboard/DashboardIndex/DashboardIndex'

const route = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:catchAll(.*)', component: Err, name: 'none' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/index', component: Main, name: 'index' },
    { path: '/', redirect: '/index' },
    {
      path: '/study',
      component: Study,
      name: 'study',
      children: [
        { path: 'study-html', component: StudyHtml, name: 'study-html' },
        { path: 'study-css', component: StudyCss, name: 'study-css' },
        { path: 'study-vue', component: StudyVue, name: 'study-vue' },
        { path: 'study-electron', component: StudyElectron, name: 'study-electron' },
        { path: 'study-node-js', component: StudyNodeJS, name: 'study-node-js' },
        { path: 'study-ui-frame', component: StudyUIFrame, name: 'study-ui-frame' }
      ]
    },
    { path: '/interview', component: Interview, name: 'interview' },
    { path: '/dashboard', component: Dashboard, name: 'dashboard' }
  ]
})

export default route
