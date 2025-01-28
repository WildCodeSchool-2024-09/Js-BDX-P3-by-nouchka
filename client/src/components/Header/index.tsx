import "./style.css";
import { useState } from "react";
import Logo from "./Logo";
import MainNavbar from "./MainNavbar";
import UserNavbar from "./UserNavbar";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <header>
      <Logo />
      <UserNavbar />
      <MainNavbar showLinks={showLinks} setShowLinks={setShowLinks} />
    </header>
  );
}
