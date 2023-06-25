import React from "react";
import {NavBar} from "./navigation/desktop/nav-bar";
import {MobileNavBar} from "./navigation/mobile/mobile-nav-bar";
import {PageFooter} from "./page-footer";
import Container from "react-bootstrap/Container";

export const PageLayout = ({children}) => {
    return (
        <div>
            <NavBar/>
            <Container>
                {children}
            </Container>
            <PageFooter/>
        </div>
    );
};
