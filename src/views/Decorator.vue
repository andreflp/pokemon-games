<template lang="pug">
	div
		toolbar
		v-main(style='padding: 15px 100px 0px 100px;')
			v-content
				transition(name='fade' mode='out-in')
					router-view
</template>

<script>
export default {
	name: 'decorator',

	components: {
		Toolbar: () => import('@/components/Toolbar')
	}

}
</script>