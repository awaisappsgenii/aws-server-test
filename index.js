const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT;
const uri = process.env.DATABASE_CLOUD;

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.get('/api', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('test');
    const User = database.collection('user');
    const users = await User.find({}).toArray();
    res.send(users);
  } catch (error) {
   console.log(error); 
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});