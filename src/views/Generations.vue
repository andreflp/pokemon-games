<template lang='pug'>
	v-layout(row wrap)
		v-flex(xs12 pa-xl-11 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)
			v-skeleton-loader(
				:loading='loading'
				width='200'
				type="text"
			)
				h3 Total of Generations: {{ generations.length }}
		v-flex(
			v-if='loading'
			xl3 lg4 md6 sm12 xs12
			pa-xl-3 pa-lg-3 pa-md-3 pa-sm-2 pa-xs-10
			v-for='n in 7' 
			:key='n'
		)
			v-skeleton-loader(
				:loading="loading"
				height="170"
				type="card"
			)
		v-flex(
			xl3 lg4 md6 sm12 xs12
			pa-xl-3 pa-lg-3 pa-md-3 pa-sm-2 pa-xs-10
			v-for='generation in generations'
			:key='generation.name'
		)
			card(
				v-if='showCards'
				:id='generation.id'
				:title='generation.name' 
				:subtitle='"Generation of pokémon game"' 
				:callback='goToRoute'
				info='See More'
			)
</template>

<script>
import axios from 'axios'

export default {
	name: 'generations',
	
	components: {
		Card: () => import('@/components/Card')
	},

  data: () => ({
		loading: false,
		showCards: true,
    generations: []
	}),
	
	mounted() {
		this.fetchGenerations()
	},

	methods: {
		async fetchGenerations() {
			this.loading = true
			const url = `${process.env.VUE_APP_API_URL}/generation`

			const payload = await axios.get(url)

			const promisePayload = await Promise.all(payload.data.results.map(item => this.fetchGenerationInfo(item.url)))

			this.generations = promisePayload.map(item => item.data)
			this.loading = false
      this.showCards = true
		},

		async fetchGenerationInfo(url) {
			return await axios.get(url)
		},

		goToRoute(idGeneration) {
			this.$router.push(`/generation/${idGeneration}`)
		}
	}
}
</script>
