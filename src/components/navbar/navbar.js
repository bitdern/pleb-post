import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ChevronDownIcon,
  Button,
} from "@chakra-ui/react";
import "./style.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="navbar">
      <Menu>
        <MenuButton as={Button}>Menu</MenuButton>
        <MenuList>
          <MenuItem>Posts</MenuItem>
          <MenuItem>Users</MenuItem>
          <MenuItem>Profile</MenuItem>
        </MenuList>
      </Menu>
      <p>{status}</p>
    </div>
  );
};

export default Navbar;
