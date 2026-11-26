import { catalogoServicos } from '../modelos/serviço.js';
import { dentistaTitular } from '../modelos/dentista.js';
import { Agendamento } from '../modelos/agendamento.js';
import { exibirNotificacao } from '../visoens/Notificação.js';

export function iniciarControleAgendamento() {
    const currentUser = JSON.parse(localStorage.getItem('dental_user')) || null;
    const select = document.getElementById('bookingService');
    const dateInput = document.getElementById('bookingDate');
    const patientInput = document.getElementById('bookingPatientName');
    const priceBadge = document.getElementById('servicePriceBadge');

    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

    select.innerHTML = '<option value="" disabled selected>Selecione um procedimento</option>' +
        catalogoServicos.map(s => `<option value="${s.id}">${s.nome} - ${s.precoTexto}</option>`).join('');

    const atualizarBadge = () => {
        const servico = catalogoServicos.find(s => s.id === parseInt(select.value));
        if (!servico) return;
        priceBadge.innerHTML = servico.isNegotiable
            ? `<span class="text-amber-600 font-bold"><i class="fa-solid fa-circle-info mr-1"></i>Este procedimento exige negociação presencial ou avaliação.</span>`
            : `<span class="text-emerald-600 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>Valor fixado em ${servico.precoTexto}</span>`;
    };

    select.addEventListener('change', atualizarBadge);

    const params = new URLSearchParams(window.location.search);
    if (params.get('servico')) {
        select.value = params.get('servico');
        atualizarBadge();
    }

    if (currentUser) {
        patientInput.value = `${currentUser.nome} (${currentUser.email || 'Dentista'})`;
    }

    dateInput.addEventListener('change', () => {
        const d = new Date(dateInput.value + 'T00:00:00').getDay();
        const isFimDeSemana = (d === 0 || d === 6);
        document.getElementById('weekendAlert').classList.toggle('hidden', !isFimDeSemana);
        const btn = document.getElementById('btnSubmitBooking');
        btn.disabled = isFimDeSemana;
        btn.classList.toggle('opacity-50', isFimDeSemana);
        btn.classList.toggle('cursor-not-allowed', isFimDeSemana);
    });

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            exibirNotificacao('Por favor, faça login para agendar sua consulta.', 'error');
            setTimeout(() => window.location.href = '../autenticação/pagina.html', 1000);
            return;
        }

        const servico = catalogoServicos.find(s => s.id === parseInt(select.value));
        const novo = new Agendamento(
            Date.now(),
            dateInput.value,
            document.getElementById('bookingTime').value,
            { id: currentUser.id || 0, nome: currentUser.nome, email: currentUser.email || 'Presencial/Dentista' },
            { cro: dentistaTitular.cro, nome: dentistaTitular.nome },
            servico
        );

        Agendamento.salvar(novo);
        exibirNotificacao('Consulta agendada com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = currentUser.tipo === 'dentista'
                ? '../painel do dentista/pagina.html'
                : '../minhas marcações/pagina.html';
        }, 900);
    });
}