import { getFeaturedVideo, getRelatedVideos } from '../api'
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

export default function Home() {
  const featured = useAsync(getFeaturedVideo)
  const related = useAsync(getRelatedVideos, [])
  const { subscription } = useAuth()
  const { openModal } = useUI()
  const { isLiked, toggleLike } = useLikes()
  const requestPlayback = usePlayback()
  const share = useShare('Wowhabesha')
  const featuredLiked = isLiked(0)

  return (
    <main className="pt-14 pb-24 mx-auto max-w-3xl">
      <VideoPlayer video={featured.data} loading={featured.loading} onPlay={requestPlayback} />

      <div className="px-4 py-5">
        <PendingNotice />

        <h1 className="text-xl font-bold mb-4">{featured.data?.title ?? '\u00A0'}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button className={chip} onClick={() => toggleLike(0)} aria-pressed={featuredLiked}>
            <HeartIcon className="text-brand" fill={featuredLiked ? 'currentColor' : 'none'} /> {featuredLiked ? 'Liked' : 'Like'}
          </button>
          <button className={chip} onClick={share}><ShareIcon /> Share</button>
          {!subscription && (
            <button onClick={() => openModal('pricing')} className="flex items-center gap-2 bg-brand hover:bg-brand-dark px-4 py-2 rounded-full text-sm font-semibold ml-auto transition">
              <BellIcon /> Subscribe
            </button>
          )}
        </div>

        <div className="flex gap-5 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-1.5"><CheckIcon className="text-brand" /> HD Quality</span>
          <span className="flex items-center gap-1.5"><CheckIcon className="text-brand" /> Unlimited Access</span>
        </div>

        <h2 className="text-xl font-bold mb-4">Related Videos</h2>
        <RelatedVideos videos={related.data} loading={related.loading} />

        <a href="#/videos" className="block text-center w-full bg-brand hover:bg-brand-dark font-bold py-3 rounded-lg mt-8 transition">
          More Video
        </a>

        <Footer />
      </div>
    </main>
  )
}
