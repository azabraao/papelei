/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, FacebookIcon } from "components/atoms";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useState } from "react";

interface GoogleButtonProps {
  handleLogin: (user: User) => void;
}

type FacebookUser = {
  id: string;
  email: string;
  name: string;
  facebookId: string;
  picture: {
    data?: { url?: string };
  };
};

const WebLoginButton = ({ handleLogin }: GoogleButtonProps) => {
  const [facebookUser, setFacebookUser] = useState<FacebookUser>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ("FB" in window && !!Object.keys(facebookUser).length) {
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          window.FB.api(
            response.authResponse.userID,
            "get",
            { fields: "id, email, name, picture" },
            (user: FacebookUser) =>
              setFacebookUser({ facebookId: user?.id, ...user })
          );
        }
      });
    }
  }, [facebookUser]);

  const startLogin = async (user) => {
    setIsLoading(true);

    try {
      await handleLogin({
        email: user.email,
        name: user.name,
        facebookId: user.facebookId,
        picture: user.picture?.data?.url,
      });
    } catch (err) {
      alert("Desculpe, houve um erro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
              "get",
              { fields: "id, email, name, picture" },
              (user: FacebookUser) =>
                startLogin({ facebookId: user.id, ...user })
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
