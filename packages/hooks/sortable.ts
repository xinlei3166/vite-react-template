import type { Options, SortableEvent } from 'sortablejs'
import Sortable from 'sortablejs'
import { useState, useRef } from 'react'
import { useMount } from 'ahooks'

export interface SortableOptions extends Options {
  callInternalMethods?: boolean // true: 调用内部一些方法后再执行 options 中的方法
}

const defaultOptions = {
  scroll: true,
  animation: 0,
  group: 'sortableGroup',
  ghostClass: 'sortable-ghost',
  dragClass: 'sortable-ghost',
  handle: '.sortable-handle',
  filter: '.sortable-ignore-elements',
  preventOnFilter: false,
  draggable: '.sortable-draggable',
  fallbackTolerance: 5
}

const removeNode = (node: HTMLElement) => {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node)
  }
}

const insertNodeAt = (
  fatherNode: HTMLElement,
  node: HTMLElement,
  position: number
) => {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling
  fatherNode.insertBefore(node, refNode)
}

const updatePosition = (list: any[], oldIndex: number, newIndex: number) => {
  const item = list.splice(oldIndex, 1)[0]
  list.splice(newIndex, 0, { ...item })
}

export function useSortable(
  list: any[],
  selector: string,
  options: SortableOptions = {}
) {
  const sortable = useRef<HTMLElement>()
  const [drag, setDrag] = useState(false)

  const _internalMethods = {
    onStart(event: SortableEvent) {
      // console.log('onStart', event)
      setDrag(true)
      // window.scrollTo(0, 0)
      options.onStart?.(event)
    },
    onEnd(event: SortableEvent) {
      // console.log('onEnd', event)
      setDrag(false)
      // updatePosition(list, event.oldIndex!, event.newIndex!)
      options.onEnd?.(event)
    },
    onUpdate(event: SortableEvent) {
      removeNode(event.item)
      insertNodeAt(event.from, event.item, event.oldIndex!)
      updatePosition(list, event.oldIndex!, event.newIndex!)
      options.onUpdate?.(event)
    }
  }
  let internalMethods = {}
  const callInternalMethods =
    options.callInternalMethods !== undefined
      ? options.callInternalMethods
      : true
  if (callInternalMethods) {
    internalMethods = _internalMethods
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    ...internalMethods
  }

  useMount(() => {
    const el = document.querySelector(selector)!
    // @ts-ignore
    sortable.current = Sortable.create((el as HTMLElement), mergedOptions)
  })

  return { sortable, drag, list }
}
