document.addEventListener("DOMContentLoaded", () => {
  /* (Start) Header Catalog Menu*/
  const menuCatalog = document.getElementById("catalogMenu");
  const menuLists = document.querySelectorAll(".catalog-list");
  const menuItems = document.querySelectorAll(".catalog-item");

  if (menuCatalog) {
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("click", () => {
        const content = menuLists[index].querySelector(".list-group-inner");
        const isActive = menuLists[index].classList.contains("active");

        // Убираем класс active у всех элементов
        menuLists.forEach((menuList) => {
          menuList.classList.remove("active");
          menuList.querySelector(".list-group-inner").style.maxHeight = "0";
        });

        if (!isActive) {
          // Добавляем класс active и устанавливаем высоту содержимого
          menuLists[index].classList.add("active");

          if (window.innerWidth < 568) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            content.style.maxHeight = "";
          }
        }
      });
    });
  }

  /* (Start) Добавил способы закрытия Bootstrap Collapse*/
  const catalogMenuCollapse = document.getElementById("catalogMenuCollapse");
  const catalogCollapse = new bootstrap.Collapse(catalogMenuCollapse, {
    toggle: false,
  });

  // Получаем все ссылки внутри collapse
  const catalogCollapseLinks = catalogMenuCollapse.querySelectorAll("a");

  if (catalogMenuCollapse) {
    catalogCollapse.hide();

    // Добавляем обработчик события клика на каждую ссылку
    catalogCollapseLinks.forEach((link) => {
      link.addEventListener("click", () => {
        catalogCollapse.hide();
      });
    });

    // Обработчик события клика вне collapse
    document.addEventListener("click", (event) => {
      if (!catalogMenuCollapse.contains(event.target)) {
        catalogCollapse.hide();
      }
    });

    // Обработчик события нажатия клавиши Esc
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        catalogCollapse.hide();
      }
    });
  }
  /* (End) Добавил способы закрытия Bootstrap Collapse*/
  /* (End) Header Catalog Menu*/

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
