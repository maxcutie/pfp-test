"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface ImageData {
  id: string;
  url: string;
  alt: string;
}

interface AdminButtonProps {
  images: ImageData[];
  onSave: (updatedImages: ImageData[]) => void;
}

export function AdminButton({ images, onSave }: AdminButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editableImages, setEditableImages] = useState<ImageData[]>(images);

  const handleAuthenticate = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    onSave(editableImages);
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleImageChange = (id: string, field: 'alt' | 'url', value: string) => {
    setEditableImages(images =>
      images.map(img => img.id === id ? { ...img, [field]: value } : img)
    );
  };

  const handleAddImage = () => {
    const newId = String(Date.now());
    setEditableImages([...editableImages, { id: newId, url: '', alt: '' }]);
  };

  const handleRemoveImage = (id: string) => {
    setEditableImages(images => images.filter(img => img.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
        </DialogHeader>
        {!isAuthenticated ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleAuthenticate}>Authenticate</Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {editableImages.map((image) => (
              <div key={image.id} className="grid gap-2 border p-4 rounded-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`alt-${image.id}`} className="text-right">
                    Alt
                  </Label>
                  <Input
                    id={`alt-${image.id}`}
                    value={image.alt}
                    className="col-span-3"
                    onChange={(e) => handleImageChange(image.id, 'alt', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`url-${image.id}`} className="text-right">
                    URL
                  </Label>
                  <Input
                    id={`url-${image.id}`}
                    value={image.url}
                    className="col-span-3"
                    onChange={(e) => handleImageChange(image.id, 'url', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button onClick={handleAddImage} className="mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add New Image
            </Button>
            <Button onClick={handleSave} className="mt-4">Save Changes</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}