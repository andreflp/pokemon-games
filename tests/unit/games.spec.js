import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vue-progress-bar'
import { mount } from '@vue/test-utils'
import Games from '@/views/game/Games.vue'

Vue.use(Vuetify)

describe('Games.vue', () => {
  const spy = jest.spyOn(Games.methods, 'fetchGames');

  const wrapper = mount(Games)

  it('should data is present in the state of component', async () => {
    const expected = ['loading', 'showCards', 'games', 'generation', 'filter', 'filtered', 'results']
    const received = Object.keys(wrapper.vm.$data)
    expect(expected).toEqual(received)
  })

  it('should testing inital data', async () => {  
    const { 
      loading, 
      showCards, 
      games, 
      generation, 
      filter, 
      filtered, 
      results 
    } = Games.data()
    expect(loading).toBeFalsy()
    expect(showCards).toBeTruthy()
    expect(games).toEqual(expect.arrayContaining([]))
    expect(filter).toBe('')
    expect(results).toBe('')
    expect(filtered).toEqual(expect.arrayContaining([]))
  })

  it('should fetchGames was called', async () => {  
    expect(spy).toHaveBeenCalled()
  })

  it('should filter game', async () => {
    wrapper.setData({ 
      games: [
        { name: 'red' }, 
        { name: 'blue' }
      ], 
      filter: 'red' 
    })
    wrapper.vm.filterGames()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.filtered.length).toBe(1)
    expect(wrapper.vm.$data.filtered[0].name).toBe('red')
  })

})


