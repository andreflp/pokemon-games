<template lang='pug'>
  v-app
    router-view
    vue-progress-bar
</template>

<script>

export default {
  name: 'app',

  data: () => ({
    //
  })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>


