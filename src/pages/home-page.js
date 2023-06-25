import React from "react";
import {Auth0Features} from "../components/auth0-features";
import {HeroBanner} from "../components/hero-banner";
import {PageLayout} from "../components/page-layout";
import Container from "react-bootstrap/Container";

export const HomePage = () => (
    <Container>
        <PageLayout>
            <HeroBanner/>
            <Auth0Features/>
        </PageLayout>
    </Container>
);
