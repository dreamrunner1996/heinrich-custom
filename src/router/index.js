import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/views/Main/Main.vue'
import Err from '@/views/Err/Err.vue'
import Study from '@/views/Study/Study.vue'
import StudyHtml from '@/views/Study/StudyHtml/StudyHtml.vue'
import StudyCss from '@/views/Study/StudyCss/StudyCss.vue'
import StudyVue from '@/views/Study/StudyVue/StudyVue'
import StudyElectron from '@/views/Study/StudyElectron/StudyElectron'
import StudyNodeJS from '@/views/Study/StudyNodeJS/StudyNodeJS'
import Other from '@/views/Other/Other'
import OtherInvest from '@/views/Other/OtherInvest/OtherInvest'
import OtherPiano from '@/views/Other/OtherPiano/OtherPiano'

const route = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/:catchAll(.*)', component: Err, name: 'none' },
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
        { path: 'study-node-js', component: StudyNodeJS, name: 'study-node-js' }
      ]
    },
    {
      path: '/other',
      component: Other,
      name: 'other',
      children: [
        { path: 'other-piano', component: OtherPiano, name: 'other-piano' },
        { path: 'other-invest', component: OtherInvest, name: 'other-invest' }
      ]
    }
  ]
})

export default route
