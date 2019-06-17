import React from 'react';

function ListItem(props) {
    const value = props.value;
    return (
        <li>
            {value}
        </li>
    );
}

class NumberList extends React.Component {
    numbers = this.props.numbers;
    listItems = this.numbers.map((number) =>
        <ListItem key={number.toString()} value={number} />
    );
    render() {
        return (
            <ul>{this.listItems}</ul>
        );
    }
}

const numbers = [1, 2, 3, 4, 5];

export default class ListKey extends React.Component {
    render() {
        return (
            <div>
                <NumberList numbers={numbers} />
                <p>==========================</p>
                <ul>
                    {numbers.map((number) =>
                        <ListItem key={number.toString()} value={number} />
                    )}
                </ul>
            </div>
        )
    }
}
