import { useState } from 'react'

export default function HelloPage() {
  const [state, setState] = useState({ in: '请输入' })

  const onChange = (e: any) => {
    setState({
      in: e.target.value
    })
  }

  return (
    <div>
      <p>Hello React</p>
      <p>当前时间：{new Date().toLocaleTimeString()}</p>
      <p>
        <input type="text" onChange={onChange} />
      </p>
      <p>输入内容：{state.in}</p>
    </div>
  )
}
