const express = require('express');
const router = express.Router();

const felix_controller = require('../controllers/felixController');

router.get('/', felix_controller.showIndex);

router.get('/api/system/userGuide', felix_controller.showUserGuide);

router.get('/api/error', felix_controller.showError);

router.get('/api/system/edit', felix_controller.getEditSystemForm);

router.put('/api/system/update', felix_controller.updateSystem);

router.get('/api/system', felix_controller.getSystemsList);

router.get('/api/system/add', felix_controller.showAddForm);

router.post('/api/system/add', felix_controller.addSystem);

router.get('/api/system/fileReport', felix_controller.showFileReport);

router.get('/api/system/fileReportDetail', felix_controller.showFileDetailedReport);

router.get('/api/system/fieldReport', felix_controller.showFieldReport);

router.get('/api/system/fieldDetailedReport', felix_controller.showFieldDetailedReport);

router.get('/api/system/unusedReport', felix_controller.showUnusedReport);

router.put('/api/system/delete', felix_controller.deleteSystem);

router.get('/api/system/treeView', felix_controller.showTreeView);

module.exports = router;