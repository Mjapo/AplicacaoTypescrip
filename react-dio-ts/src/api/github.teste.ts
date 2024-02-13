import axios from "axios";
import gitApi from "./github";

jest.mock('axios');

const axiosMock = axios as jest.Mocked<typeof axios>;

describe('github', () => {
    it('deve retornar login e id do usuario', async () => {
        axiosMock.get.mockResolvedValue({ data: { login: 'Mjapo', id: '12345' } });

        const response = await gitApi.getUser('Mjapo');

        expect(response).toMatchObject({ login: 'Mjapo', id: '96395400' });
    });

    it('deve retornar a mensagem "Not found"', async () => {
        axiosMock.get.mockResolvedValue({ data: { message: 'Not found' } });

        const response = await gitApi.getUser('usuario invalido');

        expect(response).toMatchObject({ message: 'Not found' });
    });
});
