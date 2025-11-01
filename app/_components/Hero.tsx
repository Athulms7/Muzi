import { Button } from "./_ui/Buttonland";
import { Play, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-music.jpg";
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero ">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Stream Music.
            <br />
            <span className="text-primary">Support Creators.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of music streaming. Discover talented artists, subscribe to your favorites, and enjoy unlimited premium content.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" variant="hero" className="text-lg px-8 py-6">
              <Play className="w-5 h-5" />
              Start Streaming
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <TrendingUp className="w-5 h-5" />
              Browse Creators
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">50K+</span>
              <span>Active Streamers</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">2M+</span>
              <span>Songs Available</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">99.9%</span>
              <span>Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
