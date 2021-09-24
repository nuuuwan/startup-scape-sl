import { TEST_MODE } from "../constants/Constants.js";

const startups = require("../assets/data/startups.json");

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
      return startups.slice(0, 50);
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
    const categoryToStartupID = startups.reduce(function (
      categoryToStartupID,
      startup
    ) {
      const startupID = startup["startup_id"];
      const categories = startup["category_list"];
      return categories.reduce(function (categoryToStartupID, category) {
        if (!categoryToStartupID[category]) {
          categoryToStartupID[category] = {};
        }
        categoryToStartupID[category][startupID] = startup;
        return categoryToStartupID;
      }, categoryToStartupID);
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
