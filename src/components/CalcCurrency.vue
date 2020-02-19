<template>
    <div class="calc-currency">
        <div class="card shadow-sm calc-block">
            <div class="card-body">
                <div class="row mx-0 mb-2">
                    <div class="col-4 p-1"
                         v-for="(preset, index) in presets"
                         :key="index"
                    >
                        <div class="calc-block__value text-center p-1 rounded shadow-sm"
                             :id="'calc-value-'+preset"
                             :class="{ 'active': +suggestion === preset }"
                             @click.prevent="selectPreset(preset)"
                        >
                            {{ currency_symbol }} {{ preset | currencyFormat }}
                        </div>
                    </div>
                </div>

                <div class="input-group mb-4">
                    <div class="input-group-append">
                        <span class="input-group-text" id="currency-value">{{ currency_symbol }}</span>
                    </div>
                    <input type="text" class="form-control calc-block__input matched" aria-describedby="currency-value"
                           v-model="$v.suggestion.$model"
                           :class="{'error': $v.suggestion.$error}"
                    >
                    <div class="input-group-append">
                        <select class="custom-select" id="currency-type"
                                @change.prevent="convertCurrency()"
                                v-model="currency_type"
                        >
                            <option v-for="(currency, index) in currencies"
                                    :key="index"
                                    :value="currency.code"
                            >
                                {{ currency.code }}
                            </option>
                        </select>
                    </div>
                </div>

                <button type="button" class="btn btn-lg btn-block btn-primary shadow-sm text-uppercase">Donate</button>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
	import {required, numeric, minValue} from 'vuelidate/lib/validators'

    let beforeRate, curRate

	export default {
		name: "CalcCurrency",
		data() {
			return {
				suggestion: 40,
				currency_symbol: '$',
				currency_type: 'USD',
			}
		},
		validations: {
			suggestion: {
				required,
				numeric,
				minValue: minValue(1)
			}
		},
		computed: {
			...mapGetters([
				'getPresets',
				'getCurrencies',
				'getSuggestion',
			]),
			presets() {
				return this.getPresets;
			},
			currencies() {
				return this.getCurrencies;
			},
		},
		methods: {
			...mapActions([
				'makeConvertCurrency',
			]),
			selectPreset(value) {
				this.suggestion = value;
			},
			convertCurrency() {
				let currency = this.currencies.find(currency => currency.code === this.currency_type)
				this.currency_symbol = currency.symbol
                let newSuggestion = this.suggestion
                beforeRate = curRate
                curRate = currency.rate
                if(currency.rate === 1 && beforeRate) {
					newSuggestion /= beforeRate
                } else if(beforeRate) {
					newSuggestion = newSuggestion / beforeRate * currency.rate
                } else {
					newSuggestion *= currency.rate
                }

                this.suggestion = Math.round(newSuggestion);
				this.makeConvertCurrency(this.currency_type);
            }
		},
		filters: {
			currencyFormat: function (value) {
				return new Intl.NumberFormat('en-US').format(value)
			}
		},
	}
</script>

<style scoped>
    .calc-block {
        margin: 100px auto;
        width: 300px;
        background-color: #f8f8f8;
    }

    .calc-block__value {
        background-color: #fff;
        cursor: pointer;
    }

    .calc-block__value.active {
        background-color: #007bff;
        color: #fff;
    }

    .calc-block__input.matched {
        color: #007bff;
    }

    .calc-block__input.error {
        border-color: red;
    }
</style>