import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import LogoutIcon from './LogoutIcon';
import { logoutUser } from '@/app/actions/auth';
import { useAppSelector } from '@/lib/hook';
import { AddEventIcon } from './AddEventIcon';

const AdminMenu = () => {
  const iconClasses = "text-xl text-black pointer-events-none flex-shrink-0";
  const state = useAppSelector((state) => state.auth.value)

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className='cursor-pointer' name={`${state.session?.firstName}`} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="new"
          href='admin/event'
          startContent={<AddEventIcon className={iconClasses} />}
        >
          Events
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

export default AdminMenu
