import Vue from 'vue'
import VueRouter from 'vue-router'
import Decorator from '../views/Decorator.vue'

Vue.use(VueRouter)

function route(path, file, name, title, children) {
  return {
    exact: true,
    props: path.indexOf(":") > -1,
    path,
    name,
    children,
    component: file ? require(`@/${file}.vue`).default : null
  }
}

const routes = [
  route('/', 'views/Decorator', '', 'Decorator', [
    route('', 'views/Generations', 'Generations', 'Generations'),
    route('/pokemons', 'views/Pokemons', 'Pokémons', 'Pokémons'),
  ])
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
