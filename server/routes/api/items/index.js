const express = require('express');
const router = express.Router();

const getItems = require('../../../controller/getItems')

router.get('/', async (req, res) => { res.send(await getItems()) })

module.exports = router