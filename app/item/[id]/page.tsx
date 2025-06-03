"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  CalendarIcon,
  MessageCircle,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format } from "date-fns"
import { allItems } from "@/lib/data"

export default function ItemPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const item = allItems.find((item) => item.id === Number.parseInt(params.id))

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h1>
          <Button asChild>
            <Link href="/browse">Browse Items</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Create multiple images for gallery (using the same image for demo)
  const itemImages = [item.image, item.image, item.image, item.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % itemImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + itemImages.length) % itemImages.length)
  }

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 1
  }

  const totalPrice = item.price * calculateDays()

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
            <Link href="/list-item" className="text-gray-700 hover:text-cyan-600 font-medium">
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

      {/* Back to search */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="text-cyan-600 hover:text-cyan-700">
          <Link href="/browse" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search results
          </Link>
        </Button>
      </div>

      {/* Item Details */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4">
              <Image
                src={itemImages[currentImageIndex] || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {itemImages.length}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {itemImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-cyan-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} - ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Info & Booking */}
          <div>
            <div className="mb-6">
              <Badge className="bg-cyan-500 mb-3">{item.categoryName}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </div>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold ml-1">{item.rating}</span>
                <span className="text-gray-600 ml-1">({item.reviews} reviews)</span>
              </div>
            </div>

            {/* Pricing & Booking */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ${item.price} <span className="text-lg font-normal text-gray-500">per day</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">
                        ${item.price} × {calculateDays()} day{calculateDays() > 1 ? "s" : ""}
                      </span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 mb-3">Request Rental</Button>
                <p className="text-sm text-gray-500 text-center">You won't be charged yet</p>
              </CardContent>
            </Card>

            {/* Item Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Features & Specifications */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {item.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Item Owner */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Item Owner</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={item.ownerAvatar || "/placeholder.svg"} alt={item.owner} />
                      <AvatarFallback>
                        {item.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.owner}</h4>
                      <p className="text-sm text-gray-600">Member since March 2022</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {item.ownerRating} • {item.ownerReviews} rentals
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact {item.owner.split(" ")[0]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
