import { BLUR_THUMBNAILS } from '../../config/app'
import { LockIcon, PlayIcon } from '../common/Icons'

/** Hero player. It's a poster + play button: pressing play calls onPlay (paywall in the demo). */
export default function VideoPlayer({ video, onPlay, loading }) {
  const blur = video?.blur ?? BLUR_THUMBNAILS
  return (
    <div className="relative w-full aspect-video bg-card overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-card to-line animate-pulse" />
      ) : (
        <img src={video.thumbnail} alt={video.title}
          className={`w-full h-full object-cover ${blur ? 'opacity-60 blur-xl scale-110' : 'opacity-90'}`} />
      )}
      <button onClick={onPlay} aria-label="Play video"
        className="absolute inset-0 m-auto w-20 h-20 bg-brand hover:bg-brand-dark rounded-full flex items-center justify-center text-4xl transition">
        <PlayIcon className="ml-1" />
      </button>
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 text-xs px-2.5 py-1 rounded-full">
        <LockIcon /> Subscribers only
      </span>
    </div>
  )
}
