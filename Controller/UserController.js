const express = require('express');
const router = express.Router();
const userModel = require('../Model/User');

// GET Request Here
router.get('/', async(req, res) => {
    await userModel.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
});

//recupere l'id de l'utilisateur grâce a son email
router.get('/id/:email', async(req, res) => {
    await userModel.findOne({email: req.params.email})
        .then(product => res.status(200).json(product.id))
        .catch(error => res.status(404).json({error}));
});

//recupere les de l'utilisateur grâce a son id
router.get('/rights/:id', async(req, res) => {
    await userModel.findOne({_id: req.params.id})
        .then(product => res.status(200).json(product.role))
        .catch(error => res.status(404).json({error}));
});

router.get('/:id', async(req, res) => {
    await userModel.findOne({_id: req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({error}));
});

// POST Request Here
router.post('/', async(req, res) => {
    const project = new userModel({
        ...req.body
    });
    await project.save()
        .then(() => res.status(201).json({message: "L'utilisateur à été créer !"}))
        .catch(error => res.status(400).json({error}));
});

router.post('/login', async(req, res) => {
    const user = await userModel.findOne({email: req.body.email})
    if(user === null) {
        res.status(404).json({message: "Aucun utilisateur ne possède cet email."})
    } else if(user.password !== req.body.password) {
        res.status(400).json({message: "Le mot de passe est incorrecte"})
    } else {
        res.status(200).json("Connexion en cours...");
    }
});

// PUT resquest Here
router.put('/:id', async(req, res) => {
    await userModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: "L'utilisateur a bien été modifié"}))
        .catch(error => res.status(400).json({error}));
});

//DELETE Request here
router.delete('/:id', async(req, res) => {
    await userModel.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "L'utilisateur a bien été supprimé"}))
        .catch(error => res.status(400).json({error}));
});

module.exports = router;