import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Repository, CloseButton, UpdateButton,
} from './styles';

const CompareList = ({
  repositories, onClickRemove, onClickUpdate, loading, updateId,
}) => (
  <Container>
    {repositories.map(repo => (
      <Repository key={repo.id}>
        <header>
          <CloseButton type="button" onClick={() => onClickRemove(repo.id)}>
            <i className="fas fa-times" />
          </CloseButton>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>

          <UpdateButton type="button" onClick={() => onClickUpdate(repo.id)}>
            {loading && updateId === repo.id ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              'Update Info'
            )}
          </UpdateButton>
        </header>

        <ul>
          <li>
            {repo.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repo.forks_count} <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repo.lastCommit} <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      avatar_url: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateId: PropTypes.number,
};

export default CompareList;
