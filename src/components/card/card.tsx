import { FC } from 'react'
import { respObj } from '../../lib/api/todo'

interface CardProps {
  posts: Array<respObj>
}

const Card: FC<CardProps> = ({ posts }) => {
  return (
    <div className=' grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-3'>
      {posts.map((post, idx) => {
        return (
          <div key={idx} className='bg-gray-300 p-5 '>
            <p>{post.title}</p>
            <div className='flex flex-row gap-5 items-center'>
              <p>{post.reactions.likes}</p>
              <p>{post.reactions.dislikes}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Card
