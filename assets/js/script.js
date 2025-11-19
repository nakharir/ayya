// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Star Generator (Background)
const starContainer = document.getElementById("star-container");
const starCount = 150;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 3 + 2;

  star.style.left = `${x}%`;
  star.style.top = `${y}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.setProperty("--duration", `${duration}s`);

  starContainer.appendChild(star);
}

// 2. Typing Effect (FIXED: Input hidden initially, Name corrected)
const typingTextElement = document.getElementById("typing-text");
const fullText = "Halo Ayya. Sudah siap untuk memulai?"; // Corrected Name
let charIndex = 0;

function typeWriter() {
  if (charIndex < fullText.length) {
    typingTextElement.textContent += fullText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 80); // Typing Speed
  } else {
    // Setelah ngetik selesai, baru munculkan Input & Hint
    // Menggunakan autoAlpha untuk mengubah opacity:1 dan visibility:visible sekaligus
    gsap.to(".input-wrapper, .hint", {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.3, // Hint muncul sedikit lebih lambat dari input
      ease: "power2.out",
    });

    // Fokuskan kursor ke input otomatis
    setTimeout(() => {
      document.getElementById("password-input").focus();
    }, 500);
  }
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", typeWriter);

// 3. Password Logic (Corrected for Ayya)
const passwordInput = document.getElementById("password-input");
const errorMsg = document.getElementById("error-msg");
const gateSection = document.getElementById("gate");
const body = document.body;
const moon = document.querySelector(".moon");

passwordInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const inputVal = passwordInput.value;

    if (inputVal === "20112005") {
      // Password Benar
      errorMsg.style.opacity = "0";

      // Matikan interaksi input agar tidak bisa diketik lagi
      passwordInput.blur();

      // Animasi Transisi Dramatis
      gsap
        .timeline()
        .to(gateSection.querySelector(".gate-content"), {
          opacity: 0,
          y: -50,
          duration: 0.8,
          ease: "power2.in",
        })
        .to(
          gateSection,
          {
            scale: 3,
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut",
            onComplete: () => {
              gateSection.style.display = "none";
              body.style.overflowY = "auto";
              initScrollAnimations();
            },
          },
          "-=0.5"
        );
    } else {
      // Password Salah
      errorMsg.style.opacity = "1";
      gsap.fromTo(
        errorMsg,
        { x: -10 },
        { x: 10, duration: 0.1, repeat: 5, yoyo: true, clearProps: "x" }
      );
      setTimeout(() => (errorMsg.style.opacity = "0"), 3000);
    }
  }
});

// 4. Scroll Animations
function initScrollAnimations() {
  const cards = document.querySelectorAll(".memory-card");

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? -100 : 100;

    gsap.fromTo(
      card,
      { opacity: 0, x: direction },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.to(moon, {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    y: 200,
  });

  document.getElementById("main-content").classList.remove("hidden-content");
}

// 5. Candle & Music
const candleTrigger = document.getElementById("candle-trigger");
const flame = document.getElementById("flame");
const audio = document.getElementById("bg-music");
const instruction = document.getElementById("instruction-text");
const finalMessage = document.getElementById("final-message");

candleTrigger.addEventListener("click", function () {
  if (!flame.classList.contains("active")) {
    flame.classList.add("active");

    audio.volume = 0.5;
    audio.play().catch((error) => {
      console.log("Autoplay blocked, user interaction needed first.");
    });

    gsap.to(instruction, { opacity: 0, duration: 0.5 });

    finalMessage.style.display = "block";
    gsap.fromTo(
      finalMessage,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        delay: 1,
        ease: "power2.out",
      }
    );

    gsap.to("body", {
      background: "radial-gradient(circle at center bottom, #1a1f35, #000000)",
      duration: 3,
    });
  }
});
