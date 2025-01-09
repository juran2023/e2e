import { v4 as uuidv4 } from 'uuid'
import { Event } from '../db/models/event.js'

export async function trackEvent({
  postId,
  action,
  session = uuidv4(),
  date = new Date(),
}) {
  const event = new Event({ post: postId, action, session, date })
  return await Event.save(event)
}
