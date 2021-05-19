// Appel des services (npm module tu connais )
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


//Mongoose initialisation
mongoose.connect('mongodb+srv://mohamed:414498200@planode-zoo.yegdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connexion à mon cluster mongodb réussie !'))
	.catch(() => console.log('la connexion au cluster à échouée :('));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//bodyparser access config etc
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

// gestion des controllers


module.exports = app;