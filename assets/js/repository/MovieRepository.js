import Repository from './Repository';
import Movie from '../entity/Movie';
import Paginator from '../helper/Paginator';

/**
 * Class MovieRepository
 */
export default class MovieRepository extends Repository {
  /**
   * Get movies by category
   * @param {int} page
   * @param {Category} category
   * @return {Paginator}
   */
  async getMoviesByCategory(page, category) {
    page = page || 1;

    return await await this.get(`/?genre=${category.name}&page=${page}`)
        .then((response) => new Paginator(
            response.results.map((movie) => new Movie(
                movie.id,
                movie.title,
                movie.image_url,
                parseFloat(movie.imdb_score),
                movie.votes,
                movie.year,
                movie.writers,
                movie.actors,
                movie.directors,
            )),
            response.count,
            page,
            this.getMoviesByCategory.bind(this),
            [category],
        ),
        );
  }
}

/**
 * ;
 */
