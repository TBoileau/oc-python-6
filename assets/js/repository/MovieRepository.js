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
  getMoviesByCategory(page, category) {
    page = page || 1;
    category = category || null;

    const queryParams = {
      page,
      sort_by: '-imdb_score',
    };

    if (category !== null && category.id !== null) {
      queryParams.genre = category.name;
    }

    const searchParams = new URLSearchParams(queryParams);

    return this.get(`/?${searchParams.toString()}`)
        .then((response) => new Paginator(
            response.results.map((movie) => new Movie(
                movie.id,
                movie.title,
                movie.image_url,
            )),
            response.count,
            page,
            this.getMoviesByCategory.bind(this),
            [category],
        ),
        );
  }

  /**
   * Get full detail of a movie
   * @param {Movie} movie
   * @return {Promise<Movie>}
   */
  getFullDetailOfMovie(movie) {
    return this.get(`/${movie.id}`)
        .then((response) => {
          movie.categories = response.genres;
          movie.publishedAt = new Date(response.date_published);
          movie.rated = response.rated;
          movie.score = parseFloat(response.imdb_score);
          movie.directors = response.directors;
          movie.actors = response.actors;
          movie.duration = response.duration;
          movie.countries = response.countries;
          movie.income = response.worldwide_gross_income;
          movie.description = response.description;
          return movie;
        });
  }

  /**
   * Get most rated movie
   * @return {Promise<Movie>}
   */
  getMostRatedMovie() {
    return this.get(`/?sort_by=-imdb_score`)
        .then((response) => new Movie(
            response.results[0].id,
            response.results[0].title,
            response.results[0].image_url,
        ));
  }
}
