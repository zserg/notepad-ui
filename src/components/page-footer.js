import React from "react";
import {PageFooterHyperlink} from "./page-footer-hyperlink";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const PageFooter = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <span>Copyright 2023</span>
            </Container>
        </Navbar>
    );
};
