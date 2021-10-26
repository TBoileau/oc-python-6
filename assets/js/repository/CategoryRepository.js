import Repository from './Repository';
import Category from '../entity/Category';

/**
 * Class CategoryRepository
 */
export default class CategoryRepository extends Repository {
  /**
   * Get categories
   * @param {int} page
   * @return {Promise<Array<Category>>}
   */
  getCategories(page) {
    page = page || 1;

    return this.get(`/?page=${page}`)
        .then((raw) => raw.results.map((category) => new Category(category.id, category.name)));
  }
}
