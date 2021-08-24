const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortId = require("shortId");

const app = express(); //created webserver using express by running express as function
// app.use(bodyParser.json()); //used to parse post requests
app.use(express.json());

//initialized mongoose db
// mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
//     useNewUrlParser: true,
//     useCreateIndex : true,
//     useUnifiedTopology : true,
// });
// 1st param is the url of connection to mongo db and 2nd parameter is for better connection to db

mongoose.connect(`mongodb+srv://{mongodb cluster url}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(
    console.log("database connected")
).catch(error => console.log(error));

//define model
const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

//first end-point to get list of products
app.get("/api/products", async (req, res) => {

    const products = await Product.find({}) //find is used to get all data from model, it returns a promise so async await is used
    res.send(products); //send it to the client
});

//end-point to create new product in db
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); //findbyidanddelete filter the product by given id
    res.send(deletedProduct);
});

//model for order
const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    //define products in order
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }],//defined each elementt of array ie cartitem
}, {
    timestamps: true, //when we create order two field will be added ie createdAt and updatedAt
}
)
);

app.post("/api/orders", async (req, res) => {
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is inadequate." })
    }
    const order = await Order(req.body).save();
    res.send(order);
});

//listen to port and launch server
const port = process.env.PORT || 5000;
//its a special env variable to set the port number or default 5000 will be set here if it doesnt exist
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")))
    app.get("*", (request, response) => response.sendFile(path.join(__dirname, "build", "index.html")))
}
app.listen(port, () => console.log("server at http://localhost:5000"));


