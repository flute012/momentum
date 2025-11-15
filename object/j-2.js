window.onload = function() {  
  for (var i = 1; i <= 5; i++) { 
    document.getElementById("a" + i).style.display = 'none';
  }    
}      

 function showhidediv(id) {
      try {
        var sbtitle = document.getElementById(id);
        for (var i = 2; i <= 8; i++) {
          if (id == "a" + i) {
            if (sbtitle.style.display == 'block') {
              sbtitle.style.display = 'none';
            }
            else {
              sbtitle.style.display = 'block';
            }
          }
          else {
            document.getElementById("a" + i).style.display = 'none';
          }
        }
      } catch (e) { }
    }  



function showPage(page) {  
      if (page >= 5) {
      page = 1;
      }
      for (let i = 1; i <= 7; i++) {
          document.getElementById(`block${i}`).style.display = 'none';
      }
      // 
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