import { catalogoServicos } from '../modelos/serviço.js';

export function iniciarControleServicos() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = catalogoServicos.map(service => `
        <div class="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
                <div class="w-12 h-12 bg-dental-50 rounded-xl shadow-sm border border-dental-100 flex items-center justify-center text-dental-600 mb-4 group-hover:bg-dental-600 group-hover:text-white transition-colors">
                    <i class="fa-solid ${service.icon} text-xl"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 leading-snug">${service.nome}</h3>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                    <span class="text-xs text-slate-400 block font-medium">Valor do Procedimento</span>
                    <span class="text-base font-extrabold ${service.isNegotiable ? 'text-amber-600' : 'text-dental-700'}">
                        ${service.precoTexto}
                    </span>
                </div>
                <a href="../agendamento/pagina.html?servico=${service.id}" class="px-3.5 py-2 bg-dental-600 hover:bg-dental-700 text-white text-xs font-bold rounded-xl transition-colors">
                    Agendar
                </a>
            </div>
        </div>
    `).join('');
}