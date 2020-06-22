import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

// Vue.config.ignoredElements = ['v-hover']

Vue.use(Vuetify)

describe('Card.vue', () => {
  let spy = jest.spyOn(console, 'error')
  afterEach(() => spy.mockReset())

  const wrapper = mount(Card, {
    propsData: {
      title: 'Card title',
      info: 'Card info',
      callback: () => {},
      id: 1
    }
  })

  it('should pass required props ', () => {  
    expect(wrapper.props().title).toBe('Card title')
    expect(wrapper.props().id).toBe(1)
  })

  it('should throw error on required props not passed', () => {
    const createCmp = propsData => mount(Card, { propsData })
    const cmp = createCmp()
    
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop'))
  })
})


