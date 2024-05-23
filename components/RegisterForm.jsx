"use client"
import { useState } from "react"
import Image from "next/image"
import registerImg from "../public/register.svg"
import skyImg from "../public/sky.svg"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { notifyError, notifySuccess } from "@/utils/notification"
import Input from "./Input"

function RegisterForm() {
  const router = useRouter()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onBlur",
  })

  const onSubmit = async (data) => {
    const res = await fetch("api/Users/register", {
      method: "POST",
      body: JSON.stringify({ user: data }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    switch (res.status) {
      case 201:
        notifySuccess("Користувача успішно створено!")
        return router.push("/login")
      default:
        notifyError("Сталась помилка при створення користувача!")
    }
  }

  return (
    <div className='relative w-full flex items-center justify-center py-32'>
      <div className='px-10 py-8 bg-white dark:bg-slate-800 dark:text-slate-50 w-1/3 rounded-xl shadow-lg flex flex-col'>
        <h2 className='text-center font-semibold text-lg'>
          Ласкаво просимо до
          <span className='text-green-a font-bold'>
            &nbsp;Homework Keeper
          </span>! <br />
          Раді Вас вітати!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {
              required: "Це поле є обов'язковим!",
            })}
            type='text'
            errors={errors?.name}
          >
            Ім&apos;я
          </Input>

          <Input
            type='email'
            {...register("email", {
              required: "Це поле є обов'язковим!",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Емейл має невірний формат!",
              },
            })}
            errors={errors?.email}
          >
            Емейл
          </Input>

          <Input
            {...register("password", {
              required: "Це поле є обов'язковим!",
              minLength: {
                value: 6,
                message: "Мін. довжина пароля 6 символів!",
              },
            })}
            type='password'
            errors={errors?.password}
          >
            Пароль
          </Input>
          <button
            type='submit'
            disable={!isValid}
            className='w-full py-2 px-4 bg-green-a text-white rounded-lg mt-6'
          >
            Зареєструватися
          </button>
        </form>

        <p className='text-sm mt-2'>
          Вже маєте обліковий запис?
          <Link
            href='/login'
            className='ml-3 underline text-green-a font-semibold'
          >
            Увійти
          </Link>
        </p>
        <p className='text-sm underline text-green-a font-semibold'>
          <Link href=''>Забули пароль?</Link>
        </p>
      </div>
      <Image className='absolute bottom-0 right-0 w-1/3' src={registerImg} />
      <Image className='absolute top-0 left-0 w-1/4' src={skyImg} />
    </div>
  )
}

export default RegisterForm
