import "./globals.css";

export const metadata = {
  title: {
    default: "Brizzy Truck Wash | Professional Mobile Truck Cleaning",
    template: "%s | Brizzy Truck Wash",
  },

  description:
    "Professional mobile truck washing services. Fast, reliable, affordable, and high-quality truck cleaning solutions.",

  keywords: [
    "truck wash",
    "mobile truck wash",
    "truck cleaning",
    "professional truck cleaning",
    "fleet washing",
    "Brizzy Truck Wash",
  ],

  authors: [
    {
      name: "Brizzy Truck Wash",
    },
  ],

  creator: "Brizzy Truck Wash",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],

    shortcut: "/favicon.ico",

    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Brizzy Truck Wash | Professional Mobile Truck Cleaning",

    description:
      "Professional mobile truck washing services. Fast, reliable, affordable, and high-quality truck cleaning solutions.",

    type: "website",

    locale: "en_US",

    siteName: "Brizzy Truck Wash",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brizzy Truck Wash",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Brizzy Truck Wash",

    description:
      "Professional mobile truck washing services. Fast, reliable, and affordable.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
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