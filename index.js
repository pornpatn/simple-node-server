const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const userModel = require("./models");
const mangodbUri = "mongodb+srv://mongouser:q16lzr5BgsfR7H0I@nikamanon.h6ktrj4.mongodb.net/simpleDB?retryWrites=true&w=majority";

const app = express();
const port = 80;

const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(mangodbUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/details', async (req, res) => {
    // const user = await userModel.findOne({id: 123});
    const user = await userModel.find({});
    res.send(user);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
