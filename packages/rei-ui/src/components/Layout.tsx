import { Box } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const Layout = function ({ children }: { children: React.ReactNode }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      {!isSSR && (
        <Box>
          <Navbar />
          {children}
          <Footer />
        </Box>
      )}
    </>
  );
};

export default Layout;
