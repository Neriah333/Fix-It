import Navbar from '@/components/Home/navbar'
import Menubar from '@/components/Home/menu'
import { AuthProvider } from '@/context/AuthContext' // Import here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B1416]">
        <AuthProvider> 
          <Navbar />
          <div className="flex">
             <Menubar />
             <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}