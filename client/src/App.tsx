import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";
import AuthProvider from "./components/Login/login_persistance/persistance";
import Footer from "./components/footer";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname.includes("/backoffice");
  const hideContactBlock = location.pathname.includes("/backoffice");
  const hideFooter = location.pathname.includes("/backoffice");

  return (
    <>
      <AuthProvider>
        {!hideHeader && <Header />}
        <Outlet />
        {!hideContactBlock && <ContactBlock />}
        {!hideFooter && <Footer />}
      </AuthProvider>
    </>
  );
}

export default App;
