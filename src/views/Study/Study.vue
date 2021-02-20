<template>
  <div class="study-content">
    <div class="context">
      <router-view />
    </div>
    <div class="other-components">
      <LifeCalendar />
    </div>
  </div>
</template>

<script>
import LifeCalendar from '@/components/MainPage/LifeCalendar/LifeCalendar'
import './study.css'

export default {
  name: 'Study',
  components: { LifeCalendar },
  mounted: function () {
    console.log('Views -> Study -> mounted')
  },
  methods: {}
}
</script>

<style scoped>

</style>
