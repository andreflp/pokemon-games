<template lang='pug'>
	v-hover(v-slot:default="{ hover }")
		v-card.mx-auto(max-width='344' outlined :elevation="hover ? 12 : 2")
			v-list-item(three-line='')
				v-list-item-content
					v-list-item-title.headline.mb-1 {{ title }}
					v-list-item-subtitle {{ subtitle }}
				v-list-item-avatar(tile size='80')
					v-img(:src="require('@/assets/logo-pokemon.png')" max-width='80px' max-height='80px')
			v-card-actions
				v-btn(text color='red darken-4' @click='') Go To Pokémons
					v-icon(right dark) arrow_right_alt
</template>

<script>

export default {
	name: 'card',
	
	props: {
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			required: false
		}
	},

  data: () => ({
    //
  })
}
</script>
