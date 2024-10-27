const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const path = require('path');
const multer = require('multer');

const { ethers } = require("ethers");
require("dotenv").config();



const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "SARS",
    database: "product_verification"
})

client.connect()



const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_QUICKNODE_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0x911D4128768D39b0288fdfF7c9a6B93fB778f22c";
const contractABI = require("C:/Users/surak/Desktop/anti-counterfeit-product-identification-system-using-blockchain/identeefi-smartcontract-solidty/artifacts/contracts/Identeefi.sol/Identeefi.json");
const contract = new ethers.Contract(contractAddress, contractABI, wallet);





// auth

function createAccount(username , password, role){
    const res =  client.query('INSERT INTO auth (username, password, role) VALUES ($1, $2, $3)', [username, password, role], (err, res)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Data insert successful');
        }
    })
}

function changePassword(username, password){
    const res =  client.query('UPDATE auth SET password = $1 WHERE username = $2', [password, username], (err, res)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Data update successful');
        }
    })
}

// profile

function createProfile(username, name , description, website, location, image, role){
    client.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [username, name, description, website, location, image, role], (err, res)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Data insert successful');
            }
        })

}

// product

const storageProduct = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/product'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const storageProfile = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/profile'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

function addProduct(serialNumber, name , brand){
    client.query('INSERT INTO product (serialNumber, name, brand) VALUES ($1, $2, $3)', 
        [serialNumber, name, brand], (err, res)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Data insert successful');
            }
        })

}


// auth
app.get('/authAll', async (req, res)=>{
    const data =  await client.query('Select * from auth');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/auth/:username/:password', async (req, res)=>{
    const {username, password} = req.params;
    const data =  await client.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/addaccount', (req, res)=>{
    const {username, password, role} = req.body;
    createAccount(username, password, role);
    res.send('Data inserted');

});

app.post('/changepsw', (req, res)=>{
    const {username, password} = req.body;
    changePassword(username, password);
    res.send('Data updated');
});

// profile 

app.get('/profileAll', async (req, res)=>{
    const data =  await client.query('Select * from profile');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.get('/profile/:username', async (req, res)=>{
    const {username} = req.params;
    const data =  await client.query(`SELECT * FROM profile WHERE username = '${username}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/addprofile', (req, res)=>{
    const {username, name, description, website, location, image, role} = req.body;
    createProfile(username, name, description, website, location, image, role);
    res.send('Data inserted');

});

// image

app.post('/upload/profile', (req, res)=>{

    let upload = multer({ storage: storageProfile}).single('image');

    upload(req, res, (err)=>{
        if(!req.file){
            return res.send('Please select an image to upload')
        }else if (err instanceof multer.MulterError){
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
    })
})

// product

app.post('/upload/product', (req, res)=>{

    let upload = multer({ storage: storageProduct}).single('image');

    upload(req, res, (err)=>{
        if(!req.file){
            return res.send('Please select an image to upload')
        }else if (err instanceof multer.MulterError){
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
    })
})

app.get('/file/profile/:fileName', function (req, res) {
    const {fileName} = req.params;
    const filePath = path.join(__dirname, 'public/uploads/profile', fileName);
    res.sendFile(filePath);
});

app.get('/file/product/:fileName', function (req, res) {
    const {fileName} = req.params;
    const filePath = path.join(__dirname, 'public/uploads/product', fileName);
    res.sendFile(filePath);
});


app.get('/product/serialNumber', async (req, res)=>{
    const data =  await client.query(`SELECT serialNumber FROM product`);
    res.send(data.rows);
});

app.post('/addproduct', (req, res)=>{
    const {serialNumber, name, brand} = req.body;
    addProduct(serialNumber, name, brand);
    res.send('Data inserted');

});


// Function for product registration on both DB and blockchain
async function registerProductOnBlockchain(name, brand, serialNumber, description, image, actor, location, timestamp) {
    try {
        const tx = await contract.registerProduct(name, brand, serialNumber, description, image, actor, location, timestamp);
        await tx.wait();
        console.log("Product registered on blockchain with serial number:", serialNumber);
    } catch (error) {
        console.error("Blockchain registration failed:", error);
    }
}

// New function for adding product history on blockchain
async function addProductHistoryOnBlockchain(serialNumber, actor, location, timestamp, isSold) {
    try {
        const tx = await contract.addProductHistory(serialNumber, actor, location, timestamp, isSold);
        await tx.wait();
        console.log("Product history added for serial number:", serialNumber);
    } catch (error) {
        console.error("Failed to add product history on blockchain:", error);
    }
}

// Function to fetch product details from blockchain
async function getProductFromBlockchain(serialNumber) {
    try {
        const product = await contract.getProduct(serialNumber);
        console.log("Fetched product details from blockchain:", product);
        return product;
    } catch (error) {
        console.error("Failed to fetch product from blockchain:", error);
    }
}

//Endpoint for registering a product on both PostgreSQL and blockchain
app.post('/registerProduct', async (req, res) => {
    const { serialNumber, name, brand, description, image, actor, location, timestamp } = req.body;
    
    // Store in PostgreSQL
    addProduct(serialNumber, name, brand);

    // Store on blockchain
    await registerProductOnBlockchain(name, brand, serialNumber, description, image, actor, location, timestamp);
    
    res.send('Product registered both in database and blockchain');
});

// Endpoint to add product history on blockchain
app.post('/addProductHistory', async (req, res) => {
    const { serialNumber, actor, location, timestamp, isSold } = req.body;

    // Add history on blockchain
    await addProductHistoryOnBlockchain(serialNumber, actor, location, timestamp, isSold);

    res.send("Product history added on blockchain");
});

// Endpoint to get product details from blockchain
app.get('/getProduct/:serialNumber', async (req, res) => {
    const { serialNumber } = req.params;
    
    // Fetch from blockchain
    const product = await getProductFromBlockchain(serialNumber);
    
    res.json(product);
});

app.listen(port, ()=>{
    console.log('Server is running on port 5000');
});
