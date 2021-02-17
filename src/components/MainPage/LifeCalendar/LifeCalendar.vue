<template>
  <Card class="life-calendar-content" size="small">
    <template #title>
      <div class="card-title">日历</div>
    </template>
    <div class="card-content">
      <Calendar class="calendar-body" :fullscreen="false" />
    </div>
  </Card>
</template>

<script>
import Calendar from 'ant-design-vue/lib/calendar'
import 'ant-design-vue/lib/calendar/style/index.css'
import 'ant-design-vue/lib/select/style/index.css'
import 'ant-design-vue/lib/button/style/index.css'
import 'ant-design-vue/lib/radio/style/index.css'
import Card from 'ant-design-vue/lib/card'
import 'ant-design-vue/lib/card/style/index.css'
import './life-calendar.css'

export default {
  name: 'LifeCalendar',
  components: { Calendar, Card }
}
</script>

<style scoped>

</style>
