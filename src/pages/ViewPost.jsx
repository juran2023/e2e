import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Post } from '../components/Post.jsx'
import { getPostById } from '../api/posts.js'
import { Helmet } from 'react-helmet-async'
import { getUserInfo } from '../api/users.js'

export function ViewPost({ postId }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })

  const post = postQuery.data

  const userQuery = useQuery({
    queryKey: ['users', post?.author],
    queryFn: () => getUserInfo(post?.author),
    enabled: Boolean(post?.author),
  })

  const userInfo = userQuery.data ?? {}

  function truncate(str, max = 160) {
    if (!str) return str
    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    } else {
      return str
    }
  }

  return (
    <div style={{ padding: 8 }}>
      {post && (
        <Helmet>
          <title>{post.title} | Full-Stack React Blog</title>
          <meta property='description' content={truncate(post.contents)} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={post.title} />
          <meta property='og:article:author' content={userInfo.username} />
          <meta property='og:article:published_time' content={post.createdAt} />
          <meta property='og:article:modified_time' content={post.updatedAt} />
          {(post.tags ?? []).map((tag) => (
            <meta key={tag} property='og:article:tag' content={tag} />
          ))}
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <hr />
      {post ? <Post {...post} fullPost /> : `Post with id ${postId} not found.`}
    </div>
  )
}

ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}
