import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";
import AuthProvider from "./components/Login/login_persistance/persistance";
import Footer from "./components/footer";

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
