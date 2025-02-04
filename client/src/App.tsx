import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";
import ImageHero from "./components/ImageHero/ImageHero";
import AuthProvider from "./components/Login/login_persistance/persistance";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <ImageHero subtitle="fait main avec beaucoup d'amour ❤️" />
        <Outlet />
        <ContactBlock />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
