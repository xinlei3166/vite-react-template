import React from 'react';

export default class Hello extends React.Component {
    state = {in: '请输入'};

    handleChanged = (e) => {
        this.setState({
            in: e.target.value
        });
    };

    render() {
        return (
            <div>
                <p>
                    Hello React
                </p>
                <p>
                    当前时间：{new Date().toLocaleTimeString()}
                </p>
                <p>
                    <input type="text" onChange={this.handleChanged} />
                </p>
                <p>
                    输入内容：{this.state.in}
                </p>
            </div>
        )
    }
};

