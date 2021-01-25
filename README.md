# realm-electron-advanced-quickstart

## Description
- This repository illustrates how to write to a synced realm from both the renderer and main process. 
The `main.js` file is the Electron main process. The `renderer.js` is the Electron renderer process.
To sync changes to a remote realm, open a synced realm on the main process using the `Realm.open()` syntax. Then open a non-synced realm on the renderer process using the `new Realm()` syntax and set ``sync:true`` on the configuration object. This will allow writes from the renderer process to be synced by the realm on the main process.

## To run this application
- Create a MongoDB Realm application and enable Realm Sync
- Replace the `"<Your App ID>"` with your Realm app id in ``main.js``
- npm install
- npm start