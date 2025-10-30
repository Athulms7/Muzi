import { Button } from "./_ui/Buttonland";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for discovering new music",
    features: [
      "Limited streaming",
      "Standard quality",
      "Subscribe to 3 creators",
      "Ad-supported",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Premium",
    price: "$9.99",
    description: "For serious music enthusiasts",
    features: [
      "Unlimited streaming",
      "High quality audio",
      "Subscribe to unlimited creators",
      "Ad-free experience",
      "Offline downloads",
      "Exclusive content",
    ],
    cta: "Go Premium",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Creator Pro",
    price: "$19.99",
    description: "For aspiring streamers",
    features: [
      "Everything in Premium",
      "Stream your own music",
      "Analytics dashboard",
      "Custom branding",
      "Priority support",
      "Monetization tools",
    ],
    cta: "Start Creating",
    variant: "outline" as const,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-8 rounded-lg bg-card border transition-all duration-300 hover:shadow-glow relative animate-slide-up ${
                plan.popular ? "border-primary shadow-glow scale-105" : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
