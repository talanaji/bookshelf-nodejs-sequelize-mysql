const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './assets')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index')
const booksRoute = require('./routes/books')
const authorsRoute = require('./routes/authors')
const genresRoute = require('./routes/genres')
const usersRoute = require('./routes/users')

app.use(cookieParser());

app.use("/", indexRoute);
app.use("/books", booksRoute);
app.use("/authors", authorsRoute);
app.use("/genres", genresRoute);
app.use("/users", usersRoute);

module.exports = app