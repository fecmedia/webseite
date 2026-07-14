document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('studychart').getContext('2d');

  const initialValue = 50;  // Startwert (z.B. 50 Besucher/Follower)
  const fastGrowthFactor = 1.1;  // 10% Wachstum pro Monat
  const slowGrowthFactor = 1.01; // 1% Wachstum pro Monat

  let fastGrowthValues = [];
  let slowGrowthValues = [];
  let currentFastValue = initialValue;
  let currentSlowValue = initialValue;

  for (let i = 0; i < 12; i++) {
    fastGrowthValues.push(currentFastValue.toFixed(0));
    currentFastValue *= fastGrowthFactor;
    slowGrowthValues.push(currentSlowValue.toFixed(0));
    currentSlowValue *= slowGrowthFactor;
  }

  var studyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monat 1', 'Monat 2', 'Monat 3', 'Monat 4', 'Monat 5', 'Monat 6', 'Monat 7', 'Monat 8', 'Monat 9', 'Monat 10', 'Monat 11', 'Monat 12'],
      datasets: [{
        label: 'Wachstum ohne digitale Präsenz',
        data: slowGrowthValues,
        backgroundColor: '#EF8217',
        borderColor: '#FF5733',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) { return value.toFixed(0); }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#fff'
          }
        }
      },
      layout: {
        padding: 20
      },
      elements: {
        line: {
          tension: 0.4
        }
      }
    }
  });

  var toggleButton = document.getElementById('tooglebutton');
  var isOptimized = false;

  toggleButton.addEventListener('click', function () {
    var chartData = studyChart.data.datasets[0];
    let button = toggleButton;

    if (isOptimized) {
      // Zurück zum langsamen Wachstum & Texte
      chartData.data = slowGrowthValues;
      chartData.label = 'Wachstum ohne digitale Präsenz';

      document.getElementById('situation-title').textContent = 'Ausgangssituation:';
      document.getElementById('problem-title').textContent = 'Fehlende Digitale Präsenz';
      document.getElementById('challenges-title').textContent = 'Herausforderungen:';
      document.getElementById('challenges-list').innerHTML = `
          <li>Keine Website, nur lokale Laufkundschaft</li>
          <li>Keine Online-Werbung, Abhängigkeit von Mundpropaganda</li>
          <li>Eingeschränkte Kundenreichweite</li>
      `;
      document.getElementById('problems-title').textContent = 'Probleme:';
      document.getElementById('problems-list').innerHTML = `
          <li>Geringe Sichtbarkeit in der digitalen Welt</li>
          <li>Kunden konnten keine aktuellen Angebote oder Öffnungszeiten online finden</li>
          <li>Fehlende Möglichkeit, neue Kunden zu gewinnen</li>
      `;

      button.textContent = 'Wechseln zu Optimiert';
    } else {
      // Zum schnellen Wachstum & Texte
      chartData.data = fastGrowthValues;
      chartData.label = 'Wachstum mit digitaler Präsenz';

      document.getElementById('situation-title').textContent = 'Ausgangssituation:';
      document.getElementById('problem-title').textContent = 'Starke Digitale Präsenz';
      document.getElementById('challenges-title').textContent = 'Stärken:';
      document.getElementById('challenges-list').innerHTML = `
          <li>Optimierte Website mit ansprechendem Design und klarer Benutzerführung</li>
          <li>Gezielte Online-Werbung zur Reichweitensteigerung</li>
          <li>Erweiterung der Kundenreichweite durch digitale Kanäle</li>
      `;
      document.getElementById('problems-title').textContent = 'Vorteile:';
      document.getElementById('problems-list').innerHTML = `
          <li>Hohe Sichtbarkeit in der digitalen Welt, sowohl lokal als auch überregional</li>
          <li>Kunden können jederzeit aktuelle Angebote, Öffnungszeiten und Informationen einsehen</li>
          <li>Erhöhte Möglichkeit, neue Kunden durch gezielte Marketingstrategien zu gewinnen</li>
      `;

      button.textContent = 'Wechseln zu Unoptimiert';
    }

    isOptimized = !isOptimized;
    studyChart.update();
  });
});




// Hamburger Menü toggeln
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Menü schließen, wenn ein Link geklickt wird
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});








document.addEventListener('DOMContentLoaded', () => {
    // Elemente auswählen
    const paketGrid = document.querySelector('.paket-grid');
    const leftBtn = document.querySelector('.slider-btn.left');
    const rightBtn = document.querySelector('.slider-btn.right');
    const cards = document.querySelectorAll('.paket-card');

    // Abbruch, falls Elemente fehlen oder nur eine Karte existiert
    if (!paketGrid || !leftBtn || !rightBtn || cards.length < 2) return;

    // Funktion zur Überprüfung: Nur Hochformat (Portrait)
    const isPortrait = () => 
        window.matchMedia('(orientation: portrait)').matches; 

    // Die Basis-Font-Größe für Rem-Berechnungen
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    
    // Annahme: Der Gap (Abstand) im CSS beträgt 2rem
    const GAP_REM_VALUE = 2;


    const scrollOneCard = (direction) => {
        // Funktionalität nur im Hochformat ausführen
        if (!isPortrait()) return;

        // 1. Berechnung der Scroll-Distanz und Grenzen
        const cardWidth = cards[0].offsetWidth;
        const gap = GAP_REM_VALUE * remToPx; 
        const stepDistance = cardWidth + gap;
        
        let currentScroll = paketGrid.scrollLeft;
        let newScroll = currentScroll;
        
        // Die maximale Scroll-Position (benötigt für den Sprung zur letzten Karte)
        const maxScroll = paketGrid.scrollWidth - paketGrid.clientWidth;
        
        // Toleranzwert für die Prüfung, ob wir am Anfang oder Ende sind (wegen Scroll-Snap/Padding)
        const tolerance = 5; 
        
        // Prüfen, ob wir bereits am äußersten Anfang oder Ende sind, mit Toleranz
        const isAtStart = currentScroll <= tolerance;
        const isAtEnd = currentScroll >= maxScroll - tolerance;

        
        if (direction === 'right') {
            // Wenn wir am Ende sind (letzte Folie), springe zum Anfang (Folie 1)
            if (isAtEnd) {
                newScroll = 0;
            } else {
                newScroll += stepDistance;
                // Falls der Sprung das Ende übersteigt, setzen wir ihn auf maxScroll
                if (newScroll > maxScroll) {
                    newScroll = maxScroll; 
                }
            }
        } 
        
        else if (direction === 'left') {
            // Wenn wir am Anfang sind (Folie 1), springe zum Ende (letzte Folie)
            if (isAtStart) {
                newScroll = maxScroll;
            } else {
                newScroll -= stepDistance;
                // Falls der Sprung unter 0 geht, setzen wir ihn auf 0
                if (newScroll < 0) {
                    newScroll = 0;
                }
            }
        }

        // Geschmeidiges Scrollen anwenden
        paketGrid.scrollTo({
            left: newScroll,
            // HINWEIS: Bei Sprüngen von Ende zu Start (und umgekehrt) im Infinite Loop
            // wird 'smooth' oft ignoriert und führt zu einem harten Sprung. Das ist normal.
            behavior: 'smooth' 
        });
    };

    // Event-Listener für die Buttons
    leftBtn.addEventListener('click', () => scrollOneCard('left'));
    rightBtn.addEventListener('click', () => scrollOneCard('right'));
});