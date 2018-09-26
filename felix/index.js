//packages
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const request = require('request');
const bodyparser = require('body-parser');

//Classes
class Api{
  constructor(){
  }
  GetForm(req){
  }
}

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

// get info from input
app.get('/felix', function (request, response) {
  response.render('index', {})
});

app.get('/api/system/userGuide', function (req, res) {
  res.render('userGuide');
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
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('errorList', json);
  });
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
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    let system = json.response.dsSystem.dsSystem.ttSystem[0];
    res.render('editSystem', system);
  });
});

app.put('/api/system/update', function (req, res) {
  let sysPropath = req.body.systemPropath.replace(/\\/g, "/");
  let sysPath = req.body.localSourcePath.replace(/\\/g, "/");
  let dbPar = req.body.systemDBparameters.replace(/\\/g, "/");
  let sysLocation = req.body.systemLocation.replace(/\\/g, "/");
  let entryPoints = req.body.entryPoints.replace(/\\/g, "/");

  const options = {
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/update`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"dsSystem": {"dsSystem": {"ttSystem": [{"systemName": "${req.body.systemName}","localSourcePath": "${sysPath}","systemPropath": "${sysPropath}","systemDBparameters": "${dbPar}","entryPoints": "${entryPoints}","systemLocation": "${sysLocation}"}]}}}}}`
  }

  console.log(JSON.stringify(options))
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('notification', json);
  });
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
});

// AddNew system

app.post('/api/system/add', function (req, res) {
  res.render('createSystem', {});
});

app.put('/api/system/add', function (req, res){
  let sysName = req.body.systemName.replace(/\\/g, "/");
  let sysPropath = req.body.systemPropath.replace(/\\/g, "/");
  let sysPath = req.body.localSourcePath.replace(/\\/g, "/");
  let dbPar = req.body.systemDBparameters.replace(/\\/g, "/");
  let sysLocation = req.body.systemLocation.replace(/\\/g, "/");
  let entryPoints = req.body.entryPoints.replace(/\\/g, "/");

  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/info/create`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"dsSystem": {"dsSystem": {"ttSystem": [{"systemName": "${sysName}","localSourcePath": "${sysPath}","systemPropath": "${sysPropath}","systemDBparameters": "${dbPar}","entryPoints": "${entryPoints}","systemLocation": "${sysLocation}"}]}}}}`
  };
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('notification', json);
  });
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
    res.render('fileReport', json);
  });
});

// get info from input
app.put('/api/system/fileReportDetail', function (req, res) {
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getFileDetail`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcCompileUnit": "${req.body.pcCompileUnit}", "pcSystem": "${req.body.pcSystem}","pcType": "${req.body.pcType}","pcFileName": "${req.body.pcFileName}"}}`
    }
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('fileDetailedReport', json);
  });
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
    res.render('fieldReport', json);
  });
});

app.put('/api/system/fieldDetailedReport', function (req, res) {
  const options = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/dbField/getDbFieldDetail`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcCompileUnit": "${req.body.pcCompileUnit}", "pcSystem": "${req.body.pcSystem}","pcDbFieldName": "${req.body.pcDbFieldName}","pcType": "${req.body.pcType}"}}`
    }
  request(options, function(err, apiResponse, body) {
    let json = JSON.parse(body);
    res.render('fieldDetailedReport', json);
  });
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
     res.render('notification', json);
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
    res.render('editSystem', json);
  });
});


app.put('/api/system/treeView', function (req, res) {
  const optionsUsedBy = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getUsedByBranch`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}","pcFileName": "${req.body.pcFileName}"}}`
  };

  const optionsIsUsing = {  
    url: `http://paceviciusp.baltic-amadeus.lt:8880/felix/web/pdo/system/file/getIsUsingBranch`,
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': ' application/json; charset=UTF-8'
    },
    body: `{"request": {"pcSystem": "${req.body.pcSystem}","pcFileName": "${req.body.pcFileName}"}}`
  };

  
  request(optionsUsedBy, function(err, apiResponse, body) {
    let json1 = JSON.parse(body);

    request(optionsIsUsing, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      
      let usedBy = { usedBy: json1.response.dsTree };
      let isUsing = { isUsing: json.response.dsTree };

      let test = Object.assign(usedBy, isUsing);
            
      res.render('treeView', test);
    });
    
  })
});
