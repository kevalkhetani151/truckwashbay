import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Brizzy Truck Wash | Professional Mobile Truck Cleaning</title>

        <meta
          name="description"
          content="Professional truck washing services. Fast, reliable, and affordable truck cleaning solutions."
        />

        {/* Favicon */}
        <link rel="icon" href="./icon2.png" />
        <link rel="shortcut icon" href="./icon2.png" />
        <link rel="apple-touch-icon" href="./icon2.png" />

        {/* Optional */}
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Brizzy Truck Wash" />
        <meta
          property="og:description"
          content="Professional truck washing services."
        />
        <meta property="og:image" content="/icon2.png" />
      </head>

      <body className="antialiased bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}