const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
    console.log('calling api')
})

module.exports = router