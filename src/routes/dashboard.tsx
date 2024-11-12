/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from '../components/common/sidebar/sidebar'
import ContentWrapper from '../components/common/wrapper/contentWrapper'
import DashboardComponent from '../components/dashboard/dashboard'
import NavBar from '../components/navbar/navBar'

export const Dashboard: FC = (): ReactElement => {
  const locale = localStorage.getItem('lang') || 'eng'

  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <div className='h-[100vh] bg-white overflow-y-hidden dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <div className='flex h-[100%]'>
        <Sidebar />
        <div className='flex-1 h-[100%] flex flex-col  mb-16 '>
          <NavBar />
          <ContentWrapper>
            <DashboardComponent t={t} />
          </ContentWrapper>
        </div>
      </div>
    </div>
  )
}
