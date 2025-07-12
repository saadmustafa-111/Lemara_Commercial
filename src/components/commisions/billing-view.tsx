"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/ui/button/Button"
import Badge from "@/components/ui/badge/Badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Crown, Download, Calendar, Check, X, Star, Zap, Shield, Users, Settings } from "lucide-react"

const currentPlan = {
  name: "Professional",
  price: 49,
  billing: "monthly",
  features: [
    "5 Team Members",
    "Unlimited Deals",
    "Advanced Analytics",
    "Priority Support",
    "Custom Pipeline",
    "Commission Tracking",
    "Report Generation",
    "Email Integration",
  ],
  usage: {
    users: { current: 3, limit: 5 },
    deals: { current: 127, limit: "Unlimited" },
    storage: { current: 2.4, limit: 10 },
  },
}

const plans = [
  {
    name: "Basic",
    price: 19,
    description: "Perfect for individual agents",
    icon: Star,
    color: "from-gray-500 to-gray-600",
    features: [
      "1 User Account",
      "50 Active Deals",
      "Basic Pipeline",
      "Email Support",
      "Standard Reports",
      "Mobile App Access",
    ],
    limitations: ["Limited integrations", "Basic analytics only", "No team features"],
  },
  {
    name: "Professional",
    price: 49,
    description: "Best for growing teams",
    icon: Crown,
    color: "from-blue-500 to-blue-600",
    popular: true,
    features: [
      "5 Team Members",
      "Unlimited Deals",
      "Advanced Analytics",
      "Priority Support",
      "Custom Pipeline",
      "Commission Tracking",
      "Advanced Reports",
      "API Access",
      "Email Integration",
      "Calendar Sync",
    ],
    limitations: [],
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    features: [
      "Unlimited Users",
      "White Label Option",
      "SSO Integration",
      "Dedicated Support",
      "Custom Development",
      "Advanced Security",
      "Data Export",
      "Custom Integrations",
      "Training & Onboarding",
      "SLA Guarantee",
    ],
    limitations: [],
  },
]

const billingHistory = [
  {
    id: 1,
    date: "2024-12-01",
    description: "Professional Plan - December 2024",
    amount: 49.0,
    status: "paid",
    invoice: "INV-2024-12-001",
  },
  {
    id: 2,
    date: "2024-11-01",
    description: "Professional Plan - November 2024",
    amount: 49.0,
    status: "paid",
    invoice: "INV-2024-11-001",
  },
  {
    id: 3,
    date: "2024-10-01",
    description: "Professional Plan - October 2024",
    amount: 49.0,
    status: "paid",
    invoice: "INV-2024-10-001",
  },
  {
    id: 4,
    date: "2024-09-01",
    description: "Basic Plan - September 2024",
    amount: 19.0,
    status: "paid",
    invoice: "INV-2024-09-001",
  },
]

export function BillingView() {
  return (
    <div className="space-y-6 ml-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">Manage your subscription plan and billing information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Billing Settings
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Crown className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-blue-800">Current Plan: {currentPlan.name}</CardTitle>
                <CardDescription>
                  ${currentPlan.price}/{currentPlan.billing} • Next billing: January 1, 2025
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 px-3 py-1">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Usage Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Team Members</span>
                <span className="font-medium">
                  {currentPlan.usage.users.current} / {currentPlan.usage.users.limit}
                </span>
              </div>
              <Progress
                value={(currentPlan.usage.users.current / currentPlan.usage.users.limit) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Deals</span>
                <span className="font-medium">
                  {currentPlan.usage.deals.current} / {currentPlan.usage.deals.limit}
                </span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-medium">
                  {currentPlan.usage.storage.current}GB / {currentPlan.usage.storage.limit}GB
                </span>
              </div>
              <Progress
                value={(currentPlan.usage.storage.current / currentPlan.usage.storage.limit) * 100}
                className="h-2"
              />
            </div>
          </div>

          {/* Current Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Included Features</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {currentPlan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Available Plans</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto p-3 rounded-lg bg-gradient-to-br ${plan.color} text-white w-fit`}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-gray-900">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full ${
                    plan.name === currentPlan.name
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                  }`}
                  disabled={plan.name === currentPlan.name}
                >
                  {plan.name === currentPlan.name ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50/50">
            <div className="p-2 rounded bg-white">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2025 • Visa</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Primary</Badge>
            <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 bg-transparent">
              Update
            </Button>
          </div>
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Calendar className="h-5 w-5" />
                Billing History
              </CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </div>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{invoice.description}</p>
                  <p className="text-sm text-gray-600">
                    {invoice.date} • {invoice.invoice}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${invoice.amount.toFixed(2)}</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">{invoice.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Next Billing</CardTitle>
            <CardDescription>Your next charge details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Professional Plan</span>
              <span className="font-medium">$49.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8.25%)</span>
              <span className="font-medium">$4.04</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$53.04</span>
            </div>
            <p className="text-sm text-gray-600">Your card will be charged on January 1, 2025</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800">Account Security</CardTitle>
            <CardDescription>Billing security features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Secure Payments</p>
                <p className="text-sm text-gray-600">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">PCI Compliant</p>
                <p className="text-sm text-gray-600">Industry standard security</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">24/7 Support</p>
                <p className="text-sm text-gray-600">Billing assistance available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

