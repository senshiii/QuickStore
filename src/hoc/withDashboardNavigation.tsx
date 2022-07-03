import { Box } from "@chakra-ui/react";
import Navbar from "../components/navigation/Navbar";

const withDashboardNavigation = (
  WrappedComponent: any,
  props: { [x: string]: any }
) => {
  return () => (
    <Box>
      <Navbar
        name={`${props.fullName}`}
        profilePhoto={props.profilePhoto}
      />
    </Box>
  );
};

export default withDashboardNavigation;
