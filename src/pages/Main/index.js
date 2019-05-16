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

      <CompareList repositories={repositories} />
    </Container>
  );
};

export default Main;
