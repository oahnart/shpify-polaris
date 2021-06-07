import { Card, Page, TextContainer, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { getListUser } from "../../action";
import "./listUser.scss";
import { Pagination } from "./pagination";
import { Users } from "./user";

export default function listUser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [usersPerPage, setUserPerPage] = useState(5);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await getListUser();
    setUser(data);
    setLoading(false);
  };
  console.log("hap0", user);

  const toGoogleMap = (e) => {
    if (e.address) {
      window.location.href = `https://www.google.com/maps/place/${e.address}`;
    }
  };

  //get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Page title="List Users">
      <Card>
        <TextContainer>
          <table>
            <thead>
              <tr>
                <th>
                  <TextStyle variation="strong">Name</TextStyle>
                </th>
                <th>
                  <TextStyle variation="strong">Address</TextStyle>
                </th>
                <th>
                  <TextStyle variation="strong">Email</TextStyle>
                </th>
                <th>
                  <TextStyle variation="strong">PhoneNumber</TextStyle>
                </th>
              </tr>
            </thead>
            <tbody>
              <Users
                // key={e.id}
                user={currentUsers}
                toGoogleMap={toGoogleMap}
                loading={loading}
              />
            </tbody>
          </table>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={user.length}
            paginate={paginate}
          />
        </TextContainer>
      </Card>
    </Page>
  );
}
