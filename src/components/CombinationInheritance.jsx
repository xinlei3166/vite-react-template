import React from 'react';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color} style={{color: props.color}}>
            {props.children}
        </div>
    );
}

function WelcomeDialog1() {
    return (
        <FancyBorder color="yellow">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog2() {
    return (
        <FancyBorder color="green">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

// eslint-disable-next-line no-unused-vars
function WelcomeDialog() {
    return (
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!" />
    );
}

export default class CombinationInheritance extends React.Component {
    state = {login: ''};

    handleChange = (e) => {
        this.setState({login: e.target.value});
    };

    handleSignUp = () => {
        alert(`Welcome aboard, ${this.state.login}!`);
    };

    render() {
        return (
            <div>
                <SplitPane left={<WelcomeDialog1/>} right={<WelcomeDialog2/>} />
                <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">
                        <input value={this.state.login}
                    onChange={this.handleChange} />

                    <button onClick={this.handleSignUp}>
                        Sign Me Up!
                    </button>
                </Dialog>
            </div>
        )
    }
}
