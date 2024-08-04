const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const connection = "mongodb://127.0.0.1:27017";
const dbName = "Project";
mongoClient.connect(connection, (error, res) => {
  if (error) {
    return console.log("Error");
  }
  const db = res.db(dbName);
  console.log("Perf");

  db.collection("Project").insertOne({
    name: "ali",
    age: 22,
  });

  db.collection("Project").insertOne({
    name: "omar",
    age: 23,
  });

  db.collection("Project").insertMany([
    { name: "alaa", age: 36 },
    { name: "ahmed", age: 38 },
    { name: "mohamed", age: 40 },
    { name: "adel", age: 27 },
    { name: "jamal", age: 27 },
    { name: "hader", age: 27 },
    { name: "mona", age: 27 },
    { name: "osama", age: 27 },
    { name: "alaa", age: 30 },
    { name: "ali", age: 36 },
  ]);

  db.collection("Project")
    .find({ age: 27 })
    .toArray((error, data) => {
      if (error) {
        return console.log("There Are Error");
      }
      console.log(data);
    });

  db.collection("Project")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, data) => {
      if (error) {
        return console.log("There Are Error");
      }
      console.log(data);
    });

  db.collection("Project")
    .find({})
    .limit(4)
    .toArray((error, data) => {
      if (error) {
        return console.log("There Are Error");
      }
      data.forEach((e) => {
        db.collection("Project").updateOne(
          { _id: e._id },
          { $set: { name: "kamal" } }
        );
      });
    });

  db.collection("Project")
    .find({ age: 27 })
    .limit(4)
    .toArray((error, data) => {
      if (error) {
        return console.log("There Are Error");
      }
      data.forEach((e) => {
        db.collection("Project").updateOne(
          { _id: e._id },
          { $inc: { age: 4 } }
        );
      });
    });

  db.collection("Project").updateMany(
    {},
    {
      $inc: { age: 10 },
    }
  );

  db.collection("Project")
    .deleteMany({ age: 41 })
    .then((res) => console.log(res.deletedCount))
    .catch((error) => console.log(error));
});
