const Realm = require("realm");
const BSON = require("BSON");


const { app, BrowserWindow } = require('electron')

function createWindow () {
  // create an electron browser window 
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // create an ongoing process (by reading from stdin) to prevent the Sync Connection from ending prematurely
  process.stdin.resume();

  win.loadFile('index.html')
}

app.whenReady().then(async () => {
    const app = new Realm.App({ id: "electron-tester-qokcs" }); // create a new instance of the Realm.App

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
        schema: [DogSchema],
        path: "my.realm",
        sync: {
          user: app.currentUser,
          partitionValue: "myPartition"
        }
      };
    
      // open a synced realm
      const realm = await Realm.open(config);

      const dogs = realm.objects("Dog");
      console.log(`Renderer: Number of Dog objects: ${dogs.length}`);
    
      realm.write(() => {
        realm.create("Dog", {
            _id: new BSON.ObjectID(),
            name: "Fizzbuzz2",
            age: 5
        })
      })

    createWindow();
    
})