import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { Laugh, Pencil, Reply, Star, Trash2 } from "lucide-react"

import { Message, MessagePart } from "@/types/temp"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const renderMessagePart = (messagePart: MessagePart) => {
  if (messagePart.type === "text") {
    return messagePart.content.text
  }
  if (messagePart.type === "plainLink") {
    return <a href={messagePart.content.link}>{messagePart.content.link}</a>
  }
  if (messagePart.type === "textLink") {
    return <a href={messagePart.content.link}>{messagePart.content.text}</a>
  }
  if (messagePart.type === "mention") {
    return (
      <a href={`https://ably.com/${messagePart.content.userId}`}>
        {messagePart.content.name}
      </a>
    )
  }

  return ""
}

const getPartKey = (messagePart: MessagePart) => {
  if (messagePart.type === "text") {
    return messagePart.content.text
  }
  if (messagePart.type === "plainLink") {
    return messagePart.content.link
  }
  if (messagePart.type === "textLink") {
    return messagePart.content.link
  }
  if (messagePart.type === "mention") {
    return messagePart.content.userId
  }

  return ""
}

type MessageItemProps = {
  message: Message
  username: string
}
const icons = {
  emoji: <Laugh size="16" />,
  reply: <Reply size="16" />,
  new: <Pencil size="16" />,
  delete: <Trash2 size="16" />,
  star: <Star size="16" />,
}

function getUserColor(username: string) {
  const hue = stringToHue(username)
  const saturation = 50 // Keeping saturation & lightness constant
  const lightness = 60
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function stringToHue(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash % 360
}

const MessageItem = ({ message, username }: MessageItemProps) => {
  const color = getUserColor(username)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <li
            className="mx-2 flex w-full rounded-sm px-2 py-1 hover:bg-muted"
            key={message.created_at}
          >
            <h3 style={{ color }} className="pr-2">
              {username}
            </h3>
            <p>{message.data}</p>
          </li>
        </TooltipTrigger>
        <TooltipContent>
          <ToggleGroup type="multiple">
            {Object.entries(icons).map(([name, icon]) => (
              <ToggleGroupItem
                key={name}
                value={name}
                aria-label={name}
                className="mx-1"
              >
                {icon}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default MessageItem
