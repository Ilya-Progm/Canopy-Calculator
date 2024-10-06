var cartMixin = {
  data() {
    return {
      // Object: обьект корзина
      cart: null,

      // Booled: означает загрузен ли cart из сервера
      initialized: false,

      // Boolean: видемость компонента <message/>
      messageVisible: false,

      // String: текущее сообшение для компонента <message/>
      message: "",

      // String: тип для компонента <message/> -> alert-primary, alert-success, ... смотрите https://getbootstrap.com/docs/4.5/components/alerts/
      type: "",

      // Integer: количество текущего расмотриваеммого товара
      productQuantity: 1,

      orderDetails: {
        firstName: null,
        lastName: null,
        patronymic: null,
        phone: null,
        phone2: null,
        email: null,
        street: null,
        buildingNo: null,
        aptNo: null,
        comment: null,
        deliveryServiceId: 5,
        address: null,
        deliveryMethodId: 1,
        deliveryTimeFrom: null,
        deliveryPlanDate: null,
        deliveryTimeTo: null,
        pickupPointId: null,
        paymentTypeId: 1,
        deliveryCost: null,
        remoteness: 1,
      },

      orderMeta: [
        {
          editor: {
            name: "input-editor",
            label: "Имя *",
            placeholder: "Например: Иван",
            type: "text",
          },
          cssClassName: "col-md-12",
          name: "firstName",
          validation: {
            required: {
              value: true,
              text: "Поле не может быть пустым",
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
            label: "Фамилия *",
            placeholder: "Например: Иванов",
            type: "text",
          },
          cssClassName: "col-md-12",
          name: "lastName",
          validation: {
            required: {
              value: true,
              text: "Поле не может быть пустым",
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
          cssClassName: "col-md-12",
          name: "phone",
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
            name: "input-editor",
            label: "E-mail *",
            placeholder: "на пример: ivan@example.ru",
            type: "email",
          },
          cssClassName: "col-sm-12",
          name: "email",
          validation: {
            required: {
              value: true,
              text: "Поле не может быть пустым",
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
            label: "Комментарий к доставке:",
            placeholder: "",
          },
          cssClassName: "col-md-12",
          name: "comment",
        },
        {
          editor: {
            name: "simple-select",
            label: "Способ оплаты",
            placeholder: "Выберите способ оплаты",
            optionConfig: {
              titleKeyName: "caption",
            },
            selectedFieldName: "caption",
            selectedKeyName: "id",
            items: [
              {
                id: 1,
                caption: "Наличными при доставке",
              },
              {
                id: 2,
                caption: "Картой при доставке",
              },
            ],
          },
          cssClassName: "col-md-12",
          name: "paymentTypeId",
          validation: {
            required: {
              value: true,
              text: "Поле не может быть пустым",
            },
          },
        },
        {
          editor: {
            name: "range-editor",
            label: "Отдалённость от пункта *",
            min: 1,
            max: 50,
            step: 1,
            unit: "км.",
          },
          cssClassName: "col-md-12",
          name: "remoteness",
          validation: {
            required: {
              value: true,
              text: "Поле не может быть пустым",
            },
          },
        },
      ],
    };
  },
  async mounted() {
    this.initEventListener();
    this.getCart();
  },
  computed: {
    //Вернёт общюю сумму всех товаров из корзины
    totalPrice() {
      return this.totalPriceValue
        ? this.totalPriceValue.toLocaleString("ru-RU") + " ₽"
        : null;
    },

    totalPriceValue() {
      const _cartItems = this.cart?.cartItems;
      if (!_cartItems) return;
      return _cartItems.reduce((s, c) => s + c.quantity * c?.product?.price, 0);
    },

    totalPriceWithDelivryCost() {
      const _total = this.orderDetails.deliveryCost
        ? this.orderDetails.deliveryCost + this.totalPriceValue
        : this.totalPriceValue;
      return _total ? _total.toLocaleString("ru-RU") + " ₽" : null;
    },

    //Вернёт количество продуктов из списка желании
    favoriteProductCount() {
      return this.cart?.cartFavorites?.length ?? 0;
    },

    //Вернёт суммарное количество товаров в корзине
    cartItemsQuantity() {
      if (!this.cart?.cartItems) return 0;
      return this.cart.cartItems.reduce(
        (sum, current) => sum + Number(current.quantity),
        0
      );
    },
  },
  methods: {
    /***
     * Запрос для получения корзины
     * @return Object: обьект корзина
     */
    async getCart() {
      this.cart = await get("/api/v1/cart/");
      this.initialized = true;
    },

    /***
     * Запрос для добовление товара в корзину
     *
     * @params componentId: number | string -- componentId продукта
     * @params quantity: number | string -- количество товара по умолчанию == 1
     *
     * @return обновляет обьект корзины добовляя туда нужный товар
     */
    async addToCart(componentId, quantity = 1) {
      if (!componentId) return;
      try {
        this.animateOnAddToCart(componentId);
        const _data = await post(`/api/v1/cart/items/`, {
          quantity,
          product: { componentId },
        });
        const _definedIndex = this.cart.cartItems.findIndex(
          (c) => c.id === _data.id
        );
        _definedIndex === -1
          ? this.cart.cartItems.push(_data)
          : this.$set(this.cart.cartItems, _definedIndex, _data);
        this.showMessage("Успешно Добавлено в корзину");
        this.productQuantity = 0;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    /***
     * Запрос для удаление товара из корзины
     *
     * @params id: number | string -- id товара в корзине
     *
     * @return обновляет обьект корзины удаляя от туда нужный товар
     */
    async removeFromCart(id) {
      if (!id) return;
      try {
        await remove(`/api/v1/cart/items/${id}/`, id);
        const _index = this.cart.cartItems.findIndex((p) => p.id == id);
        if (_index === -1) {
          console.log("Удаляеммый индекс не найден");
          return;
        }
        this.cart.cartItems.splice(_index, 1);
        this.showMessage("Успешно удалено");
      } catch (err) {
        throw new Error(err.message);
      }
    },

    /***
     * Запрос для обновление количества товара в корзине
     *
     * @params item:Object -- товар в корзине
     * @params isAdd:Boolean -- true -> item.quantity++, fasle -> item.quantity--
     *
     * @return обновляет обьект cart обновляя количество нужного товара
     */
    async updateCartItemQuantity(item, isAdd) {
      try {
        item.quantity = isAdd ? item.quantity + 1 : item.quantity - 1;
        await put(`/api/v1/cart/items/${item.id}/`, { ...item });
      } catch (err) {
        throw new Error(err.message);
      }
    },

    /***
     * Запрос для добавления товара в список желании
     *
     * @params componentId: number | string -- componentId товара
     *
     * @return обновляет обьект cart добовляя туда нужный элемент в список желании(cartFavorites)
     */
    async addToFavorites(componentId, el = null) {
      if (!componentId) return;
      try {
        const _data = await post(`/api/v1/cart/favorites/`, {
          product: { componentId },
        });

        this.cart.cartFavorites.push(_data);

        if (el) {
          el.children[0].className = "fas fa-heart icon";
        }
        this.showMessage("Успешно Добавлено в список желаний");
      } catch (err) {
        throw new Error(err.message);
      }
    },

    /***
     * Запрос для удаление товара из списка желании
     *
     * @params componentId: number | string -- componentId товара
     *
     * @return обновляет обьект cart удаляя от туда нужный элемент из список желании(cartFavorites)
     */
    async removeFromFavorites(componentId) {
      if (!componentId) return;
      try {
        await remove(`/api/v1/cart/favorites/${componentId}/`, componentId);
        const _index = this.cart.cartFavorites.findIndex(
          (p) => p?.product?.componentId == componentId
        );
        if (_index === -1) {
          console.log("Удаляеммый индекс не найден");
          return;
        }
        this.cart.cartFavorites.splice(_index, 1);
        this.showMessage("Успешно удалено");
      } catch (err) {
        throw new Error(err.message);
      }
    },

    /***
     * Запрос для применения промокода
     *
     * @params promocode: string -- промокод
     * @params successMessage:string -- сообшение на случия успеха
     *
     * @return применяет промокод
     **/
    async allowPromocode(promocode, successMessage) {
      try {
        this.cart = await patch(`/api/v1/cart/promocode`, promocode);
        this.showMessage(successMessage);
      } catch (err) {
        this.showMessage("Не верный промокод", "alert-danger");
      }
    },

    /***
     * Функция для показа сообшения-уведомления (компонент <message/>).
     *
     * @params message: string -- сообшение которое нужно покозать
     * @params type: string = "alert-success" -- тип показываеммого уведомления
     * @params timeOut: number = 1300 -- таймаут через который уведомление должен исчезнуть
     *
     * @return Показывает уведомление
     */
    showMessage(message, type = "alert-success", timeOut = 1300) {
      this.message = message;
      this.type = type;
      this.messageVisible = true;
      setInterval(() => {
        this.messageVisible = false;
      }, timeOut);
    },

    /***
     * Функция для анимации полёта товара в корзину.
     *
     * @params componentId:string | number -- componentId товара
     *
     * @return анимация полёта товара в корзину
     */
    animateOnAddToCart(componentId) {
      var cart = $("#vue-cart-bag"); // иконка корзины
      var cartIcon = $("#vue-cart-bag .badge"); // точка в корзине в котором выводятся обшее количество товаров
      var productImg = $("#product-img-" + componentId); // картика продукта

      if (!productImg) {
        console.log(
          "Возможно вы забыли указать для кортинки товара нужный id в формате product-img-${componentId}"
        );
        return;
      }

      productImg
        .clone()
        .offset({
          top: productImg.offset().top,
          left: productImg.offset().left,
        })
        .css({ position: "absolute", "z-index": "1100" })
        .appendTo($("body"))
        .animate(
          {
            top: $(cart).offset()["top"],
            left: $(cart).offset()["left"],
            opacity: 0,
            width: 40,
          },
          1500,
          function () {
            $(this).remove();
          }
        );

      setTimeout(function () {
        cartIcon.addClass("bounce animated");
      }, 1200);

      setTimeout(function () {
        cartIcon.removeClass("bounce animated");
      }, 2000);
    },

    /***
     * Функция для инициализации события click для кнопок из xslt шаблона
     *
     * @return для кнопок с классом .vue-add-to-cart-button повесит функцию addToCart
     * @return для кнопок с классои .vue-add-to-favorite-button повесит событие addToFavorites
     */
    initEventListener() {
      document.querySelectorAll(".vue-add-to-cart-button").forEach((el) => {
        el.addEventListener(
          "click",
          () => {
            this.addToCart(el?.dataset?.componentId);
          },
          false
        );
      });

      document.querySelectorAll(".vue-add-to-favorite-button").forEach((el) => {
        el.addEventListener(
          "click",
          () => {
            this.addToFavorites(el?.dataset?.componentId, el);
          },
          false
        );
      });
    },

    /***
     * Функция для определение находится ли данный товар списке желании
     *
     * @params componentId: number | string -- componentId товара
     *
     * @return boolean: находится ли данный товар списке желании
     */
    getIsInFavorites(componentId) {
      const _favorites = this.cart?.cartFavorites;
      if (!_favorites) return;
      return (
        _favorites.find((i) => i.product.componentId == componentId) !==
        undefined
      );
    },

    /***
     * Функция для получение url картинки товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return url картинки товара в корзине
     */
    getImageUrl(item) {
      const _id = item?.product?.defaultImageId;
      return _id ? `/images/ci${_id}v150x150s0.png` : null;
    },

    /***
     * Функция для получение наименования товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return наименования товара в корзине
     */
    getCaption(item) {
      return item?.product?.caption;
    },

    /***
     * Функция для получение ссылки на страницу с полным описанием товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return ссылка на страницу с полным описанием товара в корзине
     */
    getLink(item) {
      const _componentName = item?.product?.componentName;
      return _componentName ? `/commodities/${_componentName}/` : null;
    },

    /***
     * Функция для получение стоиммости товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return стоиммость товара
     */
    getPrice(item) {
      const _price = item?.product?.price;
      return _price ? _price.toLocaleString("ru-RU") + " ₽" : null;
    },

    formatPrice(number) {
      console.log(number.toLocaleString("ru-RU") + " руб.");
      return number.toLocaleString("ru-RU") + " руб.";
    },

    /***
     * Функция для Форматирование цены
     *
     * @params item: object -- товар в корзине
     *
     * @params fieldName: string -- названия поля
     *
     * @return форматированная цена
     */
    formatPrice(item, fieldName) {
      const _price = item?.product?.[fieldName];
      return _price ? _price.toLocaleString("ru-RU") + " ₽" : null;
    },

    /***
     * Функция для определения есть ли в данном item промокод
     *
     * @params item: object -- товар в корзине
     *
     *
     * @return стоиммость товара
     */
    hasPromoCode(item) {
      return item?.product?.hasPromoCode;
    },

    /***
     * Функция для получение количества товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return количество товара в корзине
     */
    getQuantity(item) {
      return item?.quantity;
    },

    /***
     * Функция для получение стоиммости * количества товара в корзине
     *
     * @params item: object -- товар в корзине
     *
     * @return стоиммость * количество товара в корзине
     */
    getTotal(item) {
      const _quantity = item?.quantity;
      const _price = item?.product?.price;
      const _total = _quantity > 0 && _price ? _quantity * _price : null;
      return _total ? _total.toLocaleString("ru-RU") + " ₽" : null;
    },
  },
};
