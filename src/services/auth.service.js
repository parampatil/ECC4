import axios from "axios";
import { auth } from "../config";
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   GithubAuthProvider,
//   TwitterAuthProvider,
// } from "firebase/auth";

import { API_URL } from "../config";


// const API_URL = "https://healthsure.pythonanywhere.com/"; // Pythonanywhere
// const API_URL = "https://dummyjson.com/auth/";

const register = (fullname, username, email, password) => {
  return axios.post(
    API_URL + "signup",
    {
      name: fullname,
      username: username,
      email_id: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

const login = (username, password) => {
  let profile_image = "https://ui-avatars.com/api/?name="
  return axios
    .post(
      API_URL + "login",
      {
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      console.log(response.data)
      if (response.data.access_token) {
        console.log(response.data.name)
        profile_image = profile_image + response.data.name
        localStorage.setItem("user", JSON.stringify({...response.data, roles: [(response.data.email_id === "paramrpatil@gmail.com") ? "ROLE_ADMIN" : "ROLE_CUSTOMER"], image: profile_image}));
        console.log(response.data.email_id)
        console.log(response.data.email_id === "paramrpatil@gmail.com")
      }

      return {...response.data, roles: [(response.data.email_id === "paramrpatil@gmail.com") ? "ROLE_ADMIN" : "ROLE_CUSTOMER"], image: profile_image};
    });
};

// const loginOauth = (provider) => {
//   if (provider === "google") {
//     return signInWithPopup(auth, new GoogleAuthProvider()).then((data) => {
//       if (data.user.stsTokenManager.accessToken) {
//         axios
//           .get(
//             API_URL + "oauth_signin/?username=" + data.user.email +"&providerId:" + data.providerId + "&emailVerified" + data.user.emailVerified + "&displayName" + data.user.displayName
//           )
//           .then((response) => {
//             if (response.data.access) {
//               localStorage.setItem("user", JSON.stringify(response.data));
//             }

//             return response.data;
//           });
//         // const userData = {
//         //   accessToken: data.user.stsTokenManager.accessToken,
//         //   providerId: data.providerId,
//         //   displayName: data.user.displayName,
//         //   email: data.user.email,
//         //   emailVerified: data.user.emailVerified,
//         //   profileImageURL: data.user.photoURL,
//         // };
//         // localStorage.setItem("user", JSON.stringify(userData));
//       }

//       return data;
//     });
//   } else if (provider === "facebook") {
//     console.log("Provider Facebook - auth services");
//     return signInWithPopup(auth, new FacebookAuthProvider()).then((data) => {
//       console.log(data);
//       if (data.user.stsTokenManager.accessToken) {
//         const userData = {
//           accessToken: data.user.stsTokenManager.accessToken,
//           providerId: data.providerId,
//           displayName: data.user.displayName,
//           email: data.user.email,
//           emailVerified: data.user.emailVerified,
//           profileImageURL: data.user.photoURL,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//       }

//       return data;
//     });
//   } else if (provider === "github") {
//     console.log("Provider Github - auth services");
//     return signInWithPopup(auth, new GithubAuthProvider()).then((data) => {
//       console.log(data);
//       if (data.user.stsTokenManager.accessToken) {
//         const userData = {
//           accessToken: data.user.stsTokenManager.accessToken,
//           providerId: data.providerId,
//           displayName: data.user.displayName,
//           email: data.user.email,
//           emailVerified: data.user.emailVerified,
//           profileImageURL: data.user.photoURL,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//       }

//       return data;
//     });
//   } else if (provider === "twitter") {
//     console.log("Provider Github - auth services");
//     return signInWithPopup(auth, new TwitterAuthProvider()).then((data) => {
//       console.log(data);
//       if (data.user.stsTokenManager.accessToken) {
//         const userData = {
//           accessToken: data.user.stsTokenManager.accessToken,
//           providerId: data.providerId,
//           displayName: data.user.displayName,
//           email: data.user.email,
//           emailVerified: data.user.emailVerified,
//           profileImageURL: data.user.photoURL,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//       }

//       return data;
//     });
//   }
// };

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  // loginOauth,
  logout,
};
