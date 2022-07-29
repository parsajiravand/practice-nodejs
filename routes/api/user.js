var router = require("express").Router();
const User = require("../../models/user");
var passport = require("passport");
const auth = require("../auth");
const jwt_decode = require("jwt-decode");
const { getTokenFromHeader } = require("../../utils/getToken");
const { success, error } = require("../../utils/errorHandeling");

// Replace the route name
router.get("/", auth.required, async (request, response) => {
  /* get All users  */
  /* remove extra properties in find() */
  const user = jwt_decode(getTokenFromHeader(request));
  console.log(user);
  if (user.username === "admin@admin.com") {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit || 10);
    const skipIndex = (page - 1) * limit;

    const total = await User.aggregate([
      {
        $facet: {
          paginate: [{ $count: "total" }],
        },
      },
    ]);
    User.find()
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
  } else {
    return response.json({
      success: false,
      message: "you need to login with admin eccount",
    });
  }
});
// Replace the route name
router.post("/register", (request, response, next) => {
  const user = new User();
  user.email = request.body.email;
  user.setPassword(request.body.password);

  user
    .save()
    .then((res) => {
      login(request, response, next);
    })
    .catch(function (error) {
      console.log(error);
      return response.json(error);
    });
});

router.post("/login", function (req, res, next) {
  login(req, res, next);
});
function login(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      console.log(err, user, info)
      if (err) {
        return next(error(err));
      }

      if (user) {
        user.token = user.generateJWT();
        return res.json(success({ user: user.toAuthJSON() }));
      } else {
        return res.status(422).json(error(info
          
          ));
      }
    }
  )(req, res, next);
}

module.exports = router;
