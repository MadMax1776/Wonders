const express = require('express');
const router = express.Router();
const Wonders = require('../models/wonders.js');

router.get('/', (req, res) => {
    Wonders.find({}, (error, foundWonder) => {
        res.json(foundWonder);
    })
})

router.post('/', (req, res) => {
    Wonders.create(req.body, (err, createdWonder) => {
        res.json(createdWonder);
    });
});

router.delete('/:id', (req, res) => {
    Wonders.findByIdAndRemove(req.params.id, (error, deletedWonder) => {
        res.json(deletedWonder);
    });
});

router.put('/:id', (req, res) => {
    Wonders.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedWonder) => {
        res.json(updatedWonder);
    })
})

module.exports = router;
