import type { PropsWithChildren } from 'react'
import { useState } from 'react'

function BoilingVerdict(props: PropsWithChildren<{ celsius: number }>) {
  if (props.celsius >= 100) {
    return <p style={{ color: '#108ee9' }}>水会烧开</p>
  }
  return <p style={{ color: '#f50' }}>水不会烧开</p>
}

const scaleNames: Record<string, any> = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const primaryColor = {
  color: '#108ee9'
}

const lightPrimaryColor = {
  color: '#2db7f5'
}

function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9
}

function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32
}

function tryConvert(temperature: string, convert: Function) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

function TemperatureInput(props: PropsWithChildren<any>) {
  const { onTemperatureChange, temperature, scale } = props

  const handleChange = (e: any) => {
    onTemperatureChange(e.target.value)
  }

  return (
    <fieldset
      style={scaleNames[scale] === 'Celsius' ? primaryColor : lightPrimaryColor}
    >
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  )
}

export default function StateUpPage() {
  const [state, setState] = useState({ temperature: '', scale: 'c' })

  const celsius = () => {
    return state.scale === 'f'
      ? tryConvert(state.temperature, toCelsius)
      : state.temperature
  }

  const fahrenheit = () => {
    return state.scale === 'c'
      ? tryConvert(state.temperature, toFahrenheit)
      : state.temperature
  }

  const handleCelsiusChange = (temperature: string) => {
    setState({ scale: 'c', temperature })
  }

  const handleFahrenheitChange = (temperature: string) => {
    setState({ scale: 'f', temperature })
  }

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius()}
        onTemperatureChange={handleCelsiusChange}
      />

      <TemperatureInput
        scale="f"
        temperature={fahrenheit()}
        onTemperatureChange={handleFahrenheitChange}
      />

      <BoilingVerdict celsius={parseFloat(celsius())} />
    </div>
  )
}
