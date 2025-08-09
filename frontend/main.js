document.addEventListener("DOMContentLoaded", () => {
  // Navigatsiya
  const navButtons = document.querySelectorAll(".nav-button");
  const sections = document.querySelectorAll("section");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const sectionId = button.getAttribute("data-section");
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === sectionId) {
          section.classList.add("active");
        }
      });
    });
  });

  // Auth form'lar
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const authMessage = document.getElementById("auth-message");

  const showMessage = (el, msg, type = "success") => {
    el.textContent = msg;
    el.className = `message ${type}`;
    setTimeout(() => {
      el.textContent = "";
      el.className = "message";
    }, 3000);
  };

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const type = document.getElementById("profile-type").value;

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, type }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(authMessage, data.message, "success");
        registerForm.reset();
      } else {
        showMessage(authMessage, data.message, "error");
      }
    } catch {
      showMessage(authMessage, "Serverga ulanishda xatolik", "error");
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(authMessage, data.message, "success");
        loginForm.reset();
        document.querySelector('[data-section="user-home-section"]').click();
      } else {
        showMessage(authMessage, data.message, "error");
      }
    } catch {
      showMessage(authMessage, "Serverga ulanishda xatolik", "error");
    }
  });

  // Xizmat so‘rovi yuborish
  const serviceForm = document.getElementById("service-request-form");
  serviceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("request-device").value.trim();
    const issue = document.getElementById("request-issue").value.trim();
    const owner = "User"; // Keyinchalik localStorage orqali dinamik o‘zgartiriladi
    const date = new Date().toISOString();
    const photo = "default.png";
    const tech = "texnik-1";

    try {
      const res = await fetch("http://localhost:3000/laptops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, issue, owner, date, photo, tech }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("So‘rovingiz yuborildi!");
        serviceForm.reset();
      } else {
        alert("Xatolik: " + data.error);
      }
    } catch {
      alert("Serverga ulanib bo‘lmadi.");
    }
  });

  // Ehtiyot qism qo‘shish
  const partForm = document.getElementById("spare-parts-form");
  const tableBody = document.getElementById("spare-parts-table-body");

  partForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("part-name").value;
    const quantity = +document.getElementById("part-quantity").value;
    const price = +document.getElementById("part-price").value;

    try {
      const res = await fetch("http://localhost:3000/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity, price }),
      });
      const data = await res.json();
      if (res.ok) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td>${quantity}</td><td>${price}</td><td>-</td>`;
        tableBody.appendChild(row);
        partForm.reset();
      } else {
        alert("Xatolik: " + data.error);
      }
    } catch {
      alert("Serverga ulanib bo‘lmadi.");
    }
  });

  // Kalendar yaratish
  const calendar = document.getElementById("calendar");
  for (let i = 1; i <= 30; i++) {
    const day = document.createElement("div");
    day.className = "calendar-day";
    day.textContent = i;
    calendar.appendChild(day);
  }
});
// ...existing code...
liveServer.settings.https = {
  enable: true,
  cert: "C:/path/to/cert.pem",
  key: "C:/path/to/key.pem",
};
// ...existing code...
