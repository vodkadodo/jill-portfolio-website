// Coded by Jill Albright Gabriel

// global state variable controlling sound effects on or off
var sfxEnabled = true;

// retro 8 bit sound tones
function playSound(frequency, type, duration) {
  if (!sfxEnabled) return; // Exit if muted
  try {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    var ctx = new AudioContext();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = type || "square";
    osc.frequency.value = frequency;

    // apply loud volume drop (envelope) in retro sound
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // ignore browser autoplay block restrictions
  }
}

// toggle sound effect and button label text
function toggleSound() {
  sfxEnabled = !sfxEnabled;
  var btn = document.getElementById("sfx-btn");
  if (sfxEnabled) {
    btn.innerHTML = "🔊 SFX: ON";
    playSound(800, "triangle", 0.1);
  } else {
    btn.innerHTML = "🔇 SFX: OFF";
  }
}

// mobile navigation menu toggle handler
function toggleNavMenu() {
  playSound(600, "square", 0.05);
  var menu = document.getElementById("navMenu");
  if (menu.className.indexOf("show") === -1) {
    menu.className += " show"; // add 'show' class
  } else {
    menu.className = menu.className.replace(" show", ""); // remove 'show' class
  }
}

// add click event listeners to all navigation links
function setActiveLink(element) {
  playSound(600, "square", 0.05);
  var links = document.getElementsByClassName("nav-link");
  for (var i = 0; i < links.length; i++) {
    links[i].className = links[i].className.replace(" active", "");
  }
  element.className += " active";

  // hide mobile menu after selecting a link
  var menu = document.getElementById("navMenu");
  menu.className = menu.className.replace(" show", "");
}

// draw a pixel avatar on the canvas with bobbing and blinking animation
function drawPixelAvatar() {
  var canvas = document.getElementById("avatarCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var frame = 0;

  // 12x12 Grid Matrix (0: Empty, 1: Hair, 2: Skin, 3: Clothes, 4: Eyes) her avatar design
  var spriteMap = [
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,2,2,2,2,2,2,1,1,0],
    [0,1,2,4,2,2,2,2,4,2,1,0],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [0,0,2,2,2,1,1,2,2,2,0,0],
    [0,0,0,2,2,2,2,2,2,0,0,0],
    [0,0,3,3,3,3,3,3,3,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,0],
    [0,3,3,3,3,3,3,3,3,3,3,0],
    [0,3,3,0,0,0,0,0,0,3,3,0]
  ];

  var colors = { 1: "#2b1d0c", 2: "#ffcc99", 3: "#ff3366", 4: "#000000" };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var pixelSize = 8;
    frame++;

    // calculation on the vertical bobbing offset using math lol
    var offsetY = Math.sin(frame * 0.1) > 0 ? 1 : 0;

    for (var r = 0; r < 12; r++) {
      for (var c = 0; c < 12; c++) {
        var val = spriteMap[r][c];
        if (val !== 0) {
          ctx.fillStyle = colors[val];
          // eye blinking logic
          if (val === 4 && frame % 40 > 36) {
            ctx.fillStyle = colors[2]; // temporarily draw skin color for eyes
          }
          ctx.fillRect(c * pixelSize, (r + offsetY) * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    requestAnimationFrame(animate); // loop the avatar
  }
  animate();
}

// typewriter titles to display
var typewriterTitles = [
  "Computer Science Student",
  "Network Computing Major",
  "Python & Java Developer",
  "Cybersecurity Enthusiast"
];
var titleIndex = 0;
var charIndex = 0;
var isDeleting = false;

function runTypewriter() {
  var target = document.getElementById("typewriterText");
  if (!target) return;

  var currentText = typewriterTitles[titleIndex];

  if (isDeleting) {
    target.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    target.innerHTML = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  var speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 1800; // Pause at full title
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % typewriterTitles.length; // Cycle next title
    speed = 400;
  }

  setTimeout(runTypewriter, speed);
}

// the themeClassName match the CSS class defined in style.css for each theme.
function changeTheme(themeClassName, btnElement) {
  playSound(600, "square", 0.05);
  document.body.className = themeClassName;

  var btns = document.getElementsByClassName("theme-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].className = btns[i].className.replace(" active", "");
  }
  btnElement.className += " active";
}

// category parameter match the CSS class defined in style.css for each project card.
function filterProjects(category, btnElement) {
  playSound(600, "square", 0.05);
  var cards = document.getElementsByClassName("filter-item");
  
  for (var i = 0; i < cards.length; i++) {
    if (category === "all") {
      cards[i].className = cards[i].className.replace(" hide", "");
    } else {
      if (cards[i].className.indexOf(category) > -1) {
        cards[i].className = cards[i].className.replace(" hide", "");
      } else {
        if (cards[i].className.indexOf("hide") === -1) {
          cards[i].className += " hide";
        }
      }
    }
  }

  var filterBtns = document.getElementsByClassName("filter-btn");
  for (var j = 0; j < filterBtns.length; j++) {
    filterBtns[j].className = filterBtns[j].className.replace(" active", "");
  }
  btnElement.className += " active";
}

// each project object contains title, organization, and details.
var projectsData = [
  {
    title: "Kampus Digital Upskilling Programme",
    org: "PwC Malaysia | Oct 2026 - Current",
    details: "Selected for a competitive 40-hour digital upskilling program hosted by PwC Malaysia Corporate Sustainability team to build work-ready technical competencies in Spreadsheets, Digital Citizenship, and Data Analytics."
  },
  {
    title: "AI/ML-Enhanced Multi-Factor Authentication",
    org: "UNIMAS Project | Mar 2026 - Jul 2026",
    details: "Led a development group to research and build a prototype mechanism in Python to mitigate brute-force attacks using adaptive machine learning verification patterns under Computer Security."
  },
  {
    title: "DirectFarm Samarahan",
    org: "UNIMAS OOSD Project | Mar 2026 - Jul 2026",
    details: "Co-developed a Python application using Object-Oriented Software Development (OOSD) principles to connect local agricultural producers with consumers in Kota Samarahan."
  },
  {
    title: "EcoSphere Smartphone Hub",
    org: "UNIMAS Mobile App | Oct 2025 - Feb 2026",
    details: "Developed an interactive educational mobile application in Java focusing on environmental sustainability (UN SDGs: Life Below Water and Life on Land) with quizzes and real-time scoreboards."
  },
  {
    title: "FitLife Wellness Centre: Relational Database System",
    org: "UNIMAS Database Project | Oct 2025 - Feb 2026",
    details: "Designed and built a fully normalized relational database management system using SQL, HTML, and XAMPP for client tracking, automated transactions, and appointment scheduling."
  },
  {
    title: "MediTrack: Hospital Patient Management System",
    org: "UNIMAS C++ System | Mar 2025 - Jul 2025",
    details: "Collaborated in a team to design and build an object-oriented patient record system using C++ with admission tracking, doctor schedule allocation, and medical history record-keeping."
  },
  {
    title: "ARQ Protocol & Network Topology Simulation",
    org: "UNIMAS Networking | Mar 2025 - Jul 2025",
    details: "Designed network topologies and simulated Automatic Repeat reQuest (ARQ) error-control protocols using Cisco Packet Tracer under Communication & Computer Networks."
  }
];

function openProjectModal(index) {
  playSound(800, "triangle", 0.1);
  var item = projectsData[index];
  var content = document.getElementById("modalContent");
  
  content.innerHTML = 
    '<h3 class="card-title" style="margin-top:10px;">&gt; INSPECTING_PROJECT</h3>' +
    '<h2 style="font-family:var(--font-pixel); color:var(--primary); font-size:1.1rem; margin-bottom:5px;">' + item.title + '</h2>' +
    '<p style="color:var(--text-dim); margin-bottom:15px;">' + item.org + '</p>' +
    '<p style="margin-bottom:20px;">' + item.details + '</p>' +
    '<button class="pixel-btn primary" onclick="closeModal()">CLOSE WINDOW</button>';

  document.getElementById("modalOverlay").className += " open";
}

function closeModal() {
  playSound(600, "square", 0.05);
  var modal = document.getElementById("modalOverlay");
  modal.className = modal.className.replace(" open", "");
}

// processes the command and displays the appropriate response in the terminal body.
function handleTerminalCommand(e) {
  if (e.key === "Enter") {
    playSound(600, "square", 0.05);
    var input = document.getElementById("terminalInput");
    var body = document.getElementById("terminalBody");
    var val = input.value.trim().toLowerCase();

    // Append user input command line
    var userLine = document.createElement("div");
    userLine.className = "term-line";
    userLine.innerHTML = '<span style="color:var(--accent)">jill@unimas:~$</span> ' + input.value;
    body.appendChild(userLine);

    var response = "";
    if (val === "clear") {
      body.innerHTML = "";
      input.value = "";
      return;
    } else if (val === "help") {
      response = "Available commands: <span class='cmd-text'>about</span>, <span class='cmd-text'>projects</span>, <span class='cmd-text'>skills</span>, <span class='cmd-text'>certs</span>, <span class='cmd-text'>clear</span>, <span class='cmd-text'>whoami</span>";
    } else if (val === "about") {
      response = "Jill Albright Gabriel - 3rd Year Computer Science Student at UNIMAS specializing in Network Computing.";
    } else if (val === "projects") {
      response = "7 Projects available: PwC Upskilling, AI/ML MFA, DirectFarm, EcoSphere, FitLife RDBMS, MediTrack, ARQ Simulation.";
    } else if (val === "skills") {
      response = "Core: Python, C/C++, Java, SQL, Cisco Packet Tracer, HTML/CSS/JS, Agile, SDLC.";
    } else if (val === "certs") {
      response = "Certifications: ECNP, ECNS, ECSP, ECWP, Google Cybersecurity.";
    } else if (val === "whoami") {
      response = "Player 1 (Guest Recruiter / Visitor)";
    } else if (val !== "") {
      response = "<span style='color:var(--secondary)'>Command not recognized: '" + val + "'. Type 'help' for options.</span>";
    }

    if (response !== "") {
      var resLine = document.createElement("div");
      resLine.className = "term-line";
      resLine.innerHTML = response;
      body.appendChild(resLine);
    }

    input.value = "";
    body.scrollTop = body.scrollHeight; // Auto scroll to bottom
  }
}

// opens trivia modal with a question and answer buttons
function openTriviaModal() {
  playSound(800, "triangle", 0.1);
  var content = document.getElementById("modalContent");
  
  content.innerHTML = 
    '<h3 class="card-title" style="margin-top:10px;">🕹️ RETRO TRIVIA EASTER EGG</h3>' +
    '<p style="margin-bottom:15px;">Question: Which university is Jill Albright Gabriel studying at?</p>' +
    '<div style="display:flex; flex-direction:column; gap:8px;">' +
      '<button class="pixel-btn" onclick="checkTrivia(false)">A) UiTM Samarahan</button>' +
      '<button class="pixel-btn" onclick="checkTrivia(true)">B) UNIMAS</button>' +
      '<button class="pixel-btn" onclick="checkTrivia(false)">C) Universiti Malaya</button>' +
    '</div>' +
    '<div id="triviaResult" style="margin-top:15px; font-family:var(--font-pixel); font-size:0.75rem;"></div>';

  document.getElementById("modalOverlay").className += " open";
}

function checkTrivia(isCorrect) {
  var res = document.getElementById("triviaResult");
  if (isCorrect) {
    // Play fanfare sequence
    playSound(523, "square", 0.1);
    setTimeout(function() { playSound(659, "square", 0.1); }, 80);
    setTimeout(function() { playSound(783, "square", 0.15); }, 160);
    res.style.color = "var(--accent)";
    res.innerHTML = "🎉 CORRECT! +100 EXP POINTS!";
  } else {
    playSound(600, "square", 0.05);
    res.style.color = "var(--secondary)";
    res.innerHTML = "❌ WRONG! TRY AGAIN PLAYER 1!";
  }
}

// performance check rate limiting to avoid too many particles incase
document.addEventListener("mousemove", function(e) {
  if (Math.random() > 0.8) { // performance check rate limiting
    var p = document.createElement("div");
    p.className = "pixel-cursor-particle";
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";
    document.body.appendChild(p);

    setTimeout(function() {
      p.remove();
    }, 600);
  }
});

// contact form submission handler
function submitForm(e) {
  e.preventDefault(); // Stop default form submit page reloads
  playSound(523, "square", 0.1);
  setTimeout(function() { playSound(659, "square", 0.1); }, 80);
  
  var status = document.getElementById("formStatus");
  status.className = "form-status success";
  status.innerHTML = "📡 TRANSMISSION SUCCESSFUL! MESSAGE SENT TO JILL.";

  document.getElementById("contactForm").reset();

  setTimeout(function() {
    status.style.display = "none";
  }, 5000);
}

// entrance screen exit handler
function enterPortfolio() {
  // level up sound sequence
  playSound(523, "square", 0.1);
  setTimeout(function() { playSound(659, "square", 0.1); }, 80);
  setTimeout(function() { playSound(783, "square", 0.15); }, 160);

  // add'hide-entrance' CSS class to trigger smooth exit animation
  var entrance = document.getElementById("entrance-screen");
  if (entrance) {
    entrance.className += " hide-entrance";
  }
}

// allow user to press ENTER key on keyboard to start
document.addEventListener("keydown", function(e) {
  var entrance = document.getElementById("entrance-screen");
  if (e.key === "Enter" && entrance && entrance.className.indexOf("hide-entrance") === -1) {
    enterPortfolio();
  }
});

// global page load event trigger to run canvas animation & typewriter
window.onload = function() {
  drawPixelAvatar();
  runTypewriter();
};
