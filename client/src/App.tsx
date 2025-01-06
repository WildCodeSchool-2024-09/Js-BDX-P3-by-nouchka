import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
