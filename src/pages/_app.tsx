import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "lib/gtag";
import { AppProps } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";
import { CartProvider } from "contexts/cart";
import { SearchProvider } from "contexts/search";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <SkeletonTheme
        baseColor="#A4A4A6"
        highlightColor="#E8E8E9"
        borderRadius={4}
      >
        <CartProvider>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </CartProvider>
      </SkeletonTheme>
    </>
  );
};

export default App;
