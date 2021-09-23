import { WWW } from "@nuuuwan/utils-js-dev";

const URL =
  "https://raw.githubusercontent.com" +
  "/nuuuwan/startups_lk/data/startups_lk.json";

export default class Startups {
  static async getAll() {
    return await WWW.json(URL);
  }
}
