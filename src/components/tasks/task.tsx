import { useCallback, useEffect, useRef, useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import icon from '../../assets/onesvg.svg'
import iconThree from '../../assets/threesvg.svg'
import iconTwo from '../../assets/twosvg.svg'
import handleAPIRequests from '../../helpers/handleApiRequest'
import {
  Todo,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from '../../lib/api/todo'
import CustomImage from '../common/image/customImage'
import Notify from '../common/notification/notification'
import Bubble from '../../assets/img/buble1.png'
import { MdDeleteOutline } from 'react-icons/md'
import { LuFileEdit } from 'react-icons/lu'

interface AllTasksProps {
  todos: Todo[]
  t: (key: string) => string
}

export default function AllTasks({ todos, t }: AllTasksProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
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
    //eslint-disable-next-line
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
    //eslint-disable-next-line
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

  return (
    <div className='justify-center  grid 2xl:grid-cols-4 xl:grid-cols-3  sm:grid-cols-2  lg:grid-cols-2   w-full gap-4'>
      {todos?.map((todo, idx) => {
        return (
          <div
            className={`w-[100%] p-5 rounded-2xl  m-0 lg:mb-0 mb-5 relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            key={todo.id}
          >
            <CustomImage
              src={Bubble}
              height={250}
              width={'100%'}
              className='w-full h-full object-cover rounded-lg '
            />
            <div className='flex justify-between items-center mt-5'>
              <p
                className={`w-fit bg-gray-100 p-3 rounded-xl ${
                  todo?.completed ? 'text-green-400' : 'text-blue-400'
                }`}
              >
                {todo?.completed ? `${t('Completed')}` : `${t('In progress')}`}
              </p>

              <HiOutlineDotsVertical
                size={15}
                onClick={() => handleToggleMenu(idx)}
                className='cursor-pointer'
              />
            </div>
            <h2 className='mt-5 text-gray-400'>{todo?.todo}</h2>
            <div className='w-full h-px bg-gray-200 my-4'></div>
            {openMenuIndex === idx && (
              <div
                ref={menuRef}
                className={`absolute right-0 top-[0px] z-30 p-5 bg-[#F5F5F5]  dark:bg-gray-600 text-gray-900 dark:text-gray-100`}
              >
                <div className='flex gap-4 flex-col '>
                  <section className='flex  flex-row gap-5 items-center cursor-pointer'>
                    <LuFileEdit color='green' size={18} />
                    <p onClick={() => handleEdit(todo)}>{t('Edit')}</p>
                  </section>
                  <section className='flex  flex-row gap-5 cursor-pointer'>
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
                <p> 3 </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
