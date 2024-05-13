import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import LogoutIcon from './LogoutIcon';
import { logoutUser } from '@/app/actions/auth';
import { useAppSelector } from '@/lib/hook';
import Link from 'next/link';

const UserMenu = () => {
  const iconClasses = "text-xl text-black pointer-events-none flex-shrink-0";
  const state = useAppSelector((state) => state.auth.value)

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className='cursor-pointer' name={`${state.session?.firstName}`} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="dashboard"
          href='/dashboard'
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="voucher"
          href='/dashboard/voucher'
        >
          My Voucher
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<LogoutIcon className={iconClasses} />}
          onClick={async () => {
            await logoutUser(state.session?.id as string)
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu