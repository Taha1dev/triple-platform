
import { useState } from "react"
import { Send, Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatInput() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="border-t p-4 flex items-center space-x-2">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow"
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <Button onClick={handleSend} disabled={!message.trim()}>
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}

