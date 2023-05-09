import { useEffect, useState } from "react"


interface Props{
  type:string
  placeholder:string
}
export const useField=({type,placeholder}:Props)=>{
  const [value,setValue]=useState('')

  const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }

  useEffect(()=>{
    return ()=>{
      setValue('')
    }
  },[])

  return {
    value,
    onChange,
    placeholder,
    type
  }

}