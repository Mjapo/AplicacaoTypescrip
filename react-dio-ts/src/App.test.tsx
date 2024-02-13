import { render, screen, fireEvent } from "@testing-library/react";
import gitApi from "./api/github";
import App from './App';

describe('App', () => {

    let user = '';

    it('Deve receber os dados na resposta, caso o usuário exista', async () => {
        user = 'Mjapo';

        jest.spyOn(gitApi, 'getUser').mockResolvedValue({ login: 'Mjapo' });

        render(<App />);

        const input = screen.getByLabelText('Usuario do Github');
        const button = screen.getByRole('button', { name: 'Entrar' });

        fireEvent.change(input, {
            target: { value: user }
        });

        fireEvent.click(button);

        expect(gitApi.getUser).toHaveBeenCalledWith(user);

        const response = await gitApi.getUser(user);

        expect(response).toHaveProperty('login');
    });

    it('Não deve receber dados na resposta, caso o usuário não exista', async () => {
        user = 'Mjapo25';
        render(<App />);

        const input = screen.getByLabelText('Usuario do Github');
        const button = screen.getByRole('button', { name: 'Entrar' });

        fireEvent.change(input, {
            target: { value: user }
        });

        fireEvent.click(button);

        const response = await gitApi.getUser(user);

        expect(response).toBe(undefined);
    });
});
