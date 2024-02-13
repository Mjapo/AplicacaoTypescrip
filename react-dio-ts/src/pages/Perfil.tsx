import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Table from "../components/Table/Table";
import { useParams, useNavigate } from "react-router-dom";
import gitApi from "../api/github";

const Perfil = () => {
  const navigate = useNavigate();
  const { user } = useParams<{ user: string }>();

  useEffect(() => {
    
    const getUserData = async () => {
      try {
        if (user) {
          const response = await gitApi.getUser(user);
          console.log(response);
        } else {
          navigate("/perfil");
        }
      } catch (error) {
        console.log(error);
        navigate("/"); 
      }
    };

    getUserData();
  }, [user, navigate]);

  const cursos = [
    {
      tech: 'React',
      tipo: 'Frontend'
    },
    {
      tech: 'Angular',
      tipo: 'Frontend'
    },
    {
      tech: 'Node',
      tipo: 'Backend'
    }
  ];

  return (
    <Layout>
      <Table data={cursos} />
    </Layout>
  );
};

export default Perfil;
