import React from 'react';

export default class Form extends React.Component {
    state = {
        name: '',
        textarea: '',
        fruit: '橘子',
        isGoing: true
    };

    labelStyle = {
        display: 'block',
        color: '#2db7f5',
        marginBottom: '2vmin',
        textAlign: 'right'
    };

    handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = (event) =>{
        let con = '';
        for (let i in this.state) {
            con += `${i}: ${this.state[i]}\n`
        }
        alert(con);
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label style={this.labelStyle}>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label style={this.labelStyle}>
                        TextArea:
                        <textarea name="textarea" value={this.state.textarea} onChange={this.handleChange} />
                    </label>
                    <label style={this.labelStyle}>
                        请选择你喜欢的水果:
                        <select name="fruit" value={this.state.fruit} onChange={this.handleChange}>
                            <option value="orange">橘子</option>
                            <option value="apple">苹果</option>
                            <option value="watermelon">西瓜</option>
                            <option value="banana">香蕉</option>
                        </select>
                    </label>
                    <label style={this.labelStyle}>
                        Is going:
                        <input
                            name="isGoing"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleChange} />
                    </label>
                    <label style={this.labelStyle}>
                        <input type="file" name="file" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
