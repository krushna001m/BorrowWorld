import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Wrench,
  Smartphone,
  Mountain,
  PartyPopper,
  Camera,
  Dumbbell,
  Sofa,
  Car,
  Star,
  MapPin,
  MessageCircle,
  Heart,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import { allItems } from "@/lib/data"

const categories = [
  { name: "Tools & Equipment", icon: Wrench, color: "bg-orange-100", slug: "tools" },
  { name: "Electronics", icon: Smartphone, color: "bg-blue-100", slug: "electronics" },
  { name: "Outdoor Gear", icon: Mountain, color: "bg-green-100", slug: "outdoor" },
  { name: "Party Supplies", icon: PartyPopper, color: "bg-purple-100", slug: "party" },
  { name: "Photography", icon: Camera, color: "bg-pink-100", slug: "photography" },
  { name: "Sports Equipment", icon: Dumbbell, color: "bg-yellow-100", slug: "sports" },
  { name: "Furniture", icon: Sofa, color: "bg-indigo-100", slug: "furniture" },
  { name: "Vehicles", icon: Car, color: "bg-red-100", slug: "vehicles" },
]

// Get featured items from the data file (first 4 items)
const featuredItems = allItems.slice(0, 4)

const nearbyPeople = [
  {
    name: "Sarah Chen",
    distance: "0.3 miles",
    items: 12,
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    categories: ["Photography", "Electronics"],
  },
  {
    name: "Mike Johnson",
    distance: "0.8 miles",
    items: 8,
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    categories: ["Tools & Equipment", "Sports Equipment"],
  },
  {
    name: "Emily Rodriguez",
    distance: "1.2 miles",
    items: 15,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    categories: ["Outdoor Gear", "Furniture"],
  },
  {
    name: "David Park",
    distance: "1.5 miles",
    items: 6,
    rating: 4.5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    categories: ["Electronics", "Vehicles"],
  },
]

const testimonials = [
  {
    text: "BorrowWorld saved me so much money! Instead of buying a pressure washer I only used once a year, I can now rent one whenever needed. Brilliant!",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    text: "As a photographer, I can now try out expensive equipment before investing. The process is seamless and the community is trustworthy.",
    author: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    text: "I've made over $1,000 renting out my tools and camping gear that were just sitting in my garage. It's a win-win for everyone!",
    author: "David Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
]

export default function HomePage() {
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Borrow smart. <span className="text-cyan-500">Rent everything.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Why buy when you can borrow? Save money and reduce waste by renting items from people in your community.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex rounded-lg border border-gray-300 bg-white p-2">
              <Input placeholder="What do you need to borrow?" className="border-0 text-lg focus-visible:ring-0" />
              <Button className="bg-cyan-500 hover:bg-cyan-600 px-8" asChild>
                <Link href="/browse">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/browse" className="text-cyan-600 hover:underline">
              Browse All Items
            </Link>
            <Link href="/browse?popular=true" className="text-cyan-600 hover:underline">
              Most Popular Nearby
            </Link>
            <Link href="/list-item" className="text-cyan-600 hover:underline">
              List Your Item
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse By Category</h2>
            <p className="text-gray-600">Find exactly what you need from our wide range of rental categories.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/browse?category=${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h2>
              <p className="text-gray-600">Popular items available for rent in your area</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/browse">View All</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
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
                      {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
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
        </div>
      </section>

      {/* Find Nearby People */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Nearby People</h2>
            <p className="text-gray-600">
              Connect with community members near you who have items available for borrowing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {nearbyPeople.map((person, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                        <AvatarFallback>
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{person.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {person.distance}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{person.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.categories.map((category, idx) => (
                      <Badge key={idx} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{person.items} items available</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-1" />
                        View Items
                      </Button>
                      <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How BorrowWorld Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How BorrowWorld Works</h2>
            <p className="text-gray-600">Borrowing and lending made simple in just a few steps.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Find an Item</h3>
              <p className="text-sm text-gray-600">
                Search through thousands of items available to borrow in your community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pick it up</h3>
              <p className="text-sm text-gray-600">
                Meet the owner and collect the item at the agreed time and location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Return it</h3>
              <p className="text-sm text-gray-600">
                Return the item in the same condition at the end of the rental period.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Leave feedback</h3>
              <p className="text-sm text-gray-600">
                Share your experience with the borrower to help build trust in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Users Say */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600">Join thousands of happy borrowers and lenders in our community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <Avatar className="mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to start CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start borrowing or lending?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community today and start saving money while helping the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Join Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-cyan-600"
              asChild
            >
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
