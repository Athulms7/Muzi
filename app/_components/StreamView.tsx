"use client";

import { useEffect, useState } from "react";
import { Play, Heart, Share2 } from "lucide-react";
import { Header } from "../_components/Appbar";
import axios from "axios";
import { toast } from "sonner";

export interface Stream {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  upvotes: number;
  liked: boolean;
}

export default function StreamView({ creatorId,playVideo=false }: { creatorId: string,playVideo:Boolean }) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [previewVideoId, setPreviewVideoId] = useState("");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Stream | null>(null);

  const REFRESH_INTERVAL = 10 * 1000;

  async function refreshStreams() {
    try {
      const res = await axios.get(`/api/streams/?creatorId=${creatorId}`, {
        withCredentials: true,
      });

      if (res.data?.success && Array.isArray(res.data.streams)) {
        const fetched: Stream[] = res.data.streams.map((s: any) => ({
          id: s.id,
          title: s.title,
          url: s.url,
          thumbnail: s.thumbnail,
          upvotes: s.upvotes ?? 0,
          liked: s.liked ?? false,
        }));
        console.log(res.data)
        setStreams(fetched);
        if (!currentVideo && fetched.length > 0) setCurrentVideo(res.data.activeStream.stream);
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

 const extractVideoId = (url: string): string | null => {
  try {
    const regExp =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};


  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    const videoId = extractVideoId(url);
    setPreviewVideoId(videoId || "");
  };

  const handleSubmit = async () => {
    if (!previewVideoId) return;
    try {
      const res = await axios.post(
        "/api/streams",
        { creatorId, url: youtubeUrl },
        { withCredentials: true }
      );
      toast.success("✅ Added to queue");
      setStreams((prev) => [...prev, res.data]);
      setYoutubeUrl("");
      setPreviewVideoId("");
    } catch {
      toast.error("❌ Failed to add stream");
    }
  };

  async function handleLike(streamId: string, liked: boolean) {
    try {
      const endpoint = liked ? "/api/streams/downvote" : "/api/streams/upvote";
      const res = await axios.post(
        endpoint,
        { streamId },
        { withCredentials: true }
      );
      // console.log(res.data,liked)
      setStreams((prev) =>
        prev.map((s) =>
          s.id === streamId
            ? { ...s, liked: !liked, upvotes: s.upvotes + (liked ? -1 : 1) }
            : s
        )
      );
    } catch (error) {
      console.error("Error while toggling like:", error);
      toast.error("⚠️ Failed to update like");
    }
  }

  const handleShare = async () => {
    try {
      const shareableLink = `${window.location.origin}/creator/${creatorId}`;
      await navigator.clipboard.writeText(shareableLink);
      //   window.open(shareableLink, "_blank", "noopener,noreferrer");
      toast.success("🔗 Link copied!");
    } catch {
      toast.error("❌ Failed to copy link");
    }
  };

 const handleNext = async () => {
  if (streams.length === 0) return;

  try {
    const { data } = await axios.get("/api/streams/next");
    console.log(data.stream)
    if (data?.stream) {
      setCurrentVideo(data.stream);
    } else {
      console.warn("No stream returned from API");
    }
  } catch (error) {
    console.error("Error fetching next stream:", error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8 text-foreground mt-10 overflow-hidden flex justify-center">
  <div className="w-full max-w-6xl space-y-8">
    <Header />

    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start justify-center">
      {/* 🎶 Queue Section (Left) */}
      <div className="rounded-theme border border-border bg-gradient-card p-6 shadow-elegant sticky top-8 h-[calc(100vh-6rem)] flex flex-col">
        <h2 className="mb-1 text-xl font-semibold">
          Queue ({streams.length})
        </h2>
        <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Vote for the next to play 🎶</h2>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-primary/10 transition"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        {/* <p className="text-white mb-3 text-lg font-bold">
          
        </p> */}

        <div className="space-y-3 overflow-y-auto flex-1 pr-2 scrollbar-hide">
          {streams.length === 0 ? (
            <p className="text-muted-foreground">No streams found</p>
          ) : (
            [...streams]
              .sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0))
              .map((stream, index) => (
                <div
                  key={stream.id}
                  className="rounded-lg border border-border p-3 hover:shadow-glow transition"
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

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(stream.id, stream.liked)}
                      className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
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
                    <span className="text-sm font-bold">
                      {stream.upvotes ?? 0}
                    </span>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* 🎧 Submit Section */}
        <div className="rounded-theme border border-border bg-gradient-card p-4 mt-4 shadow-elegant backdrop-blur-sm">
          

          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Paste YouTube URL..."
            className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition"
          />

          {previewVideoId && (
            <div className="aspect-video mt-3 w-full overflow-hidden rounded-theme bg-black">
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
            className="mt-4 w-full rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Add to Queue
          </button>
        </div>
      </div>

      {/* 🎵 Now Playing (Right) */}
      <div className="space-y-6 flex flex-col justify-center">
        <div className="rounded-theme border border-border bg-gradient-card p-6 shadow-elegant backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Now Playing</h2>
            </div>
            {playVideo &&<button
              onClick={handleNext}
              disabled={streams.length == 0}
              className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Next Song
            </button>}
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
              <p className="mt-4 text-lg font-medium text-center">
                {currentVideo.title}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-center">
              No current stream playing
            </p>
          )}
          
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
