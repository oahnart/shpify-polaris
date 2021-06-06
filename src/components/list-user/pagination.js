import { Button, ButtonGroup } from "@shopify/polaris";
import "./listUser.scss";
import React from "react";

export const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      {pageNumber.map((number) => (
        <ButtonGroup key={number} segmented className="page-item">
          <Button
            onClick={() => paginate(number)}
            // href="!#/list-user"
            className="page-link"
            outline
          >
            {number}
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
};
