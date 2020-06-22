import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vue-progress-bar'
import { mount } from '@vue/test-utils'
import Pokemons from '@/views/pokemon/Pokemons.vue'

Vue.use(Vuetify)

describe('Pokemons.vue', () => {
  const spy = jest.spyOn(Pokemons.methods, 'fetchPokemons');

  const wrapper = mount(Pokemons)

  it('should data is present in the state of component', async () => {
    const expected = ['loading', 'showCards', 'pokemons', 'filter', 'filtered', 'generation', 'results']
    const received = Object.keys(wrapper.vm.$data)
    expect(expected).toEqual(received)
  })

  it('should testing inital data', async () => {  
    const { 
      loading, 
      showCards, 
      pokemons, 
      filter, 
      filtered, 
      generation,
      results
    } = Pokemons.data()
    
    expect(loading).toBeFalsy()
    expect(showCards).toBeTruthy()
    expect(pokemons).toEqual(expect.arrayContaining([]))
    expect(filter).toBe('')
    expect(filtered).toEqual(expect.arrayContaining([]))
    expect(generation).toBe('')
    expect(results).toBe('')
  })

  it('should fetchPokemons was called', async () => {  
    expect(spy).toHaveBeenCalled()
  })

  it('should filter pokémon', async () => {
    wrapper.setData({ 
      pokemons: [
        { name: 'bulbsaur', sprites: { front_default: 'img'} }, 
        { name: 'pikachu', sprites: { front_default: 'img'} }
      ], 
      filter: 'bulbsaur' 
    })
    wrapper.vm.filterPokemons()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.filtered.length).toBe(1)
    expect(wrapper.vm.$data.filtered[0].name).toBe('bulbsaur')
  })

})


