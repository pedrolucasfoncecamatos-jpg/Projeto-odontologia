import { dentistaTitular } from '../modelos/dentista.js';
import { Agendamento } from '../modelos/agendamento.js';
import { exibirNotificacao } from '../visoens/Notificação.js';

export function iniciarControlePainelDentista() {
    const currentUser = JSON.parse(localStorage.getItem('dental_user')) || null;
    if (!currentUser || currentUser.tipo !== 'dentista') {
        window.location.href = '../autenticação/pagina.html';
        return;
    }

    const renderizar = () => {
        const tbody = document.getElementById('dentistAppointmentsList');
        const noMsg = document.getElementById('noAppointmentsMsg');
        const consultas = dentistaTitular.visualizarConsultas();

        if (consultas.length === 0) {
            tbody.innerHTML = '';
            noMsg.classList.remove('hidden');
            return;
        }

        noMsg.classList.add('hidden');
        tbody.innerHTML = consultas.map(app => {
            const [y, m, d] = app.data.split('-');
            return `
                <tr class="hover:bg-slate-700/40 transition-colors">
                    <td class="px-6 py-4 font-bold text-white">${app.paciente.nome}<span class="block text-xs font-normal text-slate-400">${app.paciente.email}</span></td>
                    <td class="px-6 py-4 font-medium text-dental-300">${app.servico.nome}</td>
                    <td class="px-6 py-4 whitespace-nowrap"><i class="fa-regular fa-calendar text-slate-400 mr-1.5"></i>${d}/${m}/${y}</td>
                    <td class="px-6 py-4 whitespace-nowrap"><i class="fa-regular fa-clock text-slate-400 mr-1.5"></i>${app.horario}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${app.servico.isNegotiable ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
                            ${app.servico.precoTexto}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <button data-id="${app.id}" class="btn-remover text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-colors" title="Cancelar Agendamento">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', () => {
                Agendamento.remover(Number(btn.dataset.id));
                exibirNotificacao('Agendamento removido.', 'info');
                renderizar();
            });
        });
    };

    document.getElementById('btnLimparTudo').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja apagar todos os agendamentos salvos?')) {
            Agendamento.limparTodos();
            exibirNotificacao('Todos os registros foram apagados.', 'info');
            renderizar();
        }
    });

    renderizar();
}