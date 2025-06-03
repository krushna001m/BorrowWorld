"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Upload, X, MapPin, DollarSign, Shield, Heart, Facebook, Instagram, Twitter, Plus, Camera } from "lucide-react"
import { categories } from "@/lib/data"

export default function ListItemPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    availability: "available",
    features: [] as string[],
    images: [] as string[],
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - imageFiles.length)
      setImageFiles((prev) => [...prev, ...newFiles])

      // Create preview URLs
      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, e.target!.result as string],
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleImageUpload(e.dataTransfer.files)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Listing item:", formData)
    // Handle form submission
  }

  const commonFeatures = [
    "Recently Serviced",
    "Professional Grade",
    "Includes Accessories",
    "Free Delivery Available",
    "Pickup Available",
    "Insurance Included",
    "User Manual Included",
    "Multiple Sizes Available",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">BorrowWorld</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium">
              Home
            </Link>
            <Link href="/browse" className="text-gray-700 hover:text-cyan-600 font-medium">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-cyan-600 font-medium">
              How It Works
            </Link>
            <Link href="/list-item" className="text-cyan-600 font-medium">
              List Item
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Item</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your unused items into income. List them on BorrowWorld and start earning money while helping your
            community.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Item Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Canon EOS R5 Camera with 24-105mm Lens"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail. Include condition, what's included, and any special features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="mt-1 min-h-32"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((cat) => cat.slug !== "all")
                          .map((category) => (
                            <SelectItem key={category.slug} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location *
                    </Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? "border-cyan-500 bg-cyan-50" : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Upload photos of your item</p>
                    <p className="text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button type="button" variant="outline" asChild>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Maximum 5 images, up to 10MB each</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pricing & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                      Daily Rental Price *
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Set a competitive daily rate</p>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
                      Availability
                    </Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) => handleInputChange("availability", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="upcoming">Available Soon</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Features & Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {commonFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm text-gray-700 cursor-pointer">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center space-x-4">
              <Button type="button" variant="outline" size="lg" asChild>
                <Link href="/browse">Cancel</Link>
              </Button>
              <Button type="submit" size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                List My Item
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold">BorrowWorld</span>
              </div>
              <p className="text-gray-400 mb-4">Borrow smart. Rent everything.</p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">NAVIGATION</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/list-item" className="hover:text-white">
                    List Item
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">LEGAL</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/rental-agreement" className="hover:text-white">
                    Rental Agreement
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="mailto:support@borrowworld.com" className="hover:text-white">
                    support@borrowworld.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 BorrowWorld. All rights reserved.</p>
           
          </div>
        </div>
      </footer>
    </div>
  )
}
