const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const url = 'mongodb://localhost:27017/bookdb';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true };

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    type: String,
    id: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String
}, {
    collection: 'books'
});

let Book
try {
    Book = mongoose.model('books')

} catch(error) {
    Book = mongoose.model('books', userSchema);
}

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});
expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err => {
        console.log('Cannot connect to MongoD');
        res.satus(501).send('Cannot connect to MongoDB')
    });
});


const addBook = (bookData) => {
    return new Promise((resolve, reject) => {
        var new_book = new Book(
            bookData
        );
        new_book.save((err, data) => {
            if(err) {
                reject(new Error('Cannot insert book to DB!'));
            }else{
                resolve({message: 'Book added successfully'});
            }
        });
    });
}


const getBooks = () => {
    return new Promise((resolve, reject) => {
        Book.find({},(err, data) => {
            if(err){
                reject(new Error('Cannot get books!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot getbooks!'));
                }
            }
        })
    });
}




expressApp.post('/books/add', (req,res)=>{
    console.log('add');
    addBook(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
    })
});



expressApp.get('/books/get',(req,res)=>{
    console.log('get');
    getBooks()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
    })
});


expressApp.listen(3000,function(){
    console.log('Listenning on port 3000');
});