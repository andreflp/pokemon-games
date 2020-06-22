import Vue from 'vue'
import VueRouter from 'vue-router'

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
    route('', 'views/generation/Generations', 'Generations', 'Generations'),
    route('/generation/:id', 'views/generation/Generation', 'Generation', 'Generation'),
    route('/generation/:id/games', 'views/game/Games', 'Games', 'Games'),
    route('/generation/:id/pokemons', 'views/pokemon/Pokemons', 'Pokémons', 'Pokémons'),
  ])
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
