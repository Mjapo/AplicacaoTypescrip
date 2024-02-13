import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import gitApi from '../api/github';

const Home = () => {
  const [user, setUser] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false); // Adicionando estado para verificar se o usuário não foi encontrado

  const navigate = useNavigate();

  const handleClick = () => {
    if (user.trim() === '') {
      alert('Por favor, informe um usuário.');
    } else {
      gitApi.getUser(user)
        .then(response => {
          if (response.login) {
            navigate('/perfil');
          } else {
            setUserNotFound(true);
          }
        })
        .catch(error => {
          console.log(error);
          setInvalid(true);
        });
    }
  };

  return (
    <Layout>
      <div className='col-4 -m-auto'>
        <h2>Login</h2>
      </div>
      <div className='mb-3'>
        <label htmlFor='gitUser' className='form-label'>
          Usuário do Github
        </label>
        <input
          type='text'
          className='form-control'
          id='gitUser'
          aria-describedby='userHelp'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        {invalid && (
          <div id='userHelp' className='form-text text-danger'>
            Ocorreu um erro. Tente novamente mais tarde.
          </div>
        )}
        {userNotFound && (
          <div id='userHelp' className='form-text text-danger'>
            Usuário não encontrado. Verifique o nome do usuário e tente novamente.
          </div>
        )}
      </div>
      <button onClick={handleClick} type='button' className='btn btn-primary'>
        Entrar
      </button>
    </Layout>
  );
};

export default Home;
