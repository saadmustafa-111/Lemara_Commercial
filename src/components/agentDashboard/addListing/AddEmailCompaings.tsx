"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Self-contained UI components
const Button = ({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({
  id,
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
}: {
  id?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  type?: string
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
    />
  )
}

const Label = ({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}

const Switch = ({
  id,
  checked,
  onCheckedChange,
}: {
  id?: string
  checked: boolean
  onCheckedChange: () => void
}) => {
  return (
    <div
      onClick={onCheckedChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${checked ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  )
}

const Textarea = ({
  id,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  id?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
}) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
    />
  )
}

// Types
type CampaignData = {
  title: string
  properties: string[]
  design: {
    template: string
    primaryButtonColor: string
    secondaryButtonColor: string
  }
  broker: string
  emailSettings: {
    subject: string
    emailTitle: string
    senderName: string
    replyToEmail: string
    message: string
    disclaimer: string
  }
  recipients: {
    type: "list" | "emails" | "upload"
    emailList?: string
    emails?: string
    uploadedList?: File | null
    sendCopyTo?: string
    storeEmailList?: boolean
  }
}

// Main Component
export default function AddEmailCompaings() {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: "",
    properties: [],
    design: {
      template: "lemara",
      primaryButtonColor: "#3b82f6",
      secondaryButtonColor: "#6b7280",
    },
    broker: "",
    emailSettings: {
      subject: "",
      emailTitle: "",
      senderName: "",
      replyToEmail: "",
      message: "",
      disclaimer: "",
    },
    recipients: {
      type: "list",
      storeEmailList: false,
    },
  })

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const updateCampaignData = (data: Partial<CampaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    console.log("Campaign data submitted:", campaignData)
    // Here you would typically send the data to your API
    alert("Campaign created successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden border border-gray-100">
      {/* Progress indicator */}
      <div className="px-8 pt-8 pb-4 bg-gradient-to-r  from-blue-50 to-indigo-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Email Campaign</h1>
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === currentStep
                    ? "bg-blue-600 text-white shadow-md"
                    : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {step < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className={`text-xs mt-2 font-medium ${step === currentStep ? "text-blue-600" : "text-gray-500"}`}>
                {step === 1
                  ? "Title"
                  : step === 2
                    ? "Properties"
                    : step === 3
                      ? "Design"
                      : step === 4
                        ? "Broker"
                        : step === 5
                          ? "Settings"
                          : "Recipients"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form steps */}
      <div className="p-8">
        {currentStep === 1 && (
          <CampaignTitle
            title={campaignData.title}
            onUpdate={(title) => updateCampaignData({ title })}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <PropertiesSelection
            selectedProperties={campaignData.properties}
            onUpdate={(properties) => updateCampaignData({ properties })}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <DesignSelection
            design={campaignData.design}
            onUpdate={(design) => updateCampaignData({ design: { ...campaignData.design, ...design } })}
            onNext={handleNext}
          />
        )}

        {currentStep === 4 && (
          <BrokerSelection
            selectedBroker={campaignData.broker}
            onUpdate={(broker) => updateCampaignData({ broker })}
            onNext={handleNext}
          />
        )}

        {currentStep === 5 && (
          <EmailSettings
            settings={campaignData.emailSettings}
            onUpdate={(emailSettings) =>
              updateCampaignData({
                emailSettings: { ...campaignData.emailSettings, ...emailSettings },
              })
            }
            onNext={handleNext}
          />
        )}

        {currentStep === 6 && (
          <Recipients
            recipientData={campaignData.recipients}
            onUpdate={(recipients) =>
              updateCampaignData({
                recipients: { ...campaignData.recipients, ...recipients },
              })
            }
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

// Step 1: Campaign Title Component
interface CampaignTitleProps {
  title: string
  onUpdate: (title: string) => void
  onNext: () => void
}

function CampaignTitle({ title, onUpdate, onNext }: CampaignTitleProps) {
  const [error, setError] = useState("")

  const handleNext = () => {
    if (!title.trim()) {
      setError("Please enter a campaign title")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-4">Campaign Title</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm ">
          <div className="space-y-4">
            <Label htmlFor="campaign-title" className="text-base">
              Enter Campaign Title
            </Label>
            <Input
              id="campaign-title"
              value={title}
              onChange={(e) => {
                onUpdate(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              placeholder="Enter a descriptive title for your campaign"
              className={`text-base py-3 ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!title.trim()}
          className={`px-6 py-2.5 text-base ${!title.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Step 2: Properties Selection Component
interface Property {
  id: string
  name: string
  selected: boolean
}

interface PropertiesSelectionProps {
  selectedProperties: string[]
  onUpdate: (properties: string[]) => void
  onNext: () => void
}

function PropertiesSelection({ selectedProperties, onUpdate, onNext }: PropertiesSelectionProps) {
  const [error, setError] = useState("")

  // Mock properties data
  const [properties, setProperties] = useState<Property[]>([
    { id: "prop1", name: "Luxury Villa", selected: selectedProperties.includes("prop1") },
    { id: "prop2", name: "Downtown Apartment", selected: selectedProperties.includes("prop2") },
    { id: "prop3", name: "Beachfront Condo", selected: selectedProperties.includes("prop3") },
    { id: "prop4", name: "Mountain Retreat", selected: selectedProperties.includes("prop4") },
    { id: "prop5", name: "Suburban Home", selected: selectedProperties.includes("prop5") },
  ])

  const toggleProperty = (id: string) => {
    const updatedProperties = properties.map((prop) => (prop.id === id ? { ...prop, selected: !prop.selected } : prop))
    setProperties(updatedProperties)

    const selectedIds = updatedProperties.filter((prop) => prop.selected).map((prop) => prop.id)
    onUpdate(selectedIds)

    if (selectedIds.length > 0) {
      setError("")
    }
  }

  const handleNext = () => {
    const selected = properties.filter((prop) => prop.selected)
    if (selected.length === 0) {
      setError("Please select at least one property")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Properties</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-6">Select the properties you want to include in this campaign</p>

          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="font-medium">{property.name}</span>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`property-${property.id}`} className="sr-only">
                    Toggle {property.name}
                  </Label>
                  <Switch
                    id={`property-${property.id}`}
                    checked={property.selected}
                    onCheckedChange={() => toggleProperty(property.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={selectedProperties.length === 0}
          className={`px-6 py-2.5 text-base ${selectedProperties.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Step 3: Design Selection Component
interface DesignSelectionProps {
  design: {
    template: string
    primaryButtonColor: string
    secondaryButtonColor: string
  }
  onUpdate: (
    design: Partial<{
      template: string
      primaryButtonColor: string
      secondaryButtonColor: string
    }>,
  ) => void
  onNext: () => void
}

function DesignSelection({ design, onUpdate, onNext }: DesignSelectionProps) {
  const [error, setError] = useState("")

  const handleTemplateChange = (value: string) => {
    onUpdate({ template: value })
    setError("")
  }

  const handleColorChange = (type: "primary" | "secondary", color: string) => {
    if (type === "primary") {
      onUpdate({ primaryButtonColor: color })
    } else {
      onUpdate({ secondaryButtonColor: color })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    if (e.target.files && e.target.files[0]) {
      // In a real app, you'd upload this file to your server
      console.log("File selected:", e.target.files[0].name)
      onUpdate({ template: "custom" })
      setError("")
    }
  }

  const handleNext = () => {
    if (!design.template) {
      setError("Please select a template")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Design</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-6">
            Use one of our in-house templates or upload a template you designed. You will be able to draw hyperlinks to
            your listings after uploading your template.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <input
                type="radio"
                id="lemara"
                name="template"
                value="lemara"
                checked={design.template === "lemara"}
                onChange={() => handleTemplateChange("lemara")}
                className="mt-1 h-5 w-5 text-blue-600"
              />
              <div className="space-y-3 flex-1">
                <Label htmlFor="lemara" className="font-medium text-base">
                  Lemara Template
                </Label>
                <div className="bg-gray-100 rounded-md p-4 w-full h-40 flex items-center justify-center">
                  <span className="text-gray-500">Lemara Template Preview</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <input
                type="radio"
                id="custom"
                name="template"
                value="custom"
                checked={design.template === "custom"}
                onChange={() => handleTemplateChange("custom")}
                className="mt-1 h-5 w-5 text-blue-600"
              />
              <div className="space-y-3 w-full">
                <Label htmlFor="custom" className="font-medium text-base">
                  Upload Template
                </Label>
                <div className="mt-1">
                  <label
                    htmlFor="template-upload"
                    className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-md py-4 px-6 flex flex-col items-center justify-center text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium">Choose file or drag and drop</span>
                    <span className="text-xs text-gray-500 mt-1">HTML, HTM files only</span>
                    <input
                      id="template-upload"
                      name="template-upload"
                      type="file"
                      className="sr-only"
                      accept=".html,.htm"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-3">
              <Label htmlFor="primary-color" className="font-medium">
                Select first button color:
              </Label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  id="primary-color"
                  value={design.primaryButtonColor}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div
                    className="h-10 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: design.primaryButtonColor }}
                  >
                    Button Preview
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="secondary-color" className="font-medium">
                Select second button color:
              </Label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  id="secondary-color"
                  value={design.secondaryButtonColor}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div
                    className="h-10 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: design.secondaryButtonColor }}
                  >
                    Button Preview
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!design.template}
          className={`px-6 py-2.5 text-base ${!design.template ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Step 4: Broker Selection Component
interface Broker {
  id: string
  name: string
  company: string
  avatar: string
}

interface BrokerSelectionProps {
  selectedBroker: string
  onUpdate: (brokerId: string) => void
  onNext: () => void
}

function BrokerSelection({ selectedBroker, onUpdate, onNext }: BrokerSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

  // Mock brokers data
  const brokers: Broker[] = [
    {
      id: "broker1",
      name: "John Smith",
      company: "Luxury Realty",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "broker2",
      name: "Sarah Johnson",
      company: "Premier Properties",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "broker3",
      name: "Michael Brown",
      company: "Elite Estates",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "broker4",
      name: "Emily Davis",
      company: "Golden Gate Realty",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "broker5",
      name: "Robert Wilson",
      company: "Coastal Homes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [filteredBrokers, setFilteredBrokers] = useState<Broker[]>(brokers)

  useEffect(() => {
    if (searchTerm) {
      const filtered = brokers.filter((broker) => broker.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredBrokers(filtered)
    } else {
      setFilteredBrokers(brokers)
    }
  }, [searchTerm])

  const handleBrokerSelect = (brokerId: string) => {
    onUpdate(brokerId)
    setError("")
  }

  const handleNext = () => {
    if (!selectedBroker) {
      setError("Please select a broker/agent")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Broker/Agent</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Input
                id="broker-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search brokers by name..."
                className="pl-10 py-3"
              />
            </div>

            <div className="space-y-3 mt-6 max-h-[400px] overflow-y-auto pr-2">
              {filteredBrokers.map((broker) => (
                <div
                  key={broker.id}
                  className={`flex items-center space-x-4 p-4 border rounded-lg transition-colors duration-150 ${
                    selectedBroker === broker.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleBrokerSelect(broker.id)}
                >
                  <input
                    type="radio"
                    id={broker.id}
                    name="broker"
                    value={broker.id}
                    checked={selectedBroker === broker.id}
                    onChange={() => handleBrokerSelect(broker.id)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                      {broker.name.charAt(0)}
                    </div>
                    <div>
                      <Label htmlFor={broker.id} className="font-medium text-base">
                        {broker.name}
                      </Label>
                      <p className="text-sm text-gray-500">{broker.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBrokers.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">No brokers found matching your search</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedBroker}
          className={`px-6 py-2.5 text-base ${!selectedBroker ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Step 5: Email Settings Component
interface EmailSettingsProps {
  settings: {
    subject: string
    emailTitle: string
    senderName: string
    replyToEmail: string
    message: string
    disclaimer: string
  }
  onUpdate: (
    settings: Partial<{
      subject: string
      emailTitle: string
      senderName: string
      replyToEmail: string
      message: string
      disclaimer: string
    }>,
  ) => void
  onNext: () => void
}

function EmailSettings({ settings, onUpdate, onNext }: EmailSettingsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name} is required`
    }

    if (name === "Reply To Email" && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Please enter a valid email address"
    }

    return ""
  }

  const handleInputChange = (field: keyof typeof settings, value: string, displayName: string) => {
    onUpdate({ [field]: value })

    const error = validateField(displayName, value)
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const handleNext = () => {
    const requiredFields = [
      { key: "subject", name: "Subject" },
      { key: "emailTitle", name: "Email Title" },
      { key: "senderName", name: "Sender Name" },
      { key: "replyToEmail", name: "Reply To Email" },
    ]

    const newErrors: Record<string, string> = {}
    let hasError = false

    requiredFields.forEach(({ key, name }) => {
      const fieldKey = key as keyof typeof settings
      const error = validateField(name, settings[fieldKey])
      if (error) {
        newErrors[fieldKey] = error
        hasError = true
      }
    })

    setErrors(newErrors)

    if (!hasError) {
      onNext()
    }
  }

  return (
    <div className="space-y-6 dark:bg-gray-900">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Settings</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-6">
            Customize your campaign by entering subject and message for your clients.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={settings.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value, "Subject")}
                  placeholder="Enter email subject"
                  className={`py-3 ${errors.subject ? "border-red-500" : ""}`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailTitle" className="font-medium">
                  Email Title
                </Label>
                <Input
                  id="emailTitle"
                  value={settings.emailTitle}
                  onChange={(e) => handleInputChange("emailTitle", e.target.value, "Email Title")}
                  placeholder="Enter email title"
                  className={`py-3 ${errors.emailTitle ? "border-red-500" : ""}`}
                />
                {errors.emailTitle && <p className="text-red-500 text-sm mt-1">{errors.emailTitle}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="senderName" className="font-medium">
                  Sender Name
                </Label>
                <Input
                  id="senderName"
                  value={settings.senderName}
                  onChange={(e) => handleInputChange("senderName", e.target.value, "Sender Name")}
                  placeholder="Enter sender name"
                  className={`py-3 ${errors.senderName ? "border-red-500" : ""}`}
                />
                {errors.senderName && <p className="text-red-500 text-sm mt-1">{errors.senderName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="replyToEmail" className="font-medium">
                  Reply To Email Address
                </Label>
                <Input
                  id="replyToEmail"
                  type="email"
                  value={settings.replyToEmail}
                  onChange={(e) => handleInputChange("replyToEmail", e.target.value, "Reply To Email")}
                  placeholder="Enter reply-to email address"
                  className={`py-3 ${errors.replyToEmail ? "border-red-500" : ""}`}
                />
                {errors.replyToEmail && <p className="text-red-500 text-sm mt-1">{errors.replyToEmail}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                value={settings.message}
                onChange={(e) => handleInputChange("message", e.target.value, "Message")}
                placeholder="Enter your message"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disclaimer" className="font-medium">
                Disclaimer
              </Label>
              <Textarea
                id="disclaimer"
                value={settings.disclaimer}
                onChange={(e) => handleInputChange("disclaimer", e.target.value, "Disclaimer")}
                placeholder="Enter disclaimer text"
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!settings.subject || !settings.emailTitle || !settings.senderName || !settings.replyToEmail}
          className={`px-6 py-2.5 text-base ${
            !settings.subject || !settings.emailTitle || !settings.senderName || !settings.replyToEmail
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// Step 6: Recipients Component
interface RecipientsProps {
  recipientData: {
    type: "list" | "emails" | "upload"
    emailList?: string
    emails?: string
    uploadedList?: File | null
    sendCopyTo?: string
    storeEmailList?: boolean
  }
  onUpdate: (
    data: Partial<{
      type: "list" | "emails" | "upload"
      emailList?: string
      emails?: string
      uploadedList?: File | null
      sendCopyTo?: string
      storeEmailList?: boolean
    }>,
  ) => void
  onSubmit: () => void
}

function Recipients({ recipientData, onUpdate, onSubmit }: RecipientsProps) {
  const [error, setError] = useState("")

  // Mock email lists
  const emailLists = [
    { id: "list1", name: "VIP Clients" },
    { id: "list2", name: "Newsletter Subscribers" },
    { id: "list3", name: "Past Buyers" },
    { id: "list4", name: "Property Inquiries" },
  ]

  const handleTypeChange = (value: "list" | "emails" | "upload") => {
    onUpdate({
      type: value,
      // Reset the values for other types
      emailList: value === "list" ? recipientData.emailList : undefined,
      emails: value === "emails" ? recipientData.emails : undefined,
      uploadedList: value === "upload" ? recipientData.uploadedList : undefined,
    })
    setError("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpdate({ uploadedList: e.target.files[0] })
      setError("")
    }
  }

  const validateBeforeSubmit = () => {
    if (recipientData.type === "list" && !recipientData.emailList) {
      setError("Please select an email list")
      return false
    }

    if (recipientData.type === "emails" && (!recipientData.emails || !recipientData.emails.trim())) {
      setError("Please enter at least one email address")
      return false
    }

    if (recipientData.type === "upload" && !recipientData.uploadedList) {
      setError("Please upload an email list file")
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (validateBeforeSubmit()) {
      onSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipients</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-6">
            Select one or more of your email lists or enter the email addresses of the recipients you would like to
            receive the campaign.
          </p>

          <div className="space-y-6">
            <div className="flex flex-col space-y-6">
              <div
                className={`p-4 border rounded-lg transition-colors duration-150 ${recipientData.type === "list" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="select-list"
                    name="recipient-type"
                    value="list"
                    checked={recipientData.type === "list"}
                    onChange={() => handleTypeChange("list")}
                    className="mt-1 h-5 w-5 text-blue-600"
                  />
                  <div className="space-y-3 w-full">
                    <Label htmlFor="select-list" className="font-medium text-base">
                      Select email list
                    </Label>
                    {recipientData.type === "list" && (
                      <div className="mt-4 space-y-3 pl-2">
                        {emailLists.map((list) => (
                          <div
                            key={list.id}
                            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md bg-white"
                          >
                            <input
                              type="radio"
                              id={list.id}
                              name="emailList"
                              value={list.id}
                              checked={recipientData.emailList === list.id}
                              onChange={() => onUpdate({ emailList: list.id })}
                              className="h-4 w-4 text-blue-600"
                            />
                            <Label htmlFor={list.id} className="font-medium">
                              {list.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg transition-colors duration-150 ${recipientData.type === "emails" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="enter-emails"
                    name="recipient-type"
                    value="emails"
                    checked={recipientData.type === "emails"}
                    onChange={() => handleTypeChange("emails")}
                    className="mt-1 h-5 w-5 text-blue-600"
                  />
                  <div className="space-y-3 w-full">
                    <Label htmlFor="enter-emails" className="font-medium text-base">
                      Enter emails
                    </Label>
                    {recipientData.type === "emails" && (
                      <div className="mt-4 pl-2">
                        <Textarea
                          value={recipientData.emails || ""}
                          onChange={(e) => onUpdate({ emails: e.target.value })}
                          placeholder="Enter email addresses separated by commas"
                          className="min-h-[120px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg transition-colors duration-150 ${recipientData.type === "upload" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="upload-list"
                    name="recipient-type"
                    value="upload"
                    checked={recipientData.type === "upload"}
                    onChange={() => handleTypeChange("upload")}
                    className="mt-1 h-5 w-5 text-blue-600"
                  />
                  <div className="space-y-3 w-full">
                    <Label htmlFor="upload-list" className="font-medium text-base">
                      Upload email list
                    </Label>
                    {recipientData.type === "upload" && (
                      <div className="mt-4 pl-2">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-md py-4 px-6 flex flex-col items-center justify-center text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span className="font-medium">
                            {recipientData.uploadedList
                              ? recipientData.uploadedList.name
                              : "Choose file or drag and drop"}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">CSV, TXT, XLSX files only</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".csv,.txt,.xlsx"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="store-list"
                  checked={recipientData.storeEmailList}
                  onChange={(e) => onUpdate({ storeEmailList: e.target.checked })}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <Label htmlFor="store-list" className="text-base">
                  Store email list
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="send-copy" className="font-medium">
                  Also send a copy to
                </Label>
                <Input
                  id="send-copy"
                  type="email"
                  value={recipientData.sendCopyTo || ""}
                  onChange={(e) => onUpdate({ sendCopyTo: e.target.value })}
                  placeholder="Enter email address"
                  className="py-3"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 px-6 py-2.5 text-base">
          Create Campaign
        </Button>
      </div>
    </div>
  )
}
