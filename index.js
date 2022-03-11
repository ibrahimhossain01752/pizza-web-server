const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
// const ObjectId = require('mongodb').ObjectId;
// const res = require('express/lib/response');
const app = express()
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.638jm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// console.log('connected to the client');

async function run(){
    try{
        await client.connect();
        const database = client.db('pizza_web');
        const servicesCollection = database.collection('services4');
        const usersCollection = database.collection('users');
        const CustomerInfo1 = database.collection('CustomerInfo')
        

        //GET API

        app.get('/services4',async(req,res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

      //   app.get('/book/:id', async (req, res) => {
      //     console.log('Hitedddddd Body.....', req.body);
      // })

        //Booking Order

        app.post('/Addbooking', async (req, res) => {
            console.log(req.body);
            const result = await servicesCollection.insertOne(req.body);
            res.send(result);
        })


        //users collection POST API 

        app.post('/customerInfo', async (req, res) => {
          console.log(req.body);
          const result = await CustomerInfo1.insertOne(req.body);
          console.log(result)
          res.send(result);
      })

        app.use('/users', async (req, res) => {
          console.log(req.body);
          const result = await usersCollection.find({}).toArray();
          console.log(result);
          res.send(result);
      })


        // Customer information insert in database.
      //   app.post('/customerInfo', async (req, res) => {
      //     console.log(req.body);
      //     const result = await CustomerInfo1.insertOne(req.body);
      //     console.log(result)
      //     res.send(result);
      // })

      // customer info getinng from data  
      // app.use('/myOrder', async (req, res) => {
      //     console.log(req.body);
      //     const result = await CustomerInfo1.find({}).toArray();
      //     console.log(result);
      //     res.send(result);
      // })
          


    }
    finally{
        // await client close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('running pizza server');
})

app.listen(port, () => {
  console.log('running the server');
})