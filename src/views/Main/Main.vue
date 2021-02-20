<template>
  <div class="main-content">
    <div>
      <FileDownload />
    </div>
    <div style="margin-left: 10px">
      <PhotoWall />
    </div>
    <div style="margin-left: 10px">
      <LifeCalendar />
      <CollectionCenter />
      <LifeDiary />
    </div>
  </div>
</template>

<script>
import FileDownload from '@/components/MainPage/FileDownload/FileDownload'
import LifeCalendar from '@/components/MainPage/LifeCalendar/LifeCalendar'
import PhotoWall from '@/components/MainPage/PhotoWall/PhotoWall'
import CollectionCenter from '@/components/MainPage/CollectionCenter/CollectionCenter'
import LifeDiary from '@/components/MainPage/LifeDiary/LifeDiary'

import './main.css'

export default {
  name: 'Main',
  components: { FileDownload, LifeCalendar, PhotoWall, CollectionCenter, LifeDiary },
  data: () => ({}),
  mounted () {}
}
</script>
