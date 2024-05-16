"use client"
import React, { useState } from "react"
import Image from "next/image"
import loginImg from "../public/login.svg"
import skyImg from "../public/sky.svg"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loader from "./Loader"
import { notifyError, notifySuccess } from "@/utils/notification"
import Input from "./Input"
import { useForm } from "react-hook-form"

function AuthForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  })
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    setIsLoading(true)
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (res.ok) {
      setIsLoading(false)
      notifySuccess("Авторизація успішна!")
      router.push("/dashboard")
    } else {
      notifyError("Сталась помилка!")
      setIsLoading(false)
    }
  }

  return (
    <div className='relative w-full flex items-center justify-center py-32'>
      <form
        className='px-10 py-8 bg-white dark:bg-slate-800 dark:text-slate-50 w-1/3 rounded-xl shadow-lg flex flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <h2 className='text-center font-semibold text-lg mb-4'>
              З поверненням до
              <span className='text-green-a font-bold'>
                &nbsp;Homework Keeper
              </span>
              ! <br />
              Раді Вас бачити!
            </h2>
            <Input
              type='text'
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Емейл має невірний формат!",
                },
              })}
              errors={errors?.email}
            >
              Емейл:
            </Input>
            <Input
              type='password'
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Мін. довжина пароля 6 символів!",
                },
              })}
              errors={errors?.password}
            >
              Пароль:
            </Input>
            <button
              type='submit'
              disable={!isValid}
              className='py-2 px-4 bg-green-a text-white rounded-lg mt-6'
            >
              Увійти
            </button>
            <p className='text-sm mt-2'>
              Вперше на нашій платформі?
              <Link
                href='/register'
                className='underline text-green-a font-semibold'
              >
                &nbsp;Зареєструватися
              </Link>
            </p>
            <p className='text-sm'>
              <Link href=''>Забули пароль?</Link>
            </p>
          </>
        )}
      </form>
      <Image className='absolute bottom-0 right-0 w-1/3' src={loginImg} />
      <Image className='absolute top-0 left-0 w-1/4' src={skyImg} />
    </div>
  )
}

export default AuthForm
