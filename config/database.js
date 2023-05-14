const mongoose = require("mongoose");


const MONGODB = "mongodb+srv://update8768:UJd9bu0SZMt26HuH@cluster0.ibghora.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
    .connect(MONGODB)
    .then(() => {
        console.log("Connect to MongooDB....");
    })
    .catch((err) => {
        console.log(err);
    });


