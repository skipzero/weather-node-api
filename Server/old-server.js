import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import mongoose from "mongoose"
import User from './users.js'
// 
const db = mongoose
db.connect('mongodb://127.0.0.1:27017/pagination')
// 
import { MongoClient } from 'mongodb'
const uri = 'mongodb://127.0.0.1/'

const client = new MongoClient(uri)
const dbName = 'pagination'




// const connectToDatabase = async  () => {
//   try {
//     await client.connect();
//     const db = client.db('weather')
//     const weather = db.collection('data')
//     const results = weather.find()
// 
//     Object.keys(results).map(res => console.log(res, results[res], db.command({listCollections: 1})))
// 
//     console.log('=======', results)
//     console.log(`connected to the ${dbName} database`)
// 
//   } catch (err) {
//     console.error(`Error: ${err}`)
//   }
// }
// 
// const main = async () => {
//   try {
//     await connectToDatabase();
//     const databaseList = await client.db().admin().listDatabases()
//     databaseList.databases.forEach(db => console.log( `- ${db.name}`));
//   } catch (err) {
//     console.error(`Error connecting to db: ${err}`)
//   } finally {
//     await client.close
//   }
// }
// 
// main()


// 
// async function checkConnection() {
//   try {
//     // const client = new MongoClient("mongodb://127.0.0.1/");
//     // await client.connect();
//     // client.useDb('weather')
//     const result = await db.db('pagination').command({ ping: 1 });
//     console.log(result, result.ok === 1 ? db.getDb() : "Connection failed.");
//   } catch (error) {
//     console.error("Error during connection:", error);
//   }
// }
// checkConnection();



app.get('/users', paginatedResults(User), (req, res) => {
  console.log('++++++RES', paginatedResults(User))

  res.json(res)
})

function paginatedResults(model) {
  console.log('-----', User)
  return async (req,res,next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
  
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
  
    const results = {}

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      }  
    }
    
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit
      }
    }
    
    try {
      console.log('MODEL=======',results)
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (error) {
      console.error(error)
    }

  }
}
  

app.listen(3000)