import Repository from './Repository';
import Movie from '../entity/Movie';

/**
 * Class MovieRepository
 */
export default class MovieRepository extends Repository {
  /**
   * Get movies by category
   * @param {Category} category
   * @param {int} page
   * @return {Promise<Array<Movie>>}
   */
  getMoviesByCategory(category, page) {
    page = page || 1;
    return this.get(`/?genre=${category.name}&page=${page}`)
        .then((raw) => raw.results.map((movie) => new Movie(
            movie.id,
            movie.title,
            movie.image_url,
            parseFloat(movie.imdb_score),
            movie.votes,
            movie.year,
            movie.writers,
            movie.actors,
            movie.directors,
        )));
  }
}

/**
 * ;
 */
