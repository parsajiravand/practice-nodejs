const router = require("express").Router();
const Books = require("../../models/books");
const auth = require('../auth');

// Replace the route name
router.get("/", (request, response) => {
  /* get All books  */
  /* remove extra properties in find() */

  Books.find({ }, { name: 1 }).exec((err, items) => {
    if (!err) {
      return response.json({ items: items });
    } else {
      return response.json(err);
    }
  });
});

router.post("/",auth.required, (request, response) => {
  const data = new Books({
    name: request.body.name,
  });
  data.save().then((res) => {
    return response.json(res);
  }).catch(function (error) {
      console.log(error)
      return response.json(error);
    });
});

router.delete("/:id",auth.required, (request, response) => {
  Books.deleteOne({ _id: request.params.id })
    .then(() => {
      return response.json("deleted!");
    })
    .catch(function (error) {
      console.log(error)
       return response.json(error);
    });
});
router.put("/:id",auth.required, (request, response) => {
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
