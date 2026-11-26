export class Agendamento {
    constructor(id, data, horario, paciente, dentista, servico) {
        this.id = id;
        this.data = data;
        this.horario = horario;
        this.paciente = paciente;
        this.dentista = dentista;
        this.servico = servico;
        this.criadoEm = new Date().toLocaleDateString('pt-BR');
    }

    static listarTodos() {
        return JSON.parse(localStorage.getItem('dental_appointments')) || [];
    }

    static salvar(agendamento) {
        const lista = this.listarTodos();
        lista.push(agendamento);
        localStorage.setItem('dental_appointments', JSON.stringify(lista));
    }

    static remover(id) {
        const lista = this.listarTodos().filter(a => a.id !== id);
        localStorage.setItem('dental_appointments', JSON.stringify(lista));
    }

    static limparTodos() {
        localStorage.setItem('dental_appointments', JSON.stringify([]));
    }
}