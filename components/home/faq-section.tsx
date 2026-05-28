import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/data"

export function FAQSection() {
  return (
    <section id="faq" className="bg-secondary/30 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Find answers to common questions about our services and how we can
            help you.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl animate-fade-in-up delay-200">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="transition-all duration-300 hover:bg-background/50 rounded-lg px-2"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
