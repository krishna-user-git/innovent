
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsItem, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      description: "For small events and hackathons",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        "Up to 50 participants",
        "Basic event customization",
        "Team formation",
        "Project submissions",
        "Email support",
      ],
      limitations: [
        "No custom branding",
        "Basic analytics",
        "Community support only",
      ],
      cta: "Start for free",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing organizations",
      price: {
        monthly: 49,
        annually: 39,
      },
      features: [
        "Up to 500 participants",
        "Advanced event customization",
        "Team formation with matching",
        "Multiple judging rounds",
        "Basic integrations (GitHub, Slack)",
        "Custom branding",
        "Advanced analytics",
        "Priority email support",
      ],
      limitations: [],
      cta: "Get started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations and companies",
      price: {
        monthly: "Custom",
        annually: "Custom",
      },
      features: [
        "Unlimited participants",
        "Fully customizable events",
        "Advanced team formation with AI matching",
        "Custom judging workflows",
        "All available integrations",
        "White-labeling",
        "Comprehensive analytics",
        "Dedicated account manager",
        "SLA guarantees",
        "Custom feature development",
      ],
      limitations: [],
      cta: "Contact sales",
      popular: false,
    },
  ];

  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the right plan for your events. All plans include our core event management features.
          </p>
        </div>

        <Tabs defaultValue="monthly" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">Annually (20% off)</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-brand-600 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="bg-brand-600 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        {typeof plan.price.monthly === 'number' ? (
                          <>
                            <span className="text-4xl font-bold">${plan.price.monthly}</span>
                            <span className="ml-1 text-gray-500">/month</span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">{plan.price.monthly}</span>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-500">
                          <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="annually" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-brand-600 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="bg-brand-600 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        {typeof plan.price.annually === 'number' ? (
                          <>
                            <span className="text-4xl font-bold">${plan.price.annually}</span>
                            <span className="ml-1 text-gray-500">/month</span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">{plan.price.annually}</span>
                        )}
                      </div>
                      {typeof plan.price.annually === 'number' && plan.price.annually > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Billed annually (${plan.price.annually * 12}/year)
                        </div>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-500">
                          <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
                },
                {
                  question: "Is there a limit to how many events I can create?",
                  answer: "No, all plans allow you to create unlimited events. The participant limits apply to the total number of active participants across all your events."
                },
                {
                  question: "Do you offer discounts for educational institutions?",
                  answer: "Yes, we offer special pricing for educational institutions. Please contact our sales team for more information."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal. For Enterprise plans, we also offer invoice-based payments."
                },
                {
                  question: "Can I try EngageHub before purchasing?",
                  answer: "Yes, you can start with our Free plan to explore the platform's capabilities. We also offer demos for teams considering Pro or Enterprise plans."
                },
                {
                  question: "What happens if I exceed my participant limit?",
                  answer: "If you approach your participant limit, we'll notify you so you can upgrade your plan. If you exceed your limit, registration will be temporarily paused until you upgrade or until space becomes available."
                },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
          <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
            If you have specific requirements or need a tailored solution for your organization, our team is ready to help.
          </p>
          <Button size="lg">Contact Our Sales Team</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
