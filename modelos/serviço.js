export class Servico {
    constructor(id, nome, preco, isNegotiable, icon = 'fa-tooth', precoTexto = '') {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.isNegotiable = isNegotiable;
        this.icon = icon;
        this.precoTexto = precoTexto || (isNegotiable && preco === 0
            ? 'Negociação presencial'
            : `R$ ${preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    }
}

export const catalogoServicos = [
    new Servico(1, 'Implante', 2500.00, false, 'fa-tooth'),
    new Servico(2, 'Siso (extração)', 800.00, true, 'fa-tooth', 'R$ 800,00 a R$ 1.000,00'),
    new Servico(3, 'Restauração', 180.00, false, 'fa-wrench'),
    new Servico(4, 'Extração geral', 200.00, false, 'fa-teeth-open'),
    new Servico(5, 'Limpeza', 200.00, false, 'fa-sparkles'),
    new Servico(6, 'Profilaxia', 250.00, false, 'fa-shield-halved'),
    new Servico(7, 'Canal', 800.00, true, 'fa-vial-virus'),
    new Servico(8, 'Placas (bruxismo, Clareamento, etc.)', 800.00, false, 'fa-mask-face'),
    new Servico(9, 'Prótese dentária (PPR, total, parcial, FLEX, etc.)', 1500.00, false, 'fa-teeth'),
    new Servico(10, 'Coroa de porcelana, IMEX, zirconia e cerômero', 0, true, 'fa-gem'),
    new Servico(11, 'Consulta geral', 0, true, 'fa-stethoscope')
];