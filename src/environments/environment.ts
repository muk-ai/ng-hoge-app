// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiHost: 'http://localhost:8000',
  firebase: {
    apiKey: 'AIzaSyDkN-ZuLQtlPcCJmqAjZSM2cl9dzhZ8RMs',
    authDomain: 'ng-hoge-app.firebaseapp.com',
    projectId: 'ng-hoge-app',
    storageBucket: 'ng-hoge-app.appspot.com',
    messagingSenderId: '816380104391',
    appId: '1:816380104391:web:b7cf8ba1fc783ba649f8e2',
    measurementId: 'G-28RC8Q2PEQ',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
