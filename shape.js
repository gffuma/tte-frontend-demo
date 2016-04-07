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

  searchFamilies: {
    filters: {
      utensil: null,
      geometry: null,
      cutter: null,
    },

    utensils: {
      loading: false,
      items: [],
    },
    geometries: {
      loading: false,
      items: [],
    },
    cutters: {
      loading: false,
      items: [],
    },

    families: {
      loading: false,
      items: [],
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
