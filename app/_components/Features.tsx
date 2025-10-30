import { Music2, Users, Zap, Heart, Radio, Crown } from "lucide-react";

const features = [
  {
    icon: Music2,
    title: "Unlimited Streaming",
    description: "Stream millions of songs in high quality with zero ads. Enjoy your music without interruptions.",
  },
  {
    icon: Users,
    title: "Support Creators",
    description: "Subscribe to your favorite streamers and support them directly. Your subscription makes a difference.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience instant playback with our optimized streaming infrastructure across the globe.",
  },
  {
    icon: Heart,
    title: "Personalized Playlists",
    description: "AI-powered recommendations tailored to your taste. Discover new music you'll love.",
  },
  {
    icon: Radio,
    title: "Live Sessions",
    description: "Join exclusive live streaming sessions with artists. Be part of intimate musical experiences.",
  },
  {
    icon: Crown,
    title: "Premium Perks",
    description: "Early access to releases, exclusive content, and special badges for premium members.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium features designed for music lovers and creator supporters
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
