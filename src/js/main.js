document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const items = document.querySelectorAll(".lib__item");
  const tagButtons = document.querySelectorAll(".lib__li");
  const noResults = document.getElementById("noResults");

  function highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    if (query === "") {
      items.forEach((item) => (item.style.display = "none"));
      noResults.textContent = "Введите запрос для поиска";
      noResults.style.display = "block";
      return;
    }

    items.forEach((item) => {
      const authorEl = item.querySelector(".lib__item-author");
      const titleEl = item.querySelector(".lib__item-title");
      const tagEl = item.querySelector(".lib__item-tag");
      const descrEl = item.querySelector(".lib__item-descrp");

      const author = authorEl.textContent;
      const title = titleEl.textContent;
      const tag = tagEl.textContent;
      const descr = descrEl.textContent;

      const haystack = `${author} ${title} ${tag} ${descr}`.toLowerCase();

      if (haystack.includes(query)) {
        item.style.display = "block";
        found = true;

        authorEl.innerHTML = highlight(author, query);
        titleEl.innerHTML = highlight(title, query);
        tagEl.innerHTML = highlight(tag, query);
        descrEl.innerHTML = highlight(descr, query);
      } else {
        item.style.display = "none";

        authorEl.textContent = author;
        titleEl.textContent = title;
        tagEl.textContent = tag;
        descrEl.textContent = descr;
      }
    });

    if (!found) {
      noResults.textContent = "Ничего не найдено";
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag.toLowerCase();
      let found = false;

      items.forEach((item) => {
        const tagEl = item.querySelector(".lib__item-tag");
        const tag = tagEl.textContent.toLowerCase();

        if (tag.includes(selectedTag)) {
          item.style.display = "block";
          found = true;
        } else {
          item.style.display = "none";
        }
      });

      if (!found) {
        noResults.textContent = "Ничего не найдено";
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    });
  });
});
