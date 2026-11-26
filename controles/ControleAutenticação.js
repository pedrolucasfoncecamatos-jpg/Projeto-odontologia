import { Paciente } from '../modelos/paciente.js';
import { dentistaTitular } from '../modelos/dentista.js';
import { exibirNotificacao } from '../visoens/Notificação.js';

export function iniciarControleAutenticacao() {
    let modoCadastro = false;

    const tabPaciente = document.getElementById('tabPatient');
    const tabDentista = document.getElementById('tabDentist');
    const formPacienteBox = document.getElementById('patientForms');
    const formDentistaBox = document.getElementById('dentistForm');
    const btnAlternarModo = document.getElementById('togglePatientModeBtn');

    tabPaciente.addEventListener('click', () => {
        formPacienteBox.classList.remove('hidden');
        formDentistaBox.classList.add('hidden');
        tabPaciente.className = 'flex-1 pb-3 text-sm font-bold text-dental-600 border-b-2 border-dental-600';
        tabDentista.className = 'flex-1 pb-3 text-sm font-bold text-slate-400 border-b-2 border-transparent hover:text-slate-600';
    });

    tabDentista.addEventListener('click', () => {
        formDentistaBox.classList.remove('hidden');
        formPacienteBox.classList.add('hidden');
        tabDentista.className = 'flex-1 pb-3 text-sm font-bold text-slate-900 border-b-2 border-slate-900';
        tabPaciente.className = 'flex-1 pb-3 text-sm font-bold text-slate-400 border-b-2 border-transparent hover:text-slate-600';
    });

    btnAlternarModo.addEventListener('click', () => {
        modoCadastro = !modoCadastro;
        document.getElementById('patientModalTitle').innerText = modoCadastro ? 'Criar Nova Conta' : 'Entrar como Paciente';
        btnAlternarModo.innerText = modoCadastro ? 'Já possui conta? Faça Login' : 'Não tem conta? Cadastre-se';
        document.getElementById('patientNameField').classList.toggle('hidden', !modoCadastro);
        document.getElementById('patientSubmitBtn').innerText = modoCadastro ? 'Cadastrar E-mail e Senha' : 'Entrar na Conta';
    });

    document.getElementById('patientAuthForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('patientNameInput').value.trim();
        const email = document.getElementById('patientEmailInput').value.trim();
        const senha = document.getElementById('patientPasswordInput').value.trim();
        const salvos = JSON.parse(localStorage.getItem('registered_patients')) || [];

        if (modoCadastro) {
            if (!nome) return exibirNotificacao('Por favor, informe seu nome.', 'error');
            try {
                const novo = new Paciente(Date.now(), nome, email, senha);
                novo.cadastrar();
                localStorage.setItem('dental_user', JSON.stringify({ id: novo.id, tipo: 'paciente', nome: novo.nome, email: novo.email }));
                exibirNotificacao(`Conta criada com sucesso! Bem-vindo, ${nome}.`, 'success');
                setTimeout(() => window.location.href = '../minhas marcações/pagina.html', 800);
            } catch (err) {
                exibirNotificacao(err.message, 'error');
            }
        } else {
            const achado = salvos.find(p => p.email === email);
            if (achado) {
                const pObj = new Paciente(achado.id, achado.nome, achado.email, achado.senha);
                if (!pObj.login(email, senha)) return exibirNotificacao('Senha incorreta.', 'error');
                localStorage.setItem('dental_user', JSON.stringify({ id: pObj.id, tipo: 'paciente', nome: pObj.nome, email: pObj.email }));
            } else {
                localStorage.setItem('dental_user', JSON.stringify({ id: Date.now(), tipo: 'paciente', nome: email.split('@')[0], email }));
            }
            exibirNotificacao('Login realizado com sucesso!', 'success');
            setTimeout(() => window.location.href = '../minhas marcações/pagina.html', 800);
        }
    });

    document.getElementById('dentistAuthForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const cro = document.getElementById('dentistCroInput').value.trim();
        const senha = document.getElementById('dentistPasswordInput').value.trim();

        if (dentistaTitular.login(cro, senha)) {
            localStorage.setItem('dental_user', JSON.stringify({ tipo: 'dentista', nome: dentistaTitular.nome, cro: dentistaTitular.cro }));
            exibirNotificacao('Acesso concedido ao Dr. Wilson!', 'success');
            setTimeout(() => window.location.href = '../painel do dentista/pagina.html', 800);
        } else {
            exibirNotificacao('CRO ou Senha do Dentista incorretos.', 'error');
        }
    });
}