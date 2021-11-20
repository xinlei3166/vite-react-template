import { useState } from 'react'
import { Card } from 'antd'
import { ReactSortable } from 'react-sortablejs'
import './index.less'

interface Fruit {
  name: string
  id: number
}

export default function RouterPage() {
  const dragOptions = {
    scroll: true,
    animation: 500,
    group: 'group',
    ghostClass: 'vd-ghost',
    dragClass: 'vd-ghost',
    handle: '.vd-handle',
    filter: '.vd-ignore-elements',
    preventOnFilter: false,
    draggable: '.vd-draggable',
    fallbackTolerance: 5
  }

  const [state, setState] = useState<Fruit[]>([
    { name: 'apple', id: 1 },
    { name: 'banana', id: 2 },
    { name: 'watermelon', id: 3 },
    { name: 'orange', id: 4 },
    { name: 'peach', id: 5 }
  ])

  const [drag, setDrag] = useState(false)

  function onDragStart() {
    setDrag(true)
    window.scrollTo(0, 0)
  }

  function onDragEnd() {
    //
  }

  return (
    <Card className="h-full">
      <div className="title">Draggable</div>
      <div className="draggable-wrap ml-16">
        <ReactSortable
          list={state}
          setList={setState}
          tag="div"
          {...dragOptions}
          onStart={onDragStart}
          onEnd={onDragEnd}
        >
          {state.map(item => (
            <div className="row vd-draggable vd-handle" key={item.id}>
              {item.name}
            </div>
          ))}
        </ReactSortable>
      </div>
    </Card>
  )
}
