// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"
// import { CometChat } from "@cometchat-pro/chat";


// const firebaseConfig = {
//   apiKey: "AIzaSyB_7zz60ITtq9NZRaLgnCgmrmvaNwJsQls",
//   authDomain: "heallthsure.firebaseapp.com",
//   projectId: "heallthsure",
//   storageBucket: "heallthsure.appspot.com",
//   messagingSenderId: "548284438968",
//   appId: "1:548284438968:web:0df5fedc33250aaa1e974d",
//   measurementId: "G-FMCCXS56EW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)

// export {auth}

// // Commet Chat
// const appID = "23744425aad08ade";
// const region = "US";
// const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   error => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

export const API_URL = "https://backend2-4t4ejadqha-uc.a.run.app/";