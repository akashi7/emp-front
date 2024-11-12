/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineMoon } from 'react-icons/ai'
import { BiMessage } from 'react-icons/bi'
import { BsPlusCircleDotted } from 'react-icons/bs'
import {
  CiFileOn,
  CiFolderOn,
  CiHome,
  CiMenuBurger,
  CiSearch,
  CiSettings,
  CiUser,
} from 'react-icons/ci'
import { GoSun } from 'react-icons/go'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import france from '../../assets/img/france.png'
import usa from '../../assets/img/states.png'
import icon from '../../assets/onesvg.svg'
import iconThree from '../../assets/threesvg.svg'
import iconTwo from '../../assets/twosvg.svg'
import { RootState } from '../../lib/redux/store'
import { toggleDarkMode } from '../../lib/redux/themeSlice'
import CustomImage from '../common/image/customImage'
import { SidebarItem } from '../common/sidebar/sidebar'

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev)
  }

  const dispatch = useDispatch()
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { i18n } = useTranslation()

  const handleLocale = (locale: string) => {
    i18n.changeLanguage(locale)
    localStorage.setItem('lang', locale)
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    if (savedDarkMode !== darkMode) {
      dispatch(toggleDarkMode())
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <>
      <Drawer
        placement='left'
        onClose={toggleDrawer}
        closeIcon={false}
        open={drawerVisible}
        zIndex={900}
        width={'fit-content'}
        height={'100%'}
        className={`${darkMode ? 'dark' : 'white'} relative `}
        title={
          <section className='flex justify-center items-center'>
            <IoCloseOutline
              color={darkMode ? 'white' : 'gray'}
              size={20}
              className=' cursor-pointer'
              onClick={toggleDrawer}
            />
          </section>
        }
      >
        <section className=' h-[100%] w-[100%] overflow-y-auto scroll'>
          <div className=''>
            <SidebarItem icon={<CiHome size={22} />} url='#' />
            <SidebarItem icon={<BiMessage size={22} />} url='#' />
            <SidebarItem icon={<CiFileOn size={22} />} url='#' />
            <SidebarItem icon={<CiFolderOn size={22} />} url='/' />
          </div>
          <div className='mt-10 flex flex-col items-center gap-4 py-4 px-5'>
            <CustomImage
              src={icon}
              className='rounded-full bg-green-400'
              width={23}
              height={23}
            />
            <CustomImage
              src={iconTwo}
              className='rounded-full bg-red-400'
              width={23}
              height={23}
            />
            <CustomImage
              src={iconThree}
              className='rounded-full  bg-blue-400'
              width={23}
              height={23}
            />
          </div>
          <div className='mt-2 w-full flex flex-col items-center '>
            <SidebarItem icon={<BsPlusCircleDotted size={30} />} url='/d' />
          </div>
          <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 mb-4 '>
            <SidebarItem icon={<CiSettings size={23} />} url='#' />
            <SidebarItem icon={<CiUser size={23} />} url='#' />
          </div>
        </section>
      </Drawer>
      <nav
        className={` flex justify-between items-center w-[100%]  p-5  text-black bg-white dark:bg-gray-900  dark:text-gray-100  `}
      >
        <div className=' lg:hidden block'>
          <CiMenuBurger
            size={20}
            color='gray'
            className='cursor-pointer'
            onClick={toggleDrawer}
          />
        </div>
        <div className='relative hidden lg:block'>
          <input
            type='text'
            placeholder='Search '
            className='p-3 bg-[#F5F5F5] lg:w-[350px] w-[240px] rounded-xl lg:block hidden dark:border dark:border-gray-800 dark:bg-gray-900 text-gray-900 dark:text-gray-100 '
          />
          <CiSearch
            width={15}
            className='absolute right-3 top-2/4 transform -translate-y-2/4'
          />
        </div>
        <div className=' flex flex-row items-center gap-5'>
          {darkMode ? (
            <GoSun
              size={25}
              color='gray'
              onClick={handleToggle}
              className='cursor-pointer'
            />
          ) : (
            <AiOutlineMoon
              size={25}
              color='gray'
              onClick={handleToggle}
              className='cursor-pointer'
            />
          )}
          <IoIosNotificationsOutline size={25} color='gray' />
          <div className='flex flex-row items-center gap-4'>
            <CustomImage
              src={usa}
              width={25}
              className='w-5 cursor-pointer rounded-full '
              onClick={() => handleLocale('eng')}
            />
            <CustomImage
              src={france}
              width={25}
              className='w-5 cursor-pointer rounded-full '
              onClick={() => handleLocale('fr')}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
