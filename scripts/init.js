// init cms-vue-lib
var appInitialized = false;
const valueTypes = {
  string: 1,
  int: 2,
  decimal: 3,
  boolean: 4,
  object: 5,
  array: 6,
  range: 7,
};

function initVueApp() {
  appInitialized = true;

  var cmsApp = new Vue({
    mixins: [cartMixin, view],
    data() {
      return {
        isFilterOpen: false,
        searchDialogVisibly: false,
        complaintDialogVisibly: false,
        questionDialogVisibly: false,
        bookingDialogVisibly: false,
        reviewDialogVisibly: false,
        feedbackDialogVisibly: false,
        mobMenuItems: [],
        mobMenuLoaded: false,
        mobMenuActivate: false,
        testDialogVisible: false,
        form: {
          title: "Оставьте заявку",
          subTitle: "",
          successTitle: null,
          errorTitle: null,
          successSubTitle: null,
          errorSubTitle: null,
          sections: [
            {
              cssClassName: "section - 2",
              fields: [
                {
                  editor: {
                    name: "input-editor",
                    label: "Ваше имя",
                    placeholder: "Например: Иван",
                    type: "text",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "userName",
                  validation: {
                    required: {
                      value: true,
                      text: "Поле должно быть обязательным",
                    },
                    regular: {
                      value: /^([а-яё]+|[a-z]+)$/i,
                      text: "Введите корректное имя",
                    },
                    min: {
                      value: 2,
                      text: "Поле должно содержать минимум 3 символа",
                    },
                  },
                },
                {
                  editor: {
                    name: "phone-number-editor",
                    label: "Телефон *",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "phone",
                  validation: {
                    required: {
                      value: true,
                      text: "Поле должно быть обязательным",
                    },
                    min: {
                      value: 15,
                      text: "Поле должно содержать минимум 15 символов",
                    },
                  },
                },
                {
                  editor: {
                    name: "input-editor",
                    label: "E-mail *",
                    placeholder: "ivan@example.ru",
                    type: "email",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "email",
                  validation: {
                    required: {
                      value: true,
                      text: "Поле должно быть обязательным",
                    },
                    regular: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      text: "Введите корректный email",
                    },
                  },
                },
                {
                  editor: {
                    name: "text-editor",
                    label: "Комментарий *",
                    placeholder: "Напишите что-нибудь",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "fullInfo",
                },
              ],
              sendFormBtn: {
                cssClassName: "btn-primary",
                caption: "Отправить",
              },
            },
          ],
          scenario: null,
          className: "Question",
          action: "Create",
          apiUrl: "/forms/sendanyform/",
          successMessage: "Ваша заявка успешно отправлена",
          errorMessage: "Произошла непредвиденная ошибка",
          okBtn: {
            cssClassName: "btn-primary",
            caption: "Ок",
          },
        },
        oneClickDialogVisible: false,
        oneClickOrder: {
          title: "Купить в 1 клик",
          subTitle: "",
          successTitle: null,
          errorTitle: null,
          successSubTitle: null,
          errorSubTitle: null,
          sections: [
            {
              cssClassName: "section - 2",
              fields: [
                {
                  editor: {
                    name: "input-editor",
                    label: "Товар",
                    placeholder: "Название товара",
                    type: "text",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "Caption",
                  validation: {
                    required: {
                      value: true,
                      text: "Поле не может быть пустым",
                    },
                  },
                },
                {
                  editor: {
                    name: "phone-number-editor",
                    label: "Телефон *",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "Phone",
                  validation: {
                    required: {
                      value: true,
                      text: "Поле не может быть пустым",
                    },
                    min: {
                      value: 15,
                      text: "Поле должно содержать минимум 15 символов",
                    },
                  },
                },

                {
                  editor: {
                    name: "text-editor",
                    label: "Комментарий *",
                    placeholder: "Напишите что-нибудь",
                  },
                  value: "",
                  cssClassName: "col-md-12",
                  name: "Comment",
                },
              ],
              sendFormBtn: {
                cssClassName: "btn-primary",
                caption: "Отправить",
              },
            },
          ],
          scenario: "one_click_order",
          className: "WebProjectForm",
          action: "Create",
          apiUrl: "/forms/sendanyform/",
          successMessage:
            "Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время",
          errorMessage: "Произошла непредвиденная ошибка",
          okBtn: {
            cssClassName: "btn-primary",
            caption: "Ок",
          },
        },
        feedbackDialogSections: [
          {
            cssClassName: "section - 2",
            fields: [
              {
                editor: {
                  name: "input-editor",
                  label: "Ваше имя *",
                  placeholder: "Например: Иван",
                  type: "text",
                },
                value: "",
                cssClassName: "col-md-12",
                name: "userName",
                validation: {
                  required: {
                    value: true,
                    text: "Поле должно быть обязательным",
                  },
                  regular: {
                    value: /^([а-яё]+|[a-z]+)$/i,
                    text: "Введите корректное имя",
                  },
                  min: {
                    value: 2,
                    text: "Поле должно содержать минимум 3 символа",
                  },
                },
              },
              {
                editor: {
                  name: "input-editor",
                  label: "E-mail *",
                  placeholder: "ivan@example.ru",
                  type: "email",
                },
                value: "",
                cssClassName: "col-md-12",
                name: "email",
                validation: {
                  required: {
                    value: true,
                    text: "Поле должно быть обязательным",
                  },
                  regular: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    text: "Введите корректный email",
                  },
                },
              },
              {
                editor: {
                  name: "phone-number-editor",
                  label: "Телефон",
                },
                value: "",
                cssClassName: "col-md-12",
                name: "phone",
              },
              {
                editor: {
                  name: "input-editor",
                  label: "Тема вопроса *",
                  placeholder: "Например: Навесы для авто",
                  type: "text",
                },
                value: "",
                cssClassName: "col-md-12",
                name: "caption",
                validation: {
                  required: {
                    value: true,
                    text: "Поле должно быть обязательным",
                  },
                  min: {
                    value: 2,
                    text: "Поле должно содержать минимум 3 символа",
                  },
                },
              },
              {
                editor: {
                  name: "text-editor",
                  label: "Комментарий",
                  placeholder: "Напишите Ваш комментарий",
                },
                value: "",
                cssClassName: "col-md-12",
                name: "comment",
              },
              {
                editor: {
                  name: "file-uploader",
                  label: "Перетащите сюда файлы или ",
                },
                value: [],
                cssClassName: "col-md-12",
                name: "linkedDocuments",
                validation: {
                  required: {
                    value: true,
                    text: "Загрузите файлы",
                  },
                  max: {
                    value: 4,
                    text: "Вы не можете загрузить больще чем 3 файлов",
                  },
                  maxFileSize: {
                    value: 10000000,
                    text: "Вы не можете загрузить файлы с размером больше чем 10000000 байтов",
                  },
                  fileTypes: {
                    value: ["doc", "docx", "pdf", "ppt", "pptx", "xlxs", "zip"],
                    text: "Загрузите правельный тип файла",
                  },
                },
              },
              {
                editor: {
                  name: "boolean-editor",
                  label:
                    "Нажимая на кнопку записаться, я принимаю пользовательское соглашение, а также ознакомлен и согласен с",
                  link: {
                    text: "политикой конфиденциальности",
                    href: "/pages/policy/",
                  },
                },
                value: false,
                cssClassName: "col-md-12",
                name: "privacyPolicy",
                validation: {
                  required: {
                    value: true,
                    text: "Поле должно быть обязательным",
                  },
                },
              },
            ],
            sendFormBtn: {
              cssClassName: "btn-primary",
              caption: "Отправить вопрос",
            },
          },
        ],
        searchIcon: {
          cssClassName: "btn btn-outline-primary bg-transparent",
        },
        groups: [
          {
            caption: "Общее",
            params: [
              {
                param: {
                  productClassParamId: 16,
                  value: [],
                  valueTypeId: valueTypes.array,
                },
                editor: {
                  label: "Цвет",
                  name: "color-selector",
                  itemColorKeyName: "color",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  attrs: {
                    class: "col-md-12",
                  },
                  items: [
                    {
                      caption: "Прозрачный",
                      value: "transparent",
                      color: "transparent",
                    },
                    {
                      caption: "Красный",
                      value: "red",
                      color: "#f00",
                    },
                    {
                      caption: "Зелённый",
                      value: "green",
                      color: "#0f0",
                    },
                    {
                      caption: "Синий",
                      value: "blue",
                      color: "#00f",
                    },
                    {
                      caption: "Жёлтый",
                      value: "yellow",
                      color: "#ff0",
                    },
                    {
                      caption: "Оранжевый",
                      value: "orange",
                      color: "#ffa500",
                    },
                    {
                      caption: "Опал",
                      value: "opal",
                      color: "#a8c3bc",
                    },
                    {
                      caption: "Бирюза",
                      value: "turquoise",
                      color: "#40e0d0",
                    },
                    {
                      caption: "Гранат",
                      value: "granate",
                      color: "#ab2a3e",
                    },
                    {
                      caption: "Бронза коричневая",
                      value: "bronzebrown",
                      color: "#a97142",
                    },
                    {
                      caption: "Бронза серая",
                      value: "bronzegray",
                      color: "#c49c48",
                    },
                    {
                      caption: "Черный",
                      value: "dark",
                      color: "#000000",
                    },
                  ],
                  config: {},
                  validations: [],
                  watchers: [],
                },
              },
              {
                param: {
                  productClassParamId: 17,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  label: "Класс",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  items: [
                    {
                      caption: "Стандарт",
                      value: 1,
                    },
                    {
                      caption: "Премиум",
                      value: 2,
                    },
                  ],
                },
              },
              {
                param: {
                  productClassParamId: 36,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  label: "Тип",
                  items: [
                    {
                      caption: "Сотовый",
                      value: 1,
                    },
                    {
                      caption: "Монолитный",
                      value: 2,
                    },
                    {
                      caption: "Профилированный",
                      value: 3,
                    },
                  ],
                },
              },
              {
                param: {
                  productClassParamId: 37,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  label: "Структура",
                  items: [
                    {
                      caption: "2R",
                      value: 1,
                    },
                    {
                      caption: "3R",
                      value: 2,
                    },
                    {
                      caption: "3RX",
                      value: 3,
                    },
                  ],
                },
              },
            ],
          },
          {
            caption: "Габариты",
            params: [
              {
                param: {
                  productClassParamId: 18,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 20,
                  },
                },
                editor: {
                  label: "Длина",
                  name: "double-range",
                  min: 0,
                  max: 20,
                  step: 0.1,
                },
              },
              {
                param: {
                  productClassParamId: 32,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 30,
                  },
                },
                editor: {
                  label: "Ширина",
                  name: "double-range",
                  min: 0,
                  max: 30,
                  step: 0.1,
                },
              },
              {
                param: {
                  productClassParamId: 35,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 30,
                  },
                },
                editor: {
                  label: "Толщина",
                  name: "double-range",
                  min: 0,
                  max: 30,
                  step: 0.5,
                },
              },
              {
                param: {
                  productClassParamId: 41,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 50,
                  },
                },
                editor: {
                  label: "Площадь",
                  name: "double-range",
                  min: 0,
                  max: 50,
                  step: 0.1,
                },
              },
            ],
          },
          {
            caption: "Прочие характеристики",
            params: [
              {
                param: {
                  productClassParamId: 34,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 10,
                  },
                },
                editor: {
                  label: "Плотность",
                  name: "double-range",
                  min: 0,
                  max: 10,
                  step: 0.1,
                },
              },
              {
                param: {
                  productClassParamId: 39,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 10,
                  },
                },
                editor: {
                  label: "Вес",
                  name: "double-range",
                  min: 0,
                  max: 10,
                },
              },
              {
                param: {
                  productClassParamId: 40,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  label: "Страна",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  items: [
                    {
                      caption: "Россия",
                      value: 1,
                    },
                  ],
                },
              },
              {
                param: {
                  productClassParamId: 42,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 30,
                  },
                },
                editor: {
                  label: "Гарантия",
                  name: "double-range",
                  min: 0,
                  max: 30,
                },
              },
              {
                param: {
                  productClassParamId: 43,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  label: "Защита от ультрафиолета",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  items: [
                    {
                      caption: "Нет",
                      value: 0,
                    },
                    {
                      caption: "Есть",
                      value: 1,
                    },
                  ],
                },
              },
            ],
          },
        ],
        groupsFerm: [
          {
            caption: "Общее",
            params: [
              {
                param: {
                  productClassParamId: 36,
                  valueTypeId: valueTypes.array,
                  value: [],
                },
                editor: {
                  name: "object-selector-checkbox",
                  itemValueKeyName: "value",
                  itemLabelKeyName: "caption",
                  label: "Тип",
                  items: [
                    {
                      caption: "Односкатная",
                      value: 1,
                    },
                    {
                      caption: "Арочная",
                      value: 2,
                    },
                    {
                      caption: "Полуарочная",
                      value: 3,
                    },
                    {
                      caption: "Треугольная",
                      value: 4,
                    },
                    {
                      caption: "Двухскатная",
                      value: 5,
                    },
                  ],
                },
              },
            ],
          },
          {
            caption: "Габариты",
            params: [
              {
                param: {
                  productClassParamId: 18,
                  valueTypeId: valueTypes.range,
                  value: {
                    min: 0,
                    max: 20,
                  },
                },
                editor: {
                  label: "Длина",
                  name: "double-range",
                  min: 0,
                  max: 20,
                  step: 0.1,
                },
              },
            ],
          },
        ],
      };
    },
    computed: {
      isInMarketPage() {
        const array = window?.location?.pathname
          ?.split?.("/")
          ?.filter?.((i) => !!i);
        if (array?.length != 2 || !array?.includes?.("commodities"))
          return false;
        const tail = array.filter((i) => i !== "commodities")?.[0];
        return /^[a-zA-Z]+$/.test(tail);
      },
    },

    methods: {
      openOneClickOrderDialog(productName) {
        this.oneClickOrder.sections[0].fields[0].value = productName;
        this.oneClickDialogVisible = true;
      },
      onPay(payment) {
        console.log(payment);
      },
      onSendForm(value) {
        gtag("event", "generate_lead", {
          currency: "RUB",
          value: value,
        });

        gtag("event", "conversion", {
          send_to: "AW-587201172/WjV_CKPn1sACEJT1_5cC",
          event_callback: function (e, o) {
            console.log("gtag complete sending form...", e, o);
          },
        });
      },

      onClickPhone(object) {
        gtag("event", "generate_lead", {
          currency: "RUB",
          value: 2500,
        });
        gtag("event", "conversion", {
          send_to: "AW-587201172/VhpfCI_61sACEJT1_5cC",
          event_callback: function (e, o) {
            console.log("gtag complete clicking phone...", e, o);
          },
        });
      },
    },
  });
  cmsApp.$mount("#app");

  if (window.afterInit != null) {
    window.afterInit();
  }
}

function initCounters() {}

function initFeatures() {
  var clinicbranchesRoute;
  var routeNext;
  var routePrev;

  $('[data-toggle="tooltip"]').tooltip();

  $(".bottom-menu-item").click(function () {
    if ($(this).attr("data-block")) {
      var link = $(this).attr("data-block");

      if ($(".panel[data-block=" + link + "]").hasClass("active")) {
        $(".panel[data-block=" + link + "]").removeClass("active");
      } else {
        $(".panel").removeClass("active");
        $(".panel[data-block=" + link + "]").addClass("active");
      }

      return false;
    }
  });

  $(".panel .js-btn-next").click(function () {
    clinicbranchesRoute = $(this).parent().attr("data-block");
    routeNext = $(this).attr("data-block");
    $(".panel[data-block=" + routeNext + "]").addClass("active");
    $(".panel[data-block=" + clinicbranchesRoute + "]").removeClass("active");
    console.log(routeNext);
    console.log($(".panel[" + routeNext + "]"));
  });

  $(".js-panel-prev").click(function () {
    routePrev = $(this).attr("data-block");
    $(".panel[data-block=" + routePrev + "]").addClass("active");
    $(this).closest(".panel").removeClass("active");
    console.log(clinicbranchesRoute);
  });

  $(".js-close").click(function () {
    $(".panel[data-block=" + routeNext + "]").removeClass("active");
    $(".panel[data-block=" + routePrev + "]").removeClass("active");
  });

  $(document).mouseup(function (e) {
    var panel = $(".bottom-menu-items");
    if (panel.has(e.target).length === 0) {
      panel.find(".panel").removeClass("active");
    }
  });

  $(".widget-bot-btn").click(function () {
    $(".widget-bot-btn").toggleClass("widget-bot-btn-hidden");
  });

  $(".widget-bot-btn").click(function () {
    $(".bottom-menu").toggleClass("h-0");
  });

  setTimeout(function () {
    $(".widget-bot").addClass("fixed-bot");
  }, 200);

  // navbar -> fixed on scroll
  $(document).ready(function () {
    var docHeight = $("body").height(),
      winHeight = $(window).height(),
      siteHeader = $(".site-header"),
      siteMain = $(".site-main"),
      scrollTop = $(window).scrollTop();
    progressScroll = $(".progress-scroll");

    // Показать кнопку наверх
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $(".btn-to-top").addClass("show");
      } else {
        $(".btn-to-top").removeClass("show");
      }
    });

    $(".clickable").click(function () {
      window.location.href = $(this).data("href");
    });

    function headerScroll() {
      var siteHeaderHeight = siteHeader.outerHeight(),
        stickyHeight = siteHeaderHeight;
      scrollTop = $(window).scrollTop();
      totalScroll = (scrollTop / (docHeight - winHeight)) * 100;

      // Фиксация навигации при скроле
      if (siteHeader.hasClass("sticky")) {
        if (scrollTop >= siteHeaderHeight) {
          siteHeader.addClass("is-sticky");
          progressScroll.addClass("is-sticky");
          siteMain.css("margin-top", siteHeaderHeight);
          progressScroll.css("top", siteHeaderHeight);
        } else {
          siteHeader.removeClass("is-sticky");
          progressScroll.removeClass("is-sticky");
          siteMain.css("margin-top", siteHeaderHeight);
          progressScroll.css("top", "100%");
        }
      } else if (siteHeader.hasClass("transparent")) {
        if (scrollTop >= 1) {
          siteHeader.addClass("is-sticky");
          progressScroll.addClass("is-sticky");
          progressScroll.css("top", siteHeaderHeight);
        } else {
          siteHeader.removeClass("is-sticky");
          progressScroll.removeClass("is-sticky");
          progressScroll.css("top", "100%");
        }
      }
    }

    headerScroll();

    function scrollMenu() {
      var siteHeader = $(".site-header");
      if (
        $(document).scrollTop() >
        siteHeader.height() - (siteHeader.height() - $(".site-info").height())
      ) {
        siteHeader.addClass("fixed");
      } else {
        siteHeader.removeClass("fixed");
      }
    }

    scrollMenu();

    $(window).scroll(function () {
      headerScroll();
      scrollMenu();
      // Полоса прогресса прокрутки страницы
      $(".progress-scroll").css("width", totalScroll + "%");
    });

    $(".btn-to-top").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        "300"
      );
    });

    $(".grid-show").click(function () {
      $("html").toggleClass("grid-hidden");
    });

    // Управление содержанием.
    $(".article-content .article-content__anchor").on(
      "click",
      function (event) {
        event.preventDefault();
        var id = $(this).data("anchor"),
          top = $(id).offset().top - 57; // Высота меню + 5px margin
        $("body,html").animate(
          {
            scrollTop: top,
          },
          500
        );
      }
    );

    $(function () {
      $(".carousel.lazy-load").bind("slide.bs.carousel", function (e) {
        var image = $(e.relatedTarget).find("img[data-src]");
        image.attr("src", image.data("src"));
        image.removeAttr("data-src");
      });
    });

    var lazyImages = [].slice.call(document.querySelectorAll(".lazy > source"));
    var active = false;

    const lazyLoad = function () {
      if (active === false) {
        active = true;
        setTimeout(function () {
          lazyImages.forEach(function (lazyImage) {
            if (
              lazyImage.getBoundingClientRect().top <= window.innerHeight &&
              lazyImage.getBoundingClientRect().bottom >= 0 &&
              getComputedStyle(lazyImage).display !== "none"
            ) {
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.nextElementSibling.srcset = lazyImage.dataset.srcset;
              lazyImage.parentElement
                .querySelector("img")
                .classList.add("fadeIn");
              lazyImage.parentElement.classList.remove("lazy");

              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    lazyLoad();

    // С этой страницы начинается подгрузка
    var pageIndex = 2;

    $(".loadable").click(function (e) {
      e.preventDefault();
      _this = $(this);
      _id = $(this).data("id");
      _listId = $("#" + _id);
      _loadUrl = _listId.data("load-url");
      _total = _listId.data("total");
      _templateName = _listId.data("template-name");
      _helperName = _listId.data("helper-name");
      _componentId = _listId.data("component-id");
      _componentName = _listId.data("component-name");
      _componentClassName = _listId.data("component-class-name");
      _linkedComponentClassName = _listId.data("linked-component-class-name");
      _pageIndex = pageIndex;
      _pageSize = _listId.data("page-size");
      _fieldName = _listId.data("field-name");
      _direction = _listId.data("direction");
      _listType = _listId.data("list-type");
      _listItemView = _listId.data("list-item-view");
      _pictureType = _listId.data("picture-type");
      _showComment = _listId.data("show-comment");
      _baseUrl = _listId.data("base-url");
      _listColumn = _listId.data("list-column");
      _showCity = _listId.data("show-city");
      _showMeta = _listId.data("show-meta");
      _showDate = _listId.data("show-date");
      _showDetails = _listId.data("show-details");
      _showDetailsTitle = _listId.data("show-details-title");
      _showCategory = _listId.data("show-category");
      _showPrice = _listId.data("show-price");
      _showReview = _listId.data("show-review");
      _showStat = _listId.data("show-stat");
      _showDuration = _listId.data("show-duration");
      _showAdvantages = _listId.data("show-advantages");
      _accessDenied = _listId.data("access-denied");
      _accessDeniedTitle = _listId.data("access-denied-title");
      _showFooter = _listId.data("show-footer");
      _dateFrom = _listId.data("date-from");
      _dateBefore = _listId.data("date-before");
      _class = _listId.data("class");
      _imageClass = _listId.data("image-class");
      _showDoctor = _listId.data("show-doctor");

      var $btns = $(this).button("loading");
      $.ajax({
        type: "POST",
        url: _loadUrl,
        dataType: "html",
        data: JSON.stringify({
          helperName: _helperName,
          componentId: _componentId,
          componentName: _componentName,
          componentClassName: _componentClassName,
          linkedComponentClassName: _linkedComponentClassName,
          page: _pageIndex,
          pageSize: _pageSize,
          transformationName: _templateName,
          orderFieldName: _fieldName,
          orderFieldDirection: _direction,
          dateStart: _dateFrom,
          dateEnd: _dateBefore,
          argumentList: {
            pListType: _listType,
            pShowComment: _showComment,
            pBaseUrl: _baseUrl,
            pShowCity: _showCity,
            pListColumn: _listColumn,
            pListItemView: _listItemView,
            pPictureType: _pictureType,
            pShowMeta: _showMeta,
            pShowDate: _showDate,
            pShowFooter: _showFooter,
            pShowCategory: _showCategory,
            pShowDetails: _showDetails,
            pShowDetailsTitle: _showDetailsTitle,
            pAccessDenied: _accessDenied,
            pAccessDeniedTitle: _accessDeniedTitle,
            pShowPrice: _showPrice,
            pShowAdvantages: _showAdvantages,
            pShowDuration: _showDuration,
            pShowReview: _showReview,
            pShowStat: _showStat,
            pShowDoctor: _showDoctor,
          },
        }),
      })
        .done(function (response) {
          console.log(response);
          if (response != null) {
            var html = $(response).html();
            _listId.data("page-index", _pageIndex + 1);
            pageIndex += 1;
            console.log(_pageIndex);
            _listId.append(html);
            _this.button("reset");
            if (_pageIndex * _pageSize >= _total) {
              _this.hide();
            }
          } else {
            _this.hide();
          }
        })
        .fail(function (xhr, status, error) {
          alert("Fail:" + xhr.statusText + error);
        });
    });
  });
}

function initApp() {
  if (appInitialized) {
    return;
  }
  // initInterface();
  // initVueApp();
  initCounters();

  initVueApp();
  initFeatures();

  $("#loadingBlock").hide();
}

$(document).ready(function () {
  $(document).one("scroll mousemove keydown", initApp);
  setTimeout(initApp, 3000);
});
