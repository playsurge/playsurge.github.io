document.querySelectorAll('nav ul li').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('nav ul li').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
  });
  
  document.getElementById('themeToggle').addEventListener('change', e => {
    document.documentElement.setAttribute('data-theme', e.target.checked ? 'light' : 'dark');
    showAlert('info', `Theme switched to ${e.target.checked ? 'Light' : 'Dark'} Mode`);
  });  