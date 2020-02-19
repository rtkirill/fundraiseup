import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		presets: [40, 100, 200, 1000, 2500, 5000],
		currencyValues: [],
		currencies: [
			{name: "US Dollar", code: "USD", symbol: "$", rate: 1},
			{name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
			{name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
			{name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}
		]
	},
	mutations: {
		makeConvertCurrency(state, payload) {
			if (payload.length) {
				let currency = state.currencies.find(currency => currency.code === payload)
				let newCurrency = state.presets.map(preset => Math.round(preset * currency.rate))
				let depthRound = [
					{depth: 1, round: 1},
					{depth: 2, round: 5},
					{depth: 3, round: 10},
					{depth: 4, round: 100},
				]
				state.currencyValues = newCurrency.map(currency => {
					let depth = currency.toString().length
					let obRound = depthRound.find(depthVal => depthVal.depth === depth)
					if(obRound) {
						currency = Math.ceil(currency / obRound.round) * obRound.round
					} else {
						currency = Math.ceil(currency / 1000) * 1000
					}
					return currency
				})
			}
		}
	},
	actions: {
		makeConvertCurrency({commit}, payload) {
			commit('makeConvertCurrency', payload);
		}
	},
	getters: {
		getPresets(state) {
			let currVals = state.presets
			if (state.currencyValues.length) {
				currVals = state.currencyValues
			}
			return currVals
		},
		getCurrencies(state) {
			return state.currencies
		},
	}
})