const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

let language = 'vi';
const langToggle = document.getElementById('langToggle');
langToggle?.addEventListener('click', () => {
  language = language === 'vi' ? 'en' : 'vi';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-vi][data-en]').forEach(el => {
    el.innerHTML = el.dataset[language];
  });
  if (langToggle) langToggle.textContent = language === 'vi' ? 'EN' : 'VI';
  const dest = document.getElementById('destination');
  if (dest && dest.options.length) {
    const texts = language === 'vi'
      ? ['Tất cả điểm đến', 'Miền Trung', 'Miền Bắc', 'Miền Nam']
      : ['All destinations', 'Central Vietnam', 'Northern Vietnam', 'Southern Vietnam'];
    [...dest.options].forEach((o, i) => o.textContent = texts[i] || o.textContent);
  }
  const style = document.getElementById('style');
  if (style) {
    const texts = language === 'vi'
      ? ['Tất cả trải nghiệm', 'Văn hóa & di sản', 'Thiên nhiên', 'Biển & nghỉ dưỡng']
      : ['All travel styles', 'Culture & heritage', 'Nature', 'Beach & relaxation'];
    [...style.options].forEach((o, i) => o.textContent = texts[i] || o.textContent);
  }
  const duration = document.getElementById('duration');
  if (duration) {
    const texts = language === 'vi'
      ? ['Mọi thời lượng', '1–2 ngày', '3 ngày trở lên']
      : ['Any duration', '1–2 days', '3+ days'];
    [...duration.options].forEach((o, i) => o.textContent = texts[i] || o.textContent);
  }
});

document.getElementById('tourSearch')?.addEventListener('submit', event => {
  event.preventDefault();
  const region = document.getElementById('destination').value;
  const style = document.getElementById('style').value;
  const duration = document.getElementById('duration').value;
  let count = 0;
  document.querySelectorAll('.tour-card').forEach(card => {
    const show = (region === 'all' || card.dataset.region === region) &&
      (style === 'all' || card.dataset.style === style) &&
      (duration === 'all' || card.dataset.duration === duration);
    card.hidden = !show;
    if (show) count++;
  });
  document.getElementById('noResults').hidden = count > 0;
  document.getElementById('tourGrid').scrollIntoView({behavior:'smooth', block:'center'});
});

document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const email = 'hello@vncentraltravel.com'; // THAY BẰNG EMAIL THẬT CỦA CÔNG TY
  const subject = encodeURIComponent('Yêu cầu tư vấn tour - VN CENTRAL TRAVEL');
  const body = encodeURIComponent(
    `Họ và tên: ${data.get('name')}\nEmail/WhatsApp: ${data.get('contact')}\nTour quan tâm: ${data.get('tour')}\nLời nhắn: ${data.get('message') || '(Không có)'}`
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
document.getElementById('year').textContent = new Date().getFullYear();
