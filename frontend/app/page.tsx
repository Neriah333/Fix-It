import Navbar from '@/components/Home/navbar'
import Menubar from '@/components/Home/menu'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B1416]">
        <Navbar />
        <Menubar />
        <main>{children}</main>
      </body>
    </html>
  )
}