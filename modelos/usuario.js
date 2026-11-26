export class Usuario {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }

    login(emailInformado, senhaInformada) {
        return this.email === emailInformado && this.senha === senhaInformada;
    }

    logout() {
        localStorage.removeItem('dental_user');
    }
}