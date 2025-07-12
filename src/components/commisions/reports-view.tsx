"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import Badge from "@/components/ui/badge/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  FileText,
  Download,
  CalendarIcon,
  Filter,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  BarChart3,
  PieChart,
  Mail,
  Printer,
} from "lucide-react"
import { format } from "date-fns"

const reportTemplates = [
  {
    id: "commission-summary",
    title: "Commission Summary",
    description: "Detailed breakdown of commission earnings",
    icon: DollarSign,
    color: "bg-blue-500",
    frequency: "Monthly",
  },
  {
    id: "sales-performance",
    title: "Sales Performance",
    description: "Analysis of sales metrics and KPIs",
    icon: TrendingUp,
    color: "bg-green-500",
    frequency: "Weekly",
  },
  {
    id: "pipeline-report",
    title: "Pipeline Report",
    description: "Current pipeline status and forecasting",
    icon: Target,
    color: "bg-purple-500",
    frequency: "Daily",
  },
  {
    id: "team-performance",
    title: "Team Performance",
    description: "Team-wide performance metrics",
    icon: Users,
    color: "bg-orange-500",
    frequency: "Monthly",
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    description: "Market trends and competitive analysis",
    icon: BarChart3,
    color: "bg-indigo-500",
    frequency: "Quarterly",
  },
  {
    id: "client-report",
    title: "Client Report",
    description: "Client satisfaction and retention metrics",
    icon: PieChart,
    color: "bg-pink-500",
    frequency: "Monthly",
  },
]

const recentReports = [
  {
    id: 1,
    title: "December Commission Summary",
    type: "Commission Summary",
    generatedDate: "2024-12-15",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Q4 Sales Performance",
    type: "Sales Performance",
    generatedDate: "2024-12-10",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Weekly Pipeline Report",
    type: "Pipeline Report",
    generatedDate: "2024-12-08",
    status: "completed",
    size: "956 KB",
  },
  {
    id: 4,
    title: "Team Performance - November",
    type: "Team Performance",
    generatedDate: "2024-12-01",
    status: "processing",
    size: "Processing...",
  },
]

export function ReportsView() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("templates")

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Generate comprehensive reports and export your data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 h-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-50">
          <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Report Templates
          </TabsTrigger>
          <TabsTrigger value="custom" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Custom Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Report History
          </TabsTrigger>
        </TabsList>

        {/* Report Templates */}
        <TabsContent value="templates" className="space-y-6 h-full overflow-y-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-lg ${template.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <template.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{template.title}</CardTitle>
                      <Badge variant="light" color="primary" className="mt-1 text-xs">
                        {template.frequency}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600">{template.description}</CardDescription>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Custom Reports */}
        <TabsContent value="custom" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-800">Create Custom Report</CardTitle>
              <CardDescription>Build a personalized report with your specific requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    placeholder="Enter report name"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commission">Commission Analysis</SelectItem>
                      <SelectItem value="sales">Sales Performance</SelectItem>
                      <SelectItem value="pipeline">Pipeline Analysis</SelectItem>
                      <SelectItem value="team">Team Performance</SelectItem>
                      <SelectItem value="market">Market Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 justify-start text-left font-normal border-blue-200 bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Include Sections</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Executive Summary",
                    "Commission Breakdown",
                    "Deal Analysis",
                    "Performance Metrics",
                    "Market Trends",
                    "Team Comparison",
                    "Client Insights",
                    "Forecasting",
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={section}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor={section} className="text-sm font-medium">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                  Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report History */}
        <TabsContent value="history" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-blue-800">Recent Reports</CardTitle>
                  <CardDescription>Download or view your previously generated reports</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 border-blue-200">
                      <Filter className="h-4 w-4 mr-2 text-blue-500" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="pipeline">Pipeline</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{report.type}</span>
                        <span>Generated: {report.generatedDate}</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          report.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {report.status}
                      </Badge>
                      {report.status === "completed" && (
                        <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


