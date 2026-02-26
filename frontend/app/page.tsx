import Navbar from '@/components/Home/navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B1416]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}