/**
 * Class Movie
 */
export default class Movie {
  /**
   * Movie constructor
   * @param {int} id
   * @param {string} title
   * @param {string} imageUrl
   * @param {float} score
   * @param {int} votes
   * @param {int} year
   * @param {Array<string>} writers
   * @param {Array<string>} actors
   * @param {Array<string>} directors
   */
  constructor(id, title, imageUrl, score, votes, year, writers, actors, directors) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.score = score;
    this.votes = votes;
    this.year = year;
    this.writers = writers;
    this.actors = actors;
    this.directors = directors;
  }
}
