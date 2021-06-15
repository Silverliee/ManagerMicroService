const express = require('express');
const router = express.Router();
const {taskModel} = require('../Model/Task');

// Get Request Here
router.get('/', async (req, res) => {
    await taskModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

//recupere les tasks assigner à l'utilisateur grâce a son id
router.get('/user/:id', async (req, res) => {
    const projectWithUserTask = await taskModel.find({assigned_user_id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

// POST Request Here
router.post('/', async(req, res) => {
    const task = new taskModel({
        ...req.body
    });
    await task.save()
        .then(() => res.status(201).json({message: "La tache à été créer !"}))
        .catch(error => res.status(400).json({error}));
});

module.exports = router;