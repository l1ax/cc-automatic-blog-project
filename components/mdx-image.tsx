'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MDXImageProps {
  src: string;
  alt: string;
  title?: string;
}

export function MDXImage({ src, alt, title }: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Check if the image is external or local
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  if (error) {
    return (
      <div className="my-6 sm:my-8 bg-bg-tertiary border border-border rounded-lg p-6 sm:p-8 text-center">
        <p className="text-text-secondary text-sm sm:text-base">图片加载失败</p>
        <p className="text-text-muted text-xs sm:text-sm mt-2 break-all">{alt}</p>
      </div>
    );
  }

  return (
    <div className="my-6 sm:my-8 relative group">
      <div className={`relative overflow-hidden rounded-lg bg-bg-tertiary ${isLoading ? 'animate-pulse' : ''}`}>
        <Image
          src={src}
          alt={alt}
          title={title}
          width={1200}
          height={630}
          className="w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          priority={false}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      </div>
      {title && (
        <p className="text-center text-text-muted text-xs sm:text-sm mt-2 sm:mt-3 italic">
          {title}
        </p>
      )}
    </div>
  );
}
