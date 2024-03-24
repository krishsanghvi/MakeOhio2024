//Dependencies: 
//yarn add express cors twilio 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid = 'AC08f227e3b68e2e6a2136b1dd5b54c345';
const authToken = '25c0a29ac37bfe482ed7a4182d70573d'; 
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio 
app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, textmessage } = req.query;


    //Send Text
    client.messages.create({
        body: textmessage,
        to: recipient,  // Text this number
        from: '+13656580845' // From a valid Twilio number '+15074734314' 6147828967
    }).then((message) => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))