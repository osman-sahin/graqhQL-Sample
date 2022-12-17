const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();


mongoose.connect("mongodb+srv://os:469469@cluster0.4bfydjg.mongodb.net/test");
mongoose.connection.once('open', ()=> {
    console.log("connected to db")
})

app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}));

app.listen(4000, () =>{
    console.log('now listening requests on: 4000');
});
