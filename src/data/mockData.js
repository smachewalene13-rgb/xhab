// Images live in /public/images. Drop new files there and reference them as '/images/<name>'.
// blur: true  -> blurred teaser (locked look)
// blur: false -> clean, sharp thumbnail
export const featuredVideo = { id: 0, title: 'Featured video', thumbnail: '/images/video1.jpg', blur: false }

export const allVideos = [
  { id: 1,  title: 'ተ*ይ',  thumbnail: '/images/video1.jpg', blur: false },
  { id: 2,  title: 'ሮቤል እያስጨ',  thumbnail: '/images/video2.png', blur: true },
  { id: 3,  title: 'ቁም፡በ*ኝ አልኩት',  thumbnail: '/images/video3.png', blur: true },
  { id: 4,  title: 'እያለቀሱት በ*ወት',  thumbnail: '/images/video1.jpg', blur: false },
  { id: 5,  title: 'ቁም፡ይጥዐዓ',  thumbnail: '/images/video2.png', blur: true },
  { id: 6,  title: 'ተ*ይ',  thumbnail: '/images/video3.png', blur: true },
  { id: 7,  title: 'ሮቤል እያስጨ',  thumbnail: '/images/video1.jpg', blur: false },
  { id: 8,  title: 'ቁም፡በ*ኝ አልኩት',  thumbnail: '/images/video2.png', blur: true },
  { id: 9,  title: 'ቁም፡በ*ኝ አልኩት',  thumbnail: '/images/video3.png', blur: true },
  { id: 10, title: 'እያለቀሱት በ*ወት', thumbnail: '/images/video1.jpg', blur: false },
  { id: 11, title: 'ተ*ይ', thumbnail: '/images/video2.png', blur: true },
  { id: 12, title: 'ሮቤል እያስጨ', thumbnail: '/images/video3.png', blur: true },
]

// The home page only shows the first 7
export const relatedVideos = allVideos.slice(0, 7)
