// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>

import { Button, FacebookIcon } from "components/atoms";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useState } from "react";

const WebLoginButton = () => {
  const [facebookUser, setFacebookUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ("FB" in window && !!Object.keys(facebookUser).length) {
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          window.FB.api(
            response.authResponse.userID,
            "GET",
            { fields: "id, email, name, picture" },
            (user) => setFacebookUser({ facebookId: user.id, ...user })
          );
        }
      });
    }
  }, [facebookUser]);

  const startLogin = (user) => {
    console.log("xablay", {
      email: user.email,
      name: user.name,
      facebookId: user.facebookId,
      picture: user.picture?.data?.url,
    });
  };

  const onButtonClick = () => {
    const isConnected = !!facebookUser.email && facebookUser.facebookId;
    setIsLoading(true);

    if (isConnected) {
      startLogin(facebookUser);
    } else {
      window.FB.login(
        (response) => {
          if (response.status === "connected") {
            window.FB.api(
              response.authResponse.userID,
              "GET",
              { fields: "id, email, name, picture" },
              (user) => startLogin({ facebookId: user.id, ...user })
            );
          } else {
            setIsLoading(false);
          }
        },
        { scope: "public_profile,email" }
      );
    }
  };

  return (
    <Button
      backgroundColor="white"
      icon={<FacebookIcon />}
      disabled={isLoading}
      onClick={onButtonClick}
    >
      Continuar com Facebook
    </Button>
  );
};

export default memo(
  dynamic(() => Promise.resolve(WebLoginButton), {
    ssr: false,
  })
);
