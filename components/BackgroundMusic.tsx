"use client";

import { useRef, useState } from "react";

const musicSrc = process.env.NEXT_PUBLIC_BACKGROUND_MUSIC_SRC?.trim();

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!musicSrc) {
    return null;
  }

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.volume = 0.32;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio loop preload="none" ref={audioRef} src={musicSrc}>
        <track kind="captions" />
      </audio>
      <button
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-[#07100f]/92 text-lg font-semibold text-[#f9e6bf] shadow-[0_16px_42px_rgba(0,0,0,0.35)] transition hover:bg-[#10201d] focus:outline-none focus:ring-2 focus:ring-[#d9a85f]/55"
        onClick={toggle}
        title={playing ? "暂停背景音乐" : "播放背景音乐"}
        type="button"
      >
        {playing ? "静" : "音"}
      </button>
    </>
  );
}
