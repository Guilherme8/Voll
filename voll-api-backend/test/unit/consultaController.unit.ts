import { criaConsulta } from '../../src/consultas/consultaController';
import { AppDataSource } from '../../src/data-source';
import { Consulta } from '../../src/consultas/consultaEntity';
import { Paciente } from '../../src/pacientes/pacienteEntity';
import { AppError } from '../../src/error/ErrorHandler';
import { Request } from 'express';

// Mock para o transporte de e-mail
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockImplementation((_, callback) => {
      callback(null, { response: 'E-mail enviado com sucesso' });
    }),
  })),
}));

describe('criaConsulta', () => {
  let req: Request, res: any;

  beforeEach(() => {
    req = {
      body: {
        especialista: 'especialistaId',
        paciente: 'pacienteId',
        data: new Date(),
        desejaLembrete: true,
        lembretes: ['lembrete1', 'lembrete2'],
      },
    } as Request;
    res = { json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova consulta e enviar um e-mail', async () => {
    // Mock para o AppDataSource.manager.findOne para retornar um paciente
    AppDataSource.manager.findOne = jest.fn().mockResolvedValueOnce(Paciente);

    await criaConsulta(req, res);

    expect(AppDataSource.manager.save).toHaveBeenCalledWith(Consulta, expect.any(Consulta));
    expect(res.json).toHaveBeenCalledWith(expect.any(Consulta));
    expect(req.body.paciente).toEqual(expect.any(String)); // Verifica se o ID do paciente foi mantido

    // Verifica se o e-mail foi enviado
    expect(require('nodemailer').createTransport().sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'guilherme.nf.gf@gmail.com',
        to: expect.any(String),
        subject: 'Voll - consulta agendada',
        html: expect.stringContaining('Consulta marcada'),
      }),
      expect.any(Function)
    );
  });

  it('deve lançar um erro se o paciente não estiver ativo', async () => {
    // Mock para o AppDataSource.manager.findOne para retornar null
    AppDataSource.manager.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(criaConsulta(req, res)).rejects.toThrow(AppError);
    expect(AppDataSource.manager.save).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(require('nodemailer').createTransport().sendMail).not.toHaveBeenCalled();
  });
  
  // Adicione mais casos de teste para cobrir outros cenários possíveis
});