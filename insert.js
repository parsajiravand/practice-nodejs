const mongoose = require("mongoose");
const assert = require("assert");
const fetch = require("node-fetch");

const Schema = mongoose.Schema;
const PostsSchema = new Schema({
  title: String,
  body: String,
  userId: String,
});

const Posts = mongoose.model("Posts", PostsSchema);

const response = fetch("https://jsonplaceholder.typicode.com/posts", {
  headers: { "Content-Type": "application/json" },
})
  .then((res) => {
    return res.json();
  })
  .catch((res) => {
    console.log("Exception : ", res);
    return res.json();
  });

response.then((data) => {
  let newPostModel = [];
  const pureResponse = data.slice(0, 65);
  pureResponse.forEach((element) => {
    newPostModel.push({
      title: element.title,
      body: element.body,
      userId: "627c4e5206cf2d1e4743a162",
    });
  });
  Posts.collection.insertMany(newPostModel, function (err, r) {
    assert.equal(null, err);
    assert.equal(10, r.insertedCount);
  });
});
