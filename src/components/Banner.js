import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"

const BannerComponent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 500px;
    color: white;
    background-color: rgba(0,0,0,.6);
    align-items: center;
    justify-content: space-around;
`

const ImageBackground = styled.img`
    position: absolute;
    top: -200px;
    left: 0;
    width: 100%;
    z-index: -1;
`

const Banner = () => {
  return (
    <BannerComponent>
      <ImageBackground src="https://images.unsplash.com/photo-1572455021453-7d0b208ae250?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2026&q=80"/>
      <div>
        <h1>Your Favorite Food while Coding.</h1>
        <Link className="banner-button" to="/pizza">Pizza</Link>
      </div>
      
    </BannerComponent>
  );
};
export default Banner;