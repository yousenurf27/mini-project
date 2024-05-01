import { Input, InputProps } from '@nextui-org/react'

const CustomInput = (props: InputProps) => {
  return (
    <Input
        key="outside"
        labelPlacement="outside"
        classNames={{
          label: 'z-0'
        }}
        {...props}
    />
  )
}

export default CustomInput