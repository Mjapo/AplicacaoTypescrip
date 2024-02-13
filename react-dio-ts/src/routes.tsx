import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Perfil from './pages/Perfil';

const MainRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/:user' element={<Perfil />} />
      </Routes>
   );
};

export default MainRoutes;
