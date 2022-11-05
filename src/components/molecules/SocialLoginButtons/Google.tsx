import { useEffect, useRef, useState } from "react";
import { Button, GoogleIcon } from "components/atoms";

interface GoogleButtonProps {
  handleLogin: (user: User) => void;
}

const GoogleButton = ({ handleLogin }: GoogleButtonProps) => {
  const buttonRef = useRef(null);
  const [auth2, setAuth2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsReady, setButtonIsReady] = useState(false);

  const initAuth2 = async () => {
    const gapi = (await import("gapi-script")).gapi;
    const loadAuth2 = (await import("gapi-script")).loadAuth2;

    const auth2 = await loadAuth2(
      gapi,
      "7888434998-1h790rr3tv8ejjee6mmoicvuvaer8sht.apps.googleusercontent.com",
      ""
    );
    setAuth2(auth2);
  };

  useEffect(() => {
    if (!auth2) initAuth2();
  }, [auth2]);

  const onButtonClick = async (user) => {
    setIsLoading(true);

    try {
      await handleLogin(user);
    } catch (err) {
      alert("Desculpe, houve um erro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (buttonRef.current && auth2) {
      setButtonIsReady(true);

      auth2.attachClickHandler(
        buttonRef.current,
        {},
        (profile) =>
          onButtonClick({
            name: profile.getBasicProfile().getName(),
            email: profile.getBasicProfile().getEmail(),
            picture: profile.getBasicProfile().getImageUrl(),
            googleId: profile.getBasicProfile().getId(),
          }),
        () => {
          setIsLoading(false);
        }
      );
    }
  }, [auth2, buttonRef]);

  return (
    <Button
      backgroundColor="white"
      icon={<GoogleIcon />}
      ref={buttonRef}
      className="social-button google font-regular"
      disabled={isLoading || !buttonIsReady}
      withShadow
    >
      Continuar com Google
    </Button>
  );
};

export default GoogleButton;
