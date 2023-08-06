// We'll setup our database here
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongoUser = process.env['MONGO_USER'];
const mongoPasswd = process.env['MONGO_PASSWD'];
const uri = `mongodb+srv://${mongoUser}:${mongoPasswd}@cluster0.jgnmjiy.mongodb.net/`

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
