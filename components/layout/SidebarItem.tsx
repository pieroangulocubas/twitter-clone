import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {IconType} from 'react-icons'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import useLoginModal from '../../hooks/useLoginModal'
interface SidebarItemProps{
  label:string
  href?:string
  icon:IconType
  onClick?:()=>void
  auth?:boolean
}
export const SidebarItem:React.FC<SidebarItemProps> = ({label,href,icon:Icon,onClick,auth}) => {
  const router=useRouter()
  const {data:currentUser}=useCurrentUser()
  const loginModal=useLoginModal()
  const handleClick=useCallback(()=>{
    if(onClick){
      return onClick()
    } 

    if(!currentUser && auth){
      loginModal.onOpen()
    }
    else if(href){
      router.push(href)
    }
    
  },[router,onClick,href,currentUser,auth, loginModal])
  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div
        className='relative rounded-full 
          h-14 w-14 p-4
          flex items-center justify-center
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
          lg:hidden
        '
        >
        <Icon size={28} color="white" />
      </div>
      <div
        className='
          relative roundend-full
          hidden p-4
          lg:flex items-center gap-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        '
      >
        <Icon size={24} color='white' />
        <p className='hidden lg:block text-white text-xl'>{label}</p>
      </div>
    </div>
  )
}