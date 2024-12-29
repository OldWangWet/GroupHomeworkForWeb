'use client'; // 确保这是一个客户端组件

import { useState, useEffect } from 'react';
import { getNewsById } from '../../../lib/api';
import LikeButton from '../../../components/LikeButton';
import Image from 'next/image';

export default function NewsDetail({ params }: { params: { id: string } }) {
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    // 获取新闻详情数据
    const fetchData = async () => {
      const fetchedNews = await getNewsById(params.id);
      setNews(fetchedNews);

      // 调用 traceuser 函数
      if (typeof (window as any).traceuser === 'function') {
        const category = fetchedNews.category || 'unknown';
        (window as any).traceuser(category, 1);
      }
    };

    fetchData();
  }, [params.id]);

  if (!news) {
    return <div>加载中...</div>; // 数据未加载时的占位内容
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{news.name}</h1>
      <Image
        src={news.image}
        alt={news.name}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-600 mb-4">分类: {news.category}</p>
      <p className="text-gray-800 mb-6">{news.description}</p>
      <LikeButton initialLikes={news.price} newsId={news.id} />
    </div>
  );
}
