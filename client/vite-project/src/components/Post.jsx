import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShareButton from './ShareButton';

const Post = ({ post }) => {
  const { t } = useTranslation();
  const postUrl = window.location.origin + `/blog/${post.slug}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <ShareButton url={postUrl} title={post.title} />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t('readMore')}
        </Link>
      </div>
    </div>
  );
};

export default Post; 