const express = require('express');
const router = express.Router();

const felix_controller = require('../controllers/felixController');

router.get('/', felix_controller.showIndex);

router.get('/api/system/userGuide', felix_controller.showUserGuide);

router.put('/api/error', felix_controller.showError);

router.put('/api/system/edit', felix_controller.getEditSystemForm);

router.put('/api/system/update', felix_controller.updateSystem);

router.get('/api/system', felix_controller.getSystemsList);

router.get('/api/system/add', felix_controller.showAddForm);

router.post('/api/system/add', felix_controller.addSystem);

router.put('/api/system/fileReport', felix_controller.showFileReport);

router.put('/api/system/fileReportDetail', felix_controller.showFileDetailedReport);

router.put('/api/system/fieldReport', felix_controller.showFieldReport);

router.put('/api/system/fieldDetailedReport', felix_controller.showFieldDetailedReport);

router.put('/api/system/unusedReport', felix_controller.showUnusedReport);

router.put('/api/system/delete', felix_controller.deleteSystem);

router.put('/api/system/treeView', felix_controller.showTreeView);

module.exports = router;