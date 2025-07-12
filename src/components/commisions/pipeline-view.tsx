"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/index"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  MoreHorizontal,
  X,
  Edit,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const pipelineStages = [
  { id: "leads", title: "New Leads", color: "bg-blue-100/80 text-blue-700" },
  { id: "qualified", title: "Qualified", color: "bg-blue-200/80 text-blue-800" },
  { id: "negotiation", title: "In Negotiation", color: "bg-blue-300/80 text-blue-800" },
  { id: "contract", title: "Under Contract", color: "bg-blue-400/80 text-blue-900" },
  { id: "closing", title: "Closing", color: "bg-blue-500/80 text-white" },
]

const mockDeals = [
  {
    id: 1,
    title: "Oceanview Penthouse",
    client: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    value: 2500000,
    commission: 75000,
    stage: "closing",
    priority: "high",
    daysLeft: 2,
    location: "Miami Beach, FL",
    notes: "High-value client, needs quick closing",
    createdDate: "2024-11-15",
  },
  {
    id: 2,
    title: "Downtown Loft",
    client: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 234-5678",
    value: 850000,
    commission: 25500,
    stage: "contract",
    priority: "medium",
    daysLeft: 7,
    location: "Austin, TX",
    notes: "First-time buyer, needs guidance",
    createdDate: "2024-11-10",
  },
  {
    id: 3,
    title: "Suburban Family Home",
    client: "The Smiths",
    email: "smithfamily@email.com",
    phone: "(555) 345-6789",
    value: 650000,
    commission: 19500,
    stage: "negotiation",
    priority: "medium",
    daysLeft: 14,
    location: "Plano, TX",
    notes: "Family with kids, school district important",
    createdDate: "2024-11-05",
  },
]

export function PipelineView() {
  const [deals, setDeals] = useState(mockDeals)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStage, setFilterStage] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  
  // Reference to dropdown container to handle clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdownId !== null && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdownId])

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = filterStage === "all" || deal.stage === filterStage
    return matchesSearch && matchesStage
  })

  const getDealsByStage = (stageId: string) => {
    return filteredDeals.filter((deal) => deal.stage === stageId)
  }

  const getTotalValue = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0)
  }

  const getTotalCommission = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.commission, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Sales Pipeline</h1>
          <p className="text-muted-foreground">Manage your deals through each stage of the sales process</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Deal
        </Button>
        
        {isAddDialogOpen && (
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <div className="flex items-center justify-between">
                <DialogHeader>
                  <DialogTitle>Add New Deal</DialogTitle>
                  <DialogDescription>Create a new deal in your pipeline. Fill in the details below.</DialogDescription>
                </DialogHeader>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full bg-blue-50/50 border-blue-100 hover:bg-blue-100 hover:border-blue-200" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  <X className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" placeholder="Deal title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input id="client" placeholder="Client name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value
                </Label>
                <Input id="value" placeholder="Deal value" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stage" className="text-right">
                  Stage
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipelineStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" placeholder="Deal notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
              >
                Create Deal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50/50 to-white p-3 rounded-lg shadow-sm border border-blue-100/50 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
          />
        </div>
        <Select value={filterStage} onValueChange={setFilterStage}>
          <SelectTrigger className="w-48 border-blue-100 focus:ring-blue-200 hover:border-blue-200 bg-white">
            <Filter className="h-4 w-4 mr-2 text-blue-500" />
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {pipelineStages.map((stage) => (
              <SelectItem key={stage.id} value={stage.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  stage.id === "leads" ? "bg-blue-400" : 
                  stage.id === "qualified" ? "bg-blue-500" :
                  stage.id === "negotiation" ? "bg-blue-600" : 
                  stage.id === "contract" ? "bg-blue-700" : "bg-blue-800"
                }`}></div>
                {stage.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-6 overflow-x-auto pb-6 px-2">
        {pipelineStages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id)
          const totalValue = getTotalValue(stage.id)
          const totalCommission = getTotalCommission(stage.id)

          return (
            <div key={stage.id} className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50/30 to-white p-3 rounded-lg shadow-md border border-blue-100">                <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      stage.id === "leads" ? "bg-blue-400" : 
                      stage.id === "qualified" ? "bg-blue-500" :
                      stage.id === "negotiation" ? "bg-blue-600" : 
                      stage.id === "contract" ? "bg-blue-700" : "bg-blue-800"
                    }`}></div>
                    <h3 className="font-semibold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">{stage.title}</h3>
                  </div>
                  <Badge variant="light" color="primary" className={`shadow-sm ${stage.color}`}>
                    {stageDeals.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white p-2 rounded shadow-sm border border-slate-100">
                    <div className="text-xs text-gray-500">Total Value</div>
                    <div className="text-sm font-semibold text-gray-900">${totalValue.toLocaleString()}</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white p-2 rounded shadow-sm border border-blue-100">
                    <div className="text-xs text-blue-600">Commission</div>
                    <div className="text-sm font-semibold text-blue-800">${totalCommission.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="cursor-pointer hover:shadow-lg transition-all border-0 rounded-lg overflow-hidden bg-white shadow-sm hover:translate-y-[-2px]">
                    <CardContent className="p-4 pb-2">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium leading-tight text-blue-900">{deal.title}</h4>
                          <div className="relative" ref={openDropdownId === deal.id ? dropdownRef : null}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full bg-slate-50/50 border-slate-100 hover:bg-blue-50 hover:border-blue-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenDropdownId(openDropdownId === deal.id ? null : deal.id)
                              }}
                            >
                              <MoreHorizontal className="h-4 w-4 text-blue-600"  />
                              <span className="sr-only">Open menu</span>
                            </Button>
                            
                            {openDropdownId === deal.id && (
                              <div 
                                className="absolute right-0 mt-1 min-w-[160px] p-1 border-0 shadow-lg rounded-lg bg-white z-50"
                                style={{ zIndex: 999 }}
                              >
                                <button 
                                  className="w-full cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 hover:bg-blue-50"
                                  onClick={() => {
                                    // Add edit action here
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  <div className="p-1 rounded bg-blue-50 text-blue-600">
                                    <Edit className="h-3 w-3" />
                                  </div>
                                  <span>Edit Deal</span>
                                </button>
                                <button 
                                  className="w-full cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 hover:bg-red-50 text-red-600"
                                  onClick={() => {
                                    // Add delete action here
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  <div className="p-1 rounded bg-red-50 text-red-600">
                                    <Trash2 className="h-3 w-3" />
                                  </div>
                                  <span>Delete Deal</span>
                                </button>
                              </div>
                            )}
                          </div>
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
                          <span className="text-sm text-muted-foreground">{deal.client}</span>
                          <Badge
                            variant={deal.priority === "high" ? "solid" : "light"}
                            color={deal.priority === "high" ? "primary" : deal.priority === "medium" ? "info" : "success"}
                            className="text-xs font-medium ml-auto"
                          >
                            {deal.priority}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs text-gray-500 bg-slate-50/70 p-2 rounded-md">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-blue-500" />
                            <span>{deal.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-blue-500" />
                            <span>{deal.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-blue-500" />
                            <span>{deal.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1 text-sm">
                            <div className="p-1 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                              <DollarSign className="h-3 w-3" />
                            </div>
                            <span className="font-semibold text-gray-900">${deal.commission.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3 text-blue-500" />
                            <span className="text-blue-600 font-medium">{deal.daysLeft}d left</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 mt-1">Deal Value: <span className="font-semibold text-gray-700">${deal.value.toLocaleString()}</span></div>

                        {deal.notes && (
                          <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50/70 to-blue-50/20 p-2 rounded-md mt-2 shadow-sm">{deal.notes}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
