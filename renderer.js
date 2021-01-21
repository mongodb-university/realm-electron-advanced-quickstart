const Realm = require("realm");
const BSON = require("BSON");
const app = new Realm.App({ id: "<Your App ID>" }); // create a new instance of the Realm.App

async function run() {

  // login with an anonymous credential
  await app.logIn(new Realm.Credentials.anonymous());

  const DogSchema = {
      name: "Dog",
      properties: {
        _id: 'objectId',
        name: "string",
        age: "int",
      },
      primaryKey: '_id'
  };


const config = {
    path: "my.realm",
    schema: [DogSchema],
    sync: true,
  };


  const realm = new Realm(config);
  
  const dogs = realm.objects("Dog");
  console.log(`Renderer: Number of Dog objects: ${dogs.length}`);



  realm.write(() => {
    realm.create("Dog", {
        _id: new BSON.ObjectID(),
        name: "Fizzbuzz",
        age: 2
    })
  })

}
run().catch(err => {
  console.error("Failed to open realm:", err)
});