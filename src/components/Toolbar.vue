<template lang='pug'>
  v-app-bar(app dark color="red darken-4")
    v-app-bar-nav-icon(v-if="$route.name != 'Generations'")
      v-icon(@click='$router.go(-1)') keyboard_backspace
    router-link(to='/')
      v-img(:src="require('@/assets/pokemon-logo.png')" max-width='100px' max-height='50px') 
    v-toolbar-title(style='margin-left: 8px;') 
    span(class='font-weight-bold title-text') {{ this.$route.name }}
    v-spacer
    v-img(:src="require('@/assets/pokeball.png')" max-width='40px' max-height='40px')
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  name: 'toolbar',

  data: () => ({}),

}
</script>

<style scoped>
.title-text {
  margin-left: 10px; 
  font-size: 20px
}
</style>
