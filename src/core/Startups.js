import { TEST_MODE } from "../constants/Constants.js";

const startups = require("../assets/data/startups.json");

const OTHER_CATEGORY_LIMIT = 10;

export default class Startups {
  static getAll() {
    return startups;
  }

  static getIndex() {
    const startups = Startups.getAll();
    return startups.reduce(function (index, startup) {
      index[startup["startup_id"]] = startup;
      return index;
    }, {});
  }

  static getStartup(startupID) {
    return INDEX[startupID];
  }

  static getFiltered(
    categoryToIsSelected,
    startupStageToIsSelected,
    fundingStageToIsSelected
  ) {
    function filterStartup(startup) {
      const categories = startup["category_list"];
      const startupStage = startup["startup_stage"];
      const fundingStage = startup["funding_stage"];

      if (!startupStageToIsSelected[startupStage]) {
        return false;
      }
      if (!fundingStageToIsSelected[fundingStage]) {
        return false;
      }

      for (const category of categories) {
        if (categoryToIsSelected[category]) {
          return true;
        }
      }
      return false;
    }

    const startups = Startups.getAll().filter(filterStartup);
    if (TEST_MODE) {
      return startups.slice(0, 60);
    }
    return startups;
  }

  static getTreeMapData(
    categoryToIsSelected,
    startupStageToIsSelected,
    fundingStageToIsSelected
  ) {
    const startups = Startups.getFiltered(
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected
    );

    const categoryToN = startups.reduce(function (categoryToN, startup) {
      const categories = startup["category_list"];
      for (const category of categories) {
        if (!categoryToN[category]) {
          categoryToN[category] = 0;
        }
        categoryToN[category] += 1;
      }
      return categoryToN;
    }, {});
    const otherCategories = Object.entries(categoryToN)
      .filter(function ([category, nCategory]) {
        return nCategory < OTHER_CATEGORY_LIMIT;
      })
      .map(([category, nCategory]) => category);

    const categoryToStartupID = startups.reduce(function (
      categoryToStartupID,
      startup
    ) {
      const startupID = startup["startup_id"];
      const categories = startup["category_list"];
      for (let category of categories) {
        if (otherCategories.includes(category)) {
          category = "Other";
        }
        if (!categoryToStartupID[category]) {
          categoryToStartupID[category] = {};
        }
        categoryToStartupID[category][startupID] = startup;
      }
      return categoryToStartupID;
    },
    {});

    return {
      type: "root",
      name: "startups",
      children: Object.entries(categoryToStartupID).map(function ([
        category,
        startupMap,
      ]) {
        return {
          type: "category",
          name: category,
          children: Object.entries(startupMap).map(function ([
            startupID,
            startup,
          ]) {
            const imageFileOnly = startup["image_file_only"];
            return {
              type: "startup",
              name: startupID,
              startupName: startup['name'],
              startupID,
              value: 1,
              imageFileOnly: imageFileOnly,
            };
          }),
        };
      }),
    };
  }
}

const INDEX = Startups.getIndex();
