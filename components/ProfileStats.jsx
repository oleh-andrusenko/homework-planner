"use client"
import { useGetStatsQuery } from "@/redux/statsApi"
import { useSession } from "next-auth/react"
import StatsTile from "./StatsTile"
import Loader from "./Loader"
import { IoReload } from "react-icons/io5"

function ProfileStats() {
  const { data: session } = useSession()
  const {
    data: stats,
    isLoading,
    refetch,
  } = useGetStatsQuery(session?.user?.email, {
    refetchOnMountOrArgChange: true,
  })

  if (!isLoading && stats.totalStats.totalTasks === 0)
    return (
      <p className='px-4 py-6 rounded-lg shadow-lg w-full mt-10 bg-white dark:bg-slate-800 dark:text-slate-50'>
        Для перегляду статистики створіть завдання на панелі завдань...
      </p>
    )
  return (
    <div className='w-full'>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h4 className='font-bold my-4 text-xl text-green-a border-b-2'>
            Загальна статистика
          </h4>
          <div className='relative flex gap-4'>
            <div className='p-4 bg-white  dark:bg-slate-800  rounded-lg shadow-lg flex items-end gap-4'>
              <p className='text-2xl font-bold text-green-a'>Завдань</p>
              <p className='text-5xl font-semibold text-slate-800 dark:text-slate-50'>
                {stats.totalStats.totalTasks}
              </p>
            </div>
            <div className='p-4 bg-white dark:bg-slate-800  rounded-lg shadow-lg flex items-end gap-4  '>
              <p className='text-2xl font-bold text-green-a'>Предметів</p>
              <p className='text-5xl font-semibold text-slate-800 dark:text-slate-50'>
                {stats.subjectsStats.length}
              </p>
            </div>
            <div className='p-4 bg-white dark:bg-slate-800  rounded-lg shadow-lg flex items-end gap-4  '>
              <p className='text-2xl font-bold text-green-a'>Ефективність</p>
              <p className='text-5xl font-semibold text-slate-800 dark:text-slate-50'>
                {Math.round(
                  (stats.totalStats.totalCompletedTasks /
                    stats.totalStats.totalTasks) *
                    100
                )}
                %
              </p>
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <h4 className='font-bold my-4 text-xl text-green-a border-b-2'>
            Статистика виконання завдань за предметами
          </h4>
          <div className='flex gap-4 flex-wrap'>
            {stats.subjectsStats.map((item) => (
              <StatsTile
                key={item.subject._id}
                title={item.subject}
                total={item.totalTasks}
                color={item.subjectColor}
                completed={item.completedTasks}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileStats
