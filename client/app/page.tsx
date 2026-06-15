import buildClient from "@/api/build-client";
import { NextPageContext } from "next";

interface LandingPageProps {
  currentUser: any;
}

const LandingPage = ({ currentUser }: LandingPageProps) => {
 return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};

LandingPage.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;