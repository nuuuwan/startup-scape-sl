import { WWW } from "@nuuuwan/utils-js-dev";

const URL =
  "https://raw.githubusercontent.com" +
  "/nuuuwan/startups_lk/data/startups_lk.json";

export default class Startups {
  static async getAll() {
    return await WWW.json(URL);
  }

  static async getTreeMapData() {
    const startups = (await Startups.getAll()).splice(0, 60);
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
            return {
              type: "startup",
              name: startupID,
              value: 1,
              link: startup.remote_img_url,
            };
          }),
        };
      }),
    };
  }
}
