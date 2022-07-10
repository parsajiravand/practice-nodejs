var router = require("express").Router();
const User = require("../../models/user");
var passport = require('passport');

// Replace the route name
router.post("/register", (request, response) => {
  const user = new User();
  user.email = request.body.email;
  user.setPassword(request.body.password);

  user.save().then((res) => {
    return response.json(res);
  }).catch(function (error) {
      console.log(error)
      return response.json(error);
    });
});

router.post('/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = router;
