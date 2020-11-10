const router = require('express').Router();
const MemoryGame = require('../model/MemoryGame');

router.post('/memory', async (req, res) => {

    //Create a new MemoryGame
    const game = new MemoryGame({
        score: req.body.score,
        user: req.body.id,
    });
    try {
        const saveGame = await game.save();
        res.status(200).send({game: game._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;