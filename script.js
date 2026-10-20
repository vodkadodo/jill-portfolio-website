// Ensure the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {

  // Copyright Footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // Dark / Light Mode Toggle
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "Light Mode";
      } else {
        themeBtn.textContent = "Dark Mode";
      }
    });
  }


  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".topnav a");

  window.addEventListener("scroll", function () {
    let currentSection = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });


  // Back-to-Top Button
  const topBtn = document.createElement("button");
  topBtn.id = "backToTop";
  topBtn.innerHTML = "Top";
  topBtn.style.cssText = "display:none; position:fixed; bottom:20px; right:20px; z-index:99; padding:10px 15px; background-color:#830000; color:white; border:1px solid #FF0000; border-radius:4px; cursor:pointer; font-weight:bold;";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  // Typing Effect on Home Section Headline
  const homeHeading = document.querySelector("#home h1");
  if (homeHeading) {
    const originalText = homeHeading.innerText;
    homeHeading.innerText = "";
    let index = 0;

    function typeWriter() {
      if (index < originalText.length) {
        homeHeading.innerText += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
      }
    }
    typeWriter();
  }


  // Contact Form Validation & Feedback
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Stop default page refresh

      const nameInput = document.getElementById("fname").value.trim();
      const emailInput = document.getElementById("email").value.trim();
      const messageInput = document.getElementById("subject").value.trim();

      if (nameInput === "" || emailInput === "" || messageInput === "") {
        alert("Error: Please complete all form fields before submitting.");
        return;
      }

      alert("Thank you, " + nameInput + "! Your message has been sent successfully.");
      contactForm.reset();
    });
  }


  // Interactive Hover Border Highlight for Project Items
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      item.style.borderLeftColor = "#FF0000";
    });
    item.addEventListener("mouseleave", function () {
      item.style.borderLeftColor = "#830000";
    });
  });


  // Dynamic Time-Based Greeting Banner
  const homeSection = document.getElementById("home");
  if (homeSection) {
    const currentHour = new Date().getHours();
    let greetingText = "";

    if (currentHour < 12) {
      greetingText = "Good Morning! Welcome to my portfolio.";
    } else if (currentHour < 18) {
      greetingText = "Good Afternoon! Welcome to my portfolio.";
    } else {
      greetingText = "Good Evening! Welcome to my portfolio.";
    }

    const greetingBanner = document.createElement("p");
    greetingBanner.style.cssText = "font-weight: bold; color: #830000; margin-top: 10px;";
    greetingBanner.innerText = greetingText;
    homeSection.appendChild(greetingBanner);
  }


  // Click-to-Inspect Project Details Alert
  projectItems.forEach(function (item) {
    item.style.cursor = "pointer";
    item.addEventListener("click", function () {
      const title = item.querySelector("h3").innerText;
      const meta = item.querySelector(".project-meta").innerText;
      alert("Project Overview:\n\n" + title + "\n" + meta);
    });
  });


  // Smooth Scrolling for Top Navbar Navigation Links
  const navAnchors = document.querySelectorAll('.topnav a[href^="#"]');
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

});
