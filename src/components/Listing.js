import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useRepositories } from "../utils/api.js";

function Listing() {
  const query = useRepositories();

  if (query.isLoading) {
    return "Loading...";
  }

  return (
    <ListGroup>
      {query?.data?.map((item) => (
        <ListGroup.Item action key={item.id}>
          <Link to={`/details/${item.name}`}>{item.name}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Listing;
