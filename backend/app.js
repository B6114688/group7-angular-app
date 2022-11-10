const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const key = 'MY_KEY';

const makeHash = async (plainText) => {
    const result = await bcryptjs.hash(plainText, 10);
    return result;
}


const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcryptjs.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare!'))
            } else {
                resolve({ status: data });
            }
        })
    });
}

const url = 'mongodb://localhost:27017/bookdb';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true };

var Schema = require("mongoose").Schema;
const bookSchema = Schema({
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

const userSchema = Schema({
    name: String,
    email: String,
    password: String
}, {
    collection: 'users'
});

let Book
try {
    Book = mongoose.model('books')

} catch(error) {
    Book = mongoose.model('books', bookSchema);
}

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}


const findUser = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: emailgg}, (err, data) => {
            if (err) {
                reject(new Error('Cannot find user!'));
            } else {
                if (data) {
                    resolve({ email: data.email, password: data.password })
                } else {
                    reject(new Error('Cannot find user!'));
                }
            }
        })
    })
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


const addUser = (userData) => {
    return new Promise((resolve, reject) => {
        var new_user = new User(
            userData
        );
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot Register!'));
            } else {
                resolve({ message: 'Register successfully' });
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


const deletebook = (bookId) => {
    console.log(bookId)
    //เขียนให้มันลบ
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


expressApp.post('/users/add', (req, res) => {
    console.log('register add');
    makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                name: req.body.name,
                email: req.body.email,
                password: hashText
            }
            addUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {

        })

});
expressApp.post('/users/login', async(req, res) => { //ของตัว login
    console.log('login');
    const dataLoginFromWeb = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(dataLoginFromWeb);

    try {
        const result = await findUser(dataLoginFromWeb.email);
        console.log(result);
        const loginStatus = await compareHash(dataLoginFromWeb.password, result.password);
        console.log(loginStatus);
        
        if(loginStatus){
            const token = jwt.sign(result, key, {expiresIn: 60*60});
            console.log(token);
            res.status(200).json({result, token, loginStatus});
            //res.status(200).send(loginStatus);
        }else{
            res.status(200).json({loginStatus});
        }
    } catch (error) {
        res.status(404).send(error);
    }
})








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


expressApp.delete('/books/delete', (req, res) => {})






expressApp.listen(3000,function(){
    console.log('Listenning on port 3000');
});
