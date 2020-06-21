<template lang='pug'>
	v-layout(row wrap)
		v-flex(xs12 pa-xl-11 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)
			v-skeleton-loader(
				:loading='loading'
				width='200'
				type="text"
			)
				h3 Total of Games: {{ games.length }}
		v-flex(
			v-if='loading'
			xl3 lg4 md6 sm12 xs12
			pa-xl-3 pa-lg-3 pa-md-3 pa-sm-2 pa-xs-10
			v-for='n in 9' 
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
			v-for='game in games'
			:key='game.id'
		)
			card(
				v-if='showCards'
				:id='game.name'
				:title='game.name' 
				:subtitle='generation' 
				:callback='goToRoute'
				:actions='false'
				info='See More'
			)
</template>

<script>
import axios from 'axios'

export default {
	name: 'games',
	
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
    games: [],
    generation: []
	}),
	
	mounted() {
		this.fetchGames()
	},

	methods: {
		async fetchGames() {
			this.loading = true
			const url = `${process.env.VUE_APP_API_URL}/generation/${this.id}`

      const payload = await axios.get(url)

			const promisePayload = await Promise.all(payload.data.version_groups.map(item => this.fetchGameInfo(item.url)))

			promisePayload.forEach(item => {
        item.data.versions.forEach(version => {
          this.games.push(version)
        })
      })
      
      this.generation = promisePayload[0].data.generation.name
			this.loading = false
      this.showCards = true
    },
    
    async fetchGameInfo(url) {
      return await axios.get(url)
    },

		goToRoute(route) {
			this.$router.push(`/generation/${this.id}/${route}`)
		}
	}
}
</script>
