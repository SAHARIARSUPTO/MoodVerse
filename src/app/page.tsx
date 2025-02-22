import WelcomePage from "./components/LandingPage/page";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <WelcomePage></WelcomePage>
      <Footer></Footer>
    </>
  );
}
