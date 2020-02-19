const express = require('express')
const mongoose = require('mongoose')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const dbUrl = `mongodb+srv://${config.mongoUser}:${config.mongoPwd}@cluster0-9mumf.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {useNewUrlParser: true})
mongoose.connection
	.once('open', () => {
		console.log(`Mongoose - successful connection`)
		app.listen(config.PORT,
			() => console.log(`Server start on port ${config.PORT}`))
		app.use(serveStatic(__dirname + "/dist"))
	})
	.on('error', error => console.warn(error))


const Schema = mongoose.Schema
const DonateSchema = new Schema({
	amount: {
		type: Number
	},
	currency: {
		type: String
	}
})
const Donate = mongoose.model('currencies', DonateSchema)

app.post('/donate', function (req, res) {
	new Donate({
		amount: req.body.amount,
		currency: req.body.currency
	}).save()
		.then(() => res.send({"ok": true}))
		.catch(() => res.send({"ok": false}))
})