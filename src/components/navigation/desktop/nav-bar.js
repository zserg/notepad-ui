import React from "react";
import {NavBarBrand} from "./nav-bar-brand";
import {NavBarButtons} from "./nav-bar-buttons";
import {NavBarTabs} from "./nav-bar-tabs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/flashcard">Flashcard</Nav.Link>
                        <Nav.Link href="/expenses">Expenses</Nav.Link>
                    </Nav>
                    <NavBarButtons/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
