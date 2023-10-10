import type { CSSProperties } from 'react'
import { useState } from 'react'

export default function FormPage() {
  const [state, setState] = useState<Record<string, any>>({
    name: '',
    textarea: '',
    fruit: '橘子',
    isGoing: true
  })

  const labelStyle: CSSProperties = {
    display: 'block',
    color: '#2db7f5',
    marginBottom: '2vmin',
    textAlign: 'right'
  }

  const handleChange = (e: any) => {
    const name = e.target.name
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setState(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = (event: any) => {
    let con = ''
    for (const i in state) {
      con += `${i}: ${state[i]}\n`
    }
    alert(con)
    event.preventDefault()
  }

  return (
    <div className="inline-block">
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label style={labelStyle}>
          TextArea:
          <textarea
            name="textarea"
            value={state.textarea}
            onChange={handleChange}
          />
        </label>
        <label style={labelStyle}>
          请选择你喜欢的水果:
          <select name="fruit" value={state.fruit} onChange={handleChange}>
            <option value="orange">橘子</option>
            <option value="apple">苹果</option>
            <option value="watermelon">西瓜</option>
            <option value="banana">香蕉</option>
          </select>
        </label>
        <label style={labelStyle}>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={state.isGoing}
            onChange={handleChange}
          />
        </label>
        <label style={labelStyle}>
          <input type="file" name="file" />
        </label>
        <input
          className="border-1 border-solid px-1 py-0.5"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  )
}
