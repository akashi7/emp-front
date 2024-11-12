import { FC, ReactElement, cloneElement } from 'react'
import { BiMessage } from 'react-icons/bi'
import { BsPlusCircleDotted } from 'react-icons/bs'
import {
  CiFileOn,
  CiFolderOn,
  CiHome,
  CiSettings,
  CiUser,
} from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import icon from '../../../assets/onesvg.svg'
import iconThree from '../../../assets/threesvg.svg'
import iconTwo from '../../../assets/twosvg.svg'
import { RootState } from '../../../lib/redux/store'
import CustomImage from '../image/customImage'

interface SidebarItemProps {
  icon: ReactElement
  url: string
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  url,
}): ReactElement => {
  const navigate = useNavigate()
  const isMatch = useMatch(url)

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const handleClick = (): void => {
    navigate(url)
  }

  return (
    <div
      className={`mb-2 flex justify-center items-center h-14 w-full cursor-pointer p-5 ${
        isMatch
          ? 'bg-blue-100  dark:bg-gray-600   border-l-8 border-[#3656C4] rounded-r-lg'
          : 'bg-transparent'
      }`}
      onClick={handleClick}
    >
      {cloneElement(icon, {
        color: isMatch ? (darkMode ? 'white' : '#3656C4') : 'gray',
      })}
    </div>
  )
}

const Sidebar: FC = (): ReactElement => {
  return (
    <section
      className={`lg:w-[100px]  hidden  h-[100%] lg:flex flex-col bg-white border-r dark:border-gray-800 border-gray-100 relative dark:bg-gray-900 text-gray-900 dark:text-gray-100 `}
    >
      <div className='flex flex-row items-center gap-5 mb-10'></div>
      <div className=''>
        <SidebarItem icon={<CiHome size={28} />} url='#' />
        <SidebarItem icon={<BiMessage size={28} />} url='#' />
        <SidebarItem icon={<CiFileOn size={28} />} url='#' />
        <SidebarItem icon={<CiFolderOn size={28} />} url='/' />
      </div>
      <div className='mt-10 flex flex-col items-center gap-4 py-4 px-5'>
        <CustomImage
          src={icon}
          className='rounded-full bg-green-400'
          width={48}
          height={48}
        />
        <CustomImage
          src={iconTwo}
          className='rounded-full bg-red-400'
          width={48}
          height={48}
        />
        <CustomImage
          src={iconThree}
          className='rounded-full  bg-blue-400'
          width={48}
          height={48}
        />
      </div>
      <div className='mt-5 w-full flex flex-col items-center '>
        <SidebarItem icon={<BsPlusCircleDotted size={30} />} url='/d' />
      </div>
      <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 mb-4 '>
        <SidebarItem icon={<CiSettings size={28} />} url='#' />
        <SidebarItem icon={<CiUser size={28} />} url='#' />
      </div>
    </section>
  )
}

export default Sidebar
