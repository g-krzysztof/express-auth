const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/', verify, (req, res)=>{
   res.json({
       posts: {title: 'my example post', description: 'only for logged in'},
       user: req.user
   })

    // res.send(req.user);
    // User.findbyOne({_id: req.user})

});

router.get('/test', (req, res) =>{
    res.json({
        test: "working"
    })

});

module.exports = router;