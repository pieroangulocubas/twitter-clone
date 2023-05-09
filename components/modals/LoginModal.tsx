import { useCallback, useState } from "react"
import useLoginModal from "../../hooks/useLoginModal"
import { Input } from "../Input"
import { useField } from "../../hooks/useField"
import { Modal } from "../Modal"
import useRegisterModal from "../../hooks/useRegisterModal copy"
import {signIn} from 'next-auth/react'
export const LoginModal = () => {
  const loginModal=useLoginModal()
  const registerModal=useRegisterModal()
  const EmailInput=useField({type:"text",placeholder:"Email"})
  const PasswordInput=useField({type:"password",placeholder:"Password"})
  const [isLoading,setIsLoading]=useState(false)


  const onToggle=useCallback(()=>{
  if(isLoading) return
 
  loginModal.onClose()
  registerModal.onOpen()
  },[isLoading,registerModal,loginModal])

  const onSubmit=useCallback(async ()=>{
    try{
      setIsLoading(true)
      //ToDo ADD LOG IN
      await signIn('credentials',{
        email:EmailInput.value,
        password:PasswordInput.value
      })

      loginModal.onClose()
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  },[loginModal,EmailInput.value,PasswordInput.value])

  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Input {...EmailInput} disabled={isLoading} />
      <Input {...PasswordInput} disabled={isLoading} />
    </div>
  )
  
    const footerContent=  (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twitter?
        <span
        onClick={onToggle} 
        className="text-white cursor-pointer hover:underline ml-1">Create an account</span>
      </p>
    </div>
  )


  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}