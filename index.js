console.log("Starting")
const express = require('express')
const path = require('path')
var request = require('request');
var crypto = require('crypto');

const PORT = process.env.PORT || 5000
var bodyParser = require("body-parser");
var cors = require('cors');    


const cosmosjs = require("@cosmostation/cosmosjs");


var app = express();


//var io = require('socket.io')(app);
const http = require('http')

var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')

var server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(express.static(path.join(__dirname, 'public')))


var cors = require('cors');    
app.use(cors({credentials: true, origin: '*'}));
 // .set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
 app.get("/", function(req, res) {

 	res.send("hello. Do stuff with cosmos");
 })

  app.get("/make", function(req, res) {
  	var theAddress = makeAddress();
 	res.send(theAddress);
 })

 app.get("/send", function(req, res) {
 	//cosmos1gk5y73rn00qmz054gur657aaxhcdur528mk2vj
 	var phrase = 'creature skin anything heading connected circle surface announced unhappy voyage weigh paragraph exercise seven circle circle sent sky fuel greatest jump apple shake city';
  	var trans = sendTrans(phrase, res)


 })


function makeAddress(){
var randomWords = require('random-words');
var words = randomWords(24);
var seedTotal  =JSON.stringify(words).replace(/\[|\]|\"/g, "").replace(/\,/g, " ")


	const mnemonic =seedTotal;
const chainId = "cosmoshub-2";
const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId);
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
//console.log(address)

//console.log(ecpairPriv);
return [address, seedTotal]
}



function sendTrans(phrase, respObj){

	const chainId = "cosmoshub-2";
const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId);
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(phrase);
const ecpairPriv = cosmos.getECPairPriv(phrase);


	cosmos.getAccounts(address).then(data => {
	let stdSignMsg = cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgSend",
		from_address: address,
		to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
		amountDenom: "uatom",
		amount: 10000,
		feeDenom: "uatom",
		fee: 5000,
		gas: 200000,
		memo: "",
		account_number: data.value.account_number,
		sequence: data.value.sequence
	});

	console.log(stdSignMsg)
	const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	cosmos.broadcast(signedTx).then(response =>  respObj.send(response));


})
}


