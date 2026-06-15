import buildClient from "@/api/build-client";
import { AppContext, AppProps } from "next/app";
import Header from "../components/header";
const AppComponent = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <h1>header {pageProps.currentUser?.name}</h1>
      <Header currentUser={pageProps.currentUser} />
      <hr />
      <Component {...pageProps} />
    </div>
  );
};
AppComponent.getInitialProps = async (appContext : AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};
  return { ...data, ...pageProps };
}

export default AppComponent;