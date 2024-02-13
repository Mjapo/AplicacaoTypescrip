import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import gitApi from "../api/github";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush
}));

describe('Home', () => {
  it('Deve informar ao usuário e ser direcionado para a página de perfil', async () => {
    gitApi.getUser = jest.fn().mockResolvedValue({ login: 'Mjapo' });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const input = screen.getByLabelText('Usuario do Github');
    const button = screen.getByRole('button', { name: 'Entrar' }); 

    fireEvent.change(input, {
      target: { value: 'user' }
    });

    fireEvent.click(button);

    await screen.findByText('Mjapo'); 
    expect(gitApi.getUser).toHaveBeenCalledWith('user'); 
    expect(mockHistoryPush).toHaveBeenCalledWith('/perfil'); // Alterado para verificar apenas a rota "/perfil"
  });

  it('Não deve redirecionar para a página de perfil caso o usuário não seja informado', () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: 'Entrar' }); 
    fireEvent.click(button);

    expect(mockHistoryPush).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
