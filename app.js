var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var createError = require('http-errors');
const mongoose = require('mongoose');
dotenv.config()


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var registrationRouter = require('./routes/registration');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
app.listen(5000 || process.env.PORT)

//-------------------------------------Start Server & Connect to DataBase
app.get('/', async (req, res) => {
    res.send('Dall-E Server ')
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("--------------- Successfully Connected To Database --------------- ");
}).catch(console.error);


app.use('/', indexRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/registration', registrationRouter);


// //-------------------------------------Create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


//-------------------------------------Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        success: false,
        message: err.message
    });
});

module.exports = app;

