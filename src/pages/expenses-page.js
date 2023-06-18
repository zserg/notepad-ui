import React, {useEffect, useState} from "react";
import {CodeSnippet} from "../components/code-snippet";
import {PageLayout} from "../components/page-layout";
import {getProtectedResource} from "../services/message.service";
import {useAuth0} from "@auth0/auth0-react";

export const ExpensesPage = () => {
    const [expense, setExpense] = useState('')
    const [expenses, setExpenses] = useState([]);
    const [expensesSummary, setExpensesSummary] = useState([]);
    const {getAccessTokenSilently} = useAuth0();

    const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

    const getMessage = async (isMounted) => {
        const accessToken = await getAccessTokenSilently();
        const {data, error} = await getProtectedResource("expenses", accessToken);
        if (!isMounted) {
            return;
        }
        if (data) {
            setExpenses(data);
        }
        if (error) {
            setExpenses(JSON.stringify(error, null, 2));
        }
        const result =  await getProtectedResource("expenses/summary", accessToken);
        if (result.data) {
            setExpensesSummary(result.data);
        }
        if (result.error) {
            setExpensesSummary(JSON.stringify(result.error, null, 2));
        }
    };

    useEffect(() => {
        let isMounted = true;

        getMessage(isMounted);

        return () => {
            isMounted = false;
        };
    }, []);

    const getComment = (data) => {
        const regex = /[0-9.]+(.*)/g
        const found = [...data.matchAll(regex)]
        return found[0][1] || "----";
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target
        this.setState({[name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postExpense({expense: expense})
            .then(() => {
                setExpense('')
                getMessage(true)
            })
    }

    const postExpense = async (data) => {
        setExpense('')
        const accessToken = await getAccessTokenSilently();
        const url = `${apiServerUrl}/expenses`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${accessToken}`
            },
        })
        const result = await response.json()
        console.log(result)
    }

    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    Expenses
                </h1>
                <div className="content__body">
                    <div className='payments-wrapper'>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Comment</th>
                                <th>Type</th>
                            </tr>
                            {expenses.map((payment, key) => (
                                <tr key={key}>
                                    <td>{new Date(payment.date).toLocaleDateString("ru-RU")}</td>
                                    <td>{payment.value}</td>
                                    <td>{getComment(payment.comment)}</td>
                                    <td>{payment.type}</td>
                                </tr>
                            ))}
                        </table>
                        <table>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                            {expensesSummary.map((payment, key) => (
                                <tr key={key}>
                                    <td>{payment.type}</td>
                                    <td>{payment.value}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <h3>Add expense</h3>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='row'>
                            <div className='form-group'>
                                <label htmlFor='expense'>First Name </label>
                                <input
                                    type='text'
                                    name='expense'
                                    value={expense}
                                    onChange={event => setExpense(event.target.value)}
                                    placeholder='Expense'
                                /> <br/>
                            </div>
                        </div>

                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};
