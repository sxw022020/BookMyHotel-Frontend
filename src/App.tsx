import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import LoginPage from "./components/LoginPage";
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";

const App: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [asHost, setAsHost] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const host = localStorage.getItem("asHost") === "true";

    setAuthed(authToken !== null);
    setAsHost(host);
  }, []);

  // handle successful login
  const handleLoginSuccess = (token: string, asHost: boolean) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost.toString());

    setAuthed(true);
    setAsHost(asHost);
  }

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");

    setAuthed(false);
    // TODO: why not setHost?
  }

  // render content
  const renderContent = () => {
    /**
     * If the `authed` variable is false (i.e., the user is not authenticated), 
     * the component will render the `LoginPage`.
     */
    if (!authed) {
      /**
       * The `LoginPage` component receives a `handleLoginSuccess` prop, 
       * which is a callback function that will be called when the user successfully logs in. 
       * This callback function is used to update the state of the parent component and 
       * store the authentication token and `asHost` status in the `localStorage`.
       */
      return <LoginPage handleLoginSuccess = {handleLoginSuccess} />
    }

    if (asHost) {
      return <HostHomePage />
    }

    return <GuestHomePage />
  };

  /**
   * This code creates a full-screen layout with a navbar at the top and content below. 
   * When the user is authenticated, a dropdown menu is displayed in the navbar, allowing the user to log out.
   */
  return (
    /**
     * The Container component is being given two props: fluid and style.
     * 1. `<Container fluid>`: 
     *  - The fluid prop is used to create a container with 100% width, 
     *  which spans the entire width of the viewport. 
     *  This is in contrast to the default behavior of a fixed-width container.
     * 2. `style={{ height: '100vh', padding: 0 }}`: 
     *  - The style prop is an inline CSS style object that 
     *  sets the height of the container to 100% of the viewport height (100vh) and removes any padding from the container (padding: 0).
     * 
     * ==> full screen
     */
    <Container fluid style = {{ 
      height: "100vh", 
      padding: 0}}
    >

      <Navbar bg = "dark" variant = "dark" expand = "lg">
        <Navbar.Brand href = "#home"> BookMyHotel </Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav" />

        {authed && (
          // A container that collapses the navigation items on smaller screens, positioned to the right side of the navigation bar.
          <Navbar.Collapse className = "justify-content-end">
            {/* A dropdown menu with the title "User". */}
            <NavDropdown title = "User" id = "basic-nav-dropdown">
              <NavDropdown.Item onClick = {handleLogout}> Log Out </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        )}

      </Navbar>

      {/* A fluid container for the main content, with a calculated height that excludes the height of the navigation bar (56px), 
      a top margin of 20px, and overflow set to auto to enable scrolling if the content is too long. */}
      <Container fluid style = {{ 
        height: "calc(100% - 56px)", 
        marginTop: 20, 
        overflow: "auto" 
        }}
      >
        {renderContent()}
      </Container>

    </Container>
  );
};

export default App;
