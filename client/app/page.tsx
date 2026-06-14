import axios from "axios";




interface LandingPageProps {
  currentUser: any;
}


const LandingPage = ({currentUser}: LandingPageProps) => {
  console.log("i am in the component", currentUser);
  axios.get("/api/users/currentuser");
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
if(typeof window === "undefined") {
  const {data} = await axios.get('http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser',{
    headers: {
      Host: "ticketing.dev"
    }
  });

  return data;
}
else {

  const {data} = await axios.get("/api/users/currentuser");
  return data;
}

};

export default LandingPage;