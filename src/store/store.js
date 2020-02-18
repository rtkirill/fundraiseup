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
			if(payload.length) {
				let currency = state.currencies.find(currency => currency.code === payload)
				state.currencyValues = state.presets.map(preset => Math.round(preset*currency.rate))
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
			if(state.currencyValues.length) {
				currVals = state.currencyValues
			}
			return currVals
		},
		getCurrencies(state) {
			return state.currencies
		},
	}
})