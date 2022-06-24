import { Link, LinkProps } from "@chakra-ui/react";
import { FC } from "react";

interface AppLinkProps extends LinkProps {
  href: string;
}

const AppLink: FC<AppLinkProps> = ({ href, ...props }) => {
  return (
    <Link
      href={href}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      _focus={{ textDecoration: "none" }}
    >
      {props.children}
    </Link>
  );
};

export default AppLink;
