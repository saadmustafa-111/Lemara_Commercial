"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Calendar, Download, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { CommissionChart } from "@/components/commisions/commission-chart"

const commissionStats = [
  {
    title: "Total Earned (YTD)",
    value: "$847,250",
    change: "+18.2%",
    icon: DollarSign,
    description: "Year to date",
  },
  {
    title: "This Month",
    value: "$127,450",
    change: "+12.5%",
    icon: TrendingUp,
    description: "December 2024",
  },
  {
    title: "Pending Commissions",
    value: "$89,750",
    change: "5 deals",
    icon: Clock,
    description: "Awaiting closing",
  },
  {
    title: "Average Deal Size",
    value: "$24,350",
    change: "+8.1%",
    icon: Calendar,
    description: "Last 30 days",
  },
]

const commissionHistory = [
  {
    id: 1,
    dealTitle: "Oceanview Penthouse",
    client: "Sarah Johnson",
    closeDate: "2024-12-10",
    dealValue: 2500000,
    commissionRate: 3.0,
    grossCommission: 75000,
    splits: 7500,
    fees: 2500,
    netCommission: 65000,
    status: "paid",
    paymentDate: "2024-12-12",
  },
  {
    id: 2,
    dealTitle: "Downtown Loft",
    client: "Mike Chen",
    closeDate: "2024-12-08",
    dealValue: 850000,
    commissionRate: 3.0,
    grossCommission: 25500,
    splits: 2550,
    fees: 850,
    netCommission: 22100,
    status: "paid",
    paymentDate: "2024-12-10",
  },
  {
    id: 3,
    dealTitle: "Suburban Home",
    client: "The Smiths",
    closeDate: "2024-12-05",
    dealValue: 650000,
    commissionRate: 3.0,
    grossCommission: 19500,
    splits: 1950,
    fees: 650,
    netCommission: 16900,
    status: "paid",
    paymentDate: "2024-12-07",
  },
  {
    id: 4,
    dealTitle: "Luxury Condo",
    client: "Robert Davis",
    closeDate: "2024-12-15",
    dealValue: 1200000,
    commissionRate: 3.0,
    grossCommission: 36000,
    splits: 3600,
    fees: 1200,
    netCommission: 31200,
    status: "pending",
    paymentDate: null,
  },
  {
    id: 5,
    dealTitle: "Investment Property",
    client: "Lisa Wong",
    closeDate: "2024-12-18",
    dealValue: 450000,
    commissionRate: 3.0,
    grossCommission: 13500,
    splits: 1350,
    fees: 450,
    netCommission: 11700,
    status: "processing",
    paymentDate: null,
  },
]

export function CommissionsView() {
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCommissions = commissionHistory.filter((commission) => {
    const matchesStatus = filterStatus === "all" || commission.status === filterStatus
    // Add period filtering logic here if needed
    return matchesStatus
  })

  const totalPaid = filteredCommissions.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.netCommission, 0)

  const totalPending = filteredCommissions
    .filter((c) => c.status === "pending" || c.status === "processing")
    .reduce((sum, c) => sum + c.netCommission, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      default:
        return <Badge className="bg-blue-100 text-blue-800 border border-blue-200">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Commission Tracking
          </h1>
          <p className="text-muted-foreground">Monitor your earnings and commission history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200">
            <Download className="h-4 w-4 mr-2 text-blue-500" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Statement
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">{commissionStats[0].title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{commissionStats[0].value}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">{commissionStats[0].change}</span>
              <span className="ml-1 text-gray-500">{commissionStats[0].description}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">{commissionStats[1].title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{commissionStats[1].value}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">{commissionStats[1].change}</span>
              <span className="ml-1 text-gray-500">{commissionStats[1].description}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">{commissionStats[2].title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{commissionStats[2].value}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">{commissionStats[2].change}</span>
              <span className="ml-1 text-gray-500">{commissionStats[2].description}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">{commissionStats[3].title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <Calendar className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{commissionStats[3].value}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="font-medium">{commissionStats[3].change}</span>
              <span className="ml-1 text-gray-500">{commissionStats[3].description}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Trends Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">Commission Trends</CardTitle>
          <CardDescription>Monthly commission earnings over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <CommissionChart />
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-blue-800">Commission Summary</CardTitle>
            <CardDescription>Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Gross Commissions</span>
                <span className="font-medium">$142,750</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Splits & Referrals</span>
                <span className="text-red-600">-$14,275</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Brokerage Fees</span>
                <span className="text-red-600">-$4,750</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Transaction Fees</span>
                <span className="text-red-600">-$1,275</span>
              </div>
              <hr className="border-blue-100" />
              <div className="flex justify-between font-medium">
                <span className="text-blue-800">Net Commission</span>
                <span className="text-blue-600">$122,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-blue-800">Goal Progress</CardTitle>
            <CardDescription>Monthly commission target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Current</span>
                <span>$127,450</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Target</span>
                <span>$135,000</span>
              </div>
              <Progress value={94} className="h-2 bg-blue-100">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
              </Progress>
              <div className="flex justify-between text-xs text-blue-600">
                <span className="font-medium">94% complete</span>
                <span>$7,550 remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-blue-800">Payment Status</CardTitle>
            <CardDescription>Commission payment overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Paid</span>
                </div>
                <span className="text-sm font-medium text-blue-600">${totalPaid.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
                <span className="text-sm font-medium text-blue-600">${totalPending.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission History Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-800">Commission History</CardTitle>
              <CardDescription>Detailed breakdown of all commission transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 border-blue-200">
                  <Filter className="h-4 w-4 mr-2 text-blue-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-blue-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="text-blue-800">Deal</TableHead>
                  <TableHead className="text-blue-800">Client</TableHead>
                  <TableHead className="text-blue-800">Close Date</TableHead>
                  <TableHead className="text-blue-800">Deal Value</TableHead>
                  <TableHead className="text-blue-800">Rate</TableHead>
                  <TableHead className="text-blue-800">Gross</TableHead>
                  <TableHead className="text-blue-800">Deductions</TableHead>
                  <TableHead className="text-blue-800">Net Commission</TableHead>
                  <TableHead className="text-blue-800">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id} className="hover:bg-blue-50">
                    <TableCell>
                      <div className="font-medium text-blue-800">{commission.dealTitle}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 bg-blue-100 text-blue-600">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback className="text-xs">
                            {commission.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{commission.client}</span>
                      </div>
                    </TableCell>
                    <TableCell>{commission.closeDate}</TableCell>
                    <TableCell>${commission.dealValue.toLocaleString()}</TableCell>
                    <TableCell>{commission.commissionRate}%</TableCell>
                    <TableCell>${commission.grossCommission.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">
                      -${(commission.splits + commission.fees).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">
                      ${commission.netCommission.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(commission.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


