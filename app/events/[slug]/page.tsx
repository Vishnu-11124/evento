import { notFound } from 'next/navigation';
import React from 'react'

const PostDetails = async ({params}: {params: Promise<{slug: string}>}) => {
  const { slug } = await params;
  const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`);

  const { event } = await request.json()

  if(!event) return notFound()

  console.log("event", event)
    
  return (
    <section id="events-page">
      <h1>Events Page</h1>
    </section>
  )
}

export default PostDetails
