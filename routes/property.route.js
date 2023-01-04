const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property.controller');
const auth = require('../middlewares/auth');

router.post('/create', auth, PropertyController.createProperty);
router.post('/update', auth, PropertyController.updateProperty);
router.post('/delete', auth, PropertyController.deleteProperty);
router.post('/publish', auth, PropertyController.publishProperty);
router.post('/search', auth, PropertyController.searchProperty);

module.exports = router;