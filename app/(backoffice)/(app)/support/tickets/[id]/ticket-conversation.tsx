"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Send, Loader2, User, Shield } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  type SupportTicket,
  type TicketMessage,
  addTicketMessage,
} from "@/actions/admin/support"

type TicketConversationProps = {
  ticket: SupportTicket
  messages: TicketMessage[]
  canManage: boolean
}

function getInitials(name: string | null | undefined, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return email.slice(0, 2).toUpperCase()
}

export function TicketConversation({
  ticket,
  messages,
  canManage,
}: TicketConversationProps) {
  const [isPending, startTransition] = useTransition()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !canManage) return

    startTransition(async () => {
      const result = await addTicketMessage(ticket.id, newMessage.trim())
      if (result.success) {
        setNewMessage("")
      } else {
        alert(result.error)
      }
    })
  }

  const isResolved = ticket.status === "resolved" || ticket.status === "closed"

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="text-sm">
          Conversation ({messages.length} message{messages.length > 1 ? "s" : ""})
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Aucun message</p>
          </div>
        ) : (
          messages.map((message) => {
            const isAdmin = message.sender_type === "admin"
            const senderName = isAdmin
              ? message.sender?.full_name || message.sender?.email || "Admin"
              : message.sender?.firstName || message.sender?.email || "Utilisateur"

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  isAdmin ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className={cn(
                    "text-xs",
                    isAdmin ? "bg-primary/10 text-primary" : "bg-muted"
                  )}>
                    {isAdmin ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      getInitials(
                        message.sender?.firstName || message.sender?.full_name,
                        message.sender?.email || ""
                      )
                    )}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "flex flex-col max-w-[70%]",
                    isAdmin ? "items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">{senderName}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      isAdmin
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {canManage && !isResolved && (
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              placeholder="Écrivez votre réponse..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isPending}
              className="min-h-[80px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="h-auto"
              disabled={isPending || !newMessage.trim()}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
          </p>
        </div>
      )}

      {isResolved && (
        <div className="border-t p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            Ce ticket est {ticket.status === "resolved" ? "résolu" : "fermé"}
          </p>
        </div>
      )}
    </Card>
  )
}
