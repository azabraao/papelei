import { memo, useEffect, useRef, useState } from "react";
// import { gapi, loadAuth2 } from "gapi-cjs";
import dynamic from "next/dynamic";

// const gapiScript = dynamic(() => import("gapi-script"), {
//   ssr: false,
// });

const WebGoogleButton = () => {
  const buttonRef = useRef(null);
  const [auth2, setAuth2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsReady, setButtonIsReady] = useState(false);

  const initAuth2 = async () => {
    // import { gapi, loadAuth2 } from "gapi-cjs";
    const gapi = (await import("gapi-script")).gapi;
    const loadAuth2 = (await import("gapi-script")).loadAuth2;

    // const { gapi, loadAuth2 } = gapiScript;
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

  const onButtonClick = (user) => {
    setIsLoading(true);
    console.log("user>>>", user);

    // handleGoogleLogin(user, (status) => setIsLoading(status));
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
        (err) => {
          setIsLoading(false);
        }
      );
    }
  }, [auth2, buttonRef]);

  return (
    <button ref={buttonRef} className="social-button google font-regular">
      Continuar com Google
    </button>
  );
};

export default WebGoogleButton;

// export default memo(
//   dynamic(() => Promise.resolve(WebGoogleButton), {
//     ssr: false,
//   })
// );
