import React, {useEffect, useState} from "react";
import {CodeSnippet} from "../components/code-snippet";
import {PageLayout} from "../components/page-layout";
import {getProtectedResource, getPublicResource} from "../services/message.service";
import {useAuth0} from "@auth0/auth0-react";
import {Button, Spinner} from "react-bootstrap";

export const FlashcardPage = () => {
    const [message, setMessage] = useState("");
    const [aiAnswer, setAiAnswer] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const question = "question"
    const answer = "answer"

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const nextCard = () => {
        setShowAnswer(false);
        setAiLoading(false);
        getMessage(true, "flashcard");
    };

    const getAnswer = () => {
        setShowAnswer(true);
        setAiLoading(true);
        getMessageAnswer(true, "flashcard/answer?question=" + message.question);
    };

    const getMessage = async (isMounted, url) => {
        const accessToken = await getAccessTokenSilently();
        const {data, error} = await getProtectedResource(url, accessToken);
        if (!isMounted) {
            return;
        }
        if (data) {
            setMessage(data);
            setAiAnswer("")
        }
        if (error) {
            setMessage(JSON.stringify(error, null, 2));
        }
    };

    const getMessageAnswer = async (isMounted, url) => {
        const accessToken = await getAccessTokenSilently();
        const {data, error} = await getProtectedResource(url, accessToken);
        if (!isMounted) {
            return;
        }
        if (data) {
            setAiAnswer(data);
            setAiLoading(false);
        }
        if (error) {
            setAiAnswer(JSON.stringify(error, null, 2));
        }
    };

    useEffect(() => {
        let isMounted = true;
        getMessage(isMounted, "flashcard");
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <PageLayout>
            <div className="content-layout">
                <h1>
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
                                {message.answer ? (
                                    <p>{message.answer}</p>
                                ) : (
                                    <p>Empty answer</p>
                                )}
                                {aiLoading ? (<Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>) : (<div>{aiAnswer}</div>)}
                            < /div>
                        )}
                    </div>
                    <Button onClick={nextCard}>Next
                    </Button>
                    <Button onClick={getAnswer}>Answer</Button>
                </div>
            </div>
        </PageLayout>
    );
};
