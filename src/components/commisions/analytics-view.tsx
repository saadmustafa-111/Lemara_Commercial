"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Badge from "@/components/ui/badge/Badge"
import Button from "@/components/ui/button/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Target, Download, Filter, DollarSign, Clock, Award } from "lucide-react"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const performanceData = [
  { month: "Jan", deals: 12, commission: 45000, target: 50000 },
  { month: "Feb", deals: 15, commission: 52000, target: 50000 },
  { month: "Mar", deals: 13, commission: 48000, target: 50000 },
  { month: "Apr", deals: 18, commission: 61000, target: 55000 },
  { month: "May", deals: 16, commission: 55000, target: 55000 },
  { month: "Jun", deals: 20, commission: 67000, target: 60000 },
  { month: "Jul", deals: 22, commission: 71000, target: 60000 },
  { month: "Aug", deals: 21, commission: 69000, target: 60000 },
  { month: "Sep", deals: 24, commission: 78000, target: 65000 },
  { month: "Oct", deals: 26, commission: 82000, target: 65000 },
  { month: "Nov", deals: 28, commission: 89000, target: 70000 },
  { month: "Dec", deals: 35, commission: 127450, target: 75000 },
]

const dealTypeData = [
  { name: "Listings", value: 45, color: "#3b82f6" },
  { name: "Buyer Representation", value: 35, color: "#10b981" },
  { name: "Referrals", value: 15, color: "#f59e0b" },
  { name: "Rentals", value: 5, color: "#ef4444" },
]

const conversionData = [
  { stage: "Leads", count: 150, conversion: 100 },
  { stage: "Qualified", count: 120, conversion: 80 },
  { stage: "Showing", count: 85, conversion: 57 },
  { stage: "Offer", count: 45, conversion: 30 },
  { stage: "Contract", count: 35, conversion: 23 },
  { stage: "Closed", count: 28, conversion: 19 },
]

const topPerformers = [
  { name: "John Doe", deals: 35, commission: 127450, growth: 18.5 },
  { name: "Sarah Johnson", deals: 28, commission: 98750, growth: 12.3 },
  { name: "Mike Chen", deals: 24, commission: 87200, growth: 15.7 },
  { name: "Lisa Wong", deals: 22, commission: 79800, growth: 8.9 },
]

export function AnalyticsView() {
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">Comprehensive insights into your sales performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="12months">
            <SelectTrigger className="w-40 border-blue-200">
              <Filter className="h-4 w-4 mr-2 text-blue-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">YTD Commission</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$847,250</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">+18.2% vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">Total Deals</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <Target className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">289</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">+15.3% vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">Avg Deal Size</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <BarChart3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$24,350</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">+8.1% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">Avg Close Time</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">32 days</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">-5 days improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Performance Trends</CardTitle>
            <CardDescription>Monthly commission vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="commission" fill="#3b82f6" name="Commission" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deal Type Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Deal Type Distribution</CardTitle>
            <CardDescription>Breakdown by transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dealTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Sales Conversion Funnel</CardTitle>
          <CardDescription>Track leads through each stage of your pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionData.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{stage.count} leads</span>
                    <Badge className="bg-blue-100 text-blue-800">{stage.conversion}%</Badge>
                  </div>
                </div>
                <Progress value={stage.conversion} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Award className="h-5 w-5" />
            Top Performers
          </CardTitle>
          <CardDescription>Leading agents by commission and deal volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={performer.name}
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{performer.name}</h3>
                    <Badge className="bg-green-100 text-green-800">+{performer.growth}%</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{performer.deals} deals</span>
                    <span className="font-medium text-blue-600">${performer.commission.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
