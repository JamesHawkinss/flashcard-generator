const router = require('express').Router();
const helpers = require('../shared/helpers');

const { createFlashcard, getFlashcard } = require('./routes');

// methods
//router.get('/uuidgen', (req, res) => { console.log(helpers.generateUuid()) })
router.post('/create', createFlashcard);
router.get('/:uuid', getFlashcard);

module.exports = router;