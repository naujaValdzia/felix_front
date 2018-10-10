const request = require('request');
const config = require('../config');

exports.showIndex = function (request, response) {
    response.render('index', {})
};

exports.showUserGuide = function (req, res) {
    res.render('userGuide');
  };

exports.showError = function (req, res) {
    const options = {  
      url: `${config.API_URL}error/getError`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': 'application/json; charset=UTF-8'
      },
      body: `{"request": {"systemName": "${req.query.systemName}"}}`
    };
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('../views/errorList', json);
    });
  };

  exports.getEditSystemForm = function (req, res) {
    const options = {  
      url: `${config.API_URL}info/details`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcSystem": "${req.query.pcSystem}"}}`
    };
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      //console.log(json);
      res.render('editSystem', json);
    });
  };

  exports.updateSystem = function (req, res) {
    let sysPropath = req.body.systemPropath.replace(/\\/g, "/");
    let sysPath = req.body.localSourcePath.replace(/\\/g, "/");
    let dbPar = req.body.systemDBparameters.replace(/\\/g, "/");
    let sysLocation = req.body.systemLocation.replace(/\\/g, "/");
    let entryPoints = req.body.entryPoints.replace(/\\/g, "/");
  
    const options = {
      url: `${config.API_URL}info/update`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"dsSystem": {"dsSystem": {"ttSystem": [{"systemName": "${req.body.systemName}","localSourcePath": "${sysPath}","systemPropath": "${sysPropath}","systemDBparameters": "${dbPar}","entryPoints": "${entryPoints}","systemLocation": "${sysLocation}"}]}}}}}`
    }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      console.log(json);
      res.render('notification', json);
    });
  };

  exports.getSystemsList =  function (req, res) {
    const options = {  
      url: `${config.API_URL}info/list`,
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
  };

  exports.showAddForm = function (req, res) {
    res.render('createSystem', {});
  };

  exports.addSystem = function (req, res){
    let sysName = req.body.systemName.replace(/\\/g, "/");
    let sysPropath = req.body.systemPropath.replace(/\\/g, "/");
    let sysPath = req.body.localSourcePath.replace(/\\/g, "/");
    let dbPar = req.body.systemDBparameters.replace(/\\/g, "/");
    let sysLocation = req.body.systemLocation.replace(/\\/g, "/");
    let entryPoints = req.body.entryPoints.replace(/\\/g, "/");
  
    const options = {  
      url: `${config.API_URL}info/create`,
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
  };

  exports.showFileReport = function (req, res) {
    const options = {  
      url: `${config.API_URL}file/getFile`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcSystem": "${req.query.pcSystem}","pcFileName": "${req.query.pcFileName}","pcType": "${req.query.pcType}"}}`
      }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('fileReport', json);
    });
  };

  exports.showFileDetailedReport = function (req, res) {
    const options = {  
      url: `${config.API_URL}file/getFileDetail`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcCompileUnit": "${req.query.pcCompileUnit}", "pcSystem": "${req.query.pcSystem}","pcType": "${req.query.pcType}","pcFileName": "${req.query.pcFileName}"}}`
      }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('fileDetailedReport', json);
    });
  };

  exports.showFieldReport =  function (req, res) {
    const options = {  
      url: `${config.API_URL}dbField/getDbField`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcSystem": "${req.query.pcSystem}","pcDbFieldName": "${req.query.pcDbFieldName}","pcType": "${req.query.pcType}"}}`
      }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('fieldReport', json);
    });
  };

  exports.showFieldDetailedReport =  function (req, res) {
    const options = {  
      url: `${config.API_URL}dbField/getDbFieldDetail`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcCompileUnit": "${req.query.pcCompileUnit}", "pcSystem": "${req.query.pcSystem}","pcDbFieldName": "${req.query.pcDbFieldName}","pcType": "${req.query.pcType}"}}`
      }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('fieldDetailedReport', json);
    });
  };

  exports.showUnusedReport = function (req, res) {
    const options = {  
      url: `${config.API_URL}unused/getUnused`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcSystem": "${req.query.pcSystem}","pcType": "${req.query.pcType}"}}`
      }
    request(options, function(err, apiResponse, body) {
      let json = JSON.parse(body);
      res.render('unusedReport', json);
    });
  };

  exports.deleteSystem =  function (req, res) {
    const options = {  
      url: `${config.API_URL}info/delete`,
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
  };

exports.showTreeView = function (req, res) {
    const optionsUsedBy = {  
      url: `${config.API_URL}file/getUsedByBranch`,
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Content-Type': ' application/json; charset=UTF-8'
      },
      body: `{"request": {"pcSystem": "${req.query.pcSystem}","pcFileName": "${req.query.pcFileName}"}}`
    };
    const optionsIsUsing = {  
        url: `${config.API_URL}file/getIsUsingBranch`,
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Content-Type': ' application/json; charset=UTF-8'
        },
        body: `{"request": {"pcSystem": "${req.query.pcSystem}","pcFileName": "${req.query.pcFileName}"}}`
      };
    
      request(optionsUsedBy, function(err, apiResponse, body) {
        let usedByjson = JSON.parse(body);
    
        request(optionsIsUsing, function(err, apiResponse, body) {
          let isUsingJson = JSON.parse(body);
          
          let usedBy = { usedBy: usedByjson.response.dsTree };
          let isUsing = { isUsing: isUsingJson.response.dsTree };
    
          let combinedJson = Object.assign(usedBy, isUsing);
                
          res.render('treeView', combinedJson);
        });
        
      })
    };
    
