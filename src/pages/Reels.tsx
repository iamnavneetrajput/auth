import React, { useState, useRef, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";

interface Reel {
  id: number;
  video: string;
  user: {
    name: string;
    avatar: string;
  };
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

const reelsData: Reel[] = [
  {
    id: 1,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    user: {
      name: "nature_lover",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    description: "Beautiful yellow flowers blooming 🌸",
    likes: 1234,
    comments: 88,
    shares: 44,
  },
  {
    id: 2,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    user: {
      name: "ocean_vibes",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    description: "Peaceful waves at sunset 🌊",
    likes: 2567,
    comments: 156,
    shares: 89,
  },
];

function ReelPlayer({ reel, isActive }: { reel: Reel; isActive: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatNumber = (num: number): string => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <div className="reel-container">
      <video
        ref={videoRef}
        className="reel-video"
        src={reel.video}
        loop
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="reel-overlay">
        <div className="top-controls">
          <button onClick={toggleMute} className="mute-button">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <div className="side-controls">
          <button onClick={() => setIsLiked(!isLiked)} className={`action-button ${isLiked ? "liked" : ""}`}>
            <Heart size={28} />
            <span className="action-count">{formatNumber(reel.likes)}</span>
          </button>

          <button className="action-button">
            <MessageCircle size={28} />
            <span className="action-count">{formatNumber(reel.comments)}</span>
          </button>

          <button className="action-button">
            <Share2 size={28} />
            <span className="action-count">{formatNumber(reel.shares)}</span>
          </button>
        </div>

        <div className="bottom-controls">
          <div className="user-info">
            <img src={reel.user.avatar} alt={reel.user.name} className="user-avatar" />
            <span className="username">{reel.user.name}</span>
          </div>
          <p className="description">{reel.description}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeekChange}
            className="progress-bar"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll handling using Intersection Observer
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute("data-index") || "0", 10);
        setCurrentReelIndex(index);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.7, // At least 70% of the video must be visible to activate
    });

    const elements = document.querySelectorAll(".reel-wrapper");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div className="app-container" ref={containerRef}>
      {reelsData.map((reel, index) => (
        <div key={reel.id} className="reel-wrapper" data-index={index}>
          <ReelPlayer reel={reel} isActive={index === currentReelIndex} />
        </div>
      ))}
    </div>
  );
}

export default App;
