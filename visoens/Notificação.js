export function exibirNotificacao(msg, type = 'info') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none';
        toast.innerHTML = `
            <div class="px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-3 bg-slate-900 text-white border border-slate-700">
                <span id="toastIcon"></span>
                <span id="toastMessage"></span>
            </div>
        `;
        document.body.appendChild(toast);
    }

    const message = document.getElementById('toastMessage');
    const icon = document.getElementById('toastIcon');
    message.innerText = msg;

    if (type === 'success') {
        icon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>';
    } else if (type === 'error') {
        icon.innerHTML = '<i class="fa-solid fa-circle-xmark text-red-400 text-lg"></i>';
    } else {
        icon.innerHTML = '<i class="fa-solid fa-circle-info text-dental-400 text-lg"></i>';
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}