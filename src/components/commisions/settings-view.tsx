"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Badge from "@/components/ui/badge/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Building2, CreditCard, Shield, Bell, Crown, Save, Trash2 } from "lucide-react"

const industryOptions = [
  { value: "real-estate", label: "Real Estate" },
  { value: "mortgage", label: "Mortgage Brokerage" },
  { value: "insurance", label: "Insurance" },
  { value: "affiliate", label: "Affiliate Marketing" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Financial Services" },
  { value: "other", label: "Other" },
]

const pipelineTemplates = [
  {
    id: "real-estate",
    name: "Real Estate",
    stages: ["Lead", "Qualified", "Showing", "Offer", "Under Contract", "Closing"],
  },
  {
    id: "mortgage",
    name: "Mortgage",
    stages: ["Application", "Pre-Approval", "Underwriting", "Clear to Close", "Funded"],
  },
  {
    id: "insurance",
    name: "Insurance",
    stages: ["Lead", "Quote", "Application", "Underwriting", "Policy Issued"],
  },
  {
    id: "custom",
    name: "Custom",
    stages: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
  },
]

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: true,
    commissions: true,
    deadlines: true,
  })

  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 ml-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 h-full">
        <TabsList className="grid w-full grid-cols-6 bg-blue-50/50 p-1 rounded-xl">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Profile</TabsTrigger>
          <TabsTrigger value="company" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Company</TabsTrigger>
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Pipeline</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Billing</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <User className="h-5 w-5 text-blue-600" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Senior Real Estate Agent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" defaultValue="RE123456789" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced real estate professional with over 10 years in luxury residential sales."
                />
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Building2 className="h-5 w-5 text-blue-600" />
                Company Information
              </CardTitle>
              <CardDescription>Configure your company details and industry settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Premier Realty Group" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="real-estate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://premierrealty.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Company Phone</Label>
                  <Input id="companyPhone" defaultValue="(555) 987-6543" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Company address..."
                  defaultValue="123 Business Ave, Suite 100, Dallas, TX 75201"
                />
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Commission Structure</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="defaultRate">Default Commission Rate (%)</Label>
                    <Input id="defaultRate" type="number" defaultValue="3.0" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="splitRate">Brokerage Split (%)</Label>
                    <Input id="splitRate" type="number" defaultValue="10" step="0.1" />
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Company Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Settings */}
        <TabsContent value="pipeline" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-blue-800">Pipeline Configuration</CardTitle>
              <CardDescription>Customize your sales pipeline stages and workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Pipeline Template</Label>
                  <Select defaultValue="real-estate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pipelineTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>              <div className="space-y-4">
                <Label className="text-blue-700">Pipeline Stages</Label>
                <div className="space-y-2">
                  {pipelineTemplates[0].stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input defaultValue={stage} className="focus:border-blue-500 focus:ring-blue-500" />
                      <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                        <Trash2 className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">Add Stage</Button>
              </div>
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Automation Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-calculate commissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically calculate commissions when deals are marked as closed
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Send deadline reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming deal deadlines</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Pipeline Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Bell className="h-5 w-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about important events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Notification Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Deal Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about deal status changes</p>
                    </div>
                    <Switch
                      checked={notifications.deals}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, deals: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Commission Payments</Label>
                      <p className="text-sm text-muted-foreground">Notifications about commission payments</p>
                    </div>
                    <Switch
                      checked={notifications.commissions}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, commissions: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Deadline Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders about upcoming deadlines</p>
                    </div>
                    <Switch
                      checked={notifications.deadlines}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, deadlines: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Subscription & Billing
              </CardTitle>
              <CardDescription>Manage your subscription plan and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border-blue-200 border rounded-lg bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <Crown className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-800">Professional Plan</h3>
                    <p className="text-sm text-muted-foreground">Advanced features for growing teams</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">$49</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Basic</CardTitle>
                    <div className="text-2xl font-bold">
                      $19<span className="text-sm font-normal">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="text-sm space-y-1">
                      <li>• 1 User</li>
                      <li>• 50 Active Deals</li>
                      <li>• Basic Pipeline</li>
                      <li>• Email Support</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      Current Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-white">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg text-blue-800">Professional</CardTitle>
                    <div className="text-2xl font-bold text-blue-700">
                      $49<span className="text-sm font-normal">/mo</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border border-blue-200">Most Popular</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="text-sm space-y-1">
                      <li>• 5 Users</li>
                      <li>• Unlimited Deals</li>
                      <li>• Advanced Analytics</li>
                      <li>• Priority Support</li>
                      <li>• Custom Pipeline</li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Upgrade</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Enterprise</CardTitle>
                    <div className="text-2xl font-bold">
                      $99<span className="text-sm font-normal">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="text-sm space-y-1">
                      <li>• Unlimited Users</li>
                      <li>• White Labeling</li>
                      <li>• SSO Integration</li>
                      <li>• Dedicated Support</li>
                      <li>• API Access</li>
                    </ul>
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 border-blue-200 border rounded-lg bg-gradient-to-br from-blue-50 to-white">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">Update</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Billing History</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">December 2024</p>
                      <p className="text-sm text-muted-foreground">Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.00</p>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">November 2024</p>
                      <p className="text-sm text-muted-foreground">Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.00</p>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6 h-full overflow-y-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Update Password</Button>
                </div>
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 border-blue-200 border rounded-lg bg-gradient-to-br from-blue-50 to-white">
                  <div>
                    <p className="font-medium text-blue-800">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">Manage 2FA</Button>
              </div>

              <Separator className="border-blue-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Active Sessions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on macOS • Dallas, TX</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iPhone • Last seen 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                <div className="p-4 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

