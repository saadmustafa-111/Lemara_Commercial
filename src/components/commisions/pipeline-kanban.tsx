"use client"

import { Card, CardContent } from "@/components/ui/card"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, MapPin } from "lucide-react"

const pipelineStages = [
  {
    id: "leads",
    title: "New Leads",
    count: 8,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "qualified",
    title: "Qualified",
    count: 5,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "negotiation",
    title: "In Negotiation",
    count: 4,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "contract",
    title: "Under Contract",
    count: 3,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "closing",
    title: "Closing",
    count: 3,
    color: "bg-green-100 text-green-800",
  },
]

const deals = [
  {
    id: 1,
    title: "Oceanview Penthouse",
    client: "Sarah Johnson",
    value: "$2,500,000",
    commission: "$75,000",
    stage: "closing",
    priority: "high",
    daysLeft: 2,
    location: "Miami Beach, FL",
  },
  {
    id: 2,
    title: "Downtown Loft",
    client: "Mike Chen",
    value: "$850,000",
    commission: "$25,500",
    stage: "contract",
    priority: "medium",
    daysLeft: 7,
    location: "Austin, TX",
  },
  {
    id: 3,
    title: "Suburban Family Home",
    client: "The Smiths",
    value: "$650,000",
    commission: "$19,500",
    stage: "negotiation",
    priority: "medium",
    daysLeft: 14,
    location: "Plano, TX",
  },
  {
    id: 4,
    title: "Luxury Condo",
    client: "Robert Davis",
    value: "$1,200,000",
    commission: "$36,000",
    stage: "qualified",
    priority: "high",
    daysLeft: 21,
    location: "Seattle, WA",
  },
  {
    id: 5,
    title: "Investment Property",
    client: "Lisa Wong",
    value: "$450,000",
    commission: "$13,500",
    stage: "leads",
    priority: "low",
    daysLeft: 30,
    location: "Phoenix, AZ",
  },
]

export function PipelineKanban() {
  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {pipelineStages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-72">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">{stage.title}</h3>
            <Badge variant="light" color="primary" className={stage.color}>
              {stage.count}
            </Badge>
          </div>

          <div className="space-y-3">
            {getDealsByStage(stage.id).map((deal) => (
              <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                      <Badge
                        variant="light"
                        color={deal.priority === "high" ? "error" : deal.priority === "medium" ? "warning" : "success"}
                        className={`text-xs ${
                          deal.priority === "high"
                            ? "border-red-200 text-red-700"
                            : deal.priority === "medium"
                              ? "border-yellow-200 text-yellow-700"
                              : "border-green-200 text-green-700"
                        }`}
                      >
                        {deal.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">
                          {deal.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{deal.client}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{deal.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="font-medium text-green-600">{deal.commission}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{deal.daysLeft}d left</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">Property Value: {deal.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
