const router = require('express').Router();
const MemoryGame = require('../model/MemoryGame');
const mongoose = require('mongoose');

router.post('/memory', async (req, res) => {

    const userExist = await MemoryGame.findOne({
        user: mongoose.Types.ObjectId(req.body.id)
    });

    let scoreArray = [];

    if(userExist !== null && userExist.score !== []){scoreArray = userExist.score;}

    scoreArray.push(req.body.score);

    const game = new MemoryGame({
        score: scoreArray,
        user: mongoose.Types.ObjectId(req.body.id),
    });

    const winGame = `Gratulacje. Dobrałeś/łaś wszystkie triady.`;

    if (userExist === null) {
        try {
            const saveGame = await game.save();
            res.status(200).send({game: game._id, user: game.user, score: game.score, message: winGame});
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        try {
            const updateGame = await MemoryGame.updateOne({
                user: mongoose.Types.ObjectId(req.body.id)
            }, { score: game.score }, { upsert: true });

            res.status(200).send({game: game._id, user: game.user, score: game.score, message: winGame});
        } catch (err) {
            res.status(400).send(err);
        }
    }
})

module.exports = router;