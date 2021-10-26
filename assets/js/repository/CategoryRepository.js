import Repository from './Repository';
import Category from '../entity/Category';
import Paginator from '../helper/Paginator';

/**
 * Class CategoryRepository
 */
export default class CategoryRepository extends Repository {
  /**
   * Get categories
   * @param {int} page
   * @return {Paginator}
   */
  async getCategories(page) {
    page = page || 1;

    return await this.get(`/?page=${page}`)
        .then((response) => new Paginator(
            response.results.map((category) => new Category(category.id, category.name)),
            response.count,
            page,
            this.getCategories.bind(this),
            [],
        ));
  }
}
