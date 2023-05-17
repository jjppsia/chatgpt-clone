import { Icons } from '@/components/icons'
import { LoginButton } from '@/components/login-button'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='p-4 text-center'>
        <Icons.messageCircle className='mx-auto h-16 w-16' />
        <h2 className='mt-5 text-4xl font-bold'>Welcome to ChatJPS</h2>
        <p className='mt-4'>Login with your Google account</p>
        <LoginButton />
      </div>
    </div>
  )
}
