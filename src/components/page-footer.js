import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>This sample application is brought to you by&nbsp;</span>
              <PageFooterHyperlink path="https://auth0.com/">
                Auth0
              </PageFooterHyperlink>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
