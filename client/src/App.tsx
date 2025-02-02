import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";
import Footer from "./components/footer";
import AuthProvider from "./components/Login/login_persistance/persistance";


function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Outlet />
      <ContactBlock />
      <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
