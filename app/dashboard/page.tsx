// "use client"
// import { useEffect, useState } from "react";
// import { ChevronUp, ChevronDown, Play, Music2 } from "lucide-react";
// import { Header } from "../_components/Appbar";
// import axios from "axios";

// interface Video {
//   id: string;
//   url: string;
//   title: string;
//   thumbnail: string;
//   votes: number;
//   userVote?: 'up' | 'down' | null;
// }

// const Index = () => {
//   const [youtubeUrl, setYoutubeUrl] = useState("");
//   const Refresh_interval=10*1000;
//     const [previewVideoId, setPreviewVideoId] = useState("");
//   const [currentVideo, setCurrentVideo] = useState<Video>({
//     id: "dQw4w9WgXcQ",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     title: "Current Playing Song",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     votes: 0
//   });
  
//   const [queue, setQueue] = useState<Video[]>([
//     {
//       id: "jNQXAC9IVRw",
//       url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
//       title: "Me at the zoo",
//       thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
//       votes: 15,
//       userVote: null
//     },
//     {
//       id: "9bZkp7q19f0",
//       url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
//       title: "PSY - GANGNAM STYLE",
//       thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
//       votes: 12,
//       userVote: null
//     },
//     {
//       id: "kJQP7kiw5Fk",
//       url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
//       title: "Luis Fonsi - Despacito ft. Daddy Yankee",
//       thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
//       votes: 8,
//       userVote: null
//     }
//   ]);

//   async function refreshstreams(){
//    const res=await  axios.get("/api/streams/my",{
//     withCredentials:true   })
//    console.log(res.data)
//   }
//   useEffect(()=>{
//     refreshstreams();
//     const interval=setInterval(() => {
        
//     }, Refresh_interval);
//   },[])

//   const extractVideoId = (url: string) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const handleUrlChange = (url: string) => {
//     setYoutubeUrl(url);
//     const videoId = extractVideoId(url);
//     if (videoId) {
//       setPreviewVideoId(videoId);
//     } else {
//       setPreviewVideoId("");
//     }
//   };

//   const handleSubmit = () => {
//     if (previewVideoId) {
//       const newVideo: Video = {
//         id: previewVideoId,
//         url: youtubeUrl,
//         title: "New Submitted Song",
//         thumbnail: `https://img.youtube.com/vi/${previewVideoId}/maxresdefault.jpg`,
//         votes: 0,
//         userVote: null
//       };
//       setQueue([...queue, newVideo]);
//       setYoutubeUrl("");
//       setPreviewVideoId("");
//     }
//   };

//   const handleVote = (videoId: string, voteType: 'up' | 'down') => {
//     setQueue(queue.map(video => {
//       if (video.id === videoId) {
//         let newVotes = video.votes;
//         let newUserVote: 'up' | 'down' | null = voteType;
        
//         if (video.userVote === voteType) {
//           newUserVote = null;
//           newVotes += voteType === 'up' ? -1 : 1;
//         } else if (video.userVote) {
//           newVotes += voteType === 'up' ? 2 : -2;
//         } else {
//           newVotes += voteType === 'up' ? 1 : -1;
//         }
        
//         return { ...video, votes: newVotes, userVote: newUserVote };
//       }
//       return video;
//     }).sort((a, b) => b.votes - a.votes));
//     fetch("api/streams/upvote",{
//       body:JSON.stringify({streamId:videoId})
//     })
//   };

//   const handleNext = () => {
//     if (queue.length > 0) {
//       setCurrentVideo(queue[0]);
//       setQueue(queue.slice(1));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8 text-center">
//             <Header/>
//           {/* <div className="mb-2 flex items-center justify-center gap-2">
//             <Music2 className="h-8 w-8 text-primary" />
//             <h1 className="text-4xl font-bold text-foreground">Stream Vote</h1>
//           </div> */}
//           <p className="text-muted-foreground">Vote for the next song on the stream</p>
//         </header>

//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Left Column - Current Video + Submit */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Current Playing Video */}
//             <div className="rounded-theme border border-border bg-gradient-card p-6 backdrop-blur-sm shadow-elegant">
//               <div className="mb-4 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Play className="h-5 w-5 text-primary" />
//                   <h2 className="text-xl font-semibold text-foreground">Now Playing</h2>
//                 </div>
//                 <button
//                   onClick={handleNext}
//                   disabled={queue.length === 0}
//                   className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-glow"
//                 >
//                   Next Song
//                 </button>
//               </div>
//               <div className="aspect-video w-full overflow-hidden rounded-theme bg-black shadow-elegant">
//                 <iframe
//                   className="h-full w-full"
//                   src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
//                   title={currentVideo.title}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//               <p className="mt-4 text-lg font-medium text-card-foreground">{currentVideo.title}</p>
//             </div>

//             {/* Submit New Song */}
//             <div className="rounded-theme border border-border bg-gradient-card p-6 backdrop-blur-sm shadow-elegant">
//               <h2 className="mb-4 text-xl font-semibold text-foreground">Submit a Song</h2>
//               <div className="space-y-4">
//                 <div>
//                   <input
//                     type="text"
//                     value={youtubeUrl}
//                     onChange={(e) => handleUrlChange(e.target.value)}
//                     placeholder="Paste YouTube URL here..."
//                     className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                   />
//                 </div>
                
//                 {previewVideoId && (
//                   <div className="aspect-video w-full overflow-hidden rounded-theme bg-black">
//                     <iframe
//                       className="h-full w-full"
//                       src={`https://www.youtube.com/embed/${previewVideoId}`}
//                       title="Preview"
//                       allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   </div>
//                 )}
                
//                 <button
//                   onClick={handleSubmit}
//                   disabled={!previewVideoId}
//                   className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-8 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-glow"
//                 >
//                   Add to Queue
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Queue */}
//           <div className="lg:col-span-1">
//             <div className="rounded-theme border border-border bg-gradient-card p-6 backdrop-blur-sm shadow-elegant sticky top-8">
//               <h2 className="mb-4 text-xl font-semibold text-foreground">Queue ({queue.length})</h2>
//               <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
//                 {queue.map((video, index) => (
//                   <div
//                     key={video.id}
//                     className="rounded-lg border border-border bg-card/50 p-3 backdrop-blur-sm transition-all hover:bg-card/70 hover:shadow-glow"
//                   >
//                     <div className="mb-2 flex items-start gap-3">
//                       <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
//                         {index + 1}
//                       </span>
//                       <img
//                         src={video.thumbnail}
//                         alt={video.title}
//                         className="h-16 w-28 shrink-0 rounded object-cover"
//                       />
//                       <p className="flex-1 text-sm font-medium text-card-foreground line-clamp-2">
//                         {video.title}
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleVote(video.id, 'up')}
//                           className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
//                             video.userVote === 'up'
//                               ? 'bg-primary text-primary-foreground'
//                               : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
//                           }`}
//                         >
//                           <ChevronUp className="h-4 w-4" />
//                         </button>
//                         <span className="min-w-8 text-center text-sm font-bold text-foreground">
//                           {video.votes}
//                         </span>
//                         <button
//                           onClick={() => handleVote(video.id, 'down')}
//                           className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
//                             video.userVote === 'down'
//                               ? 'bg-destructive text-destructive-foreground'
//                               : 'bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive'
//                           }`}
//                         >
//                           <ChevronDown className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;


"use client";

import { useEffect, useState } from "react";
import { Play, Heart } from "lucide-react";
import { Header } from "../_components/Appbar";
import axios from "axios";

interface Stream {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  liked?: boolean;
  _count?: { upvotes: number };
}

const Index = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [previewVideoId, setPreviewVideoId] = useState("");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Stream | null>(null);

  const REFRESH_INTERVAL = 10 * 1000;

  // ✅ Fetch and flatten nested streams
  async function refreshStreams() {
    try {
      const res = await axios.get("/api/streams/my", { withCredentials: true });

      let fetched: Stream[] = [];

      if (Array.isArray(res.data.streams)) {
        // Flatten nested structure: { "0": 0, "1": [ ...streams ] }
        fetched = res.data.streams
          .map((item: any) => item?.["1"])
          .flat()
          .filter((s: any) => s && s.id);
      }

      // ✅ Assign a dummy liked property if missing
      const withLiked = fetched.map((s) => ({
        ...s,
        liked: s.liked ?? false,
      }));

      console.log("✅ Cleaned Streams:", withLiked);
      setStreams(withLiked);

      // Set first stream as current if not yet playing
      if (!currentVideo && withLiked.length > 0) {
        setCurrentVideo(withLiked[0]);
      }
    } catch (err) {
      console.error("Error fetching streams:", err);
    }
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(refreshStreams, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // ✅ Extract YouTube video ID
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    const videoId = extractVideoId(url);
    setPreviewVideoId(videoId || "");
  };

  // ✅ Add new song (local only)
  const handleSubmit = async () => {
    if (!previewVideoId) return;

    const newStream: Stream = {
      id: previewVideoId,
      title: "New Stream",
      url: youtubeUrl,
      thumbnail: `https://img.youtube.com/vi/${previewVideoId}/hqdefault.jpg`,
      _count: { upvotes: 0 },
      liked: false,
    };

    setStreams((prev) => [...prev, newStream]);
    setYoutubeUrl("");
    setPreviewVideoId("");
  };

  // ✅ Toggle like / unlike
  const handleLike = async (streamId: string, liked: boolean) => {
    try {
      const endpoint = liked
        ? "/api/streams/unlike"
        : "/api/streams/upvote";

      await axios.post(endpoint, { streamId }, { withCredentials: true });

      // Optimistically update local state
      setStreams((prev) =>
        prev.map((s) =>
          s.id === streamId
            ? {
                ...s,
                liked: !liked,
                _count: {
                  upvotes:
                    (s._count?.upvotes ?? 0) + (liked ? -1 : 1),
                },
              }
            : s
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // ✅ Next song logic
  const handleNext = () => {
    if (streams.length > 1) {
      setCurrentVideo(streams[1]);
      setStreams((prev) => prev.slice(1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <Header />
          <p className="text-muted-foreground">
            Vote for the next song on the stream
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 🎵 NOW PLAYING SECTION */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-theme border border-border bg-gradient-card p-6 backdrop-blur-sm shadow-elegant">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Now Playing
                  </h2>
                </div>
                <button
                  onClick={handleNext}
                  disabled={streams.length <= 1}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Next Song
                </button>
              </div>

              {currentVideo ? (
                <>
                  <div className="aspect-video w-full overflow-hidden rounded-theme bg-black">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${extractVideoId(
                        currentVideo.url
                      )}?autoplay=1`}
                      title={currentVideo.title}
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-4 text-lg font-medium text-card-foreground">
                    {currentVideo.title}
                  </p>
                </>
              ) : (
                <p>No current stream playing</p>
              )}
            </div>

            {/* 🎧 SUBMIT NEW SONG */}
            <div className="rounded-theme border border-border bg-gradient-card p-6 backdrop-blur-sm shadow-elegant">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Submit a Song
              </h2>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="w-full rounded-md border px-4 py-2"
              />
              {previewVideoId && (
                <div className="aspect-video mt-3 w-full rounded-theme overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewVideoId}`}
                    title="Preview"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={!previewVideoId}
                className="mt-4 inline-flex w-full justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Add to Queue
              </button>
            </div>
          </div>

          {/* 🎶 QUEUE SECTION */}
          <div className="lg:col-span-1">
            <div className="rounded-theme border border-border bg-gradient-card p-6 sticky top-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Queue ({streams.length})
              </h2>

              <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                {streams.length === 0 && (
                  <p className="text-muted-foreground">No streams found</p>
                )}

                {streams.map((stream, index) => (
                  <div
                    key={`${stream.id}-${index}`}
                    className="rounded-lg border p-3 hover:shadow-glow transition"
                  >
                    <div className="mb-2 flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="h-16 w-28 rounded object-cover"
                      />
                      <p className="flex-1 text-sm font-medium line-clamp-2">
                        {stream.title}
                      </p>
                    </div>

                    {/* ❤️ Like Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(stream.id, stream.liked!)}
                        className={`flex h-8 w-8 items-center justify-center rounded transition ${
                          stream.liked
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-primary/20 hover:text-primary"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            stream.liked ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      <span className="text-sm font-bold text-foreground">
                        {stream._count?.upvotes ?? 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
