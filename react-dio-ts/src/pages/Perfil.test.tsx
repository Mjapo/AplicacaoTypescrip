import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Perfil from "./Perfil";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
  useParams: () => ({})
}));

describe('Perfil', () => {
  it('Deve renderizar a tabela na página caso o usuário seja válido', () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });

  it('Deve redirecionar para a home, caso o usuário não seja válido', () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ user: 'outro-usuario' });
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
