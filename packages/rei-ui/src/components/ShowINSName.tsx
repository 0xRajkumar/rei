import { Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

function ShowINSName({ userAddress }: { userAddress?: string }) {
  const { data, error, isLoading, refetch } = useEnsName({
    address: userAddress?.toLowerCase(),
    enabled: true,
  });
  useEffect(() => {
    refetch();
  }, [userAddress]);

  if (
    isLoading ||
    data === undefined ||
    data === null ||
    userAddress === undefined
  ) {
    return (
      <Text>
        {userAddress?.toString().slice(0, -36)}...
        {userAddress?.toString().substring(38)}
      </Text>
    );
  } else {
    return <Text>{data}</Text>;
  }
}

export default ShowINSName;
