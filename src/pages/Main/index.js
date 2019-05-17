import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Container, Form } from './styles';
import api from '../../services/api';
import CompareList from '../../components/CompareList';

import logo from '../../assets/gitcompare-logo.png';

const Main = () => {
  const [repositories, setRepositories] = useState(
    JSON.parse(localStorage.getItem('repositories')) || [],
  );
  const [repoInput, setRepoInput] = useState('');
  const [repoError, setRepoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleAddRepository = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data: repository } = await api.get(`/repos/${repoInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      setRepositories([...repositories, repository]);
      setRepoInput('');
      setRepoError(false);
    } catch (err) {
      console.log(err);
      setRepoError(true);
    } finally {
      setLoading(false);
    }
  };

  const onClickRemove = (repositoryId) => {
    setRepositories(repositories.filter(({ id }) => id !== repositoryId));
  };

  const onClickUpdate = async (repoId) => {
    setUpdateId(repoId);
    const index = repositories.findIndex(({ id }) => id === repoId);
    const repo = repositories[index];

    try {
      setLoadingUpdate(true);

      const { data: updatedRepository } = await api.get(repo.url);
      updatedRepository.lastCommit = moment(updatedRepository.pushed_at).fromNow();
      repositories[index] = updatedRepository;

      setRepositories([...repositories]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Container>
      <img src={logo} alt="Github Compare" />

      <Form withError={repoError} onSubmit={e => handleAddRepository(e)}>
        <input
          type="text"
          name="repository"
          id="repository"
          placeholder="user/repository"
          onChange={e => setRepoInput(e.target.value)}
        />
        <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
      </Form>

      <CompareList
        repositories={repositories}
        onClickRemove={onClickRemove}
        onClickUpdate={onClickUpdate}
        loading={loadingUpdate}
        updateId={updateId}
      />
    </Container>
  );
};

export default Main;
