import React from 'react';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p style={{color: '#108ee9'}}>水会烧开</p>;
    }
    return <p style={{color: '#f50'}}>水不会烧开</p>;
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

const primaryColor = {
    color: '#108ee9'
};

const lightPrimaryColor = {
    color: '#2db7f5'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component {
    // state = {temperature: ''};

    handleChange = (e) => {
        // this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    };

    render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset style={scaleNames[scale]=== 'Celsius' ? primaryColor : lightPrimaryColor}>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

export default class StateUp extends React.Component {
    state = {temperature: '', scale: 'c'};

    get celsius() {
        return this.state.scale === 'f' ? tryConvert(this.state.temperature, toCelsius) : this.state.temperature;
    }

    get fahrenheit() {
        return this.state.scale === 'c' ? tryConvert(this.state.temperature, toFahrenheit) : this.state.temperature;
    }

    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c', temperature});
    };

    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f', temperature});
    };

    render() {
        return (
          <div>
              <TemperatureInput
                  scale="c"
                  temperature={this.celsius}
                  onTemperatureChange={this.handleCelsiusChange} />

              <TemperatureInput
                  scale="f"
                  temperature={this.fahrenheit}
                  onTemperatureChange={this.handleFahrenheitChange} />

              <BoilingVerdict
                  celsius={parseFloat(this.celsius)} />
          </div>
        )
    }
}
