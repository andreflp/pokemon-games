<template lang="pug">
	div
		toolbar
		v-main(style='padding: 15px 100px 0px 100px;')
			router-view
</template>

<script>
import Toolbar from '@/components/Toolbar'
export default {
	name: 'decorator',

	components: {
		Toolbar
	}

}
</script>

<style scoped>
.app-container {
  padding: 10px;
}
</style>