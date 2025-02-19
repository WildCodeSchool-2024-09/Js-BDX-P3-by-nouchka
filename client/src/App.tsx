import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AuthProvider from "./components/Login/login_persistance/persistance";
import ContactBlock from "./components/contact-block";
import Footer from "./components/footer";

const App = () => {
  const location = useLocation();
  const isBackOffice = location.pathname.includes("/backoffice");

  return (
    <AuthProvider>
      {!isBackOffice && <Header />}
      <Outlet />
      {!isBackOffice && <ContactBlock />}
      {!isBackOffice && <Footer />}
    </AuthProvider>
  );
};

export default App;
