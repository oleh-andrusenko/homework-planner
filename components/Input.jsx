import ErrorPage from "@/app/error"
import { forwardRef } from "react"
import InputError from "./InputError"

const Input = forwardRef((props, ref) => {
  const { children, errors, ...otherProps } = props
  return (
    <div className='grid grid-rows-1 grid-cols-4 my-2 w-full relative'>
      <label className='mr-2 col-span-1'>{children}</label>
      <input
        {...otherProps}
        ref={ref}
        className='py-1 px-2 border-2 rounded-md focus:outline-none focus:border-green-a col-span-3 text-black'
      />
      {errors && <InputError error={errors.message} />}
    </div>
  )
})

export default Input
