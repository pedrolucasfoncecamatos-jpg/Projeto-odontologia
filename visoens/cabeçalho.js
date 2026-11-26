import { dentistaTitular } from '../modelos/dentista.js';

export function renderizarCabecalho(paginaAtiva = '') {
    const header = document.getElementById('appHeader');
    if (!header) return;

    const currentUser = JSON.parse(localStorage.getItem('dental_user')) || null;

    const linkClass = (nome) => paginaAtiva === nome
        ? 'text-sm font-bold text-dental-600'
        : 'text-sm font-semibold text-slate-600 hover:text-dental-600 transition-colors';

    let authHtml = `
        <a href="../autenticação/pagina.html" class="px-5 py-2.5 text-sm font-semibold text-dental-700 bg-dental-50 hover:bg-dental-100 rounded-xl transition-all border border-dental-200">
            <i class="fa-solid fa-right-to-bracket mr-2"></i>Entrar / Criar Conta
        </a>
    `;

    if (currentUser) {
        if (currentUser.tipo === 'dentista') {
            authHtml = `
                <div class="flex items-center gap-3">
                    <a href="../painel do dentista/pagina.html" class="text-xs font-bold bg-slate-900 text-white px-3.5 py-2 rounded-xl border border-slate-700">
                        <i class="fa-solid fa-user-doctor text-dental-400 mr-1.5"></i>Dr. Wilson (CRO: ${currentUser.cro})
                    </a>
                    <button id="btnLogout" class="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-2 rounded-xl border border-red-200">Sair</button>
                </div>
            `;
        } else {
            authHtml = `
                <div class="flex items-center gap-2 sm:gap-3">
                    <a href="../minhas marcações/pagina.html" class="inline-flex items-center gap-1.5 text-xs font-bold bg-dental-600 hover:bg-dental-700 text-white px-3.5 py-2 rounded-xl shadow-sm transition-colors">
                        <i class="fa-regular fa-calendar-check"></i> <span class="hidden sm:inline">Minhas Marcações</span>
                    </a>
                    <span class="text-xs font-bold bg-dental-50 text-dental-800 px-3 py-2 rounded-xl border border-dental-200">
                        <i class="fa-regular fa-user text-dental-600 mr-1.5"></i>${currentUser.nome}
                    </span>
                    <button id="btnLogout" class="text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">Sair</button>
                </div>
            `;
        }
    }

    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="../inicio/pagina.html" class="flex items-center gap-3 group">
                <div class="w-11 h-11 bg-gradient-to-tr from-dental-600 to-dental-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-dental-500/20 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-tooth text-2xl"></i>
                </div>
                <div>
                    <span class="text-xl font-bold bg-gradient-to-r from-dental-900 to-dental-700 bg-clip-text text-transparent block leading-tight">Dr. Wilson Guedes</span>
                    <span class="text-xs text-dental-600 font-medium tracking-wide uppercase">Odontologia Especializada</span>
                </div>
            </a>

            <nav class="hidden md:flex items-center gap-8">
                <a href="../inicio/pagina.html" class="${linkClass('inicio')}">Início</a>
                <a href="../serviços/pagina.html" class="${linkClass('servicos')}">Serviços &amp; Tabela</a>
                <a href="../agendamento/pagina.html" class="${linkClass('agendamento')}">Agendar Consulta</a>
                ${currentUser?.tipo === 'paciente' ? `<a href="../minhas marcações/pagina.html" class="${linkClass('marcacoes')}">Minhas Marcações</a>` : ''}
                ${currentUser?.tipo === 'dentista' ? `<a href="../painel do dentista/pagina.html" class="${linkClass('dentista')}">Agenda Dentista</a>` : ''}
            </nav>

            <div>${authHtml}</div>
        </div>
    `;

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            dentistaTitular.logout();
            window.location.href = '../inicio/pagina.html';
        });
    }
}