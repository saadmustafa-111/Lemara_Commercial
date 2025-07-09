"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Badge from "@/components/ui/badge/Badge"
import { CheckCircle, Clock, DollarSign } from "lucide-react"

const recentDeals = [
  {
    id: 1,
    title: "Sunset Villa",
    client: "Emma Thompson",
    status: "closed",
    commission: 12500,
    closedDate: "2 days ago",
    type: "Listing",
  },
  {
    id: 2,
    title: "Modern Townhouse",
    client: "David Park",
    status: "closed",
    commission: 8750,
    closedDate: "5 days ago",
    type: "Buyer",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    client: "Maria Garcia",
    status: "closed",
    commission: 15200,
    closedDate: "1 week ago",
    type: "Listing",
  },
  {
    id: 4,
    title: "Historic Home",
    client: "James Wilson",
    status: "pending",
    commission: 9800,
    closedDate: "Closing soon",
    type: "Buyer",
  },
]

export function RecentDeals() {
  return (
    <div className="space-y-4">
      {recentDeals.map((deal) => (
        <div key={deal.id} className="flex items-center gap-4 p-3 rounded-lg border">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>
              {deal.client
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{deal.title}</p>
              <div className="flex items-center gap-1">
                {deal.status === "closed" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-600" />
                )}
                <Badge variant={deal.status === "closed" ? "solid" : "light"} color="success">{deal.status}</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{deal.client}</span>
                <Badge variant="light" color="primary" className="text-xs">
                  {deal.type}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-green-600" />
                <span className="text-sm font-medium text-green-600">${deal.commission.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{deal.closedDate}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
