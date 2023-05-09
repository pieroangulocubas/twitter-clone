import { useRouter } from "next/router"
import {FaFeather} from 'react-icons/fa'
import { useCallback } from "react"
import useLoginModal from "../../hooks/useLoginModal"
import { LoginModal } from "../modals/LoginModal"
export const SidebarTweetButton = () => {
  const router=useRouter()
  const loginModal=useLoginModal()
  const onClick=useCallback(()=>{
     loginModal.onOpen()
  },[LoginModal])

  return (
    <div onClick={onClick}>
      <div
        className="
          mt-6 lg:hidden
          w-14 h-14 p-4
          flex items-center justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition cursor-pointer
          rounded-full
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
        mt-6 hidden
        lg:block px-4 py-2 
        rounded-full
        bg-sky-500
        hover:bg-opacity-90
        cursor-pointer transition 
        "
      > 
        <p className="
          
          text-center font-semibold text-[20px]
          text-white
        ">Tweet</p>
      </div>
    </div>
  )
}