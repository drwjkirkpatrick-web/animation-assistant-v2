import './globals.css';

export const metadata = {
  title: 'Animation Assistant — Teaching Kids to Animate with Kenya\'s Ocean',
  description: '58 animation lessons for students aged 10–17, themed around Kenya\'s Indian Ocean marine animals. Aligned to Kenya CBE curriculum and Raspberry Pi Foundation standards.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ocean-deep text-sea-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
