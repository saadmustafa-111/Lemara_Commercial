"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Badge from "@/components/ui/badge/Badge"
import Button from "@/components/ui/button/Button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Calendar,
  AlertCircle,
  Plus,
  Eye,
} from "lucide-react"
import { PipelineKanban } from "@/components/commisions/pipeline-kanban"
import { CommissionChart } from "@/components/commisions/commission-chart"
import { RecentDeals } from "@/components/commisions/recent-deals"

const stats = [
  {
    title: "Total Commissions",
    value: "$127,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Active Deals",
    value: "23",
    change: "+3",
    trend: "up",
    icon: Target,
    description: "In pipeline",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    title: "Conversion Rate",
    value: "68%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    description: "Last 30 days",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    title: "Team Performance",
    value: "94%",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    description: "Of monthly goal",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
]

const upcomingDeadlines = [
  {
    title: "Contract Signing",
    client: "Oceanview Penthouse",
    date: "Today, 2:00 PM",
    priority: "high",
    commission: "$15,000",
  },
  {
    title: "Inspection Due",
    client: "Downtown Loft",
    date: "Tomorrow, 10:00 AM",
    priority: "medium",
    commission: "$8,500",
  },
  {
    title: "Closing Date",
    client: "Suburban Home",
    date: "Dec 15, 2024",
    priority: "low",
    commission: "$6,200",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-5 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your commission overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 ${stat.bgColor} opacity-5`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pipeline Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <CardDescription>Track your deals through each stage</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PipelineKanban />
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Important dates requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      deadline.priority === "high"
                        ? "bg-red-500"
                        : deadline.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{deadline.title}</p>
                      <Badge variant="light" color="primary" className="text-xs">
                        {deadline.commission}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{deadline.client}</p>
                    <p className="text-xs text-muted-foreground">{deadline.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Commission Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Commission Trends</CardTitle>
            <CardDescription>Monthly commission earnings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <CommissionChart />
          </CardContent>
        </Card>

        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
            <CardDescription>Latest closed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDeals />
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goal Progress</CardTitle>
          <CardDescription>Track your progress towards monthly commission targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Commission Goal</span>
              <span className="text-sm text-muted-foreground">$127,450 / $135,000</span>
            </div>
            <Progress value={94} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>94% complete</span>
              <span>$7,550 remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

