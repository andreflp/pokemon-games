<template lang='pug'>
	v-hover(v-slot:default="{ hover }")
		v-card.mx-auto(max-width='344' outlined :elevation="hover ? 12 : 2")
			v-list-item(three-line='')
				v-list-item-content
					v-list-item-title.headline.mb-1 {{ title.toUpperCase() }}
					v-list-item-subtitle {{ subtitle.toUpperCase() }}
				v-list-item-avatar(tile size='80')
					v-img(
						:lazy-src="img ? img : require('@/assets/logo-pokemon.png')" 
						:src="img ? img : require('@/assets/logo-pokemon.png')"
						max-width='80px' 
						max-height='80px'
					)
			v-card-actions(v-if='actions')
				v-btn(text color='red darken-4' @click='callback(id)') {{ info }}
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
		},
		id: {
			type: [Number, String],
			required: false
		},
		callback: {
			type: Function,
			required: true
		},
		img: {
			type: String
		},
		info: {
			type: String,
			required: true
		},
		actions: {
			type: Boolean,
			default: true
		}
	},

  data: () => ({
    //
	})
}
</script>
