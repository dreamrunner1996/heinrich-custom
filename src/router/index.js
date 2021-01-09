import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/views/Main/Main.vue'
import Err from '@/views/Err/Err.vue'
import Study from '@/views/Study/Study.vue'
import StudyHtml from '@/views/Study/StudyHtml/StudyHtml.vue'
import StudyCss from '@/views/Study/StudyCss/StudyCss.vue'

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
        { path: 'study-css', component: StudyCss, name: 'study-css' }
      ]
    }
  ]
})

export default route
