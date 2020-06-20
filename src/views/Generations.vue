<template lang='pug'>
	v-layout(row wrap)
		v-flex(
			xl3 lg4 md4 sm6 xs12
			pa-md-3
			v-for='generation in generations'
			:key='generation.name'
		)
			card(:title='`${generation.name.toUpperCase()}`' :subtitle='"Generation of pokémon game"')
</template>

<script>
import Card from '@/components/Card'
import axios from 'axios'

export default {
	name: 'generations',
	
	components: {
		Card
	},

  data: () => ({
    generations: []
	}),
	
	mounted() {
		this.fetchGenerations()
	},

	methods: {
		async fetchGenerations() {
			const url = `${process.env.VUE_APP_API_URL}/generation`

			const response = await axios.get(url)

			this.generations = response.data.results
		}
	}
}
</script>
