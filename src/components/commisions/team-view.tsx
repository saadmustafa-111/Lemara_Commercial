"use client"

import { useState, useEffect, useRef, SyntheticEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Target,
  DollarSign,
  Award,
  Settings,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Agent",
    email: "john.doe@company.com",
    phone: "(555) 123-4567",
    location: "Dallas, TX",
    avatar: "/images/user/user-01.jpg",
    status: "active",
    deals: 35,
    commission: 127450,
    target: 135000,
    growth: 18.5,
    joinDate: "2022-01-15",
    specialties: ["Luxury Homes", "Commercial"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Agent",
    email: "sarah.j@company.com",
    phone: "(555) 234-5678",
    location: "Austin, TX",
    avatar: "/images/user/user-02.jpg",
    status: "active",
    deals: 28,
    commission: 98750,
    target: 100000,
    growth: 12.3,
    joinDate: "2022-03-20",
    specialties: ["First-Time Buyers", "Condos"],
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Agent",
    email: "mike.chen@company.com",
    phone: "(555) 345-6789",
    location: "Houston, TX",
    avatar: "/images/user/user-03.jpg",
    status: "active",
    deals: 24,
    commission: 87200,
    target: 90000,
    growth: 15.7,
    joinDate: "2022-06-10",
    specialties: ["Investment Properties", "Rentals"],
  },
  {
    id: 4,
    name: "Lisa Wong",
    role: "Junior Agent",
    email: "lisa.wong@company.com",
    phone: "(555) 456-7890",
    location: "San Antonio, TX",
    avatar: "/images/user/user-04.jpg",
    status: "active",
    deals: 22,
    commission: 79800,
    target: 85000,
    growth: 8.9,
    joinDate: "2023-01-05",
    specialties: ["Suburban Homes", "New Construction"],
  },
  {
    id: 5,
    name: "David Park",
    role: "Agent",
    email: "david.park@company.com",
    phone: "(555) 567-8901",
    location: "Fort Worth, TX",
    avatar: "/images/user/user-05.jpg",
    status: "inactive",
    deals: 18,
    commission: 65400,
    target: 75000,
    growth: -2.1,
    joinDate: "2021-09-15",
    specialties: ["Luxury Condos", "Downtown"],
  },
]

const teamStats = [
  {
    title: "Total Team Members",
    value: "5",
    change: "+1 this month",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Team Commission",
    value: "$458,600",
    change: "+14.2% vs last month",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Active Deals",
    value: "127",
    change: "+8 this week",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    title: "Avg Performance",
    value: "94%",
    change: "of monthly targets",
    icon: TrendingUp,
    color: "bg-orange-500",
  },
]

export function TeamView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  
  const toggleDropdown = (id: number) => {
    setOpenDropdownId(prevId => prevId === id ? null : id)
  }
  
  // Handle image errors
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    // Instead of hiding the image, we'll just mark it as failed
    // so the AvatarFallback will show
    e.currentTarget.style.display = 'none';
    console.log('Image failed to load:', e.currentTarget.src);
  };
  
  // Handle click outside to close dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if we have an open dropdown and clicked outside of dropdown ref element
      if (openDropdownId !== null && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || member.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-muted-foreground">Manage your team members and track their performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Team Settings
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {teamStats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 h-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Team Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Performance
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Goals & Targets
          </TabsTrigger>
        </TabsList>

        {/* Team Overview */}
        <TabsContent value="overview" className="space-y-6 h-full overflow-y-auto">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-blue-200 focus:border-blue-500"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 border-blue-200">
                <Filter className="h-4 w-4 mr-2 text-blue-500" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Members Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-200">
                      <AvatarImage 
                        src={member.avatar} 
                        alt={member.name}
                        onError={handleImageError}
                      />
                      <AvatarFallback className="bg-blue-500 text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <div className="relative" ref={dropdownRef}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => toggleDropdown(member.id)}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                              
                              {openDropdownId === member.id && (
                                <div 
                                  className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                >
                                  <div className="py-1" role="menu" aria-orientation="vertical">
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                      onClick={() => setOpenDropdownId(null)}
                                    >
                                      View Profile
                                    </button>
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                      onClick={() => setOpenDropdownId(null)}
                                    >
                                      Edit Member
                                    </button>
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                      onClick={() => setOpenDropdownId(null)}
                                    >
                                      Send Message
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                      <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                      <Badge
                        className={
                          member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{member.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Performance</span>
                      <span className="font-medium">{Math.round((member.commission / member.target) * 100)}%</span>
                    </div>
                    <Progress value={(member.commission / member.target) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{member.deals}</p>
                      <p className="text-xs text-gray-600">Deals</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">${(member.commission / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-600">Commission</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-800">Team Performance Leaderboard</CardTitle>
              <CardDescription>Ranking based on commission earnings and deal volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers
                  .sort((a, b) => b.commission - a.commission)
                  .map((member, index) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100"
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                            : index === 1
                              ? "bg-gradient-to-r from-gray-400 to-gray-500"
                              : index === 2
                                ? "bg-gradient-to-r from-orange-400 to-orange-500"
                                : "bg-gradient-to-r from-blue-400 to-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={member.avatar} 
                          alt={member.name}
                          onError={handleImageError}
                        />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <Badge
                            className={member.growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {member.growth > 0 ? "+" : ""}
                            {member.growth}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{member.deals} deals</span>
                          <span className="font-medium text-blue-600">${member.commission.toLocaleString()}</span>
                          <span>Target: ${member.target.toLocaleString()}</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={(member.commission / member.target) * 100} className="h-2" />
                        </div>
                      </div>
                      {index < 3 && (
                        <Award
                          className={`h-6 w-6 ${
                            index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-500" : "text-orange-500"
                          }`}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals & Targets Tab */}
        <TabsContent value="goals" className="space-y-6 h-full overflow-y-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800">Team Goals</CardTitle>
                <CardDescription>Overall team targets and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Commission Target</span>
                    <span className="font-medium">$458,600 / $485,000</span>
                  </div>
                  <Progress value={94.6} className="h-3" />
                  <p className="text-xs text-gray-600">94.6% of monthly target achieved</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Deals Target</span>
                    <span className="font-medium">127 / 140</span>
                  </div>
                  <Progress value={90.7} className="h-3" />
                  <p className="text-xs text-gray-600">90.7% of deal target achieved</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Growth Target</span>
                    <span className="font-medium">14.2% / 15%</span>
                  </div>
                  <Progress value={94.7} className="h-3" />
                  <p className="text-xs text-gray-600">94.7% of growth target achieved</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800">Individual Targets</CardTitle>
                <CardDescription>Progress towards personal goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.slice(0, 4).map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={member.avatar} 
                          alt={member.name}
                          onError={handleImageError}
                        />
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-gray-600">
                            {Math.round((member.commission / member.target) * 100)}%
                          </span>
                        </div>
                        <Progress value={(member.commission / member.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


