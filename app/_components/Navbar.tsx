"use client"
import { Music } from "lucide-react";
import { Button } from "./_ui/Buttonland";
import { Buttons } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session=useSession();
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-primary" />
          <span className="text-2xl text-white font-bold">MuZi</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#streamers" className="text-muted-foreground hover:text-foreground transition-colors">
            Streamers
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">

            {!session.data?.user &&<button className='bg-gradient-primar rounded-xl p-2 text-sm text-white font-bold  ' onClick={()=>signIn()}>
            
              Sign In
            </button>}
            {session.data?.user && <button className='bg-gradient-primary text-white rounded-xl p-2 text-sm font-bold  ' onClick={()=>signOut()}>
            
              Sign Out
            </button>}
            <button className="bg-primary text-sm font-bold rounded-md p-1" >Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
