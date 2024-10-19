"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AdminButton } from './admin-button';

interface ImageData {
  id: string;
  url: string;
  alt: string;
}

export function ImageGrid() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API or database
    const dummyImages: ImageData[] = [
      { id: '1', url: 'https://i.imgur.com/k5aOkbZ.jpeg', alt: 'Profile 1' },
      { id: '2', url: 'https://source.unsplash.com/random/300x300?face&2', alt: 'Profile 2' },
      { id: '3', url: 'https://source.unsplash.com/random/300x300?face&3', alt: 'Profile 3' },
      { id: '4', url: 'https://source.unsplash.com/random/300x300?face&4', alt: 'Profile 4' },
      { id: '5', url: 'https://source.unsplash.com/random/300x300?face&5', alt: 'Profile 5' },
      { id: '6', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM3YTRkMzEwMjM5ZmM5ZWFjODJiOTcxNzBjYzQ3NmNhMzA1YjE3YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TKMt1VVNkHV2PaE/giphy.gif', alt: 'Animated GIF' },
    ];
    setImages(dummyImages);
  }, []);

  const handleSaveImages = (updatedImages: ImageData[]) => {
    setImages(updatedImages);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AdminButton images={images} onSave={handleSaveImages} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0 aspect-square relative">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}