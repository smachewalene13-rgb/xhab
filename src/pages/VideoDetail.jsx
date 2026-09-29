import { getAllVideos, getVideo } from '../api'
import { useAsync } from '../hooks/useAsync'
import { usePlayback } from '../hooks/usePlayback'
import { useShare } from '../hooks/useShare'
import { useAuth } from '../context/AuthContext'
import { useLikes } from '../context/LikesContext'
import { useUI } from '../context/UIContext'
import VideoPlayer from '../components/video/VideoPlayer'
import RelatedVideos from '../components/video/RelatedVideos'
import PendingNotice from '../components/common/PendingNotice'
import Footer from '../components/layout/Footer'
import { BellIcon, CheckIcon, HeartIcon, ShareIcon } from '../components/common/Icons'

const chip = 'flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition'
const MORE_COUNT = 6

/** Rendered with key={id} in App, so navigating video → video reloads everything cleanly. */
export default function VideoDetail({ id }) {
  const video = useAsync(() => getVideo(id))
  const all = useAsync(getAllVideos, [])
  const { subscription } = useAuth()
  const { openModal } = useUI()
  const { isLiked, toggleLike } = useLikes()
  const requestPlayback = usePlayback()
  const share = useShare(video.data?.title)

  if (video.error) {
    return (
      <main className="pt-14 pb-24 mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-xl font-bold mb-2">Video not found</p>
        <p className="text-gray-400 text-sm mb-6">It may have been removed or the link is wrong.</p>
        <a href="#/videos" className="inline-block bg-brand hover:bg-brand-dark px-6 py-3 rounded-lg font-bold transition">Browse all videos</a>
      </main>
    )
  }

  const liked = isLiked(id)
  const more = all.data.filter((v) => v.id !== id).slice(0, MORE_COUNT)

  return (
    <main className="pt-14 pb-24 mx-auto max-w-3xl">
      <VideoPlayer video={video.data} loading={video.loading} onPlay={requestPlayback} />

      <div className="px-4 py-5">
        <a href="#/videos" className="inline-block text-sm text-gray-400 hover:text-white mb-4">‹ All videos</a>
        <PendingNotice />

        <h1 className="text-xl font-bold mb-4">{video.data?.title ?? '\u00A0'}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button className={chip} onClick={() => toggleLike(id)} aria-pressed={liked}>
            <HeartIcon className="text-brand" fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Liked' : 'Like'}
          </button>
          <button className={chip} onClick={share}><ShareIcon /> Share</button>
          {!subscription && (
            <button onClick={() => openModal('pricing')}
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark px-4 py-2 rounded-full text-sm font-semibold ml-auto transition">
              <BellIcon /> Subscribe
            </button>
          )}
        </div>

        <div className="flex gap-5 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-1.5"><CheckIcon className="text-brand" /> HD Quality</span>
          <span className="flex items-center gap-1.5"><CheckIcon className="text-brand" /> Unlimited Access</span>
        </div>

        <h2 className="text-xl font-bold mb-4">More Videos</h2>
        <RelatedVideos videos={more} loading={all.loading} />

        <a href="#/videos" className="block text-center w-full bg-brand hover:bg-brand-dark font-bold py-3 rounded-lg mt-8 transition">
          View all videos
        </a>

        <Footer />
      </div>
    </main>
  )
}
