const router = require('express').Router();
const helpers = require('../shared/helpers');

//const {} = require('./routes');

// methods
router.get('/hi', (req, res) => { console.log(helpers.generateUuid()) })

module.exports = router;