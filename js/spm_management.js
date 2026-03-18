document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("main-section");
  const links = document.querySelectorAll("a[data-content]");

  window.loadContent = function(page) {
    fetch(`content/${page}.html`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then(html => {
        section.innerHTML = html;

        links.forEach(link => link.classList.remove("active"));
        document.querySelector(`a[data-content="${page}"]`)?.classList.add("active");
      })
      .catch(err => {
        section.innerHTML = `
          <div class="centered-content">
            <img src="images/error.png" alt="Error">
            <p style="color:yellow">YARRRRR!!! There is a problem with the sails</p>
            <p>${err}</p>
          </div>
        `;
      });
  };

  window.loadContent("home");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-content");
      window.loadContent(page);
    });
  });
});