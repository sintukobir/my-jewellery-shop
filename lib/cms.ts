import fs from 'fs';
import path from 'path';

export interface ProductData {
  id: string;
  title: string;
  category: string;
  price: number;
  original_price: number;
  stock: number;
  image: string;
  description: string;
}

export function getAllProducts(): ProductData[] {
  const contentDir = path.join(process.cwd(), 'content/products');
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files.map((file) => {
    const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    
    // Extract frontmatter key-values
    const titleMatch = rawContent.match(/title:\s*["']?(.*?)["']?$/m);
    const idMatch = rawContent.match(/id:\s*["']?(.*?)["']?$/m);
    const categoryMatch = rawContent.match(/category:\s*["']?(.*?)["']?$/m);
    const priceMatch = rawContent.match(/price:\s*(\d+)/m);
    const origPriceMatch = rawContent.match(/original_price:\s*(\d+)/m);
    const imageMatch = rawContent.match(/image:\s*["']?(.*?)["']?$/m);

    return {
      id: idMatch ? idMatch[1] : file.replace('.md', ''),
      title: titleMatch ? titleMatch[1] : 'Gold Jewellery',
      category: categoryMatch ? categoryMatch[1] : 'Necklace',
      price: priceMatch ? Number(priceMatch[1]) : 1200,
      original_price: origPriceMatch ? Number(origPriceMatch[1]) : 2500,
      stock: 10,
      image: imageMatch ? imageMatch[1] : '/media/placeholder.jpg',
      description: 'Handcrafted premium designer jewellery item.'
    };
  });
}
