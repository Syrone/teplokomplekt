import Swiper from "swiper/bundle";

document.addEventListener("DOMContentLoaded", () => {
  /** (Start) Price Range */
  const rangeInput = document.querySelectorAll(".price-input-range input"),
    priceInput = document.querySelectorAll(".price-input input"),
    progress = document.querySelector(
      ".price-input-slider .price-input-progress"
    );

  if (rangeInput && priceInput && progress) {
    let priceGap =
      (document.querySelector(".range-max").getAttribute("max") * 7) / 100;

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minValue = parseInt(rangeInput[0].value),
          maxValue = parseInt(rangeInput[1].value);

        if (maxValue - minValue < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxValue - priceGap;
          } else {
            rangeInput[1].value = minValue + priceGap;
          }
        } else {
          priceInput[0].value = minValue;
          priceInput[1].value = maxValue;
          progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
          progress.style.right =
            100 - (maxValue / rangeInput[1].max) * 100 + "%";
        }

        document
          .getElementById("btnFilterReset")
          .addEventListener("click", () => {
            progress.style.left = 0;
            progress.style.right = 0;
          });
      });
    });

    priceInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minValue = parseInt(priceInput[0].value),
          maxValue = parseInt(priceInput[1].value);

        if (
          maxValue - minValue >= priceGap &&
          maxValue <= document.querySelector(".range-max").getAttribute("max")
        ) {
          if (e.target.className === "input-min") {
            rangeInput[0].value = minValue;
            progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
          } else {
            rangeInput[1].value = maxValue;
            progress.style.right =
              100 - (maxValue / rangeInput[1].max) * 100 + "%";
          }
        }
      });
    });
  }
  /** (End) Price Range */

  /** (Start) Input Stepper */
  const inputSteppers = document.querySelectorAll(".input-stepper");

  if (inputSteppers) {
    inputSteppers.forEach((inputStepper) => {
      const decrementButton = inputStepper.querySelector(".decrement");
      const incrementButton = inputStepper.querySelector(".increment");
      const inputDisplay = inputStepper.querySelector(".input-display");

      decrementButton.addEventListener("click", () => {
        let value = parseInt(inputDisplay.value);
        if (value > parseInt(inputDisplay.min)) {
          value -= parseInt(inputDisplay.step);
          inputDisplay.value = value;
        }
      });

      incrementButton.addEventListener("click", () => {
        let value = parseInt(inputDisplay.value);
        if (value < parseInt(inputDisplay.max)) {
          value += parseInt(inputDisplay.step);
          inputDisplay.value = value;
        }
      });
    });
  }
  /** (End) Input Stepper */

  /** (Start) Category List and Grid */
  const btnList = document.querySelector(".btn-list");
  const btnGrid = document.querySelector(".btn-grid");
  const categoryMainWrapper = document.querySelector(".category-main-wrapper");

  if(btnList && btnGrid) {
    btnGrid.addEventListener("click", () => {
      btnList.classList.remove("active");
      btnGrid.classList.add("active");
      categoryMainWrapper.classList.remove("list");
      categoryMainWrapper.classList.add("grid");
    });
  
    btnList.addEventListener("click", () => {
      btnGrid.classList.remove("active");
      btnList.classList.add("active");
      categoryMainWrapper.classList.remove("grid");
      categoryMainWrapper.classList.add("list");
    });
  }
  /** (End) Category List and Grid */

  /* (Start) Header Catalog Menu*/
  const menuCatalog = document.getElementById("catalogMenu");
  const menuLists = document.querySelectorAll(".catalog-list");
  const menuItems = document.querySelectorAll(".catalog-item");

  if (menuCatalog) {
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener("click", () => {
        const content = menuLists[index].querySelector(".list-group-inner");
        const isActive = menuLists[index].classList.contains("active");

        if(window.innerWidth > 568 && isActive) {
          return
        }
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

  /* (Start) Swiper Main */
  const swiperMain = new Swiper(".swiper-main", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    grabCursor: true,

    pagination: {
      el: ".swiper-main-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-main-next",
      prevEl: ".swiper-main-prev",
    },
  });
  /* (End) Swiper Main */

  /* (Start) Swiper Certificate */
  const swiperCertificate = new Swiper(".swiper-certificate", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    grabCursor: true,

    navigation: {
      nextEl: ".swiper-certificate-next",
      prevEl: ".swiper-certificate-prev",
    },
  });
  /* (End) Swiper Certificate */

  /** (Start) Card Page Swiper */
  const productThumbSwiper = new Swiper(".swiper-product-thumb", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
  });
  const productMainSwiper = new Swiper(".swiper-product-main", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 10,
    thumbs: {
      swiper: productThumbSwiper,
    },
  });
  /** (End) Card Page Swiper */

  /** (Start) Also buy Swiper */
  const alsoBuySwiper = new Swiper(".swiper-also", {
    spaceBetween: 0,
    slidesPerView: 4,
    navigation: {
      nextEl: ".swiper-also-next",
      prevEl: ".swiper-also-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      }
    }
  });
  /** (End) Also buy Swiper */

  /* (Start) Yandex Map */
  if (document.getElementById("map")) {
    ymaps.ready(init);
  }
  function init() {
    const redMarker = "islands#redIcon",
      blueMarker = "islands#blueIcon",
      orangeMarker = "islands#orangeIcon";

    let map = new ymaps.Map("map", {
      center: [54.98875739867892, 73.36744817187494],
      zoom: 4,
    });

    /** (Start) Красные Метки */
    let placemarkMoscow = new ymaps.Placemark(
      [55.58422718162347, 37.38553349999997],
      {},
      {
        preset: redMarker,
      }
    );
    let placemarkSamara = new ymaps.Placemark(
      [53.32213850559074, 50.0613185],
      {},
      {
        preset: redMarker,
      }
    );
    //
    let placemarkIzhevsk = new ymaps.Placemark(
      [56.85235931108874, 53.19983949999994],
      {},
      {
        preset: redMarker,
      }
    );
    /** (End) Красные Метки */

    /** (Start) Синие Метки */
    let placemarkKaluga = new ymaps.Placemark(
      [54.53649918608257, 36.19510799999998],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkKazan = new ymaps.Placemark(
      [55.76730619528606, 49.099981999999954],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkKirov = new ymaps.Placemark(
      [58.582681531221176, 49.5708654999999],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkRostov = new ymaps.Placemark(
      [47.2543416786812, 39.62812799999998],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkVolgograd = new ymaps.Placemark(
      [48.64866389085548, 44.39812349999996],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkIlek = new ymaps.Placemark(
      [51.52783593070165, 53.37136276523543],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkUfa = new ymaps.Placemark(
      [54.73670764541357, 55.96282403406904],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkYekaterinburg = new ymaps.Placemark(
      [56.78875104810377, 60.47506549999994],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkTyumen = new ymaps.Placemark(
      [57.137410200999284, 65.54591599999998],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkOmsk = new ymaps.Placemark(
      [55.12277356552416, 73.37843449999993],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkNovosibirsk = new ymaps.Placemark(
      [55.00202076433394, 82.95604349999992],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkZhezkazgan = new ymaps.Placemark(
      [47.799174970086895, 67.71105540717373],
      {},
      {
        preset: blueMarker,
      }
    );
    let placemarkSurgut = new ymaps.Placemark(
      [61.23740730641438, 73.39792181976844],
      {},
      {
        preset: blueMarker,
      }
    );
    /** (End) Синие Метки */

    let placemarkPerm = new ymaps.Placemark(
      [58.02283760827209, 56.22942499999996],
      {},
      {
        preset: orangeMarker,
      }
    );

    map.geoObjects.add(placemarkMoscow);
    map.geoObjects.add(placemarkSamara);
    map.geoObjects.add(placemarkIzhevsk);
    map.geoObjects.add(placemarkKaluga);
    map.geoObjects.add(placemarkKazan);
    map.geoObjects.add(placemarkKirov);
    map.geoObjects.add(placemarkRostov);
    map.geoObjects.add(placemarkVolgograd);
    map.geoObjects.add(placemarkIlek);
    map.geoObjects.add(placemarkUfa);
    map.geoObjects.add(placemarkYekaterinburg);
    map.geoObjects.add(placemarkTyumen);
    map.geoObjects.add(placemarkOmsk);
    map.geoObjects.add(placemarkNovosibirsk);
    map.geoObjects.add(placemarkZhezkazgan);
    map.geoObjects.add(placemarkSurgut);
    map.geoObjects.add(placemarkPerm);

    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("rulerControl"); // удаляем контрол правил
    map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
  }
  /* (End) Yandex Map */
});
