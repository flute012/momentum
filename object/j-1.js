// ============================================
// 網站功能區塊
// ============================================

// 頁面初始化
window.onload = function() {  
  for (var i = 1; i <= 5; i++) { 
    document.getElementById("a" + i).style.display = 'none';
  }    
};


// 顯示/隱藏區塊功能
function showhidediv(id) {
  try {
    var sbtitle = document.getElementById(id);
    for (var i = 2; i <= 8; i++) {
      if (id == "a" + i) {
        if (sbtitle.style.display == 'block') {
          sbtitle.style.display = 'none';
        } else {
          sbtitle.style.display = 'block';
        }
      } else {
        document.getElementById("a" + i).style.display = 'none';
      }
    }
  } catch (e) { }
}


// 頁面切換功能
function showPage(page) {  
  if (page >= 5) {
    page = 1;
  }
  
  // 隱藏所有區塊
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`block${i}`).style.display = 'none';
  }
  
  // 移除所有導航的 current class
  document.querySelectorAll('[id^="nav"]').forEach(nav => {
    nav.classList.remove('current');
  });
  
  // 根據頁面顯示對應區塊
  if (page === 1) {          
    document.getElementById('block1').style.display = 'block';
    document.getElementById('nav1').classList.add('current'); 
  } else if (page === 2) { 
    document.getElementById('block2').style.display = 'block';              
    document.getElementById('block3').style.display = 'block';
    document.getElementById('block4').style.display = 'block';
    document.getElementById('block5').style.display = 'block';
    document.getElementById('nav2').classList.add('current');
  } else if (page === 3) { 
    document.getElementById('block6').style.display = 'block';
    document.getElementById('block7').style.display = 'block';
    document.getElementById('nav3').classList.add('current');
    document.getElementById('a7').style.display = 'none';
  } else if (page === 4) {  
    document.getElementById('block8').style.display = 'block';
    document.getElementById('nav4').classList.add('current');
  }          
}

// 初始化頁面（從 URL 參數讀取）
const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get('page')) || 1;
showPage(page);


// 音檔播放控制（核心功能）
const audioElements = document.querySelectorAll('audio');

audioElements.forEach((audio, index) => {
  // 播放時暫停其他音檔
  audio.addEventListener('play', () => {
    audioElements.forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
      }
    });
  });

  // 播放結束後自動播放下一個
  audio.addEventListener('ended', () => {
    if (index < audioElements.length - 1) {
      audioElements[index + 1].play();
    }
  });
});


// ============================================
// 數據追蹤區塊（GA4 + Clarity）
// ============================================

if (window.location.hostname !== "127.0.0.1" && window.location.hostname !== "localhost") {
  
  // -------- GA4 初始化 --------
  (function() {
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-4RZZSJPJV9"; 
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted"
    });

    gtag("js", new Date());
    gtag("config", "G-4RZZSJPJV9");
  })();

  // -------- Clarity 初始化 --------
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "pi92qq6udc");

  // -------- 外連按鈕/連結追蹤 --------
  document.addEventListener("DOMContentLoaded", function () {
    // 書店連結點擊追蹤
    var el = document.getElementById("bookstore");
    if (el) {
      el.addEventListener("click", function () {
        if (typeof gtag !== 'undefined') {
          gtag("event", "bookstore_click", {
            event_category: "engagement",
            event_label: "Bookstore Image Link"
          });
        }
      });
    }

    // 追蹤所有外連按鈕 (<button> 標籤)
    const externalButtons = document.querySelectorAll('button[onclick*="window.open"], button[onclick*="location.href"]');
    externalButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const onclickAttr = this.getAttribute('onclick');
        const urlMatch = onclickAttr.match(/['"]([^'"]+)['"]/);
        
        if (urlMatch && urlMatch[1]) {
          const buttonUrl = urlMatch[1];
          const isExternal = buttonUrl.startsWith('http://') || buttonUrl.startsWith('https://');
          
          if (isExternal) {
            // 解析按鈕資訊
            const fullName = this.getAttribute('data-name') ||
                           this.textContent.trim() || 
                           this.title || 
                           this.value || 
                           'No Text';
            
            const parts = fullName.split('_');
            
            // 判斷內容類型
            const typeKeywords = {
              'Thinking Ahead影片': ['Thinking Ahead','Thinking','課前影片'],
              '課文動畫': ['動畫'],
              'Edpuzzle': ['課文Edpuzzle'],
              '課文講解影片': ['講解影片', '課文講解','講解','解說'],
              'Listening Strategy': ['聽力', '聽力影片', '聽力測驗','Listening']
            };
            
            let contentType = 'Unknown';
            for (let [type, keywords] of Object.entries(typeKeywords)) {
              if (keywords.some(keyword => fullName.includes(keyword))) {
                contentType = type;
                break;
              }
            }
            
            const buttonInfo = {
              fullName: fullName,
              lesson: parts[0] || 'Unknown',
              type: contentType,
              content: parts[1] || ''
            };
            
            const buttonId = this.id || this.className || 'no-id';
            
            // GA4 追蹤（包含詳細分類）
            if (typeof gtag !== 'undefined') {
              gtag("event", "external_link_click", {
                event_category: "outbound",
                event_label: buttonInfo.fullName,
                link_url: buttonUrl,
                link_id: buttonId,
                link_domain: new URL(buttonUrl).hostname,
                link_type: 'button',
                lesson: buttonInfo.lesson,
                content_type: buttonInfo.type
              });
            }
            
            // Clarity 標籤
            if (typeof clarity === 'function') {
              clarity("set", "last_external_button", buttonInfo.fullName);
              clarity("set", "last_button_domain", new URL(buttonUrl).hostname);
              clarity("set", "last_button_lesson", buttonInfo.lesson);
              clarity("set", "last_button_type", buttonInfo.type);
            }
          }
        }
      });
    });
  });

  // -------- 音檔播放追蹤 --------
  const audioElementsTracking = document.querySelectorAll('audio');

  audioElementsTracking.forEach((audio, index) => {
    let milestones = [25, 50, 75, 100];
    let tracked = new Set();
    
    // 彈性解析音檔資訊
    const getAudioInfo = () => {
      const fullName = audio.getAttribute('data-name') || 
                       audio.id || 
                       audio.src.split('/').pop().replace(/\.[^/.]+$/, '') ||
                       `Audio ${index + 1}`;
      
      const parts = fullName.split('_');
      
      // 判斷最後一段是否為速度
      const lastPart = parts[parts.length - 1] || '';
      const speedKeywords = ['正常', '慢速', '快速', '正常速', '慢速版'];
      const hasSpeed = speedKeywords.some(keyword => lastPart.includes(keyword));
      
      // 判斷內容類型
      const typeKeywords = {
        '課文': ['課文', '課文音檔', 'Reading'],
        '單字': ['單字', '詞彙', '生字', 'vocab'],
        '聽力': ['聽力', '測驗', '練習', 'test'],
        'Listening Strategy': ['Listening']
      };
      
      let contentType = 'Unknown';
      for (let [type, keywords] of Object.entries(typeKeywords)) {
        if (keywords.some(keyword => fullName.includes(keyword))) {
          contentType = type;
          break;
        }
      }
      
      return {
        fullName: fullName,
        lesson: parts[0] || 'Unknown',
        type: contentType,
        content: parts.length >= 3 ? parts[2] : '',
        speed: hasSpeed ? lastPart : '正常'
      };
    };

    // 播放事件追蹤
    audio.addEventListener('play', () => {
      const info = getAudioInfo();
      
      if (typeof gtag !== 'undefined') {
        gtag("event", "audio_play", {
          event_category: "audio",
          event_label: info.fullName,
          audio_position: index + 1,
          lesson: info.lesson,
          content_type: info.type,
          playback_speed: info.speed
        });
      }
      
      if (typeof clarity === 'function') {
        clarity("set", "last_audio_played", info.fullName);
        clarity("set", "last_lesson", info.lesson);
        clarity("set", "last_content_type", info.type);
      }
    });

    // 播放進度追蹤
    audio.addEventListener('timeupdate', () => {
      if (audio.duration > 0) {
        const percent = Math.floor((audio.currentTime / audio.duration) * 100);
        
        milestones.forEach(milestone => {
          if (percent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            const info = getAudioInfo();
            
            if (typeof gtag !== 'undefined') {
              gtag("event", "audio_progress", {
                event_category: "audio",
                event_label: info.fullName,
                audio_position: index + 1,
                progress_percent: milestone,
                lesson: info.lesson,
                content_type: info.type,
                playback_speed: info.speed
              });
            }
            
            if ((milestone === 50 || milestone === 100) && typeof clarity === 'function') {
              clarity("set", `audio_${milestone}percent`, info.fullName);
            }
          }
        });
      }
    });

    // 使用者拖曳進度條時重置追蹤
    audio.addEventListener('seeked', () => {
      const percent = Math.floor((audio.currentTime / audio.duration) * 100);
      tracked = new Set([...tracked].filter(m => m < percent));
    });

    // 播放完成追蹤
    audio.addEventListener('ended', () => {
      const info = getAudioInfo();
      
      if (typeof gtag !== 'undefined') {
        gtag("event", "audio_complete", {
          event_category: "audio",
          event_label: info.fullName,
          audio_position: index + 1,
          lesson: info.lesson,
          content_type: info.type,
          playback_speed: info.speed
        });
      }
      
      if (typeof clarity === 'function') {
        clarity("set", "audio_completed", info.fullName);
      }
      
      tracked.clear();
    });
  });
}