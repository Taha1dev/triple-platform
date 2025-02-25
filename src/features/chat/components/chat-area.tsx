import { ScrollArea } from "@/components/ui/scroll-area"

const dummyMessages = [
  { id: 1, sender: "Alice", content: "Hey, how are you?" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?" },
  { id: 3, sender: "Alice", content: "I'm doing great! Just working on a new project." },
  { id: 4, sender: "You", content: "That sounds interesting. What kind of project is it?" },
  { id: 5, sender: "Alice", content: "It's The Chat feature for Triple Platform" },
]

export function ChatArea() {
  return (
    <ScrollArea className="flex-grow p-4">
      {dummyMessages.map((message) => (
        <div key={message.id} className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"}`}>
          <div
            className={`inline-block p-2 rounded-lg ${
              message.sender === "You" ? "bg-foreground text-primary-foreground" : "bg-accent"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{message.sender}</p>
        </div>
      ))}
    </ScrollArea>
  )
}

