/* ===== DATA MENU ===== */
const D = {
  'Makanan Berat': [
    'Nasi Magelangan|18|',
    'Nasi Karage Sambel Matah|25',
    'Nasi Karage Teriyaki|25',
    'Mie Nyemek|18',
    'Mie Goreng Swasana|18',
    'Indomie Goreng|8|Polos tanpa topping',
    'Indomie Kuah|8|Polos tanpa topping'
  ],
  'Makanan Ringan': [
    'Kentang Goreng|15',
    'Mix Platter|18|Kentang + Sosis / Kentang + Nugget',
    'Dimsum|Mentai:20,Kukus:17,Goreng:17',
    'Singkong Keju|15',
    'Cireng Bumbu Rujak|15',
    'Otak-Otak Goreng|15',
    'Tahu Bakso|18',
    'Pancong Lumer|Original:6,Cokelat:10,Keju:10,Mix:11|Manis meleleh di mulut',
    'Roti Bakar|Cokelat:13,Keju:13,Mix:15',
    'Pisang Bakar|Cokelat:12,Keju:12,Mix:14'
  ],
  'Minuman': [
    'Es Lemon Tea|13',
    'Es Lychee Tea|13',
    'Kuku Bima|6',
    'GoodDay|Cappucino Ice:8,Cappucino Hot:6,Frezze Ice:10,Frezze Hot:8,Varian Ice:8,Varian Hot:6',
    'Es Americano|8/6',
    'Es Luwak|8/6|White coffee',
    'Es Torabika|8/6|Cappucino',
    'Milo|8/6',
    'Chocolatos|8/6',
    'Jeruk Peras|6/5|Panas atau dingin',
    'Susu Kental Manis|8/6',
    'Es Poci|Manis Ice:5,Manis Hot:4,Tawar Ice:4,Tawar Hot:3',
    'Nutrisari|6/5',
    'Susu Jahe|6|Anget sari',
    'Air Mineral|4|Botol'
  ]
};
const E = { 'Makanan Berat': '🍛', 'Makanan Ringan': '🍟', 'Minuman': '☕' };

/* ===== HELPER ===== */
const $ = s => document.querySelector(s) || document.createElement('div');
const rp = n => 'Rp ' + n.toLocaleString('id-ID');
const nf = n => n.toLocaleString('id-ID');
const kk = n => n / 1000 + 'K';
const esc = s => String(s).replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dlg = $('#dlg');
let cat = 'Semua', type = 'Makan di sini', method = 'Tunai', cart = {};

const items = [];
for (const c in D) D[c].forEach(s => {
  const [n, p, d = ''] = s.split('|');
  let v = null, pr = 0;
  if (p.includes(':')) v = p.split(',').map(x => { const [l, h] = x.split(':'); return [l, h * 1000]; });
  else if (p.includes('/')) { const [a, b] = p.split('/'); v = [['Ice', a * 1000], ['Hot', b * 1000]]; }
  else pr = p * 1000;
  items.push({ c, n, d, p: pr, v });
});
$('#ver').textContent = 'Kasir v3 · ' + items.length + ' menu';

/* ===== FOTO MENU ===== */
const foto = x => `<img class="ph" src="img/${getImgName(x.n)}" alt="" loading="lazy" onerror="fb(this,'${slug(x.n)}','${slug(x.c)}','${E[x.c]}')">`;

function getImgName(name) {
  const map = {
    'Nasi Magelangan': 'magelangan.jpg',
    'Nasi Karage Sambel Matah': 'nasi karage sambal matah.jpg',
    'Nasi Karage Teriyaki': 'nasi karage teriyaki.jpg',
    'Mie Nyemek': 'mie nyemek.jpg',
    'Mie Goreng Swasana': 'mie nyemek.jpg',
    'Indomie Goreng': 'indomie goreng.jpg',
    'Indomie Kuah': 'indomie kuah.jpg',
    'Kentang Goreng': 'kentang goreng.jpg',
    'Mix Platter': 'mix platter.jpg',
    'Dimsum': 'dimsum.jpg',
    'Singkong Keju': 'singkong keju.jpg',
    'Cireng Bumbu Rujak': 'cireng bumbu rujak.jpg',
    'Otak-Otak Goreng': 'otak otak goreng.jpg',
    'Tahu Bakso': 'tahu bakso.jpg',
    'Pancong Lumer': 'pancong lumer.jpg',
    'Roti Bakar': 'roti bakar.jpg',
    'Pisang Bakar': 'pisang bakar.jpg',
    'Es Lemon Tea': 'lemon tea.jpg',
    'Es Lychee Tea': 'lemon tea.jpg',
    'Kuku Bima': 'kuku bima.jpg',
    'GoodDay': 'Good day.jpg',
    'Es Americano': 'Americano.jpg',
    'Es Luwak': 'Es Luwak.jpg',
    'Es Torabika': 'Es Torabika.jpg',
    'Milo': 'Es Milo.jpg',
    'Chocolatos': 'Es Chocolatos.jpg',
    'Jeruk Peras': 'Jeruk Peras.jpg',
    'Susu Kental Manis': 'Susu Kental Manis.jpg',
    'Es Poci': 'Es Poci.jpg',
    'Nutrisari': 'Nutrisari.jpg',
    'Susu Jahe': 'susu jahe.jpg',
    'Air Mineral': 'Air Mineral.jpg'
  };
  return map[name] || `${name.toLowerCase()}.jpg`;
}

function fb(im, sName, c, e) {
  if (!im.dataset.t) { 
    im.dataset.t = 1; 
    im.src = `img/${sName}.jpg`; 
  } else if (im.dataset.t == 1) { 
    im.dataset.t = 2; 
    im.src = `img/cireng.jpg`; 
  } else if (im.dataset.t == 2) { 
    im.dataset.t = 3; 
    im.src = `img/nasgor2.jpg`; 
  } else {
    im.replaceWith(Object.assign(document.createElement('span'), { className: 'ph', textContent: e }));
  }
}

/* ===== TAMPILAN MENU & TAB ===== */
function tabs() {
  $('#tabs').innerHTML = ['Semua', ...Object.keys(D)].map(c => `<button data-c="${c}" class="${c == cat ? 'on' : ''}">${c}</button>`).join('');
}

function cardHtml(x) {
  const top = `<div class="top">${foto(x)}<div><h3>${x.n}</h3>${x.d ? `<p>${x.d}</p>` : ''}</div></div>`;
  return x.v
    ? `<article class="card">${top}<div class="pv">${x.v.map(([l, p], j) => `<button data-i="${x.i}" data-j="${j}">${l}${kk(p)}</button>`).join('')}</div></article>`
    : `<article class="card" data-i="${x.i}">${top}<span class="pr">${kk(x.p)}</span></article>`;
}

function grid() {
  const q = $('#q').value.toLowerCase().trim();
  const list = items.map((x, i) => ({ ...x, i })).filter(x => (cat == 'Semua' || x.c == cat) && (x.n + x.d).toLowerCase().includes(q));
  $('#ttl').textContent = cat == 'Semua' ? 'Semua Menu' : cat;
  
  if (!list.length) {
    $('#grid').innerHTML = '<p class="empty">Menu tidak ditemukan. Coba kata kunci lain.</p>';
    return;
  }

  if (cat == 'Semua' && !q) {
    const cats = Object.keys(D);
    $('#grid').innerHTML = cats.map(c => {
      const cItems = list.filter(x => x.c == c);
      if (!cItems.length) return '';
      return `<div class="cat-sec">
        <div class="cat-title"><span>${E[c] || ''}</span><b>${c}</b></div>
        <div class="cat-grid">${cItems.map(cardHtml).join('')}</div>
      </div>`;
    }).join('');
  } else {
    $('#grid').innerHTML = `<div class="cat-grid">${list.map(cardHtml).join('')}</div>`;
  }
}

$('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) { cat = b.dataset.c; tabs(); grid(); } };
$('#q').oninput = () => { if ($('#q').value) cat = 'Semua'; tabs(); grid(); };
$('#grid').onclick = e => {
  const b = e.target.closest('[data-i]'); if (!b) return;
  const x = items[b.dataset.i], j = b.dataset.j;
  j != null ? add(b.dataset.i + '-' + j, `${x.n} (${x.v[j][0]})`, x.v[j][1]) : add(b.dataset.i, x.n, x.p);
};

/* ===== KERANJANG ===== */
function add(k, n, p) { cart[k] ? cart[k].q++ : cart[k] = { n, p, q: 1 }; draw(); }
function tot() {
  const s = Object.values(cart).reduce((a, l) => a + l.p * l.q, 0);
  const d = Math.min(Math.max(+$('#disc').value || 0, 0), s);
  return { s, d, t: s - d };
}
function draw() {
  const ks = Object.keys(cart), { s, t } = tot(), cash = +$('#cash').value || 0;
  const q = Object.values(cart).reduce((a, l) => a + l.q, 0);
  $('#lines').innerHTML = ks.map(k => { const l = cart[k]; return `<li><div><b>${esc(l.n)}</b><small>${rp(l.p)}</small></div><div class="qty"><button data-k="${k}" data-d="-1" aria-label="Kurangi">−</button><span>${l.q}</span><button data-k="${k}" data-d="1" aria-label="Tambah">+</button></div><strong>${rp(l.p * l.q)}</strong></li>`; }).join('') || '<li class="empty">Belum ada pesanan. Pilih menu untuk mulai.</li>';
  $('#sub').textContent = rp(s);
  $('#tot').textContent = rp(t);
  $('#cashbox').hidden = method != 'Tunai';
  $('#chg').textContent = rp(Math.max(cash - t, 0));
  $('#pay').disabled = !ks.length || (method == 'Tunai' && cash < t);
  $('#pay').textContent = ks.length ? 'Bayar ' + rp(t) : 'Bayar';
  $('#mc').textContent = q + ' item';
  $('#mt').textContent = rp(t);
}
$('#lines').onclick = e => {
  const b = e.target.closest('[data-k]'); if (!b) return;
  const l = cart[b.dataset.k]; l.q += +b.dataset.d;
  if (l.q < 1) delete cart[b.dataset.k];
  draw();
};
document.querySelectorAll('.seg').forEach(s => s.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  s.querySelectorAll('button').forEach(x => x.classList.toggle('on', x == b));
  if (b.dataset.t) type = b.dataset.t;
  if (b.dataset.m) method = b.dataset.m;
  draw();
});
$('.qk').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  $('#cash').value = +b.dataset.a || tot().t; draw();
};
$('#disc').oninput = $('#cash').oninput = draw;
function reset() { cart = {}; $('#disc').value = $('#cash').value = $('#who').value = ''; draw(); }
$('#rst').onclick = () => { if (!Object.keys(cart).length || confirm('Kosongkan semua pesanan?')) reset(); };
$('#mob').onclick = () => $('#cart').classList.add('open');
$('#cls').onclick = () => $('#cart').classList.remove('open');

/* ===== LOGIKA LOGISTIK FOTO QRIS & POPUP ATUR QRIS ===== */
function renderQrisImg(imgEl) {
  if (!imgEl.dataset.step) {
    imgEl.dataset.step = "1";
    imgEl.src = "img/qris.jpg";
  } else if (imgEl.dataset.step == "1") {
    imgEl.dataset.step = "2";
    imgEl.src = "img/Qris.jpg";
  } else if (imgEl.dataset.step == "2") {
    imgEl.dataset.step = "3";
    imgEl.src = "img/qris.png";
  } else if (imgEl.dataset.step == "3") {
    imgEl.dataset.step = "4";
    imgEl.src = "img/Qris.png";
  } else {
    imgEl.parentElement.innerHTML = '<p class="qn">File foto QRIS tidak ditemukan di folder img/<br>(Pastikan terdapat file img/qris.jpg)</p>';
  }
}

// Tombol Atur QRIS -> Munculkan Modal Foto QRIS Toko
$('#setq').onclick = () => {
  dlg.innerHTML = `
    <h2>QRIS Warung Kopi Swasana</h2>
    <div id="qr">
      <img src="img/qris.jpg" alt="Kode QRIS" onerror="renderQrisImg(this)" />
    </div>
    <p class="qn">Foto QRIS resmi toko di folder <code>img/qris.jpg</code></p>
    <div class="actions">
      <button onclick="dlg.close()">Tutup</button>
    </div>
  `;
  dlg.showModal();
};

/* ===== AUDIO PEMBAYARAN BERHASIL ===== */
function bunyi() {
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)(), t = a.currentTime;
    [880, 1318].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain(), s = t + i * .15;
      o.frequency.value = f; o.connect(g); g.connect(a.destination);
      g.gain.setValueAtTime(.25, s); g.gain.exponentialRampToValueAtTime(.001, s + .4);
      o.start(s); o.stop(s + .4);
    });
  } catch { }
  try {
    const u = new SpeechSynthesisUtterance('Pembayaran Berhasil');
    u.lang = 'id-ID'; u.rate = .95;
    setTimeout(() => speechSynthesis.speak(u), 350);
  } catch { }
}

/* ===== PEMBAYARAN, STRUK, RIWAYAT ===== */
const load = () => { try { return JSON.parse(localStorage.getItem('swasana_tx') || '[]'); } catch { return []; } };
const save = h => { try { localStorage.setItem('swasana_tx', JSON.stringify(h)); } catch { } };
const isToday = x => new Date(x.t).toDateString() == new Date().toDateString();

function finish() {
  const { s, d, t } = tot(), cash = +$('#cash').value || 0, h = load(), now = new Date();
  const ymd = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(x => String(x).padStart(2, '0')).join('');
  const tx = {
    no: 'SW' + ymd + '-' + String(h.filter(isToday).length + 1).padStart(3, '0'), t: now.toISOString(),
    type, who: $('#who').value.trim(), items: Object.values(cart), sub: s, disc: d, total: t, method,
    paid: method == 'Tunai' ? cash : t, change: method == 'Tunai' ? cash - t : 0
  };
  h.push(tx); save(h); reset();
  $('#cart').classList.remove('open');
  return tx;
}
function sukses(tx) { bunyi(); struk(tx); }

// Modal Payment Metode QRIS -> Tampilkan Foto QRIS
function qris() {
  const t = tot().t;
  dlg.innerHTML = `
    <h2>Bayar dengan QRIS</h2>
    <p class="qt" style="text-align:center">${rp(t)}</p>
    <div id="qr">
      <img src="img/qris.jpg" alt="Scan QRIS" onerror="renderQrisImg(this)" />
    </div>
    <p class="qn">Minta pelanggan scan dengan e-wallet / m-banking. Setelah pembayaran diterima, tekan tombol di bawah.</p>
    <div class="actions">
      <button id="qok">Pembayaran diterima</button>
      <button onclick="dlg.close()">Batal</button>
    </div>
  `;
  $('#qok').onclick = () => sukses(finish());
  dlg.showModal();
}

$('#pay').onclick = () => method == 'QRIS' ? qris() : sukses(finish());

function struk(tx) {
  const r = (a, b, c = '') => `<div class="r ${c}"><span>${a}</span><span>${b}</span></div>`;
  dlg.innerHTML = `<div id="struk"><h3>Warung Kopi Swasana</h3><p class="c">IG: warkopswasana</p><hr>
    <p>${tx.no}<br>${new Date(tx.t).toLocaleString('id-ID')}<br>${tx.type}${tx.who ? ' · ' + esc(tx.who) : ''}</p><hr>
    ${tx.items.map(l => r(`${esc(l.n)}<br>${l.q} x${nf(l.p)}`, nf(l.p * l.q))).join('')}<hr>
    ${r('Subtotal', nf(tx.sub))}${tx.disc ? r('Diskon', '-' + nf(tx.disc)) : ''}${r('TOTAL', nf(tx.total), 'b')}
    ${r('Bayar (' + tx.method + ')', nf(tx.paid))}${r('Kembali', nf(tx.change))}<hr>
    <p class="c">Terima kasih sudah order!<br>Dukungan kalian sangat berarti bagi kami.</p></div>
    <div class="actions"><button onclick="print()">Cetak struk</button><button onclick="dlg.close()">Selesai</button></div>`;
  dlg.showModal();
}

$('#hist').onclick = () => {
  const h = load().filter(isToday).reverse(), sum = h.reduce((a, x) => a + x.total, 0);
  dlg.innerHTML = `<h2>Riwayat hari ini</h2><p>${h.length} transaksi · Omzet <b>${rp(sum)}</b></p>
    <ul class="hl">${h.map(x => `<li data-n="${x.no}"><span>${new Date(x.t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} ·${x.no.slice(-3)}</span><span>${x.method}</span><b>${rp(x.total)}</b></li>`).join('') || '<li>Belum ada transaksi hari ini.</li>'}</ul>
    <p style="font-size:11.5px;margin-top:8px;color:#7b6a66">Klik transaksi untuk melihat / cetak ulang struk.</p>
    <div class="actions"><button onclick="dlg.close()">Tutup</button><button id="clr">Hapus riwayat</button></div>`;
  dlg.querySelector('.hl').onclick = e => {
    const li = e.target.closest('[data-n]'), tx = li && h.find(x => x.no == li.dataset.n);
    if (tx) struk(tx);
  };
  $('#clr').onclick = () => { if (confirm('Hapus SELURUH riwayat transaksi? Tindakan ini tidak bisa dibatalkan.')) { save([]); dlg.close(); } };
  dlg.showModal();
};

tabs(); grid(); draw();