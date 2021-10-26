/**
 * Paginator class
 */
export default class Paginator {
  /**
   * Paginator constructor
   * @param {Array<object>} elements
   * @param {int} count
   * @param {int} currentPage
   * @param {Callable} callback
   * @param {Array} extra
   */
  constructor(elements, count, currentPage, callback, extra) {
    this.elements = elements;
    this.count = count;
    this.currentPage = currentPage;
    this.callback = callback;
    this.extra = extra;
  }

  /**
   * Get number of pages
   * @return {number}
   */
  get pages() {
    return Math.ceil(this.count / 5);
  }

  /**
   * Next page
   * @return {Paginator|null}
   */
  next() {
    if (this.currentPage === this.pages) {
      return null;
    }

    this.currentPage++;

    return this['callback'](this.currentPage, ...this.extra);
  }
}
