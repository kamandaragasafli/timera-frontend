/**
 * Polotno Design Generator
 * Programmatically creates social media post designs
 */

import { createStore } from 'polotno/model/store';

export interface DesignSpecs {
  backgroundColor?: string;
  backgroundImage?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  title?: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
  };
  content?: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
  };
  shapes?: Array<{
    type: 'rect' | 'circle';
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    opacity?: number;
  }>;
}

export interface GenerateDesignOptions {
  width?: number;
  height?: number;
  format?: 'square' | 'story' | 'landscape';
}

/**
 * Get dimensions based on format
 */
function getDimensions(format: 'square' | 'story' | 'landscape') {
  switch (format) {
    case 'square':
      return { width: 1080, height: 1080 }; // Instagram square
    case 'story':
      return { width: 1080, height: 1920 }; // Instagram story
    case 'landscape':
      return { width: 1200, height: 630 }; // Facebook post
    default:
      return { width: 1080, height: 1080 };
  }
}

/**
 * Generate design programmatically using Polotno
 */
export async function generateDesign(
  specs: DesignSpecs,
  options: GenerateDesignOptions = {}
): Promise<string> {
  const { format = 'square' } = options;
  const { width, height } = getDimensions(format);

  // Create store (in-memory, no UI)
  const store = createStore({ key: process.env.NEXT_PUBLIC_POLOTNO_KEY || 'demo-key' });
  
  // Set canvas size
  const page = store.addPage();
  page.set({ width, height });

  // 1. Background
  if (specs.backgroundColor) {
    page.set({ background: specs.backgroundColor });
  }

  // 2. Background Image
  if (specs.backgroundImage) {
    page.addElement({
      type: 'image',
      src: specs.backgroundImage,
      x: 0,
      y: 0,
      width,
      height,
      selectable: false,
    });
  }

  // 3. Overlay
  if (specs.overlayColor) {
    page.addElement({
      type: 'svg',
      src: `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${specs.overlayColor}"/></svg>`,
      x: 0,
      y: 0,
      width,
      height,
      opacity: specs.overlayOpacity || 0.3,
      selectable: false,
    });
  }

  // 4. Decorative Shapes
  if (specs.shapes) {
    specs.shapes.forEach((shape) => {
      if (shape.type === 'rect') {
        page.addElement({
          type: 'svg',
          src: `<svg width="${shape.width}" height="${shape.height}"><rect width="${shape.width}" height="${shape.height}" fill="${shape.fill}"/></svg>`,
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
          opacity: shape.opacity || 1,
        });
      } else if (shape.type === 'circle') {
        const radius = shape.width / 2;
        page.addElement({
          type: 'svg',
          src: `<svg width="${shape.width}" height="${shape.height}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="${shape.fill}"/></svg>`,
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
          opacity: shape.opacity || 1,
        });
      }
    });
  }

  // 5. Title Text
  if (specs.title) {
    page.addElement({
      type: 'text',
      text: specs.title.text,
      x: specs.title.x,
      y: specs.title.y,
      fontSize: specs.title.fontSize,
      fill: specs.title.color,
      fontFamily: specs.title.fontFamily || 'Roboto',
      align: specs.title.align || 'center',
      width: width - 100, // Leave margins
    });
  }

  // 6. Content Text
  if (specs.content) {
    page.addElement({
      type: 'text',
      text: specs.content.text,
      x: specs.content.x,
      y: specs.content.y,
      fontSize: specs.content.fontSize,
      fill: specs.content.color,
      fontFamily: specs.content.fontFamily || 'Roboto',
      align: specs.content.align || 'center',
      width: width - 100,
    });
  }

  // Export to image
  const dataURL = await store.toDataURL({ pixelRatio: 2 }); // 2x for quality
  
  return dataURL;
}

/**
 * Create default design specs from post content
 */
export function createDefaultDesignSpecs(
  title: string,
  content: string,
  backgroundImage?: string
): DesignSpecs {
  return {
    backgroundColor: '#6366f1', // Indigo
    backgroundImage,
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    title: {
      text: title,
      x: 50,
      y: 200,
      fontSize: 72,
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      align: 'center',
    },
    content: {
      text: content,
      x: 50,
      y: 700,
      fontSize: 36,
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      align: 'center',
    },
    shapes: [
      {
        type: 'rect',
        x: 50,
        y: 150,
        width: 120,
        height: 8,
        fill: '#fbbf24', // Amber accent
        opacity: 1,
      },
    ],
  };
}


