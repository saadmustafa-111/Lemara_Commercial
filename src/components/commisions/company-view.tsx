"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Target,
  DollarSign,
  Settings,
  Save,
  Upload,
  Shield,
  Award,
} from "lucide-react"

const companyInfo = {
  name: "Premier Realty Group",
  industry: "Real Estate",
  founded: "2018",
  employees: 25,
  website: "https://premierrealty.com",
  phone: "(555) 987-6543",
  email: "info@premierrealty.com",
  address: "123 Business Ave, Suite 100\nDallas, TX 75201",
  description:
    "Leading real estate brokerage specializing in luxury residential and commercial properties across Texas.",
  logo: "/placeholder.svg?height=80&width=80",
}

const companyStats = [
  {
    title: "Total Agents",
    value: "25",
    change: "+3 this quarter",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "YTD Revenue",
    value: "$2.1M",
    change: "+18.5% vs last year",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Active Listings",
    value: "147",
    change: "+12 this month",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    title: "Market Share",
    value: "12.3%",
    change: "+2.1% growth",
    icon: Award,
    color: "bg-orange-500",
  },
]

const departments = [
  {
    name: "Sales Team",
    head: "Sarah Johnson",
    members: 15,
    performance: 94,
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Marketing",
    head: "Mike Chen",
    members: 4,
    performance: 87,
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Operations",
    head: "Lisa Wong",
    members: 3,
    performance: 91,
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Administration",
    head: "David Park",
    members: 3,
    performance: 89,
    color: "bg-orange-100 text-orange-800",
  },
]

export function CompanyView() {
  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Company Profile
          </h1>
          <p className="text-muted-foreground">Manage your company information and settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Company Settings
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {companyStats.map((stat) => (
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

      <Tabs defaultValue="profile" className="space-y-6 h-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Company Profile
          </TabsTrigger>
          <TabsTrigger value="departments" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Departments
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Settings
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Company Profile */}
        <TabsContent value="profile" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Update your company details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 rounded-lg">
                  <AvatarImage src={companyInfo.logo || "/placeholder.svg"} className="object-cover" />
                  <AvatarFallback className="bg-blue-500 text-white text-xl font-bold rounded-lg">
                    {companyInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-gray-600">PNG, JPG up to 2MB. Recommended: 200x200px</p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    defaultValue={companyInfo.name}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue={companyInfo.industry.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="mortgage">Mortgage Brokerage</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="sales">Sales & Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    defaultValue={companyInfo.founded}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    defaultValue={companyInfo.employees}
                    type="number"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                    <Input
                      id="website"
                      defaultValue={companyInfo.website}
                      className="pl-9 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                    <Input
                      id="phone"
                      defaultValue={companyInfo.phone}
                      className="pl-9 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                    <Input
                      id="email"
                      defaultValue={companyInfo.email}
                      className="pl-9 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                  <Textarea
                    id="address"
                    defaultValue={companyInfo.address}
                    className="pl-9 border-blue-200 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  defaultValue={companyInfo.description}
                  className="border-blue-200 focus:border-blue-500"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="h-5 w-5" />
                Department Overview
              </CardTitle>
              <CardDescription>Manage your company departments and team structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {departments.map((dept) => (
                  <Card key={dept.name} className="border border-blue-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">{dept.name}</CardTitle>
                        <Badge className={dept.color}>{dept.performance}%</Badge>
                      </div>
                      <CardDescription>Led by {dept.head}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Team Members</span>
                        <span className="font-medium">{dept.members}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Performance</span>
                        <span className="font-medium">{dept.performance}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-blue-200 hover:bg-blue-50 bg-transparent"
                        >
                          View Team
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Settings className="h-5 w-5" />
                Company Settings
              </CardTitle>
              <CardDescription>Configure company-wide preferences and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable team collaboration</Label>
                      <p className="text-sm text-gray-600">Allow team members to share deals and collaborate</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic commission calculation</Label>
                      <p className="text-sm text-gray-600">Calculate commissions automatically when deals close</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email notifications</Label>
                      <p className="text-sm text-gray-600">Send email updates for important events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Commission Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCommission">Default Commission Rate (%)</Label>
                    <Input
                      id="defaultCommission"
                      defaultValue="3.0"
                      type="number"
                      step="0.1"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brokerageSplit">Brokerage Split (%)</Label>
                    <Input
                      id="brokerageSplit"
                      defaultValue="10"
                      type="number"
                      step="0.1"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionFee">Transaction Fee ($)</Label>
                    <Input
                      id="transactionFee"
                      defaultValue="299"
                      type="number"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referralFee">Referral Fee (%)</Label>
                    <Input
                      id="referralFee"
                      defaultValue="25"
                      type="number"
                      step="0.1"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="h-5 w-5" />
                Compliance & Security
              </CardTitle>
              <CardDescription>Manage compliance requirements and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Licenses & Certifications</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="brokerageLicense">Brokerage License</Label>
                    <Input
                      id="brokerageLicense"
                      defaultValue="TX-BRK-123456"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                    <Input
                      id="licenseExpiry"
                      type="date"
                      defaultValue="2025-12-31"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurancePolicy">E&O Insurance Policy</Label>
                    <Input
                      id="insurancePolicy"
                      defaultValue="POL-789012"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                    <Input
                      id="insuranceExpiry"
                      type="date"
                      defaultValue="2025-06-30"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Security Compliance</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Data Encryption</p>
                      <p className="text-sm text-green-700">All data encrypted with AES-256</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Active</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">GDPR Compliance</p>
                      <p className="text-sm text-green-700">Data protection regulations compliant</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Compliant</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">SOC 2 Type II</p>
                      <p className="text-sm text-green-700">Security controls audited and certified</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Certified</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

