// import express from "express"
// import db from "../db/conn.mjs"
// import { ObjectId} from 'mongodb'

// const router = express.Router()

// //GET - get all resturants

// router.get("/", async (req, res)=>{
//     const collection = await db.collection("movies")
//     const results = await collection.find({}).limit(10).toArray()

//     res.send(results).status(200)
// })

// // GET - show - get one resturant
// router.get('/:id', async (req, res)=>{
//     const collection = await db.collection('movies') //<= name of collection
//     const query = { _id: new ObjectId(req.params.id) } //<= restaurants id
//     const result = await collection.findOne(query)

//     if(!result) res.send("Not found").status(404); // if not found set the satus to 404
//     else res.send(result).status(200)
// })

// // POST - create a restaurant

// router.post('/', async (req, res) => {
//     const collection = await db.collection('movies')
//     const newDocument = req.body;
//     newDocument.date = new Date();
//     const result = await collecttion.insertOne(newDocument)
//     res.send(result).status(204)
// })

// //UPDATE - update a document

// //update the post with a new comment
// router.patch("/:id", async (req, res)=> {
//     const query = { _id: new ObjectId(req.params.id) };
//     const updates = {
//         $push: { grades: req.body},
//     };
//     console.log(updates);
//     const collection = await db.collection("movies");
//     const result = await collection.updateOne(query, updates);

//     res.send(result).status(200)
// })

// // DELETE - delete a restaurant

// router. delete('/:id', async(req, res)=>{
//     const query = {_id: new ObjectId(req.params.id)}

//     const collection = db.collection('movies')
//     const result = await collection.deleteOne(query)

//     res.send(result).status(200)
// })

// export default router;

import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const COLLECTION_NAME = "movies";

router.get("/", async function (req, res) {
  try {
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.find({}).limit(10).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const collection = await db.collection(COLLECTION_NAME);
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async function (req, res) {
  try {
    const collection = await db.collection(COLLECTION_NAME);
    const newDocument = req.body;
    newDocument.date = new Date();
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/:id", async function (req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $push: { grades: req.body },
    };

    const collection = await db.collection(COLLECTION_NAME);
    const result = await collection.updateOne(query, updates);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection(COLLECTION_NAME);
    const result = await collection.deleteOne(query);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
