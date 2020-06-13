import React from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
`

const LinkGroup = styled.ul`
    display: flex;
    list-style: none;
`





const Header = () => {
  return (
      <Navigation>
        <h2>LAMBDA EATS</h2>
        <LinkGroup>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/help">Help</NavLink></li>
        </LinkGroup>
      </Navigation>
  );
};
export default Header;
