<template lang='pug'>
  v-layout(row wrap)
    v-flex(xs12 pa-xl-11 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)
      v-skeleton-loader(
        :loading='loading'
        width='200'
        type="text"
      )
        h3 {{ generation.name.toUpperCase() }}
    v-flex(
      v-if='loading'
      xl3 lg4 md6 sm12 xs12
      pa-xl-3 pa-lg-3 pa-md-3 pa-sm-2 pa-xs-10
      v-for='n in 2' 
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
      v-for='card in cards'
      :key='card.id'
    )
      card(
        v-if='showCards'
        :id='card.route'
        :title='card.name' 
        :subtitle='`${card.subtitle} ${generation.name}`' 
        :callback='goToRoute'
        info='See More'
      )
</template>

<script>
import axios from 'axios'

export default {
	name: 'generation',
	
	components: {
		Card: () => import('@/components/Card')
  },
  
  props: {
    id: {
      type: String
    }
  },

  data: () => ({
		loading: false,
		showCards: true,
    generation: '',
    cards: [
      { name: 'Games', route: 'games', subtitle: 'Games of' },
      { name: 'Pokémons', route: 'pokemons', subtitle: 'Pokémons of' }
    ]
	}),
	
	mounted() {
		this.fetchGeneration()
	},

	methods: {
		async fetchGeneration() {
			this.loading = true
			const url = `${process.env.VUE_APP_API_URL}/generation/${this.id}`

      const payload = await axios.get(url)

			this.generation = payload.data
			this.loading = false
      this.showCards = true
		},


		goToRoute(route) {
			this.$router.push(`/generation/${this.id}/${route}`)
		}
	}
}
</script>
