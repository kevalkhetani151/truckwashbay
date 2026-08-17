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
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body className="antialiased bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}