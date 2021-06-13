const express = require('express');
const router = express.Router();
const {taskModel} = require('../Model/Task');
const projectModel = require('../Model/Project');


// Get Request Here
router.get('/', async (req, res) => {
    await taskModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

//recupere les tasks de l'utilisateur grâce a son id
router.get('/user/:id', async (req, res) => {
    await projectModel.find({"tasks.assigned_user_id": req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

//Ajoute une task dans un project grace a l'id du project
router.post('/:id/task', async (req, res) => {
    const task = new taskModel({
        ...req.body
    });

    const project = await projectModel.findOne({_id: req.params.id})
        .catch(error => res.status(400).json({error}));

    await projectModel.updateOne({_id: req.params.id}, {tasks: task})
        .then(() => res.status(200).json({message: "La tâche a bien été ajouté"}))
        .catch(error => res.status(400).json({error}));

});
module.exports = router;