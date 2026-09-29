import { BLUR_THUMBNAILS } from '../../config/app'
import { useLikes } from '../../context/LikesContext'
import { HeartIcon, LockIcon, PlayIcon } from '../common/Icons'

/** Clicking the card opens the detail page (#/video/:id). The heart likes without leaving the list. */
export default function VideoCard({ video }) {
  const { isLiked, toggleLike } = useLikes()
  const liked = isLiked(video.id)
  const blur = video.blur ?? BLUR_THUMBNAILS

  return (
    <div className="relative bg-card rounded-xl overflow-hidden">
      <a href={`#/video/${video.id}`} className="block hover:brightness-110 transition">
        <div className="relative aspect-video bg-line overflow-hidden">
          <img src={video.thumbnail} alt="" loading="lazy"
            className={`w-full h-full object-cover ${blur ? 'opacity-70 blur-lg scale-110' : ''}`} />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
              <PlayIcon className="ml-0.5" />
            </span>
          </span>
          <LockIcon className="absolute top-3 right-3 text-white/80" />
        </div>
        <div className="p-3 pr-12">
          <h3 className="font-semibold text-sm">{video.title}</h3>
        </div>
      </a>

      <button onClick={() => toggleLike(video.id)} aria-pressed={liked} aria-label={liked ? 'Unlike' : 'Like'}
        className="absolute bottom-2 right-2 p-2 rounded-full text-lg hover:bg-white/10 transition">
        <HeartIcon className={liked ? 'text-brand' : 'text-gray-400'} fill={liked ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}
