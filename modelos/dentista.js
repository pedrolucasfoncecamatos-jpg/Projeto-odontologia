import { Usuario } from './usuario.js';

export class Dentista extends Usuario {
    constructor(cro, nome, email, senha) {
        super(email, senha);
        this.cro = cro;
        this.nome = nome;
        this.tipo = 'dentista';
    }

    login(croInformado, senhaInformada) {
        return this.cro === croInformado && this.senha === senhaInformada;
    }

    visualizarConsultas() {
        return JSON.parse(localStorage.getItem('dental_appointments')) || [];
    }
}

export const dentistaTitular = new Dentista(
    '01341',
    'Dr. Wilson de Jesus Guedes Matos',
    'wilson@odontologia.com',
    'Wilson123@'
);