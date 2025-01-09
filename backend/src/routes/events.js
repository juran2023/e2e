import { trackEvent } from '../services/events.js'
import { getPostById } from '../services/posts.js'

export function eventRoutes(app) {
  app.post('/api/v1/events', async (req, res) => {
    try {
      const { postId, session, action } = req.body
      console.log(`postId: ${postId}`)
      const post = await getPostById(postId)
      console.log(`请求到的post: ${post}`)
      if (post === null) return res.status(400).end()
      const event = await trackEvent({ postId, session, action })
      return res.json({ session: event.session })
    } catch (e) {
      console.error('error tracking event', e)
      return res.status(500).end()
    }
  })
}
