// =============================================
// NAVBAR — ATIVAÇÃO AUTOMÁTICA POR URL + USUÁRIO LOGADO
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  // Ativar link correto
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (!href) return;
    const hrefPage = href.split('/').pop();

    if ((page === 'index.html' || page === '') && (hrefPage === 'index.html' || href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
      return;
    }
    if (hrefPage && hrefPage !== 'index.html' && page === hrefPage) {
      link.classList.add('active');
    }
  });

  // Mostrar nome do usuário logado no link do Perfil
  try {
    const sessao = JSON.parse(localStorage.getItem('perfilLogado') || 'null');
    if (sessao) {
      const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');
      const pessoa = contatos.find(c => c.id === sessao.id);
      if (pessoa) {
        const perfilLink = document.querySelector('.navbar-link[href*="perfil"]');
        if (perfilLink) {
          const span = perfilLink.querySelector('span');
          if (span) {
            const primeiroNome = pessoa.nome.split(' ')[0];
            span.textContent = primeiroNome;
          }
          const icon = perfilLink.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-circle-user';
        }
      }
    }
  } catch (e) {}
});
