var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var createError = require('http-errors');
const mongoose = require('mongoose');
var bodyparser = require('body-parser')
var cors = require('cors');
dotenv.config()


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var kpiRouter = require('./routes/kpi');
var employeeRouter = require('./routes/employee');
var teamRouter = require('./routes/team');
var roleRouter = require('./routes/role');
var projectRouter = require('./routes/projects');
var registrationRouter = require('./routes/registration');
var analysisRouter = require('./routes/analysis');

var app = express();



app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://pro-manager-pi.vercel.app',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(5000 || process.env.PORT)

//-------------------------------------Start Server & Connect to DataBase
app.get('/', async (req, res) => {
    res.send('Pro Manager Server ')
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("((:: * __ * ::)) Successfully Connected To Database ((:: * __ * ::)) ");
}).catch(console.error);


app.use('/', indexRouter);
app.use('/api/v1', adminRouter);
app.use('/api/v1', kpiRouter);
app.use('/api/v1', employeeRouter);
app.use('/api/v1', teamRouter);
app.use('/api/v1', roleRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', analysisRouter);
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

