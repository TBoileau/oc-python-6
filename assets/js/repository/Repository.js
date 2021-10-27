import axios from "axios";

/**
 * Abstract class Repository
 */
export default class Repository {
  /**
   * Repository constructor
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Get data from uri
   * @param {string} uri
   * @return {Promise<Array<object>>}
   */
  get(uri) {
    return axios.get(`${this.url}${uri}`).then((response) => response.data);
  }
}
