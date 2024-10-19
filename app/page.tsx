import { ImageGrid } from '@/components/image-grid';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Pictures</h1>
        <ThemeToggle />
      </header>
      <main>
        <ImageGrid />
      </main>
    </div>
  );
}