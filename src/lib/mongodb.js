import { MongoClient } from 'mongodb'

// import mongodb uri from dotenv
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Mongodb uri is not defined in .env file')
}

let client = new MongoClient(uri)

let clientPromise = client.connect()
export default clientPromise
