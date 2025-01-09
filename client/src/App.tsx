import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
