// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDoZJsWHsZOIqBlt3VPaogWEmmDwQnEujw',
    authDomain: 'hoalanmanager.firebaseapp.com',
    projectId: 'hoalanmanager',
    storageBucket: 'hoalanmanager.appspot.com',
    messagingSenderId: '98590753482',
    appId: '1:98590753482:web:6482056cef8411fa27ea33',
    measurementId: 'G-D6J5FCEV3Z',
  },
  baseURL: 'http://orchid-server.herokuapp.com/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
