import { Usuario } from './usuario.js';

export class Paciente extends Usuario {
    constructor(id, nome, email, senha) {
        super(email, senha);
        this.id = id;
        this.nome = nome;
        this.tipo = 'paciente';
    }

    cadastrar() {
        const pacientes = JSON.parse(localStorage.getItem('registered_patients')) || [];
        if (pacientes.find(p => p.email === this.email)) {
            throw new Error('E-mail já cadastrado! Faça login.');
        }
        pacientes.push({
            id: this.id,
            nome: this.nome,
            email: this.email,
            senha: this.senha
        });
        localStorage.setItem('registered_patients', JSON.stringify(pacientes));
    }
}