import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RUMES LUXURY | Indian Fine Jewellery',
  description: 'Shop premium handcrafted luxury jewellery in India with AR Try-On.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
