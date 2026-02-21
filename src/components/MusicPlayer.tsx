import { Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=classical-piano-waltz-11394.mp3'); // Royalty free waltz
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed", e));
      }
    }
  }));

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-gold hover:scale-110 transition-transform"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
});

export default MusicPlayer;
