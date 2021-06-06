import { Button, TextStyle } from "@shopify/polaris";
import React from "react";

export const Users = ({ user, loading, toGoogleMap }) => {
  if (loading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <>
      {user.map((e) => (
        <tr key={e.id}>
          <td>
            <TextStyle>{e.name}</TextStyle>
          </td>
          <td>
            <Button plain onClick={() => toGoogleMap(e)}>
              <TextStyle variation="positive">{e.address}</TextStyle>
            </Button>
          </td>
          <td>
            <TextStyle>{e.phone}</TextStyle>
          </td>
          <td>
            <TextStyle>{e.email}</TextStyle>
          </td>
        </tr>
      ))}
    </>
  );
};
