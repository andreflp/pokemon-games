import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vue-progress-bar'
import { mount } from '@vue/test-utils'
import Generations from '@/views/generation/Generations.vue'

Vue.use(Vuetify)

describe('Generations.vue', () => {
  const spy = jest.spyOn(Generations.methods, 'fetchGenerations');

  const wrapper = mount(Generations)

  it('should data is present in the state of component', async () => {
    const expected = ['loading', 'showCards', 'generations', 'filter', 'filtered', 'results']
    const received = Object.keys(wrapper.vm.$data)
    expect(expected).toEqual(received)
  })

  it('should testing inital data', async () => {  
    const { loading, showCards, generations } = Generations.data()
    expect(loading).toBeFalsy()
    expect(showCards).toBeTruthy()
    expect(generations).toEqual(expect.arrayContaining([]))
  })

  it('should fetchGenerations was called', async () => {  
    expect(spy).toHaveBeenCalled()
  })

  it('should filter generation', async () => {
    wrapper.setData({ 
      generations: [
        { name: 'generation-i' }, 
        { name: 'generation-ii' }
      ], 
      filter: 'generation-ii' 
    })
    wrapper.vm.filterGenerations()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.filtered.length).toBe(1)
    expect(wrapper.vm.$data.filtered[0].name).toBe('generation-ii')
  })

})


