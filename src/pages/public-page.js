import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import {getProtectedResource, getPublicResource} from "../services/message.service";
import {useAuth0} from "@auth0/auth0-react";

export const PublicPage = () => {
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const {getAccessTokenSilently} = useAuth0();

  const question = "question"
  const answer = "answer"

    const toggleAnswer = () => {
      setShowAnswer(!showAnswer);
    };

  useEffect(() => {
    let isMounted = true;

    const getMessage = async (isMounted) => {
      const accessToken = await getAccessTokenSilently();
      const {data, error} = await getProtectedResource("flashcard", accessToken);
      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(data);
      }
      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Public Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p>
          <div className="flashcard" onClick={toggleAnswer}>
            <div className="flashcard-question">
              <h2>Question:</h2>
              <p>{message.question}</p>
            </div>
            {showAnswer && (
                <div className="flashcard-answer">
                  <h2>Answer:</h2>
                  <p>{message.answer}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
