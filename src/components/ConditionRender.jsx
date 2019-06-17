import React from 'react';
import {Tag} from 'antd'

function UserGreeting(props) {
    return <Tag color="#87d068">Welcome back! </Tag>
    ;
}

function GuestGreeting(props) {
    return <Tag color="#108ee9">Please sign up. </Tag>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}


function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

export default class ConditionRender extends React.Component {
    state = {isLoggedIn: false};

    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    };

    handleLogoutClick = () => {
        this.setState({isLoggedIn: false});
    };

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        // eslint-disable-next-line
        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {isLoggedIn ? (
                    <LogoutButton onClick={this.handleLogoutClick} />
                ) : (
                    <LoginButton onClick={this.handleLoginClick} />
                )}
                <p>The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.</p>
                <Mailbox unreadMessages={messages} />
            </div>
        );
    }
}
