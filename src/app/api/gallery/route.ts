import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'wedding');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

export async function GET() {
  try {
    const files = fs.readdirSync(GALLERY_DIR);
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTENSIONS.has(ext);
      })
      .sort()
      .map((file) => ({
        src: `/assets/images/wedding/${file}`,
        alt: file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
