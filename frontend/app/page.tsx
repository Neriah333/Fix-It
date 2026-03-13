import Navbar from '@/components/Home/navbar'
import Menubar from '@/components/Home/menu'
import { AuthProvider } from '@/context/AuthContext' // Import here
import HomePage from './post/[id]/page'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <main className="bg-[#0B1416]">
        <AuthProvider> 
          <Navbar />
          <div className="flex">
             <Menubar />
             <HomePage/>
             <main className="flex-1">{children}</main>
          </div>
          
        </AuthProvider>
        
      </main>
    
  )
}