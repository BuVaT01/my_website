(function(){
    const registerContainer = document.getElementById("register-container");
    const loginContainer = document.getElementById("login-container");
    const toLoginLink = document.getElementById("to-login");
    const toRegisterLink = document.getElementById("to-register");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const registerMessage = document.getElementById("register-message");
    const loginMessage = document.getElementById("login-message");
  
    function showMessage(container, message, type = 'success') {
      container.textContent = message;
      container.className = 'message ' + (type === 'success' ? 'success' : 'error');
      setTimeout(() => {
        container.textContent = '';
        container.className = 'message';
      }, 4000);
    }
  
    toLoginLink.addEventListener("click", () => {
      registerContainer.style.display = "none";
      loginContainer.style.display = "block";
    });
  
    toRegisterLink.addEventListener("click", () => {
      loginContainer.style.display = "none";
      registerContainer.style.display = "block";
    });
  
    registerForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const username = this["reg-name"].value.trim();
      const password = this["reg-password"].value;
  
      if (!username || !password) {
        showMessage(registerMessage, "Iltimos, barcha maydonlarni to‘ldiring.", "error");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
  
        const data = await res.json();
        if (res.ok) {
          showMessage(registerMessage, data.message, "success");
          this.reset();
        } else {
          showMessage(registerMessage, data.message || "Xatolik yuz berdi", "error");
        }
      } catch (err) {
        showMessage(registerMessage, "Server bilan aloqa yo‘q", "error");
      }
    });
  
    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const username = this["login-email"].value.trim();
      const password = this["login-password"].value;
  
      if (!username || !password) {
        showMessage(loginMessage, "Iltimos, barcha maydonlarni to‘ldiring.", "error");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
  
        const data = await res.json();
        if (res.ok) {
          showMessage(loginMessage, data.message, "success");
          this.reset();
          setTimeout(() => {
            window.location.href = "ucerpanel.html";
          }, 1000);
        } else {
          showMessage(loginMessage, data.message || "Login xatosi", "error");
        }
      } catch (err) {
        showMessage(loginMessage, "Server bilan aloqa uzildi", "error");
      }
    });
  })();
  