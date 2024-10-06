var view = {
  data() {
    return {
      argumetList: {
        pBaseUrl: "/commodities/",
        pId: "commodities",
        pListType: "grid",
        pListColumn: "3",
        pListItemView: "image-top",
        pPictureType: "img",
        pShowDetails: "True",
        pShowPagination: "True",
        pShowDetailsTitle: "Подробнее",
        pShowComment: "True",
        pShowPrice: "True",
        pLazyLoad: "False",
      },
      params: {
        helperName: "LinkedComponentList",
        page: 1,
        pageSize: 15,
        orderFieldName: "CAPTION",
        componentName: "canopy",
        componentClassName: "ProductFolder",
        orderFieldDirection: "ASC",
        transformationName: "_commodity_list",
        argumentList: {},
        searchData: {},
      },
      paginationInfo: null,
      loaded: false,
    };
  },
  async created() {
    const paginationInfo = document.getElementById("commodityList")?.dataset;
    if (!paginationInfo) return;
    this.paginationInfo = { ...paginationInfo };

    await this.$nextTick();
    const componentName = this.$refs?.componentName?.dataset?.componentName;
    console.log(componentName);
    this.params.componentName = componentName;
    this.loaded = true;
  },
  computed: {
    pageCount() {
      if (!this.paginationInfo) return null;
      const pageCount = +this.paginationInfo.total / +this.params.pageSize;
      console.log(this.paginationInfo);
      const trunced = Math.trunc(pageCount);
      return pageCount > trunced ? trunced + 1 : trunced;
    },
  },
  methods: {
    changeView(params, argumetList, parentId = "commodities") {
      Object.assign(this.argumetList, argumetList);
      Object.assign(this.params, params);
      const paramList = { ...this.params, argumentList: this.argumetList };
      fetch("/commodities/Home/GetHelperHtml/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "text/html",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(paramList),
      })
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          document.getElementById(parentId).innerHTML = html;
          const paginationInfo = document.querySelector("#paginationInfo");
          if (paginationInfo) {
            this.paginationInfo = { ...paginationInfo.dataset };
          }
        })
        .catch((err) => {
          console.warn("Something went wrong.", err);
        });
    },
  },
};
