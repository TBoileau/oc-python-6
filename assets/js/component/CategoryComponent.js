/**
 * Class CategoryComponent
 */
export default class CategoryComponent {
  /**
   * CategoryComponent constructor
   * @param {Category} category
   */
  constructor(category) {
    this.category = category;
    this.createElement();
  }

  /**
   * Create DOM element
   */
  createElement() {
    this.element = document.createElement('section');
    this.element.classList.add('category');

    const title = document.createElement('h1');
    title.textContent = this.category.name;
    this.element.appendChild(title);

    const content = document.createElement('div');
    content.classList.add('category-content');
    this.element.appendChild(content);

    const left = document.createElement('a');
    left.classList.add('control', 'control-left');
    content.appendChild(left);

    const right = document.createElement('a');
    right.classList.add('control', 'control-right');
    content.appendChild(right);

    const movies = document.createElement('div');
    movies.classList.add('movies');
    content.appendChild(movies);
  }
}
