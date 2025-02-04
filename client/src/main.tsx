// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ClientLogin from "../src/components/Login/index";
import ContactBlock from "./components/contact-block";
import About from "./pages/About";
import Account from "./pages/Account";
import LoginBackoffice from "./pages/Account/LoginBackOffice";
import BackofficeHome from "./pages/BackOffice/BackOfficeHome";
import Shop from "./pages/Shop";
import Upcycling from "./pages/Upcycling";
/* ************************************************************************* */

// Import the main app component
import App from "./App";
import RegisterBlock from "./components/Register";
import BackOfficeClients from "./pages/BackOffice/BackOfficeClients";
import BackOfficeOrders from "./pages/BackOffice/BackOfficeOrders";
import BackOfficePageAbout from "./pages/BackOffice/BackOfficePageAbout";
import BackOfficePageHome from "./pages/BackOffice/BackOfficePageHome";
import BackOfficePageUpcycling from "./pages/BackOffice/BackOfficePageUpcycling";
import BackOfficePages from "./pages/BackOffice/BackOfficePages";
import BackOfficeProducts from "./pages/BackOffice/BackOfficeProducts";
import BackOfficeStats from "./pages/BackOffice/BackOfficeStats";
import CGU from "./pages/CGU/cgu";
import CGV from "./pages/CGV/cgv";
import FAQ from "./pages/FAQ/faq";
import Home from "./pages/Home";
import ProductPage from "./pages/Shop/Product";
import LegalMentions from "./pages/legal-mentions/LegalMentions";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    // The root path
    // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      // Try adding a new route! For example, "/about" with an About component

      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cgu",
        element: <CGU />,
      },
      {
        path: "/cgv",
        element: <CGV />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/legal-mentions",
        element: <LegalMentions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },

      {
        path: "/upcycling",
        element: <Upcycling />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/clientLog",
        element: <ClientLogin />,
      },
      {
        path: "/inscription",
        element: <RegisterBlock />,
      },
      {
        path: "/contact-block",
        element: <ContactBlock />,
      },
      {
        path: "/jewelry/:id",
        element: <ProductPage />,
      },
      { path: "/login-backoffice", element: <LoginBackoffice /> },
      {
        path: "/backoffice",
        element: <BackofficeHome />,
        children: [
          {
            path: "pages",
            element: <BackOfficePages />,
            children: [
              { path: "home", element: <BackOfficePageHome /> },
              { path: "upcycling", element: <BackOfficePageUpcycling /> },
              { path: "about", element: <BackOfficePageAbout /> },
            ],
          },
          { path: "products", element: <BackOfficeProducts /> },
          { path: "clients", element: <BackOfficeClients /> },
          { path: "orders", element: <BackOfficeOrders /> },
          { path: "stats", element: <BackOfficeStats /> },
        ],
      },
    ],
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *
 *    import About from "./pages/About";
 *
 *
 *    Add a new route to the router:
 *
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
