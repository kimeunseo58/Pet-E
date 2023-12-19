import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "pages/Routing";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import axios from "axios";

//let itemList = [];

// if (itemList.length < 10) {
//   axios
//     .get(`/api/bestReviewsProductList/`)
//     .then((response) => {
//       console.log(response);
//       itemList = response.data;
//       initApp(); // 데이터를 받아온 후에 앱 초기화
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   function initApp() {
//     renderApp();
//   }
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      onScriptLoadError={() => console.log("구글 연동 실패")}
    >
      <Routing />
    </GoogleOAuthProvider>
  </div>
);
// function renderApp() {
//   const root = ReactDOM.createRoot(document.getElementById("root"));
//   root.render(
//     <div>
//       <GoogleOAuthProvider
//         clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
//         onScriptLoadError={() => console.log("구글 연동 실패")}
//       >
//         <Routing />
//       </GoogleOAuthProvider>
//     </div>
//   );
// }

//export { itemList };
