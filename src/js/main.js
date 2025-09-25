document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const items = document.querySelectorAll(".lib__item");
  const tagButtons = document.querySelectorAll(".lib__li");
  const noResults = document.getElementById("noResults");

  // сохраняем оригинальные тексты в dataset
  items.forEach((item) => {
    const authorEl = item.querySelector(".lib__item-author");
    const titleEl = item.querySelector(".lib__item-title");
    const tagEl = item.querySelector(".lib__item-tag");
    const descrEl = item.querySelector(".lib__item-descrp");

    authorEl.dataset.original = authorEl.textContent;
    titleEl.dataset.original = titleEl.textContent;
    tagEl.dataset.original = tagEl.textContent;
    descrEl.dataset.original = descrEl.textContent;
  });

  // подсветка
  function highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  // сброс подсветки
  function resetHighlights() {
    items.forEach((item) => {
      item.querySelector(".lib__item-author").innerHTML =
        item.querySelector(".lib__item-author").dataset.original;
      item.querySelector(".lib__item-title").innerHTML =
        item.querySelector(".lib__item-title").dataset.original;
      item.querySelector(".lib__item-tag").innerHTML =
        item.querySelector(".lib__item-tag").dataset.original;
      item.querySelector(".lib__item-descrp").innerHTML =
        item.querySelector(".lib__item-descrp").dataset.original;
    });
  }

  // функция поиска
  function runSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    resetHighlights();

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

      const author = authorEl.dataset.original;
      const title = titleEl.dataset.original;
      const tag = tagEl.dataset.original;
      const descr = descrEl.dataset.original;

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
      }
    });

    if (!found) {
      noResults.textContent = "Ничего не найдено";
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }

    // очистка поля после поиска
    searchInput.value = "";
  }

  // запуск поиска по клику
  searchBtn.addEventListener("click", runSearch);

  // запуск поиска по Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  });

  // фильтрация по тегу
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag.toLowerCase();
      let found = false;

      resetHighlights();

      items.forEach((item) => {
        const tagEl = item.querySelector(".lib__item-tag");
        const tag = tagEl.dataset.original.toLowerCase();

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

  // меню
  (() => {
    const menuBtn = document.querySelector(".lib__menu-btn");
    const menuList = document.querySelector(".lib__sidebar");
    const menuItems = document.querySelectorAll(".lib__li");

    if (menuBtn && menuList) {
      // открыть/закрыть
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        menuList.classList.toggle("active");
      });

      // клик по пункту меню — закрыть
      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          menuBtn.classList.remove("active");
          menuList.classList.remove("active");
        });
      });
    }
  })();
});
