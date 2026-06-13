import axios from "axios";




interface LandingPageProps {
  currentUser: any;
}


const LandingPage = ({currentUser}: LandingPageProps) => {
  console.log("i am in the component", currentUser);
  axios.get("/api/users/currentuser");
  return <h1>Landing Page</h1>;
};

/*LandingPage.getInitialProps = () => {
  console.log("i am on the server");
  return { currentUser: null };
};*/

export default LandingPage;