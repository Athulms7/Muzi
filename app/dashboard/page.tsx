"use client";

import { useEffect, useState } from "react";
import { Play, Heart } from "lucide-react";
import { Header } from "../_components/Appbar";
import axios from "axios";
import StreamView from "../_components/StreamView";

export interface Stream {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  upvotes: number;
  liked: boolean;
}

export default function Dashboard() {
  const creatorId="cc0d4547-0b83-484d-ae87-ecaa06983c2a"
  return(
    <StreamView creatorId={creatorId} playVideo={true}/>
  )
}
