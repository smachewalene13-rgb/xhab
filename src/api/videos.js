import { USE_MOCK_API } from '../config/app'
import { ApiError, request } from './client'
import { delay } from './mock'
import { allVideos, featuredVideo, relatedVideos } from '../data/mockData'

/** GET /videos/featured -> { id, title, thumbnail, blur } */
export async function getFeaturedVideo() {
  if (USE_MOCK_API) { await delay(300); return featuredVideo }
  return request('/videos/featured')
}

/** GET /videos/related -> [{ id, title, thumbnail, blur }] */
export async function getRelatedVideos() {
  if (USE_MOCK_API) { await delay(500); return relatedVideos }
  return request('/videos/related')
}

/** GET /videos -> [{ id, title, thumbnail, blur }]  (full catalogue) */
export async function getAllVideos() {
  if (USE_MOCK_API) { await delay(500); return allVideos }
  return request('/videos')
}

/** GET /videos/:id -> { id, title, thumbnail, blur }  (404 if it doesn't exist) */
export async function getVideo(id) {
  if (USE_MOCK_API) {
    await delay(300)
    const found = [featuredVideo, ...allVideos].find((v) => v.id === Number(id))
    if (!found) throw new ApiError('Video not found', 404)
    return found
  }
  return request(`/videos/${id}`)
}
