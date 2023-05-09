import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from "react"
import { toast } from 'react-hot-toast'
import { useField } from "../../hooks/useField"
import useLoginModal from "../../hooks/useLoginModal"
import useRegisterModal from "../../hooks/useRegisterModal copy"
import { Input } from "../Input"
import { Modal } from "../Modal"
export const RegisterModal = () => {
  const registerModal=useRegisterModal()
  const loginModal=useLoginModal()
  const EmailInput=useField({type:"text",placeholder:"Email"})
  const PasswordInput=useField({type:"password",placeholder:"Password"})
  const NameInput=useField({type:"text",placeholder:"Name"})
  const UsernameInput=useField({type:"text",placeholder:"Username"})
  const [isLoading,setIsLoading]=useState(false)

  const onToggle=useCallback(()=>{
    if(isLoading) return

    registerModal.onClose()
    loginModal.onOpen()
  },[isLoading,registerModal,loginModal])

  const onSubmit=useCallback(async ()=>{
    try{
      setIsLoading(true)
      //ToDo ADD REGISTER AND LOGIN
      await axios.post('/api/register',{
        email:EmailInput.value,
        password:PasswordInput.value,
        username:UsernameInput.value,
        name:NameInput.value
      })
      toast.success('Account created')  
      signIn('credentials',{
        email:EmailInput.value,
        password:PasswordInput.value
      })

      registerModal.onClose()
    }catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }finally{
      setIsLoading(false)
    }
  },[registerModal,EmailInput.value,UsernameInput.value,PasswordInput.value,NameInput.value])

  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Input {...NameInput} disabled={isLoading} />
      <Input {...UsernameInput} disabled={isLoading} />
      <Input {...EmailInput} disabled={isLoading} />
      <Input {...PasswordInput} disabled={isLoading} />
    </div>
  )

  const footerContent=  (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
        onClick={onToggle} 
        className="text-white cursor-pointer hover:underline ml-1">Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}