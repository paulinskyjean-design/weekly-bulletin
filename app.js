/**
 * 埔心基督徒聚會處週報 - 互動式手機網頁核心邏輯 (app.js)
 * 包含 Web Audio 合成音效、即時全站檢索、字級調整、代禱計數、彩帶動畫等
 */

// ==========================================
// 1. Web Audio 音效引擎 (免外部音檔，跨平台即開即用)
// ==========================================
class WebAudioSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    // 延遲初始化以配合瀏覽器自動播放政策
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  ensureContext() {
    if (!this.audioCtx) {
      this.initAudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // 輕柔觸控音
  playClick() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // 祥和清澈水晶鐘聲 (金句/經文)
  playChime() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    // 播放和弦 (E5, G#5, B5, E6)
    const freqs = [659.25, 830.61, 987.77, 1318.51];
    const now = this.audioCtx.currentTime;

    freqs.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = now + index * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.6);
    });
  }

  // 莊嚴溫暖的「阿們」三和弦 (代禱送出)
  playAmen() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    // 溫暖的 F 大調和弦進行到 C 大調
    const chord = [349.23, 440.0, 523.25, 698.46]; // F4, A4, C5, F5
    const now = this.audioCtx.currentTime;

    chord.forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    });
  }

  // 歡慶豎琴撥弦音階 (壽星祝賀 / 頒獎)
  playCelebration() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 ~ C6
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const st = now + i * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.1, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(st);
      osc.stop(st + 0.8);
    });
  }
}

// 實例化音效引擎
const soundEngine = new WebAudioSoundEngine();

// ==========================================
// 2. 頁籤切換與導覽 (Tab Navigation)
// ==========================================
function switchTab(tabId) {
  // 播放觸控音效
  soundEngine.playClick();

  // 1. 切換下方導覽列按鈕狀態
  document.querySelectorAll('.nav-tab').forEach((btn) => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. 切換各區塊內容可見性
  document.querySelectorAll('.tab-pane').forEach((pane) => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`section-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
    // 滑動至上方
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================
// 3. 字體大小調節系統 (利於長輩閱讀)
// ==========================================
function initFontSizeController() {
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  const fontDropdown = document.getElementById('fontDropdown');
  const options = fontDropdown.querySelectorAll('button');

  // 讀取快取
  const savedSize = localStorage.getItem('puxin_font_size') || 'font-size-md';
  document.body.className = savedSize;

  // 更新選單按鈕高亮
  options.forEach((opt) => {
    if (opt.dataset.size === savedSize) opt.classList.add('active');
    else opt.classList.remove('active');
  });

  fontSizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fontDropdown.classList.toggle('hidden');
    soundEngine.playClick();
  });

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedSize = btn.dataset.size;
      document.body.className = selectedSize;
      localStorage.setItem('puxin_font_size', selectedSize);

      options.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      fontDropdown.classList.add('hidden');

      showToast('字體大小已切換');
      soundEngine.playClick();
    });
  });

  // 點選其他地方自動關閉選單
  document.addEventListener('click', () => {
    if (!fontDropdown.classList.contains('hidden')) {
      fontDropdown.classList.add('hidden');
    }
  });
}

// ==========================================
// 4. 音效切換 (開啟 / 靜音)
// ==========================================
function initSoundToggle() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const icon = soundToggleBtn.querySelector('i');

  soundToggleBtn.addEventListener('click', () => {
    soundEngine.soundEnabled = !soundEngine.soundEnabled;
    if (soundEngine.soundEnabled) {
      icon.className = 'fa-solid fa-volume-high';
      soundToggleBtn.style.color = '#d97706';
      showToast('已開啟互動音效 🔔');
      soundEngine.playChime();
    } else {
      icon.className = 'fa-solid fa-volume-xmark';
      soundToggleBtn.style.color = '#94a3b8';
      showToast('已關閉音效 🔇');
    }
  });
}

// ==========================================
// 5. 即時全站搜尋與檢索功能
// ==========================================
function initSearchEngine() {
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchStats = document.getElementById('searchStats');
  const matchCount = document.getElementById('matchCount');

  // 切換搜尋欄顯示
  searchTriggerBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
      searchInput.focus();
    }
  });

  // 儲存原始 HTML 內容以便精準高亮還原
  const searchableElements = Array.from(document.querySelectorAll('.searchable'));
  const originalHTMLs = new Map();
  searchableElements.forEach((el, index) => {
    originalHTMLs.set(index, el.innerHTML);
  });

  // 輸入即時過濾檢索
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    if (query.length > 0) {
      searchClearBtn.classList.remove('hidden');
      performSearch(query);
    } else {
      searchClearBtn.classList.add('hidden');
      resetSearch();
    }
  });

  // 清除按鈕
  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.classList.add('hidden');
    resetSearch();
    searchInput.focus();
  });

  function performSearch(query) {
    let matches = 0;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');

    searchableElements.forEach((el, index) => {
      const orig = originalHTMLs.get(index);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = orig;
      const textContent = tempDiv.textContent || tempDiv.innerText;

      if (textContent.toLowerCase().includes(query.toLowerCase())) {
        matches++;
        // 替換文本節點以高亮
        highlightNodeText(el, orig, query);
        // 若所在 tab 不是當前 active，可在搜尋時特別提醒或展開
        const parentPane = el.closest('.tab-pane');
        if (parentPane) {
          el.style.border = '2px solid #f59e0b';
          el.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.25)';
        }
      } else {
        el.innerHTML = orig;
        el.style.border = '';
        el.style.boxShadow = '';
      }
    });

    searchStats.classList.remove('hidden');
    matchCount.textContent = matches;
  }

  function resetSearch() {
    searchableElements.forEach((el, index) => {
      el.innerHTML = originalHTMLs.get(index);
      el.style.border = '';
      el.style.boxShadow = '';
    });
    searchStats.classList.add('hidden');
  }

  function highlightNodeText(element, originalHTML, query) {
    // 簡易高亮替換
    const safeQuery = escapeRegex(query);
    const reg = new RegExp(`(${safeQuery})(?![^<]*>|[^<>]*<\/)`, 'gi');
    element.innerHTML = originalHTML.replace(reg, '<mark class="search-highlight">$1</mark>');
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// ==========================================
// 6. 服事輪值切換 (本週 10.18 vs 下週 10.25)
// ==========================================
function switchRosterWeek(week) {
  soundEngine.playClick();
  const btnThis = document.getElementById('btnWeekThis');
  const btnNext = document.getElementById('btnWeekNext');
  const viewThis = document.getElementById('rosterThisWeek');
  const viewNext = document.getElementById('rosterNextWeek');

  if (week === 'this') {
    btnThis.classList.add('active');
    btnNext.classList.remove('active');
    viewThis.classList.add('active');
    viewNext.classList.remove('active');
  } else {
    btnNext.classList.add('active');
    btnThis.classList.remove('active');
    viewNext.classList.add('active');
    viewThis.classList.remove('active');
  }
}

// ==========================================
// 7. 互動代禱計數器 (Amen 音效 + 飛昇愛心)
// ==========================================
function triggerPrayer(prayerId, buttonElement) {
  // 1. 播放溫馨阿們三和弦
  soundEngine.playAmen();

  // 2. 取得或累加本地儲存計數
  const storageKey = `puxin_pray_${prayerId}`;
  let currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);
  currentCount++;
  localStorage.setItem(storageKey, currentCount);

  // 3. 更新標籤文字
  const counterEl = document.getElementById(`count-${prayerId}`);
  if (counterEl) {
    const baseCount = 12 + currentCount;
    counterEl.textContent = `${baseCount} 人已代禱 🙏`;
  }

  // 4. 按鈕視覺反饋
  buttonElement.classList.add('prayed');
  const originalText = buttonElement.querySelector('span').textContent;
  buttonElement.querySelector('span').textContent = '已蒙應允代禱';

  // 5. 噴發飛升愛心粒子動畫
  createFloatingHeart(buttonElement);

  showToast('感謝您的守望，已同心為此代禱！');

  setTimeout(() => {
    buttonElement.querySelector('span').textContent = originalText;
    buttonElement.classList.remove('prayed');
  }, 3000);
}

// 生成從點擊處飄向天上的愛心動畫
function createFloatingHeart(targetBtn) {
  const rect = targetBtn.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.className = 'floating-prayer-heart';
  heart.innerHTML = '❤️ ✝️';
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1200);
}

// ==========================================
// 8. 壽星祝賀彩帶特效 (Confetti & Fanfare)
// ==========================================
function initBirthdayBlessing() {
  const blessBtn = document.getElementById('birthdayBlessBtn');
  if (!blessBtn) return;

  blessBtn.addEventListener('click', () => {
    soundEngine.playCelebration();
    showToast('🎂 願神賜福十月壽星身心靈健壯！');

    if (window.confetti) {
      // 雙側噴灑彩色紙花
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
      });
    }
  });
}

// ==========================================
// 9. 本週金句互動 (祥和鐘聲與複製分享)
// ==========================================
function initVerseInteractions() {
  const playAudioBtn = document.getElementById('playVerseAudioBtn');
  const copyBtn = document.getElementById('copyVerseBtn');

  if (playAudioBtn) {
    playAudioBtn.addEventListener('click', () => {
      soundEngine.playChime();
      showToast('🔔 祥和琴韻：願神的話語常在心中');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const verse = "「你要保守你心，勝過保守一切，因為一生的果效是由心發出。」(箴言 4:23) —— 埔心基督徒聚會處第1516期週報";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(verse).then(() => {
          soundEngine.playClick();
          showToast('✅ 金句已複製到剪貼簿，可分享給家人朋友！');
        });
      } else {
        showToast('金句：你要保守你心，勝過保守一切！');
      }
    });
  }
}

// ==========================================
// 10. 收合與展開 Accordion
// ==========================================
function toggleAccordion(id) {
  soundEngine.playClick();
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('hidden');
  }
}

// ==========================================
// 11. 經文 Modal 視窗開關
// ==========================================
function toggleScriptureModal(show = true) {
  soundEngine.playClick();
  const modal = document.getElementById('scriptureModal');
  if (modal) {
    if (show) {
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }
}

// ESC 鍵關閉 Modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleScriptureModal(false);
  }
});

// ==========================================
// 12. 輕量 Toast 彈跳通知
// ==========================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('appToast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2400);
}

// ==========================================
// 13. DOM 就緒初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initFontSizeController();
  initSoundToggle();
  initSearchEngine();
  initBirthdayBlessing();
  initVerseInteractions();

  // 預設載入首頁
  console.log('埔心基督徒聚會處互動週報系統初始化完成。');
});
