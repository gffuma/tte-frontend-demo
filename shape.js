let mySuperAwesomeStateShape = {
  // entities stuff...
  families: {
    1: {
    },
    2: {
    }
  },
  utensils: {
    1: {
    },
    2: {
    }
  },
  geometries: {
    1: {
    },
    2: {
    }
  },
  cutters: {
    1: {
    },
    2: {
    }
  },
  articles: {
    1: {
    },
    2: {
    }
  },

  articlesByFamily: {
    1: {
      loading: false,
      ids: []
    }
  },

  searchFamilies: {
    filters: {
      utensil: null,
      geometry: null,
      cutter: null,
    },

    utensils: {
      loading: false,
      ids: [],
    },
    geometries: {
      loading: false,
      ids: [],
    },
    cutters: {
      loading: false,
      ids: [],
    },

    families: {
      loading: false,
      ids: [],
      pagination: {
        total: 29,
        count: 10,

        per_page: 10,
        current_page: 1,

        total_pages: 3,
      }
    },

  }
};
