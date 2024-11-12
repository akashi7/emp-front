import { Form } from 'antd'
import { FC, useCallback, useState } from 'react'
import { CiFilter, CiUnlock } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import { IoAddCircleSharp, IoChevronDownSharp } from 'react-icons/io5'
import { PiLinkSimple, PiSquaresFourThin } from 'react-icons/pi'
import icon from '../../assets/onesvg.svg'
import iconThree from '../../assets/threesvg.svg'
import iconTwo from '../../assets/twosvg.svg'
import handleAPIRequests from '../../helpers/handleApiRequest'
import { Todo, useAddTodoMutation, useGetTodosQuery } from '../../lib/api/todo'
import CustomButton from '../common/button/customButton'
import CustomImage from '../common/image/customImage'
import CustomInput from '../common/input/customInput'
import { GeneralContentLoader } from '../common/loader/loader'
import CustomModal from '../common/modal/customModal'
import AllTasks from '../tasks/task'

interface DashboardComponentProps {
  t: (key: string) => string
}

const DashboardComponent: FC<DashboardComponentProps> = ({ t }) => {
  const { data, isFetching } = useGetTodosQuery()
  const [form] = Form.useForm()
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'inProgress' | 'completed'
  >('all')

  const [addTodo, { isLoading }] = useAddTodoMutation()

  const handleFilter = useCallback(
    ({ completed }: { completed: boolean }) => {
      const filtered =
        data?.todos.filter((todo) => todo.completed === completed) || []
      setFilteredTodos(filtered)
    },
    [data]
  )

  const reset = useCallback(() => {
    setFilteredTodos([])
  }, [])

  const handleNavigation = useCallback(
    (filter: 'all' | 'inProgress' | 'completed') => {
      setActiveFilter(filter)
    },
    []
  )

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const onFinish = (values: Todo) => {
    const obj = {
      todo: values.todo,
      userId: 1,
      completed: true,
    }
    handleAPIRequests({
      request: addTodo,
      ...obj,
      onSuccess: handleCancel,
      notify: true,
      message: `${t('Todo addedd Successfully')}`,
    })
  }

  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  if (isFetching) {
    return <GeneralContentLoader />
  }

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={`${t('Add todo')}`}
        width={1000}
        handleCancel={handleCancel}
        footerContent={
          <CustomButton
            type='primary'
            htmlType='submit'
            form='add-form'
            className='h-[50px] w-[90px]'
            loading={isLoading}
          >
            {t('Submit')}
          </CustomButton>
        }
      >
        <Form
          className='space-y-12'
          name='add-form'
          form={form}
          onFinish={onFinish}
          layout='vertical'
        >
          <CustomInput
            label={`${t('todo')}`}
            placeholder={`${t('Add todo')}`}
            inputType='text'
            name='todo'
          />
        </Form>
      </CustomModal>
      <div className=''>
        <div className='flex lg:justify-between flex-col sm:flex-row sm:justify-between lg:gap-0 gap-4 lg:flex-row lg:items-center'>
          <p className=' text-gray-500 text-[15px] lg:text-[20px]'>
            {t('workspace')}&nbsp;&gt; &nbsp;{t('creative')} &nbsp; &gt;{' '}
            <span className=''>&nbsp; {t('webcreative')}</span>
          </p>
          <p>{t('From 23 April')}</p>
        </div>
        <div className='mt-10 flex lg:justify-between lg:flex-row lg:gap-0 gap-4 lg:items-center sm:flex-row  sm:justify-between flex-col'>
          <h2 className=' lg:text-4xl font-semibold text-[25px]'>
            {t('Website Design')}
          </h2>
          <div className='flex flex-row items-center gap-5'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            <p className=' text-gray-500'>{t('Updated 12 min ago')}</p>
          </div>
        </div>
        <div className='flex lg:justify-between lg:items-center  mt-10 lg:gap-0 gap-3'>
          <div className=' flex  gap-5 flex-col lg:flex-row sm:flex-row '>
            <div className='flex flex-row items-center gap-4'>
              <CiUnlock size={20} />
              <p className='lg:text-[18px] text-[12px] sm:text-[14px]'>
                {t('Limited access')}
              </p>

              <IoChevronDownSharp size={15} color='gray' />
            </div>
            <div className='h-10 w-1 bg-gray-300 hidden lg:block'></div>
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
              <CustomImage
                src={iconTwo}
                className='rounded-full bg-green-400 -ml-6'
                width={35}
                height={35}
              />
              <CustomImage
                src={iconThree}
                className='rounded-full bg-yellow-600 -ml-8'
                width={35}
                height={35}
              />
              <IoAddCircleSharp size={35} color='#3656C4' />
            </div>
          </div>
          <div className='lg:flex flex-row items-center gap-5 hidden '>
            <PiLinkSimple size={20} />
            <div className='h-8 w-1 bg-gray-300'></div>
            <PiSquaresFourThin size={30} />
          </div>
        </div>
        {/* mobile */}
        <div
          className={
            'flex flex-col  p-2 lg:hidden sm:hidden rounded-2xl gap-6 mt-8  '
          }
        >
          <div
            className={`flex flex-row gap-3`}
            onClick={() => {
              reset()
              handleNavigation('all')
            }}
          >
            <p
              className={` ${
                activeFilter === 'all' ? 'text-[#3656C4]' : 'text-gray-500'
              } `}
            >
              {t('All task')}
            </p>
            <p className='text-[#3656C4]  bg-blue-100 p-1 rounded-md w-[40px] text-center'>
              {data?.todos?.length}
            </p>
          </div>
          <div
            className={`flex flex-row gap-3`}
            onClick={() => {
              handleFilter({ completed: false })
              handleNavigation('inProgress')
            }}
          >
            <p
              className={` ${
                activeFilter === 'inProgress'
                  ? 'text-[#3656C4]'
                  : 'text-gray-500'
              } `}
            >
              {t('In progress')}
            </p>
            <p className='text-[#3656C4] bg-blue-100 p-1 rounded-md w-[40px] text-center'>
              {data?.todos?.filter((todo) => todo.completed === false)?.length}
            </p>
          </div>
          <div
            className={`flex flex-row gap-3`}
            onClick={() => {
              handleFilter({ completed: true })
              handleNavigation('completed')
            }}
          >
            <p
              className={` ${
                activeFilter === 'completed'
                  ? 'text-[#3656C4]'
                  : 'text-gray-500'
              } `}
            >
              {t('Completed')}
            </p>
            <p className='text-[#3656C4] bg-blue-100 p-1 rounded-md w-[40px] text-center'>
              {data?.todos?.filter((todo) => todo.completed === true)?.length}
            </p>
          </div>
        </div>
        <div
          className={`mt-10  lg:flex justify-between lg:items-center lg:h-[80px] h-[100px] sm:h-[78px] sm:flex sm:justify-between  hidden rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 `}
        >
          <div className='lg:flex flex-row items-center gap-8 m-5 hidden sm:flex  sm:flex-row'>
            <div
              className={`flex flex-row items-center gap-5 h-[80px] hover:cursor-pointer border-b-4 ${
                activeFilter === 'all'
                  ? 'border-[#3656C4]'
                  : 'border-transparent'
              } rounded-b-lg`}
              onClick={() => {
                reset()
                handleNavigation('all')
              }}
            >
              <p
                className={` ${
                  activeFilter === 'all' ? 'text-[#3656C4]' : 'text-gray-500'
                } `}
              >
                {t('All task')}
              </p>
              <p className='text-[#3656C4] bg-blue-100 p-1 rounded-md w-[40px] text-center'>
                {data?.todos?.length}
              </p>
            </div>

            <div
              className={`flex flex-row items-center gap-5 h-[80px] hover:cursor-pointer border-b-4 ${
                activeFilter === 'inProgress'
                  ? 'border-[#3656C4]'
                  : 'border-transparent'
              } rounded-b-lg`}
              onClick={() => {
                handleFilter({ completed: false })
                handleNavigation('inProgress')
              }}
            >
              <p
                className={` ${
                  activeFilter === 'inProgress'
                    ? 'text-[#3656C4]'
                    : 'text-gray-500'
                } `}
              >
                {t('In progress')}
              </p>
              <p className='text-[#3656C4] bg-blue-100 p-1 rounded-md w-[40px] text-center'>
                {
                  data?.todos?.filter((todo) => todo.completed === false)
                    ?.length
                }
              </p>
            </div>

            <div
              className={`flex flex-row items-center gap-5 h-[80px] hover:cursor-pointer border-b-4 ${
                activeFilter === 'completed'
                  ? 'border-[#3656C4]'
                  : 'border-transparent'
              } rounded-b-lg`}
              onClick={() => {
                handleFilter({ completed: true })
                handleNavigation('completed')
              }}
            >
              <p
                className={` ${
                  activeFilter === 'completed'
                    ? 'text-[#3656C4]'
                    : 'text-gray-500'
                } `}
              >
                {t('Completed')}
              </p>
              <p className='text-[#3656C4] bg-blue-100 p-1 rounded-md w-[40px] text-center'>
                {data?.todos?.filter((todo) => todo.completed === true)?.length}
              </p>
            </div>
          </div>

          <div className='lg:flex flex-row items-center gap-5 px-5 hidden'>
            <div className='border border-gray-300 p-3 flex flex-row items-center gap-5 rounded-xl'>
              <CiFilter size={15} />
              <p> {t('Filter & sort')}</p>
              <IoChevronDownSharp size={15} color='gray' />
            </div>
            <div
              className='border border-gray-300 p-3 flex flex-row items-center gap-5 rounded-xl cursor-pointer'
              onClick={() => setIsVisible(true)}
            >
              <IoMdAdd size={15} />
              <p>{t('New task')}</p>
            </div>
          </div>
        </div>

        <div className='flex sm:flex-row flex-col lg:hidden sm:items-center gap-5  mt-10 '>
          <div className='border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 p-3 flex flex-row items-center gap-5 rounded-xl'>
            <CiFilter size={15} />
            <p> {t('Filter & sort')}</p>
            <IoChevronDownSharp size={15} color='gray' />
          </div>
          <div
            className='border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 flex flex-row items-center gap-5 rounded-xl cursor-pointer'
            onClick={() => setIsVisible(true)}
          >
            <IoMdAdd size={15} />
            <p>{t('New task')}</p>
          </div>
        </div>
        <div className='mt-10 w-full'>
          <AllTasks
            todos={
              filteredTodos.length > 0
                ? filteredTodos
                : data?.todos?.length
                ? data.todos
                : []
            }
            t={t}
          />
        </div>
      </div>
    </>
  )
}

export default DashboardComponent
