import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  Building,
  Clock,
  Shield,
} from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description:
      "Every decision we make is guided by what's best for our patients' health and well-being.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We maintain the highest standards of medical ethics and open communication.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We continuously strive to provide the highest quality healthcare services.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "We believe quality healthcare should be accessible to everyone, everywhere.",
  },
]

const stats = [
  { value: "50,000+", label: "Patients Served" },
  { value: "200+", label: "Expert Doctors" },
  { value: "15+", label: "Specializations" },
  { value: "98%", label: "Patient Satisfaction" },
]

const team = [
  {
    name: "Dr. James Mitchell",
    role: "Chief Medical Officer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=james-m&backgroundColor=b6e3f4",
  },
  {
    name: "Sarah Anderson",
    role: "CEO & Co-Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-a&backgroundColor=ffd5dc",
  },
  {
    name: "Dr. Michael Chen",
    role: "Head of Telemedicine",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-c&backgroundColor=c0aede",
  },
  {
    name: "Emily Rodriguez",
    role: "Director of Operations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily-r&backgroundColor=ffdfbf",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                  Transforming Healthcare for a{" "}
                  <span className="text-primary">Better Tomorrow</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  MedCare Connect was founded with a simple mission: to make
                  quality healthcare accessible to everyone. We combine
                  cutting-edge technology with compassionate care to deliver an
                  exceptional patient experience.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" asChild>
                    <Link href="/doctors">Meet Our Doctors</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-card p-6 text-center shadow-sm"
                  >
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Our Mission</h2>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    To revolutionize healthcare delivery by leveraging
                    technology to provide accessible, affordable, and
                    high-quality medical services to patients worldwide. We
                    strive to create a seamless connection between patients and
                    healthcare providers.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Our Vision</h2>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    To become the world&apos;s most trusted healthcare platform,
                    where every individual has access to quality medical care
                    regardless of their location or circumstances. We envision a
                    future where healthcare is proactive, personalized, and
                    patient-centric.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Our Core Values</h2>
              <p className="mt-4 text-muted-foreground">
                These principles guide everything we do and how we serve our
                patients.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mt-4 font-semibold">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Leadership Team</h2>
              <p className="mt-4 text-muted-foreground">
                Meet the dedicated professionals leading MedCare Connect&apos;s
                mission to transform healthcare.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="overflow-hidden text-center"
                >
                  <CardContent className="p-6">
                    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-secondary">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Why Choose MedCare Connect?</h2>
              <p className="mt-4 text-muted-foreground">
                We&apos;re committed to providing exceptional healthcare
                experiences.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">State-of-the-Art Facilities</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Equipped with the latest medical technology and
                    infrastructure to provide the best care possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Expert Medical Team</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our network includes over 200 certified specialists across
                    15+ medical disciplines.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Availability</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Round-the-clock support and emergency services to ensure
                    you&apos;re never alone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold">
              Join Our Growing Healthcare Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Experience the future of healthcare today. Sign up and take
              control of your health journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
