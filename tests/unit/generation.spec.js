import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vue-progress-bar'
import { shallowMount } from '@vue/test-utils'
import Generation from '@/views/generation/Generation.vue'

Vue.use(Vuetify)

describe('Generation.vue', () => {
  const spy = jest.spyOn(Generation.methods, 'fetchGeneration');

  const wrapper = shallowMount(Generation)

  it('should data is present in the state of component', async () => {
    const expected = ['loading', 'showCards', 'generation', 'cards']
    const received = Object.keys(wrapper.vm.$data)
    expect(expected).toEqual(received)
  })
  
  it('should testing inital data', async () => {  
    const { loading, showCards, generation, cards } = Generation.data()
    expect(loading).toBeFalsy()
    expect(showCards).toBeTruthy()
    expect(generation).toEqual(expect.arrayContaining([]))
    expect(cards).toEqual(expect.arrayContaining([]))
  })

  it('should fetchGeneration was called', async () => {  
    expect(spy).toHaveBeenCalled()
  })

})


