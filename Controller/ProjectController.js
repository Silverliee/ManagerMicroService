const express = require('express');
const router = express.Router();
const projectModel = require('../Model/Project');

// Get Request Here
router.get('/', async(req, res) => {
    await projectModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

router.get('/:id', async(req, res) => {
    await projectModel.findOne({_id: req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({error}));
});

//retourne la liste des projets ou l'user est admin
router.get('/user/:id', async(req, res) => {
    await projectModel.find({admin_id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({error}));
});

// Post Request Here
router.post('/', async(req, res) => {
    const project = new projectModel({
        ...req.body
    });
    await project.save()
        .then(() => res.status(201).json({message: "Le projet à été crée !"}))
        .catch(error => res.status(400).json({error}));
});

// Put resquest Here
router.put('/:id', async(req, res) => {
    await projectModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: "Le projet a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});

//Delete Request here
router.delete('/:id', async(req, res) => {
    await projectModel.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Le projet a bien été supprimé"}))
        .catch(error => res.status(400).json({error}));
});

module.exports = router;