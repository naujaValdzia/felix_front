//packages

const express = require('express');
const app = express();
//const mustache = require('mustache-express');
const handlebars = require('express-handlebars');
const request = require('request');
const bodyparser = require('body-parser');

//Classes

class Api{
  constructor(){
  }
  //Method
  GetForm(req){

  }
}

// engines and sets

//app.engine('mustache', mustache());
//app.set('views', './views');
//app.set('view engine', 'mustache');

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

// static directorys
app.use(express.static('public'));

app.listen(3000 , function (){
  console.log('THE SERVER IS UP AND RUNNING!')
});

// empty arrays to push info into

var todos = [];
var List = [];

// get info from input
app.get('/todo', function (request, response) {
  response.render('index', {})
});

// get info from input
app.put('/api/error', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/error/getError`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: `{"request": {"systemName": "${req.body.systemName}"}}`
  };
  console.log(options);
  request(options, function(err, apiResponse, body) {
   
    console.log(body);
    let json = JSON.parse(body);
    
    
    
    res.render('errorList', json);
  });


  //let items = progressApi.getErrors(request);
  
});

app.put('/api/system/edit', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/details`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}"}}`
  };
  console.log(options);
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    //console.log(body);
    let system = json.response.dsSystem.dssystem.ttsystem[0];

    //console.log(system);
    res.render('editSystem', system);
  });

  //let items = progressApi.getErrors(request);
  
});

app.put('/api/system/update', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/update`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"dsSystem": {"dsSystem": {"prods:hasChanges": true,"ttsystem": [{"systemName": "${req.body.systemName}","localSourcePath": "${req.body.localSourcePath}","systemPropath": "${req.body.systemPropath}","systemDBparameters": "${req.body.systemDBparameters}","entryPoints": "${req.body.entryPoints}","systemLocation": "${req.body.systemLocation}"}],"prods:before": {}}}}}}`
  }

  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('notification', json);
  });

  //let items = progressApi.getErrors(request);
  
});

// get info from input
app.put('/api/system', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/list`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
  };
  
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('systemList', json);
  });


  //let items = progressApi.getErrors(request);
  
});

// AddNew system



app.get('/api/system/add', function (req, res) {
  res.render('createSystem');
});

app.put('/api/system/add', function (req, res){

  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    },
    params:{
                  "systemName": req.body.systemName,
                  "localSourcePath": req.body.localSourcePath,
                  "systemPropath": req.body.systemPropath,
                  "systemDBparameters": req.body.systemDBparameters,
                  "entryPoints": req.body.entryPoints,
                  "hasErrors": null,
                  "systemLocation": req.body.systemLocation,
                  "id": null
              }
  };
  
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    
    
  });


  //let items = progressApi.getErrors(request);
  
});


// get info from input
app.put('/api/system/fileReport', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getFile`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}","pcFileName": "${req.body.pcFileName}","pcType": "${req.body.pcType}"}}`
    }
  
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    
    console.log(options);
    res.render('fileReport', json);
  });


  //let items = progressApi.getErrors(request);
  
});

app.put('/api/system/fieldReport', function (req, res) {
  
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/dbField/getDbField`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}","pcDbFieldName": "${req.body.pcDbFieldName}","pcType": "${req.body.pcType}"}}`
    }

  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    console.log(options);
    res.render('fieldReport', json);
  });
  //let items = progressApi.getErrors(request);
});

app.put('/api/system/unusedReport', function (req, res) {
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/unused/getUnused`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}","pcType": "${req.body.pcType}"}}`
    }
  
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    console.log(options);
    res.render('unusedReport', json);
  });
});

 app.put('/api/system/delete', function (req, res) {
   const options = {  
     url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/delete`,
     method: 'PUT',
     headers: {
         'Accept': 'application/json',
         'Accept-Charset': 'utf-8',
         'Content-Type': ' application/json; charset=UTF-8'
     },
     body: `{"request": {"pcSystem": "${req.body.pcSystem}"}}`
     }
 
   request(options, function(err, apiResponse, body) {
     let json = JSON.parse(body);
     console.log(options);
     res.render('notification', json);
   });
 });

 app.put('/api/system/treeView', function (req, res) {
  
  const options1 = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getUsedByBranch`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body1: `{"request": {"pcSystem": "${req.body.pcSystem}","pcFileName": "${req.body.pcFileName}"}}`
    }

    const options2 = {  
      url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getIsUsingBranch`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body2: `{"request": {"pcSystem": "${req.body.pcSystem}","pcFileName": "${req.body.pcFileName}"}}`
      }
    request(options1, options2, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      console.log(options);
      res.render('treeView', json);
    });
});

app.put('/api/system/editSystem', function (req, res) {
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/update`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": { "dsSystem:: { "dssystem": { "ttsystem": [{"pcSystem": "${req.body.pcSystem}","pcType": "${req.body.pcType}"}],}}}}`
    }
  
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    console.log(options);
    res.render('editSystem', json);
  });
});