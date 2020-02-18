<template>
    <div class="calc-currency">
        <div class="card shadow-sm calc-block">
            <div class="card-body">
                <div class="row mx-0 mb-2">
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm active">40</div>
                    </div>
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm">40</div>
                    </div>
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm">40</div>
                    </div>
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm">40</div>
                    </div>
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm">40</div>
                    </div>
                    <div class="col-4 p-1">
                        <div class="calc-block__value text-center p-1 rounded shadow-sm">40</div>
                    </div>
                </div>

                <div class="input-group mb-4">
                    <div class="input-group-append">
                        <span class="input-group-text" id="currency-value">$</span>
                    </div>
                    <input type="text" class="form-control calc-block__input matched" aria-describedby="currency-value">
                    <div class="input-group-append">
                        <select class="custom-select" id="currency-type">
                            <option selected>USD</option>
                            <option value="1">One</option>
                        </select>
                    </div>
                </div>

                <button type="button" class="btn btn-lg btn-block btn-primary shadow-sm text-uppercase">Donate</button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "CalcCurrency"
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