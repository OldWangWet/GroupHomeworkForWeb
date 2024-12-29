'use client'

import { useState } from 'react'
import { updateLikes } from '../lib/api'

interface LikeButtonProps {
  initialLikes: number
  newsId: string
}

export default function LikeButton({ initialLikes, newsId }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    if (!isLiked) {
      const newLikes = likes + 1
      setLikes(newLikes)
      setIsLiked(true)
      try {
        await updateLikes(newsId, newLikes)
      } catch (error) {
        console.error('更新点赞失败:', error)
        setLikes(likes)
        setIsLiked(false)
      }
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded-lg ${
        isLiked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      点赞 ({likes})
    </button>
  )
}

