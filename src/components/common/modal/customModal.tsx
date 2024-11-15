import { Col, Modal, Row } from 'antd'
import { FC, ReactNode } from 'react'
import closeSvg from '../../../assets/close.svg'
import CustomImage from '../image/customImage'

interface CustomModalProps {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  loading?: boolean
  title?: string
  footerWidth?: number
  footerContent?: ReactNode
  handleCancel?: () => void
  destroyOnClose?: boolean
  width?: number
  subTitle?: string
  subTitleKey?: string
  children?: ReactNode
}

const CustomModal: FC<CustomModalProps> = ({
  isVisible,
  setIsVisible,
  loading = false,
  title = '',
  footerWidth = 10,
  footerContent,
  handleCancel,
  destroyOnClose,
  width = 500,
  subTitle,
  subTitleKey,
  children,
}) => {
  const onCancel = () => {
    setIsVisible(false)
  }

  return (
    <Modal
      className='sn-modal my-12  dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      title={
        <div
          className={`flex justify-between items-center px-[42px] pt-12 pb-0`}
        >
          <div>
            <span className='font-bold block text-[24px] lg:text-[32px] text-dark  mb-2'>
              {title}
            </span>

            <p className='text-sm text-gray-500 font-light'>
              {subTitle}{' '}
              <span className='text-dark font-medium'>{subTitleKey}</span>
            </p>
          </div>
          {!loading && title && (
            <CustomImage
              onClick={onCancel}
              src={closeSvg}
              width={30}
              className='cursor-pointer'
            />
          )}
        </div>
      }
      width={width}
      footer={
        footerContent ? (
          <Row justify='end' className={`px-[42px] pb-12`}>
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={footerWidth}
              xl={footerWidth}
              xxl={footerWidth}
            >
              {footerContent}
            </Col>
          </Row>
        ) : (
          false
        )
      }
      open={isVisible}
      onCancel={handleCancel || onCancel}
      centered
      maskClosable={!loading}
      closable={false}
      destroyOnClose={destroyOnClose}
      styles={{ body: { padding: '32px 64px 6px' } }}
    >
      {children}
    </Modal>
  )
}

export default CustomModal
