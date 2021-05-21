const express = require('express');
const router = express.Router();
const taskModel = require('../Model/Task');

// Get Request Here
router.get('/', async(req, res) => {
    await taskModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

module.exports = router;