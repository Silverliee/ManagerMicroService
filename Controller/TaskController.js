const express = require('express');
const router = express.Router();
const taskModel = require('../Model/Task');

// Get Request Here
router.get('/', async(req, res) => {
    await taskModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

//recupere les tasks de l'utilisateur grâce a son id
router.get('/tasks/:id', async(req, res) => {
    await taskModel.findOne({_id: req.params.id})
        .then(product => res.status(200).json(product.tasks))
        .catch(error => res.status(404).json({error}));
});

module.exports = router;