import React, {useEffect, useState} from "react";
import {CodeSnippet} from "../components/code-snippet";
import {PageLayout} from "../components/page-layout";
import {getProtectedResource, getPublicResource} from "../services/message.service";
import {useAuth0} from "@auth0/auth0-react";

export const FlashcardPage = () => {
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
                    <div className="flashcard" onClick={toggleAnswer}>
                        <div className="flashcard-question">
                            <p>Question:</p>
                            <p>{message.question}</p>
                        </div>
                        {showAnswer && (
                            <div className="flashcard-answer">
                                <p>Answer:</p>
                                {message.answer && (
                                    <p>{message.answer}</p>
                                )}
                                {!message.answer && (
                                    <p>Empty answer</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
