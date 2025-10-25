// Craigslist-style calendar and year display
(function () {
  // Update current year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Render calendar
  const cal = document.getElementById('cal');
  if (!cal) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11

  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; // Convert Sun=0 to Mon=0
  const last = new Date(year, month + 1, 0);
  const days = last.getDate();

  // Turkish day abbreviations
  const headers = ['P', 'P', 'S', 'Ç', 'P', 'C', 'C']; // Pazartesi, Salı, Çarşamba, Perşembe, Cuma, Cumartesi, Pazar

  let html = '<tr class="days">' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';

  let d = 1;
  for (let r = 0; d <= days; r++) {
    html += '<tr>';
    for (let c = 0; c < 7; c++) {
      if (r === 0 && c < startDay) {
        html += '<td></td>';
      } else if (d <= days) {
        const isToday = d === today.getDate();
        html += `<td class="${isToday ? 'today' : ''}">${d}</td>`;
        d++;
      } else {
        html += '<td></td>';
      }
    }
    html += '</tr>';
  }
  
  cal.innerHTML = html;
})();

// SPA Route and Category Handling
function initCategoryLinks() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  const categories = document.querySelectorAll('.category-links a');
  categories.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const title = this.textContent.replace(/\s+•?$/, "");
      // Show detail
      window.location.hash = '#cat-' + encodeURIComponent(title);
      renderCategoryDetail(title);
    });
  });
}

function renderCategoryDetail(category) {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  mainContent.innerHTML = `
    <div class="category-detail">
      <button class="back-btn">← Geri</button>
      <h2>${category}</h2>
      <div class="category-detail-body">
        <p>"${category}" kategorisi için buraya modern ve detaylı ilanlar, filtreler veya açıklamalar ekleyebilirsiniz.</p>
        <ul class="example-list">
          <li>${category} ile ilgili örnek 1</li>
          <li>${category} ile ilgili örnek 2</li>
          <li>${category} ile ilgili örnek 3</li>
        </ul>
      </div>
    </div>
  `;
  document.querySelector('.back-btn').onclick = () => {
    window.location.hash = '';
    window.location.reload();
  };
}

function checkHashRoute() {
  const h = window.location.hash;
  if (h.startsWith('#cat-')) {
    try {
      const c = decodeURIComponent(h.slice(5));
      renderCategoryDetail(c);
    } catch {}
  }
}

document.addEventListener('DOMContentLoaded', function(){
  initCategoryLinks();
  checkHashRoute();
  window.addEventListener('hashchange', checkHashRoute);
});

// Şehirler için custom dropdown aç/kapat ve seçim fonksiyonelliği
document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('dropdownSelected');
  const dropdownList = document.getElementById('cityDropdown');
  if(!dropdownBtn || !dropdownList) return;
  dropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
  });
  dropdownList.querySelectorAll('li').forEach(function(item) {
    item.addEventListener('click', function(e) {
      dropdownBtn.textContent = this.textContent;
      dropdownList.style.display = 'none';
    });
  });
  document.body.addEventListener('click', function() {
    dropdownList.style.display = 'none';
  });
});

// Diller için custom dropdown ve çeviri fonksiyonelliği
const translations = {
  tr: {
    'Ne arıyorsun?': 'Ne arıyorsun?',
    'İlan Ver': 'İlan Ver',
    'Hemen Keşfet': 'Hemen Keşfet',
    'Hayatını Kolaylaştıran Modern İlan Platformu': 'Hayatını Kolaylaştıran Modern İlan Platformu',
    'Türkiye\'nin en hızlı, sade ve güvenilir dijital ilan servisine hoş geldin.': 'Türkiye\'nin en hızlı, sade ve güvenilir dijital ilan servisine hoş geldin.',
    'Topluluk': 'Topluluk',
    'Tanış, paylaş, birlikte yaşa ve büyü.': 'Tanış, paylaş, birlikte yaşa ve büyü.',
    'Gönüllüler': 'Gönüllüler',
    'Etkinlikler': 'Etkinlikler',
    'Sanat': 'Sanat',
    'Kalacak Yer': 'Kalacak Yer',
    'Evini bul, konfor alanını keşfet.': 'Evini bul, konfor alanını keşfet.',
    'Kiralık Daire': 'Kiralık Daire',
    'Paylaşımlı Ev': 'Paylaşımlı Ev',
    'İş İlanları': 'İş İlanları',
    'Kariyer fırsatlarını keşfet.': 'Kariyer fırsatlarını keşfet.',
    'Teknoloji': 'Teknoloji',
    'Ofis İşleri': 'Ofis İşleri',
    'Hizmet': 'Hizmet',
    'Uzmanını bul, işini kolaylaştır.': 'Uzmanını bul, işini kolaylaştır.',
    'Temizlik': 'Temizlik',
    'Taşıma': 'Taşıma',
    'Tadilat': 'Tadilat',
    'Satılık': 'Satılık',
    'Al, sat, değerlendir. Her şey burada.': 'Al, sat, değerlendir. Her şey burada.',
    'İkinci El': 'İkinci El',
    'Elektronik': 'Elektronik',
    'Tartışma': 'Tartışma',
    'Fikirlerini paylaş, sorular sor, toplulukla konuş.': 'Fikirlerini paylaş, sorular sor, toplulukla konuş.',
    'Forum': 'Forum',
    'İpuçları': 'İpuçları',
    'Şehirler': 'Şehirler',
    'Diller': 'Diller',
    'Yardım': 'Yardım',
    'Güvenlik': 'Güvenlik',
    'App': 'App',
    'Hakkında': 'Hakkında'
  },
  en: {
    'Ne arıyorsun?': 'What are you looking for?',
    'İlan Ver': 'Post Ad',
    'Hemen Keşfet': 'Explore Now',
    'Hayatını Kolaylaştıran Modern İlan Platformu': 'Modern Classified Platform That Makes Your Life Easier',
    'Türkiye\'nin en hızlı, sade ve güvenilir dijital ilan servisine hoş geldin.': 'Welcome to Turkey\'s fastest, simple and reliable digital classified service.',
    'Topluluk': 'Community',
    'Tanış, paylaş, birlikte yaşa ve büyü.': 'Meet, share, live and grow together.',
    'Gönüllüler': 'Volunteers',
    'Etkinlikler': 'Events',
    'Sanat': 'Art',
    'Kalacak Yer': 'Housing',
    'Evini bul, konfor alanını keşfet.': 'Find your home, discover your comfort zone.',
    'Kiralık Daire': 'Apartment for Rent',
    'Paylaşımlı Ev': 'Shared House',
    'İş İlanları': 'Job Listings',
    'Kariyer fırsatlarını keşfet.': 'Discover career opportunities.',
    'Teknoloji': 'Technology',
    'Ofis İşleri': 'Office Jobs',
    'Hizmet': 'Service',
    'Uzmanını bul, işini kolaylaştır.': 'Find your expert, make your job easier.',
    'Temizlik': 'Cleaning',
    'Taşıma': 'Moving',
    'Tadilat': 'Renovation',
    'Satılık': 'For Sale',
    'Al, sat, değerlendir. Her şey burada.': 'Buy, sell, evaluate. Everything is here.',
    'İkinci El': 'Second Hand',
    'Elektronik': 'Electronics',
    'Tartışma': 'Discussion',
    'Fikirlerini paylaş, sorular sor, toplulukla konuş.': 'Share your ideas, ask questions, talk to the community.',
    'Forum': 'Forum',
    'İpuçları': 'Tips',
    'Şehirler': 'Cities',
    'Diller': 'Languages',
    'Yardım': 'Help',
    'Güvenlik': 'Security',
    'App': 'App',
    'Hakkında': 'About'
  }
};

function translatePage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const languageBtn = document.getElementById('languageSelected');
  const languageList = document.getElementById('languageDropdown');
  if(!languageBtn || !languageList) return;
  
  languageBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    languageList.style.display = languageList.style.display === 'block' ? 'none' : 'block';
  });
  
  languageList.querySelectorAll('li').forEach(function(item) {
    item.addEventListener('click', function(e) {
      const selectedLang = this.getAttribute('data-lang');
      languageBtn.textContent = this.textContent;
      languageList.style.display = 'none';
      translatePage(selectedLang);
    });
  });
  
  document.body.addEventListener('click', function() {
    languageList.style.display = 'none';
  });
});

// Anasayfa butonuna tıklama fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
  const homeBtn = document.querySelector('a[data-translate="Anasayfa"]');
  if(homeBtn) {
    homeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Hash'i temizle ve ana sayfaya git
      window.location.hash = '';
      // Ana sayfa içeriğini göster
      const mainContent = document.querySelector('.center');
      const rightSidebar = document.querySelector('.rightbar');
      if(mainContent) mainContent.style.display = 'block';
      if(rightSidebar) rightSidebar.style.display = 'block';
    });
  }
});

// Kategori yönlendirme kelime eşleşme listesi
const SEARCH_CATEGORY_MAP = [
  { key: 'topluluk', label: 'Topluluk' },
  { key: 'iş', label: 'İş İlanları' },
  { key: 'iş ilanları', label: 'İş İlanları' },
  { key: 'hizmet', label: 'Hizmet' },
  { key: 'satılık', label: 'Satılık' },
  { key: 'tartışma', label: 'Tartışma' },
  { key: 'kalacak', label: 'Kalacak Yer' },
  { key: 'ev', label: 'Kalacak Yer' },
];
function searchCategoryRoute(input) {
  const v = input.trim().toLocaleLowerCase('tr');
  for(const row of SEARCH_CATEGORY_MAP) {
    if(v.includes(row.key)) return row.label;
  }
  return null;
}
function bindSearchBox() {
  const searchInput = document.querySelector('.search-input');
  const icon = document.querySelector('.search-icon');
  if(!searchInput) return;
  function routeOnSearch() {
    const cat = searchCategoryRoute(searchInput.value || '');
    if(cat) {
      window.location.hash = '#cat-' + encodeURIComponent(cat);
      renderCategoryDetail(cat);
    } else if(searchInput.value.trim().length > 0) {
      alert('Kategori bulunamadı: Lütfen "Topluluk", "İş İlanları", "Hizmet" vb. bir kategori adı girin.');
    }
  }
  searchInput.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ routeOnSearch(); }});
  if(icon) icon.addEventListener('click', routeOnSearch);
}

// Modern İlan Ver sayfası
function openPostAdForm() {
  const mainContent = document.querySelector('.center');
  if(!mainContent) return;
  const formHtml = `
    <div class="category-detail">
      <button class="back-btn">← Geri</button>
      <h2>Yeni İlan Ekle</h2>
      <form id="adForm" class="post-ad-form">
        <label>Başlık <input type="text" name="title" required maxlength="100"></label>
        <label>Açıklama <textarea name="desc" rows="4" required></textarea></label>
        <label>Kategori
          <select name="cat" required>
            <option value="Topluluk">Topluluk</option>
            <option value="Kalacak Yer">Kalacak Yer</option>
            <option value="İş İlanları">İş İlanları</option>
            <option value="Hizmet">Hizmet</option>
            <option value="Satılık">Satılık</option>
            <option value="Tartışma">Tartışma</option>
          </select>
        </label>
        <label>Şehir <input type="text" name="city" required value="İstanbul"></label>
        <label>Fiyat <input type="number" name="price" min="0" placeholder="₺"></label>
        <button type="submit" class="banner-btn" style="margin-top:22px">Gönder</button>
      </form>
    </div>
  `;
  mainContent.innerHTML = formHtml;
  const backBtn = document.querySelector('.back-btn');
  if(backBtn) backBtn.onclick = function(){ window.location.hash = ''; window.location.reload(); };
  const adForm = document.getElementById('adForm');
  adForm.onsubmit = function(e){
    e.preventDefault();
    alert('İlanınız başarıyla gönderildi!');
    adForm.reset();
  };
}
function bindPostAdBtn() {
  const postBtn = document.querySelector('.post-ad-btn');
  if(!postBtn) return;
  postBtn.addEventListener('click', function(e){
    e.preventDefault();
    openPostAdForm();
  });
}

bindSearchBox();
bindPostAdBtn();

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  if (hamburgerMenu && sidebarMenu && sidebarOverlay) {
    hamburgerMenu.addEventListener('click', function() {
      sidebarMenu.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
    });
    
    sidebarOverlay.addEventListener('click', function() {
      sidebarMenu.classList.remove('open');
      sidebarOverlay.classList.remove('show');
    });
  }
  
  // Sidebar submenu toggle functionality
  const profillerItem = document.getElementById('profillerItem');
  const kartlarItem = document.getElementById('kartlarItem');
  const profillerSubmenu = document.getElementById('profillerSubmenu');
  const kartlarSubmenu = document.getElementById('kartlarSubmenu');
  
  if (profillerItem && profillerSubmenu) {
    profillerItem.addEventListener('click', function() {
      profillerItem.classList.toggle('active');
      profillerSubmenu.classList.toggle('open');
    });
  }
  
  if (kartlarItem && kartlarSubmenu) {
    kartlarItem.addEventListener('click', function() {
      kartlarItem.classList.toggle('active');
      kartlarSubmenu.classList.toggle('open');
    });
  }
  
  // Submenu item click handlers
  const submenuItems = document.querySelectorAll('.submenu-item');
  submenuItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.textContent;
      if (text.includes('Profil')) {
        showProfilePage();
      } else if (text.includes('Kart')) {
        showCardPage();
      }
    });
  });
  
  // Header navigation click handlers
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.textContent;
      if (text.includes('İlan Ver')) {
        showAdFormPage();
      } else if (text.includes('İletişim')) {
        showContactPage();
      } else if (text.includes('Hakkımızda')) {
        showAboutPage();
      }
    });
  });
  
  // Logo click handler - return to home
  const headerLogo = document.querySelector('.header-logo');
  if (headerLogo) {
    headerLogo.addEventListener('click', function(e) {
      e.preventDefault();
      // Clear any hash and reload to home
      window.location.hash = '';
      window.location.reload();
    });
  }
});

// Page content functions
function showProfilePage() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  
  mainContent.innerHTML = `
    <div class="page-content">
      <button class="back-btn">← Geri</button>
      <h2>Profil Oluştur</h2>
      <form class="profile-form">
        <label>Ad Soyad <input type="text" name="name" required></label>
        <label>E-posta <input type="email" name="email" required></label>
        <label>Telefon <input type="tel" name="phone" required></label>
        <label>Şehir <input type="text" name="city" required></label>
        <label>Hakkında <textarea name="about" rows="4"></textarea></label>
        <button type="submit" class="submit-btn">Profil Oluştur</button>
      </form>
    </div>
  `;
  
  document.querySelector('.back-btn').onclick = () => {
    window.location.reload();
  };
}

function showCardPage() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  
  mainContent.innerHTML = `
    <div class="page-content">
      <button class="back-btn">← Geri</button>
      <h2>Kart Ekle</h2>
      <form class="card-form">
        <label>Kart Sahibi <input type="text" name="cardholder" required></label>
        <label>Kart Numarası <input type="text" name="cardnumber" required maxlength="19"></label>
        <label>Son Kullanma Tarihi <input type="text" name="expiry" placeholder="MM/YY" required></label>
        <label>CVV <input type="text" name="cvv" required maxlength="3"></label>
        <button type="submit" class="submit-btn">Kart Ekle</button>
      </form>
    </div>
  `;
  
  document.querySelector('.back-btn').onclick = () => {
    window.location.reload();
  };
}

function showAdFormPage() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  
  mainContent.innerHTML = `
    <div class="page-content">
      <button class="back-btn">← Geri</button>
      <h2>İlan Bilgileri</h2>
      <form class="ad-form">
        <div class="form-row">
          <label>İlan Başlığı <input type="text" name="title" required placeholder="Örn: Satılık iPhone 13"></label>
          <label>Kategori 
            <select name="category" required>
              <option value="">Kategori Seçin</option>
              <option value="elektronik">Elektronik</option>
              <option value="ev-eşya">Ev & Eşya</option>
              <option value="otomotiv">Otomotiv</option>
              <option value="emlak">Emlak</option>
              <option value="iş">İş İlanları</option>
              <option value="hizmet">Hizmet</option>
            </select>
          </label>
        </div>
        
        <div class="form-row">
          <label>Fiyat <input type="number" name="price" placeholder="₺" min="0"></label>
          <label>Şehir <input type="text" name="city" required placeholder="İstanbul"></label>
        </div>
        
        <label>İlan Açıklaması <textarea name="description" rows="6" required placeholder="İlanınız hakkında detaylı bilgi verin..."></textarea></label>
        
        <div class="form-row">
          <label>İletişim Adı <input type="text" name="contact_name" required></label>
          <label>Telefon <input type="tel" name="phone" required placeholder="0555 123 45 67"></label>
        </div>
        
        <label>E-posta <input type="email" name="email" required placeholder="ornek@email.com"></label>
        
        <button type="submit" class="submit-btn">İlanı Yayınla</button>
      </form>
    </div>
  `;
  
  document.querySelector('.back-btn').onclick = () => {
    window.location.reload();
  };
  
  // Form submission handler
  document.querySelector('.ad-form').onsubmit = function(e) {
    e.preventDefault();
    alert('İlanınız başarıyla yayınlandı!');
    window.location.reload();
  };
}

function showContactPage() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  
  mainContent.innerHTML = `
    <div class="page-content">
      <button class="back-btn">← Geri</button>
      <h2>İletişim Bilgileri</h2>
      <form class="contact-form">
        <div class="form-row">
          <label>Ad Soyad <input type="text" name="fullname" required placeholder="Adınız ve soyadınız"></label>
          <label>Telefon <input type="tel" name="phone" required placeholder="0555 123 45 67"></label>
        </div>
        
        <label>E-posta <input type="email" name="email" required placeholder="ornek@gmail.com"></label>
        
        <label>Konu 
          <select name="subject" required>
            <option value="">Konu Seçin</option>
            <option value="genel">Genel Bilgi</option>
            <option value="teknik">Teknik Destek</option>
            <option value="şikayet">Şikayet</option>
            <option value="öneri">Öneri</option>
            <option value="işbirliği">İş Birliği</option>
          </select>
        </label>
        
        <label>Mesaj <textarea name="message" rows="6" required placeholder="Mesajınızı buraya yazın..."></textarea></label>
        
        <button type="submit" class="submit-btn">Mesaj Gönder</button>
      </form>
    </div>
  `;
  
  document.querySelector('.back-btn').onclick = () => {
    window.location.reload();
  };
  
  // Form submission handler
  document.querySelector('.contact-form').onsubmit = function(e) {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi!');
    window.location.reload();
  };
}

function showAboutPage() {
  const mainContent = document.querySelector('.center');
  if (!mainContent) return;
  
  mainContent.innerHTML = `
    <div class="page-content">
      <button class="back-btn">← Geri</button>
      <h2>Hoşgeldiniz</h2>
      <div class="welcome-content">
        <h3>HSD Sakarya Topluluğu</h3>
        <p>Topluluğumuza hoş geldiniz! Burada birlikte büyüyoruz ve gelişiyoruz.</p>
        <div class="community-info">
          <h4>Topluluk Özellikleri:</h4>
          <ul>
            <li>Güvenli ve güvenilir platform</li>
            <li>Hızlı ve kolay kullanım</li>
            <li>Modern tasarım</li>
            <li>7/24 destek</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  document.querySelector('.back-btn').onclick = () => {
    window.location.reload();
  };
}

// Carousel slider
function initCarouselSlider() {
  const imgs = document.querySelectorAll('.carousel-img');
  const btnL = document.querySelector('.carousel-btn.left');
  const btnR = document.querySelector('.carousel-btn.right');
  if(!imgs.length) return;
  let idx = 0, timer = null;
  function show(i){ imgs.forEach(x=>x.classList.remove('active')); imgs[i].classList.add('active'); }
  function next(){ idx = (idx+1)%imgs.length; show(idx); }
  function prev(){ idx = (idx-1+imgs.length)%imgs.length; show(idx); }
  btnL && btnL.addEventListener('click', ()=>{ prev(); });
  btnR && btnR.addEventListener('click', ()=>{ next(); });
  function auto(){
    if(timer) clearInterval(timer);
    timer = setInterval(next, 4000);
  }
  auto();
}
if(document.querySelector('.banner-carousel')) setTimeout(initCarouselSlider, 300);