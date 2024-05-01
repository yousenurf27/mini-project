import React  from 'react'
import { Radio, RadioProps } from '@nextui-org/react'

const CustomRadioRegister = (props: RadioProps) => {
  const { children, ...otherProps } = props
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-emerald-500",
        control: "group-data-[selected=true]:bg-emerald-500",
        wrapper: "group-data-[selected=true]:border-emerald-500"
      }}
    >
      {children}
    </Radio>
  )
}

export default CustomRadioRegister