
if (window.location.hostname !== "127.0.0.1" && window.location.hostname !== "localhost") {
  // GA4
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
    gtag("config", "G-GELWV08JL3");
  })();

  // Clarity
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "s8wu5m1wae");

  // 點擊追蹤
  document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById("bookstore");
    if (el) {
      el.addEventListener("click", function () {
        gtag("event", "bookstore_click", {
          event_category: "engagement",
          event_label: "Bookstore Image Link"
        });
      });
    }
  });
}



// 預設關閉區塊 (a)
window.onload = function() {  
  for (var i = 2; i <= 4; i++) { 
      const element = document.getElementById("a" + i);
      if (element) {
          element.style.display = 'none';
      }
  }    
}      

function showhidediv(id) {
  try {
      var sbtitle = document.getElementById(id);
      if (!sbtitle) return;
      
      // 關閉其他所有的a區塊
      for (var i = 2; i <= 4; i++) {
          const element = document.getElementById("a" + i);
          if (element && id !== "a" + i) {
              element.style.display = 'none';
          }
      }
      
      // 切換當前點擊的區塊
      if (sbtitle.style.display === 'block') {
          sbtitle.style.display = 'none';
      } else {
          sbtitle.style.display = 'block';
      }
  } catch (e) { 
      console.error("Error in showhidediv:", e);
  }
}  

function showPage(page) {  

  for (let i = 1; i <= 3; i++) {
      const nav = document.getElementById(`nav${i}`);
      if (nav) {
          nav.classList.remove('current');
      }
  }
  
  // 隱藏所有block 
  for (let i = 2; i <= 4; i++) {
      const block = document.getElementById(`block${i}`);
      if (block) {
          block.style.display = 'none';
      }
  }
  
  // 根據頁面顯示對應內容
  if (page === 1) {          
      const block2 = document.getElementById('block2');
      const block3 = document.getElementById('block3');
      const nav1 = document.getElementById('nav1');
      
      if (block2) block2.style.display = 'block';
      if (block3) block3.style.display = 'block';
      if (nav1) nav1.classList.add('current');
  } else if (page === 2) { 
      const block5 = document.getElementById('block4');
      const nav2 = document.getElementById('nav2');
      
      if (block5) block5.style.display = 'block';
      if (nav2) nav2.classList.add('current');
  } 
}      

const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get('page')) || 1;
showPage(page);

// 音檔播放控制
const audioElements = document.querySelectorAll('audio');
audioElements.forEach((audio, index) => {
  audio.addEventListener('play', () => {
    // Pause all other audio elements
    audioElements.forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
      }
    });
  });

  audio.addEventListener('ended', () => {
    // Play the next audio element if it exists
    if (index < audioElements.length - 1) {
      audioElements[index + 1].play();
    }
  });
});