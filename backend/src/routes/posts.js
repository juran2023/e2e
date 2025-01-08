import {
  listAllPosts,
  listAllPostsByAuthor,
  listAllPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deleteOne,
} from '../services/posts.js'

import { requireAuth } from '../middleware/jwt.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listAllPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listAllPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (e) {
      console.error('error listing posts', e)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) {
        res.status(404).end()
      }
      return res.json(post)
    } catch (e) {
      console.error('error getting post', e)
      return res.status(500).end()
    }
  })

  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const post = await createPost(req.auth.sub, req.body)
      return res.json(post)
    } catch (e) {
      console.error(`error createing post`, e)
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const post = await updatePost(req.auth.sub, req.params.id, req.body)
      return res.json(post)
    } catch (e) {
      console.error('error updating post', e)
      return res.status(500).end()
    }
  })

  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteOne(req.auth.sub, req.params.id)
      if (deletedCount === 0) {
        return res.sendStatus(404)
      }
      return res.status(204).end()
    } catch (e) {
      console.error('error deleting post', e)
      return res.status(500).end()
    }
  })
}
