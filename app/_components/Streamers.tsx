import { Button } from "./_ui/Buttonland";
import { Users, Music } from "lucide-react";

const streamers = [
  {
    name: "Luna Wave",
    genre: "Electronic",
    subscribers: "125K",
    initials: "LW",
  },
  {
    name: "Echo Beats",
    genre: "Hip Hop",
    subscribers: "98K",
    initials: "EB",
  },
  {
    name: "Stellar Sound",
    genre: "Pop",
    subscribers: "210K",
    initials: "SS",
  },
  {
    name: "Rhythm King",
    genre: "Rock",
    subscribers: "156K",
    initials: "RK",
  },
];

const Streamers = () => {
  return (
    <section id="streamers" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Streamers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and support talented creators from around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streamers.map((streamer, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-2xl font-bold text-primary">
                  {streamer.initials}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-card-foreground">{streamer.name}</h3>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mb-3">
                    <Music className="w-3 h-3" />
                    {streamer.genre}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{streamer.subscribers} subscribers</span>
                  </div>
                </div>
                
                <Button variant="hero" className="w-full">
                  Subscribe
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Streamers;
