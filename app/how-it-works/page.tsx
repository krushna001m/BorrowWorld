import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MessageCircle,
  CreditCard,
  Package,
  RotateCcw,
  Star,
  Shield,
  DollarSign,
  Users,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Plus,
} from "lucide-react"

const borrowerSteps = [
  {
    step: 1,
    title: "Search for Items",
    description:
      "Use our search filters to find exactly what you need. Browse by category, location, availability, and price.",
    icon: Search,
  },
  {
    step: 2,
    title: "Send a Request",
    description:
      "Once you've found what you need, select your rental dates and send a request to the item owner with your rental period.",
    icon: MessageCircle,
  },
  {
    step: 3,
    title: "Secure Payment",
    description:
      "After your request is approved, make a secure payment through our platform. Your payment is held until after the rental period.",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "Pick Up & Use",
    description:
      "Meet the owner to collect the item or arrange delivery. Use the item during your rental period as agreed.",
    icon: Package,
  },
  {
    step: 5,
    title: "Return & Review",
    description:
      "Return the item in the same condition it was received. Leave a review about your experience for future users.",
    icon: RotateCcw,
  },
]

const lenderSteps = [
  {
    step: 1,
    title: "List Your Items",
    description:
      "Create detailed listings for items you want to rent out. Add photos, descriptions, pricing, and availability.",
    icon: Plus,
  },
  {
    step: 2,
    title: "Review Requests",
    description:
      "When someone wants to rent your item, you'll receive a request. Review the renter's profile and rental history.",
    icon: MessageCircle,
  },
  {
    step: 3,
    title: "Coordinate Handoff",
    description:
      "Once you approve a request, coordinate with the renter to meet up and hand over the item, or arrange delivery if that's a service you provide.",
    icon: Package,
  },
  {
    step: 4,
    title: "Receive Payment",
    description:
      "Once the rental period is complete and the item is returned in good condition, the payment is released to your account.",
    icon: DollarSign,
  },
  {
    step: 5,
    title: "Rate & Review",
    description: "Leave feedback about your experience with the borrower to help build trust in our community.",
    icon: Star,
  },
]

const trustFeatures = [
  {
    title: "Verified Users",
    description:
      "All users undergo identity verification. We verify email, phone, and government ID for maximum trust.",
    icon: Users,
  },
  {
    title: "Secure Payments",
    description:
      "All transactions occur through our secure platform. Payment is held until the rental is complete and the item is returned successfully.",
    icon: Shield,
  },
  {
    title: "Dispute Resolution",
    description: "Our support team helps resolve any issues that may arise during the rental process.",
    icon: MessageCircle,
  },
]

const faqs = [
  {
    question: "What if an item is damaged during the rental?",
    answer:
      "Our rental agreement includes a security deposit for valuable items. If damage occurs, we have a fair dispute resolution process. We encourage both parties to document the item's condition during pickup and return.",
  },
  {
    question: "How does payment work?",
    answer:
      "When a rental request is approved, the borrower's payment is held securely. After the item is returned in good condition, the payment is released to the lender minus our service fee.",
  },
  {
    question: "Can I cancel a rental request?",
    answer:
      "Yes, both parties can cancel with varying refund policies depending on timing. Cancellations more than 48 hours before the rental may be subject to partial refunds.",
  },
  {
    question: "How do I know I can trust the other person?",
    answer:
      "Our platform features verified profiles, ratings and reviews from previous transactions. You can also message other users through our platform to ask any questions before confirming a rental.",
  },
  {
    question: "What fees does BorrowWorld charge?",
    answer:
      "BorrowWorld charges a 10% service fee to borrowers on the total rental cost. This covers our secure payment platform, customer support, and dispute resolution services.",
  },
]

export default function HowItWorksPage() {
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
            <Link href="/how-it-works" className="text-cyan-600 font-medium">
              How It Works
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How BorrowWorld Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BorrowWorld connects people who have items to share with those who need them temporarily. Here's everything
            you need to know about borrowing and lending on our platform.
          </p>
        </div>
      </section>

      {/* The BorrowWorld Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The BorrowWorld Process</h2>
            <p className="text-gray-600">
              Whether you're borrowing or lending, our platform makes the process simple, secure, and beneficial for
              everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Borrowers */}
            <div>
              <div className="flex items-center mb-8">
                <Badge className="bg-cyan-500 text-white px-4 py-2 text-lg font-semibold">For Borrowers</Badge>
              </div>

              <div className="space-y-6">
                {borrowerSteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
                  <Link href="/browse">Start Borrowing</Link>
                </Button>
              </div>
            </div>

            {/* For Lenders */}
            <div>
              <div className="flex items-center mb-8">
                <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-semibold">For Lenders</Badge>
              </div>

              <div className="space-y-6">
                {lenderSteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <Link href="/list">List Your Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trust & Safety</h2>
            <p className="text-gray-600">
              We've built BorrowWorld with trust and safety at its core. Here's how we protect our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to the most common questions about using BorrowWorld.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ready to start CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users in our community who are saving money and reducing waste through sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Create an Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-cyan-600"
              asChild
            >
              <Link href="/browse">Browse Available Items</Link>
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
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
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
