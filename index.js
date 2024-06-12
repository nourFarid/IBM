const dotenv= require("dotenv")
const path= require('path')
const express = require('express')
const app = express()
const axios= require('axios')
const port = 3000
dotenv.config({ path: path.join(__dirname, './config/.env') })
const connection= require('./config/databaseConnection')
connection()
app.use(express.json())
const generalUser= require("./routes/generalUsers.route")
const registeredUsers=require('./routes/registeredUsers.router')
app.use('/generalUser',generalUser)
app.use('/registeredUsers',registeredUsers)

const baseUrl = 'http://localhost:3000/generalUser';

// Task 10: Get all books - Using async callback function
async function getAllBooks() {
    try {
        const response = await axios.get(`${baseUrl}/getAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all books:', error);
        throw error;
    }
}


// Task 11: Search by ISBN - Using Promises
function searchByISBN(ISBN) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/getByISBN/${ISBN}`)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error('Error searching by ISBN:', error);
                reject(error);
            });
    });
}

// Task 12: Search by Author - Using async/await
async function searchByAuthor(author) {
    try {
        const response = await axios.get(`${baseUrl}/getByAuthor/${author}`);
        return response.data;
    } catch (error) {
        console.error('Error searching by author:', error);
        throw error;
    }
}

// Task 13: Search by Title - Using Promises
function searchByTitle(title) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/getByTitle/${title}`)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error('Error searching by title:', error);
                reject(error);
            });
    });
}

(async () => {
    try {
        const allBooks = await getAllBooks();
        console.log('All books:', allBooks);
        console.log("___________________________________________");

        const isbnSearchResult = await searchByISBN('123456789');
        console.log('Search by ISBN:', isbnSearchResult);
        console.log("___________________________________________");

        const authorSearchResult = await searchByAuthor('fade');
        console.log('Search by Author:', authorSearchResult);
        console.log("___________________________________________");

        const titleSearchResult = await searchByTitle('nightmare take them');
        console.log('Search by Title:', titleSearchResult);
    } catch (error) {
        console.error('Error:', error);
    }
})();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))