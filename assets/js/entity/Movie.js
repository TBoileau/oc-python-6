/**
 * Class Movie
 */
export default class Movie {
  /**
   * Movie constructor
   * @param {int} id
   * @param {string} title
   * @param {string} imageUrl
   */
  constructor(id, title, imageUrl) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
  }
}
