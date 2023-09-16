import mongoose from "mongoose"

const URI = 'mongodb+srv://CoderUser:asd123@cluster0.yb79iwi.mongodb.net/ecommerce'

await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
console.log("Base de datos conectada....")