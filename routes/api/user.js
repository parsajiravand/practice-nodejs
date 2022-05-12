var router = require("express").Router();
const User = require("../../models/user");
// Replace the route name
router.get("/", (request, response) => {
  /* get All books  */
  /* remove extra properties in find() */

  User.find().exec((err, items) => {
    if (!err) {
      return response.json({ items: items });
    } else {
      return response.json(err);
    }
  });
});

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


router.delete("/:id", (request, response) => {
  Books.deleteOne({ _id: request.params.id })
    .then(() => {
      return response.json("deleted!");
    })
    .catch(function (error) {
      console.log(error)
       return response.json(error);
    });
});
router.put("/:id", (request, response) => {
  Books.updateOne({ _id: request.params.id },{ name: request.body.name })
    .then(() => {
      return response.json("updated!");
    })
    .catch(function (error) {
      console.log(error)
       return response.json(error);
    });
});
module.exports = router;
