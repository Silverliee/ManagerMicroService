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
    await taskModel.find({assigned_user_id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

//recupere les tasks grace a l' id d'un projet
router.get('/project/:id', async (req, res) => {
    await taskModel.find({project_id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

//return true ou false si la deadline est passée ou non
router.get('/deadline/:id', async (req, res) => {
    const task = await taskModel.findById(req.params.id);
    const dateTask = new Date(task.deadline);
    console.log(dateTask)
    const dateDay = new Date();
    console.log(dateDay)
    return res.status(201).json(dateDay < dateTask);
});

//recupere les tasks CREATED assigner à l'utilisateur grâce a son id
router.get('/user/created/:id', async (req, res) => {
    await taskModel.find({assigned_user_id: req.params.id, state: "CREATED"})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

//recupere les tasks IN PROGRESS assigner à l'utilisateur grâce a son id
router.get('/user/inprogress/:id', async (req, res) => {
    await taskModel.find({assigned_user_id: req.params.id, state: "IN PROGRESS"})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

//recupere les tasks FINISH assigner à l'utilisateur grâce a son id
router.get('/user/finish/:id', async (req, res) => {
    await taskModel.find({assigned_user_id: req.params.id, state: "FINISH"})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

// POST Request Here
router.post('/', async (req, res) => {
    const task = new taskModel({
        ...req.body
    });
    await task.save()
        .then(() => res.status(201).json({message: "La tache à été créer !"}))
        .catch(error => res.status(400).json({error}));
});

// Put resquest Here
router.put('/:id', async (req, res) => {
    await taskModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: "La tache a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});

router.get('/assigned/:id/:userid', async (req, res) => {
    await taskModel.updateOne({_id: req.params.id}, {assigned_user_id: req.params.userid})
        .then(() => res.status(201).json({message: "La tache a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});

router.get('/:id/inprogress', async (req, res) => {
    await taskModel.updateOne({_id: req.params.id}, {state: "IN PROGRESS", _id: req.params.id})
        .then(() => res.status(201).json({message: "La tache a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});

router.get('/:id/finish', async (req, res) => {
    await taskModel.updateOne({_id: req.params.id}, {state: "FINISH", _id: req.params.id})
        .then(() => res.status(201).json({message: "La tache a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});


//Delete Request here
router.delete('/:id', async (req, res) => {
    await projectModel.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Le projet a bien été supprimé"}))
        .catch(error => res.status(400).json({error}));
});

module.exports = router;