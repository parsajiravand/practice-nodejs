const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.brzgj.mongodb.net/nodejs-practice?retryWrites=true&w=majority`;

const connectionParams={
useUnifiedTopology: true,
useNewUrlParser: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
      console.log(url,connectionParams)
        console.error(`Error connecting to the database. \n${err}`);
    })