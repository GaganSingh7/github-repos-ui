import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Spinner, Collapse } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLanguages, useRepositories } from "../utils/api";

function Details() {
  const [isLanguageSectionExpanded, setIsLanguageSectionExpanded] =
    useState(false);
  const { name: repositoryName } = useParams();
  const repositoriesQuery = useRepositories(repositoryName);
  const {
    description,
    html_url,
    language,
    languages_url,
    name,
    forks_count,
    open_issues_count,
    watchers_count,
  } = repositoriesQuery.isLoading ? {} : repositoriesQuery?.data;
  const languagesQuery = useLanguages(languages_url, isLanguageSectionExpanded);

  if (repositoriesQuery.isLoading) {
    return "Loading...";
  }

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <Card.Title>Name: {name}</Card.Title>
            <Card.Text>Description: {description}</Card.Text>
            <Card.Text>
              Link to repo: <a href={html_url}>{html_url}</a>
            </Card.Text>
            <Card.Text>
              Languages: {language} (Primary Language)
              <Button
                variant="link"
                onClick={() =>
                  setIsLanguageSectionExpanded(!isLanguageSectionExpanded)
                }
                aria-controls="view-all-languages"
              >
                {isLanguageSectionExpanded
                  ? "Click to hide all languages"
                  : "Click to view all languages"}
              </Button>
            </Card.Text>
            <Collapse in={isLanguageSectionExpanded}>
              <span id="view-all-languages">
                {languagesQuery.isLoading ? (
                  <Spinner animation="border" role="status" />
                ) : languagesQuery.isError ? (
                  <p>Error: {languagesQuery.error}</p>
                ) : languagesQuery.data ? (
                  <Card.Text>
                    All Languages:
                    {` 
                        ${Object.keys(languagesQuery.data).join(",")}
                        `}
                  </Card.Text>
                ) : null}
              </span>
            </Collapse>
            <Card.Text>Forks Count: {forks_count}</Card.Text>
            <Card.Text>Open Issues Count: {open_issues_count}</Card.Text>
            <Card.Text>Watchers Count: {watchers_count}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Details;
