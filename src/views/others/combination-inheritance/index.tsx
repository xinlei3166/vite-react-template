import { useState, PropsWithChildren } from 'react'

function FancyBorder(props: PropsWithChildren<any>) {
  return (
    <div
      className={'FancyBorder FancyBorder-' + props.color}
      style={{ color: props.color }}
    >
      {props.children}
    </div>
  )
}

function WelcomeDialog1() {
  return (
    <FancyBorder color="yellow">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}

function WelcomeDialog2() {
  return (
    <FancyBorder color="green">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}

function SplitPane(props: PropsWithChildren<any>) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  )
}

function Dialog(props: PropsWithChildren<any>) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  )
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  )
}

export default function CombinationInheritancePage() {
  const [state, setState] = useState({ login: '' })

  const handleChange = (e: any) => {
    setState(state => ({ ...state, login: e.target.value }))
  }

  const handleSignUp = () => {
    alert(`Welcome aboard, ${state.login}!`)
  }

  return (
    <div>
      <SplitPane left={<WelcomeDialog1 />} right={<WelcomeDialog2 />} />
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input
          style={{ marginRight: '8px' }}
          value={state.login}
          onChange={handleChange}
        />

        <button
          className="border-1 border-solid px-1 py-0.5"
          onClick={handleSignUp}
        >
          Sign Me Up!
        </button>
      </Dialog>
    </div>
  )
}
