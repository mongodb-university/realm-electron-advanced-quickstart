const Realm = require('realm');

async function run() {
  const DogSchema = {
    name: 'Dog',
    properties: {
      _id: 'int',
      name: 'string',
      age: 'int',
    },
    primaryKey: '_id',
  };

  const config = {
    path: 'my.realm',
    schema: [DogSchema],
    /* 
       enable sync history, using "sync:true" (this allows changes to "my.realm" file
       to be synced by the realm opened in the main process)
    */
    sync: true, 
  };


  const realm = new Realm(config);

  const dogs = realm.objects('Dog');
  console.log(`Renderer: Number of Dog objects: ${dogs.length}`);

  realm.write(() => {
    realm.create('Dog', {
      _id: 1,
      name: 'Spot',
      age: 2,
    });
  });
}
run().catch((err) => {
  console.error('Failed to open realm:', err);
});
