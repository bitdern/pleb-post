import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ChevronDownIcon,
} from "@chakra-ui/react";
import "./style.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Menu
        </MenuButton>
        <MenuList>
          <MenuItem>Posts</MenuItem>
          <MenuItem>Users</MenuItem>
          <MenuItem>Profile</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
