"use client";

import { useEffect, useState } from "react";
import { Play, Heart } from "lucide-react";
import { Header } from "../_components/Appbar";
import axios from "axios";

export interface Stream {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  upvotes: number;
  liked: boolean;
}

export default function dashboard(){
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [previewVideoId, setPreviewVideoId] = useState("");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Stream | null>(null);

  const REFRESH_INTERVAL = 10 * 1000;

  // ✅ Fetch user's streams
  async function refreshStreams() {
    try {
      const res = await axios.get("/api/streams/my", { withCredentials: true });

      if (res.data?.success && Array.isArray(res.data.streams)) {
        const fetched: Stream[] = res.data.streams.map((s: any) => ({
          id: s.id,
          title: s.title,
          url: s.url,
          thumbnail: s.thumbnail,
          upvotes: s.upvotes ?? 0,
          liked: s.liked ?? false,
        }));

        console.log("✅ Cleaned Streams:", fetched);
        setStreams(fetched);

        // Set first stream as current if not already set
        if (!currentVideo && fetched.length > 0) {
          setCurrentVideo(fetched[0]);
        }
      } else {
        console.warn("⚠️ Unexpected response structure:", res.data);
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

  // ✅ Add a new stream (client-side only for now)
  const handleSubmit = async () => {
    if (!previewVideoId) return;

    const newStream: Stream = {
      id: previewVideoId,
      title: "New Stream",
      url: youtubeUrl,
      thumbnail: `https://img.youtube.com/vi/${previewVideoId}/hqdefault.jpg`,
      upvotes: 0,
      liked: false,
    };

    setStreams((prev) => [...prev, newStream]);
    setYoutubeUrl("");
    setPreviewVideoId("");
  };

  // ✅ Toggle like / unlike
  async function handleLike(streamId: string, liked: boolean) {
    try {
      const endpoint = liked
        ? "/api/streams/downvote"
        : "/api/streams/upvote";

      await axios.post(endpoint, { streamId }, { withCredentials: true });

      setStreams((prev) =>
        prev.map((s) =>
          s.id === streamId
            ? {
                ...s,
                liked: !liked,
                upvotes: s.upvotes + (liked ? -1 : 1),
              }
            : s
        )
      );
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  }

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
                        onClick={() => handleLike(stream.id, stream.liked)}
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
                        {stream.upvotes ?? 0}
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

