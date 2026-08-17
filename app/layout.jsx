import "./globals.css";

export const metadata = {
  title: "Brizzy Truck Wash | Professional Mobile Truck Cleaning",
  description:
    "Professional truck washing services. Fast, reliable, and affordable truck cleaning solutions.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Brizzy Truck Wash",
    description: "Professional truck washing services.",
    images: ["/logo3.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}