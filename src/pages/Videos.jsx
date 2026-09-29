import { getAllVideos } from '../api'
import { useAsync } from '../hooks/useAsync'
import RelatedVideos from '../components/video/RelatedVideos'
import Footer from '../components/layout/Footer'

export default function Videos() {
  const videos = useAsync(getAllVideos, [])

  return (
    <main className="pt-14 pb-24 mx-auto max-w-3xl">
      <div className="px-4 py-5">
        <a href="#/" className="inline-block text-sm text-gray-400 hover:text-white mb-4">‹ Back to home</a>
        <h1 className="text-xl font-bold mb-4">All Videos</h1>
        <RelatedVideos videos={videos.data} loading={videos.loading} />
        <Footer />
      </div>
    </main>
  )
}
