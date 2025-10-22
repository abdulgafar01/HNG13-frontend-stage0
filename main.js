    // --- Update live time ---
    const timeEl = document.getElementById("user-time");
    if (timeEl) {
      function updateTime() {
        timeEl.textContent = `Current Time: ${Date.now()}`;
      }
      updateTime();
      setInterval(updateTime, 1000);
    }

    // --- Avatar Upload (only on pages with avatar) ---
    const uploadBtn = document.getElementById("upload-btn");
    const uploadInput = document.getElementById("upload-input");
    const avatarImg = document.getElementById("user-avatar");

    if (uploadBtn && uploadInput && avatarImg) {
      uploadBtn.addEventListener("click", () => uploadInput.click());
      uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            avatarImg.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    if (themeToggle) {
      // Load preferred theme
      const userPref = localStorage.getItem("theme");
      if (userPref) {
        root.setAttribute("data-theme", userPref);
        themeToggle.textContent = userPref === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
      }

      themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        themeToggle.textContent = next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
      });
    } else {
      // If the toggle is missing, ensure the theme still respects stored preference
      const userPref = localStorage.getItem("theme");
      if (userPref) root.setAttribute("data-theme", userPref);
    }
