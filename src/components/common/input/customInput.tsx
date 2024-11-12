import { Form, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import { ChangeEvent, FC, ReactNode } from 'react'

interface CustomInputProps {
  label?: string
  placeholder?: string
  inputType?: string
  value?: string | number | string[] | FileList | null
  name?: string
  isLoading?: boolean
  disabled?: boolean
  rules?: Rule[]
  styles?: string
  onChange?: (value: string | number | string[] | FileList | null) => void
  customlabel?: ReactNode
}

const CustomInput: FC<CustomInputProps> = ({
  label = '',
  customlabel,
  placeholder,
  inputType,
  value,
  name,
  isLoading,
  disabled,
  rules,
  styles,
  onChange = () => null,
}) => {
  const NormalInput = (
    <div className='mb-[-10px]'>
      {label && !customlabel && (
        <label className='text-[14px] text-black  mb-2 block font-bold'>
          {label}
        </label>
      )}

      <Form.Item name={name} rules={rules} label={customlabel}>
        <Input
          value={value as string}
          type={inputType}
          placeholder={placeholder || 'Type'}
          className={`rounded h-[60px] ${styles} hover:border-[#c1cf16]`}
          disabled={(inputType === 'file' && isLoading) || disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(inputType === 'file' ? e?.target?.files : e?.target?.value)
          }
        />
      </Form.Item>
    </div>
  )

  return NormalInput
}

export default CustomInput
