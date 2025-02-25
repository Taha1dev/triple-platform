
import { useState } from "react"
import { Sidebar } from "./components/chat-side"
import { ChatArea } from "./components/chat-area"
import { ChatInput } from "./components/chat-input"

export function ChatLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(300)

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} />
      <div className="flex flex-col flex-grow">
        <ChatArea />
        <ChatInput />
      </div>
    </div>
  )
}

