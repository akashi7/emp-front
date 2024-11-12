/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, Input } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BsChatDots, BsSendFill } from 'react-icons/bs'
import { CiStar } from 'react-icons/ci'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoCalendarNumberOutline, IoCloseOutline } from 'react-icons/io5'
import { LuFileEdit } from 'react-icons/lu'
import { MdDeleteOutline, MdOutlineKeyboardVoice } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import Bubble from '../../assets/img/buble1.png'
import icon from '../../assets/onesvg.svg'
import iconThree from '../../assets/threesvg.svg'
import iconTwo from '../../assets/twosvg.svg'
import handleAPIRequests from '../../helpers/handleApiRequest'
import {
  Todo,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from '../../lib/api/todo'
import { RootState } from '../../lib/redux/store'
import CustomImage from '../common/image/customImage'
import Notify from '../common/notification/notification'

interface AllTasksProps {
  todos: Todo[]
  t: (key: string) => string
}

export default function AllTasks({ todos, t }: AllTasksProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const [drawerVisible, setDrawerVisible] = useState(false) // Add state for drawer visibility
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggleMenu = useCallback((idx: number) => {
    setOpenMenuIndex((prevIdx) => (prevIdx === idx ? null : idx))
  }, [])

  const handleEdit = useCallback((todo: Todo) => {
    const isCompleted = todo.completed ? false : true
    const obj = {
      id: todo.id,
      completed: isCompleted,
    }
    handleAPIRequests({
      request: editTodo,
      ...obj,
      onSuccess: onEditSuccess,
    })
  }, [])

  const handleDelete = useCallback((todo: Todo) => {
    const obj = {
      id: todo.id,
    }
    handleAPIRequests({
      request: deleteTodo,
      ...obj,
      onSuccess: onDeleteSuccess,
    })
  }, [])

  const onEditSuccess = () => {
    Notify({
      description: `${t('Edited Successfully')}`,
    })
    setOpenMenuIndex(null)
  }

  const onDeleteSuccess = () => {
    Notify({
      description: `${t('Deleted Successfully')}`,
    })
    setOpenMenuIndex(null)
  }

  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev)
  }

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  return (
    <>
      <Drawer
        placement='right'
        onClose={toggleDrawer}
        closeIcon={false}
        open={drawerVisible}
        zIndex={900}
        height='100%'
        className={`${darkMode ? 'dark' : 'white'}`}
        title={
          <section className='flex justify-between items-center '>
            <p>Project Overview</p>
            <div className='flex flex-row gap-4 items-center'>
              <p>See all</p>
              <IoCloseOutline
                color={darkMode ? 'white' : 'gray'}
                size={20}
                className=' cursor-pointer'
                onClick={toggleDrawer}
              />
            </div>
          </section>
        }
      >
        <section className='h-[100%] w-[100%] relative'>
          <div className='flex  flex-col gap-5 bg-blue-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-5 py-8 rounded-lg'>
            <div className='flex  flex-row items-center gap-5'>
              <IoCalendarNumberOutline color='gray' size={20} />
              <p className='text-gray-500'>
                Timeline <span className=' pl-2'>:</span>
              </p>
              <p> Apr 14 - May 7 </p>
            </div>
            <div className='flex  flex-row items-center gap-5'>
              <RiTeamFill color='gray' size={20} />
              <p className='text-gray-500'>
                Team <span className='pl-2'>:</span>
              </p>
              <div className='flex flex-row items-center'>
                <CustomImage
                  src={icon}
                  className='rounded-full bg-red-400'
                  width={35}
                  height={35}
                />
                <CustomImage
                  src={iconTwo}
                  className='rounded-full bg-green-400 -ml-2'
                  width={35}
                  height={35}
                />
                <CustomImage
                  src={iconThree}
                  className='rounded-full bg-yellow-600 -ml-4'
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div className='flex  flex-row items-center gap-5'>
              <CiStar color='gray' size={20} />
              <p className='text-gray-500'>
                Status <span className='pl-2'>:</span>
              </p>
              <p>In progress</p>
            </div>
          </div>
          <div className='flex justify-between items-center mt-10'>
            <div className=' flex flex-row gap-3 items-center'>
              <p className=' text-xl  font-semibold'> TeamChat </p>
              <p className=' text-gray-400'> 24 April 2023 </p>
            </div>
            <HiOutlineDotsVertical size={25} className='cursor-pointer' />
          </div>
          <div className='mt-5 h-[320px] lg:h-full overflow-y-auto scroll'>
            <div className=' flex flex-row gap-5'>
              <CustomImage
                src={icon}
                className='rounded-full bg-red-400'
                width={35}
                height={35}
              />
              <div>
                <p className=' font-semibold text-lg'>
                  Rebeca Hosty{' '}
                  <span className='pl-2 text-gray-300 text-sm'>12:33 AM</span>
                </p>
                <div className='bg-blue-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100  p-4 rounded-lg'>
                  <p>Have a great working week!</p>
                </div>
              </div>
            </div>
            <div className=' flex flex-row gap-5 mt-5'>
              <CustomImage
                src={iconTwo}
                className='rounded-full bg-red-400'
                width={35}
                height={35}
              />
              <div>
                <p className=' font-semibold text-lg'>
                  Rebeca Hosty{' '}
                  <span className='pl-2 text-gray-300 text-sm'>12:33 AM</span>
                </p>
                <div className='bg-blue-100  dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg'>
                  <p>Have a great working week!</p>
                </div>
              </div>
            </div>
            <div className=' flex  flex-row-reverse gap-5 mt-5'>
              <CustomImage
                src={iconThree}
                className='rounded-full bg-red-400'
                width={35}
                height={35}
              />
              <div>
                <p className=' font-semibold text-lg'>
                  Rebeca Hosty{' '}
                  <span className='pl-2 text-gray-300 text-sm'>12:33 AM</span>
                </p>
                <div className='bg-blue-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100  p-4 rounded-lg'>
                  <p>Have a great working week!</p>
                </div>
              </div>
            </div>
            <div className=' flex  flex-row-reverse gap-5 mt-5'>
              <CustomImage
                src={iconThree}
                className='rounded-full bg-red-400'
                width={35}
                height={35}
              />
              <div>
                <p className=' font-semibold text-lg'>
                  Rebeca Hosty{' '}
                  <span className='pl-2 text-gray-300 text-sm'>12:33 AM</span>
                </p>
                <div className='bg-blue-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100  p-4 rounded-lg'>
                  <p>Have a great working week!</p>
                </div>
              </div>
            </div>
          </div>
          <div className=' absolute bottom-0 w-full left-0 right-0'>
            <Input
              type={'text'}
              placeholder={'Your message'}
              className={` rounded-xl  h-[60px] dark:border-gray-800 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
              suffix={
                <div className='w-full flex flex-row items-center gap-5'>
                  <MdOutlineKeyboardVoice size={25} color='gray' />
                  <div className='h-10 w-1 bg-gray-300 dark:bg-gray-600 hidden lg:block'></div>
                  <BsSendFill size={25} color='#3656c4' />
                </div>
              }
            />
          </div>
        </section>
      </Drawer>

      <div className='justify-center grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4'>
        {todos?.map((todo, idx) => {
          return (
            <div
              className='w-[100%] p-5 rounded-2xl m-0 lg:mb-0 mb-5 relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer'
              key={todo.id}
              onClick={toggleDrawer}
            >
              <CustomImage
                src={Bubble}
                height={250}
                width='100%'
                className='w-full h-full object-cover rounded-lg'
              />
              <div className='flex justify-between items-center mt-5'>
                <p
                  className={`w-fit bg-gray-100 dark:bg-gray-600 p-3 rounded-xl ${
                    todo?.completed ? 'text-green-400' : 'text-blue-400'
                  }`}
                >
                  {todo?.completed
                    ? `${t('Completed')}`
                    : `${t('In progress')}`}
                </p>

                <HiOutlineDotsVertical
                  size={15}
                  onClick={() => handleToggleMenu(idx)}
                  className='cursor-pointer'
                />
              </div>
              <h2 className='mt-5 text-gray-400'>{todo?.todo}</h2>
              <div className='w-full h-px bg-gray-200 dark:bg-gray-600 my-4'></div>
              {openMenuIndex === idx && (
                <div
                  ref={menuRef}
                  className='absolute right-0 top-[0px] z-30 p-5 bg-[#F5F5F5] dark:bg-gray-600 text-gray-900 dark:text-gray-100'
                >
                  <div className='flex gap-4 flex-col '>
                    <section className='flex flex-row gap-5 items-center cursor-pointer'>
                      <LuFileEdit color='green' size={18} />
                      <p onClick={() => handleEdit(todo)}>{t('Edit')}</p>
                    </section>
                    <section className='flex flex-row gap-5 cursor-pointer'>
                      <MdDeleteOutline color='red' size={18} />
                      <p onClick={() => handleDelete(todo)}>{t('Delete')}</p>
                    </section>
                  </div>
                </div>
              )}
              <div className='flex justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <CustomImage
                    src={icon}
                    className='rounded-full bg-red-400'
                    width={35}
                    height={35}
                  />
                  <CustomImage
                    src={iconTwo}
                    className='rounded-full bg-green-400 -ml-2'
                    width={35}
                    height={35}
                  />
                  <CustomImage
                    src={iconThree}
                    className='rounded-full bg-yellow-600 -ml-4'
                    width={35}
                    height={35}
                  />
                </div>
                <div className='flex flex-row items-center gap-4'>
                  <BsChatDots size={15} />
                  <p>3</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
