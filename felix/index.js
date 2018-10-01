//packages
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const request = require('request');
const bodyparser = require('body-parser');
const catalogRouter = require('./routes/catalog'); 

app.engine('handlebars', handlebars({
  partialsDir: 'views',
  helpers:{
    // Function to do basic mathematical operation in handlebar
    math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }
}}));
app.set('view engine', 'handlebars');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// static directories$ bower install bootstrap-sweetalert
app.use(express.static('public'));
app.use(express.static('public/static'));

app.listen(3000 , function (){
  console.log('THE SERVER IS UP AND RUNNING!')
});


app.use('/', catalogRouter);

