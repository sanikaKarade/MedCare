import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Hear from thousands of satisfied patients who have experienced our
            exceptional healthcare services.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4 text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground animate-scale-in delay-300">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="group cursor-default">
              <p className="text-4xl font-bold transition-transform group-hover:scale-110">50K+</p>
              <p className="mt-1 text-primary-foreground/80">Happy Patients</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-bold transition-transform group-hover:scale-110">200+</p>
              <p className="mt-1 text-primary-foreground/80">Expert Doctors</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-bold transition-transform group-hover:scale-110">15+</p>
              <p className="mt-1 text-primary-foreground/80">Specializations</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-bold transition-transform group-hover:scale-110">98%</p>
              <p className="mt-1 text-primary-foreground/80">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
