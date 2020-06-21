<template lang='pug'>
  v-layout(row wrap)
    v-flex(xs12 pa-xl-11 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)
      v-skeleton-loader(
        :loading='loading'
        width='200'
        type="text"
      )
        h3 Total of Pokémons: {{ pokemons.length }}
    v-flex(xs4 offset- pa-xl-12 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)   
      v-text-field(
        label='Search'
        v-model='filter'
        color='red darken-4'
        append-icon='search'
        @input='filterPokemons'
      )
    v-flex(v-if='filter' xs4 offset-xs4 pa-xl-12 pa-lg-6 pa-md-6 pa-sm-10 pa-xs-10)   
      v-text-field(
        label='Results'
        v-model='results'
        color='red darken-4'
        disabled
      )
    v-flex(xs12)
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
      v-for='pokemon in filtered'
      :key='pokemon.name'
    )
      card(
        v-if='showCards'
        :id='pokemon.id'
        :title='pokemon.name' 
        :subtitle='generation' 
        :callback='fetchPokemons'
        :img='pokemon.sprites.front_default'
        info='Pokémon info'
      )
</template>

<script>
import axios from 'axios'

export default {
  name: 'pokemons',

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
    pokemons: [],
    filter: '',
    filtered: [],
    generation: ''
  }),

  mounted() {
    this.fetchPokemons()
  },

  methods: {
    async fetchPokemons() {
      this.$Progress.start()
      this.loading = true

      const url = `${process.env.VUE_APP_API_URL}/generation/${this.id}`
      const urlPokemon = `${process.env.VUE_APP_API_URL}/pokemon`

      const payload = await axios.get(url)
      console.log('payload', payload)
      const promisePayload = await Promise.all(payload.data.pokemon_species.map(item => this.fetchPokemonInfo(`${urlPokemon}/${item.name}`)))
      
      this.pokemons = promisePayload.map(item => {
        return {
          id: item.data.id,
          name: item.data.name,
          sprites: item.data.sprites
        }
      })
      this.filtered = this.pokemons
      this.generation = payload.data.name
      this.loading = false
      this.showCards = true
      this.$Progress.finish()
    },

    async fetchPokemonInfo(url) {
      return await axios.get(url)
    },

    filterPokemons() {
      const results = this.filter 
        ? this.pokemons.filter(pokemon => pokemon.name.includes(this.filter.toLowerCase())) 
        : this.pokemons

      this.filtered = results
      this.results = results.length
    }
  }
}
</script>
