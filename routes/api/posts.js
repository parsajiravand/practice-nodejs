const router = require("express").Router();
const Posts = require("../../models/posts");
const auth = require("../auth");
const jwt_decode = require("jwt-decode");
const { getTokenFromHeader } = require("../../utils/getToken");
// Replace the route name
router.get("/", async (request, response) => {
  /* get All books  */
  /* remove extra properties in find() */
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit || 10);
  const skipIndex = (page - 1) * limit;

  const total = await Posts.aggregate([
    {
      $facet: {
        paginate: [{ $count: "total" }],
      },
    },
  ]);
  Posts.find()
    .sort({ updatedAt: -1 })
    .limit(limit)
    .skip(skipIndex)
    .exec((err, items) => {
      if (!err) {
        return response.json({
          items: items,
          total: total[0].paginate[0].total,
          pageSize: limit,
          page,
        });
      } else {
        return response.json(err);
      }
    });
});

router.post("/", auth.required, (request, response) => {
  const data = new Posts({
    title: request.body.title,
    body: request.body.body,
    userId: jwt_decode(getTokenFromHeader(request)).id,
  });
  data
    .save()
    .then((res) => {
      return response.json(res);
    })
    .catch(function (error) {
      console.log(error);
      return response.json(error);
    });
});

router.delete("/:id", auth.required, (request, response) => {
  Posts.deleteOne({ _id: request.params.id })
    .then(() => {
      return response.json("deleted!");
    })
    .catch(function (error) {
      console.log(error);
      return response.json(error);
    });
});
router.put("/:id", auth.required, (request, response) => {
  Posts.updateOne(
    { _id: request.params.id },
    {
      title: request.body.title,
      body: request.body.body,
    }
  )
    .then(() => {
      return response.json("updated!");
    })
    .catch(function (error) {
      console.log(error);
      return response.json(error);
    });
});
module.exports = router;
