const Realm = require('realm');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  // create an electron browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  /*
    create an ongoing process (by reading from stdin)
    to prevent the Sync Connection from ending prematurely
  */
  process.stdin.resume();

  win.loadFile('index.html');
}

app.whenReady().then(async () => {
  const realmApp = new Realm.App({ id: '<Your App ID>' }); // create a new instance of the Realm.App

  await realmApp.logIn(Realm.Credentials.anonymous());
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
    schema: [DogSchema],
    path: 'my.realm',
    sync: {
      user: realmApp.currentUser,
      partitionValue: 'myPartition',
    },
  };

  // open a synced realm
  const realm = await Realm.open(config);

  realm.write(() => {
    realm.deleteAll();
  })

  const dogs = realm.objects('Dog');
  console.log(`Main: Number of Dog objects: ${dogs.length}`);

  realm.write(() => {
    realm.create('Dog', {
      _id: 2,
      name: 'Fido',
      age: 5,
    });
  });

  createWindow();
});
