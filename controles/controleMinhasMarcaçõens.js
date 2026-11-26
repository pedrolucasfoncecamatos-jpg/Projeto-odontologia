import { Agendamento } from '../modelos/agendamento.js';
import { exibirNotificacao } from '../visoens/Notificação.js';

export function iniciarControleMinhasMarcacoes() {
    const currentUser = JSON.parse(localStorage.getItem('dental_user')) || null;
    if (!currentUser || currentUser.tipo !== 'paciente') {
        window.location.href = '../autenticação/pagina.html';
        return;
    }

    const renderizar = () => {
        const list = document.getElementById('clientAppointmentsList');
        const noMsg = document.getElementById('noClientAppointmentsMsg');
        const minhas = Agendamento.listarTodos().filter(a => a.paciente.email === currentUser.email);

        if (minhas.length === 0) {
            list.innerHTML = '';
            list.classList.add('hidden');
            noMsg.classList.remove('hidden');
            return;
        }

        noMsg.classList.add('hidden');
        list.classList.remove('hidden');
        list.innerHTML = minhas.map(app => {
            const [y, m, d] = app.data.split('-');
            const dataFormatada = `${d}/${m}/${y}`;
            return `
                <div class="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Agendado
                            </span>
                            <span class="text-xs text-slate-400">Marcado em ${app.criadoEm}</span>
                        </div>
                        <h3 class="text-lg font-extrabold text-slate-900 mb-3">${app.servico.nome}</h3>
                        <div class="space-y-2 text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <div class="flex justify-between"><span><i class="fa-regular fa-calendar text-dental-600 mr-2"></i>Data:</span><strong>${dataFormatada}</strong></div>
                            <div class="flex justify-between"><span><i class="fa-regular fa-clock text-dental-600 mr-2"></i>Horário:</span><strong>${app.horario}</strong></div>
                            <div class="flex justify-between pt-1.5 border-t border-slate-200/70"><span><i class="fa-solid fa-tag text-dental-600 mr-2"></i>Valor:</span><strong class="${app.servico.isNegotiable ? 'text-amber-600' : 'text-dental-700'}">${app.servico.precoTexto}</strong></div>
                        </div>
                    </div>
                    <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <a href="https://wa.me/5598996018816?text=${encodeURIComponent(`Olá Dr. Wilson, sobre minha consulta de ${app.servico.nome} em ${dataFormatada} às ${app.horario}.`)}" target="_blank" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
                            <i class="fa-brands fa-whatsapp text-base"></i> Confirmar / Dúvidas
                        </a>
                        <button data-id="${app.id}" class="btn-cancelar px-3.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors">
                            <i class="fa-solid fa-xmark mr-1"></i> Cancelar Marcação
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Deseja realmente cancelar esta marcação?')) {
                    Agendamento.remover(Number(btn.dataset.id));
                    exibirNotificacao('Sua marcação foi cancelada.', 'info');
                    renderizar();
                }
            });
        });
    };

    renderizar();
}