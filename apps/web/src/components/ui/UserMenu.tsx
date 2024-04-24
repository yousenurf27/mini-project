import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import LogoutIcon from './LogoutIcon';

const UserMenu = () => {
  const iconClasses = "text-xl text-black pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className='cursor-pointer' name="Jane" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<LogoutIcon className={iconClasses} />}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu