/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { Sidebar } from "./components/chat-side"
import { ChatArea } from "./components/chat-area"
import { ChatInput } from "./components/chat-input"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { hideHeader } from "@/store/slices/DOMSlice"
import Header from "../dashboard/layout/Header"

export function ChatLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(hideHeader())
  }, [])
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} />
      <div className="flex flex-col flex-grow">
        <Header />
        <ChatArea />
        <ChatInput />
      </div>
    </div>
  )
}

