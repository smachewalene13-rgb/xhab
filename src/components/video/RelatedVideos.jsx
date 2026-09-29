import VideoCard from './VideoCard'

export default function RelatedVideos({ videos, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-line" />
            <div className="p-3"><div className="h-3 w-2/3 bg-line rounded" /></div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map((v) => <VideoCard key={v.id} video={v} />)}
    </div>
  )
}
