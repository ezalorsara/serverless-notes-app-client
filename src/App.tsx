
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Router';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { loggedin, loggedout } from './actions/auth';
import { Auth } from "aws-amplify";
import { push } from 'connected-react-router'
import { isAuthenticatedType } from './types';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: isAuthenticatedType) => ({
    isAuthenticated: state.loggedin_state
  }));

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      dispatch(loggedin);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
      dispatch(loggedout);
    }
  }

  async function handleLogout() {
    await Auth.signOut();
    dispatch(loggedout);
    dispatch(push('/login'));
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem> : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
