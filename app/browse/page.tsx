"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Star, MapPin, Heart, Facebook, Instagram, Twitter, SlidersHorizontal } from "lucide-react"
import { allItems, categories, sortOptions } from "@/lib/data"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 200])
  const [selectedRating, setSelectedRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [filteredItems, setFilteredItems] = useState(allItems)

  // Get category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  // Filter and sort items
  useEffect(() => {
    const filtered = allItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      const matchesPrice = item.price >= selectedPriceRange[0] && item.price <= selectedPriceRange[1]

      const matchesRating = item.rating >= selectedRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    // Sort items
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Most popular (by rating * reviews)
        filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    }

    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedRating, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedPriceRange([0, 200])
    setSelectedRating(0)
    setSortBy("popular")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={selectedCategory === category.slug}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategory(category.slug)
                  }
                }}
              />
              <label htmlFor={category.slug} className="text-sm text-gray-700 cursor-pointer">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
            max={200}
            min={0}
            step={5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${selectedPriceRange[0]}</span>
            <span>${selectedPriceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRating(rating)
                  }
                }}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700 cursor-pointer flex items-center">
                {rating > 0 ? (
                  <>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {rating}+ Stars
                  </>
                ) : (
                  "All Ratings"
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

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
            <Link href="/browse" className="text-cyan-600 font-medium">
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

      {/* Browse Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse All Items</h1>
          <p className="text-gray-600 mb-6">Find the perfect items to borrow from our community</p>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filter Button */}
              <Button variant="outline" className="hidden lg:flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredItems.length} of {allItems.length} items
                {selectedCategory !== "all" && (
                  <span className="ml-2">
                    in <Badge variant="secondary">{categories.find((c) => c.slug === selectedCategory)?.name}</Badge>
                  </span>
                )}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Link key={item.id} href={`/item/${item.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={350}
                        height={250}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-cyan-500">{item.categoryName}</Badge>
                      <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">{item.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
                        {item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl font-bold text-gray-900">
                          ${item.price} <span className="text-sm font-normal text-gray-500">/day</span>
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
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
