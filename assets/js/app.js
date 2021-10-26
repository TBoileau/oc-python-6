import '../styles/app.scss';
import CategoryRepository from './repository/CategoryRepository';
import CategoryComponent from './component/CategoryComponent';

const categoryRepository = new CategoryRepository('http://127.0.0.1:8000/api/v1/genres');

categoryRepository.getCategories().then((categories) => {
  categories.forEach((category) => {
    const categoryComponent = new CategoryComponent(category);
    document.querySelector('main').appendChild(categoryComponent.element);
  });
});

document.querySelectorAll('section.category').forEach((category) => {
  const movies = [...category.querySelectorAll('article')];
  const movieWidth = movies[0].offsetWidth;
  const categoryWidth = category.offsetWidth;
  const totalWidth = movies.length * movieWidth;

  category.querySelector('.movies').addEventListener('scroll', controls);

  const controls = (left) => {
    let scrollLeft = category.querySelector('.movies').scrollLeft;

    scrollLeft = Math.ceil(scrollLeft/(movieWidth * 2)) * (movieWidth * 2);

    scrollLeft += left < 0 ? left : 0;

    if (scrollLeft === 0) {
      category.querySelector('.control-left').style.display = 'none';
    } else {
      category.querySelector('.control-left').style.display = 'flex';
    }

    if (scrollLeft >= (totalWidth - categoryWidth)) {
      category.querySelector('.control-right').style.display = 'none';
    } else {
      category.querySelector('.control-right').style.display = 'flex';
    }
  };

  const scrollTo = (left) => {
    return new Promise((resolve) => {
      let same = 0;
      let lastPosition = null;

      category.querySelector('.movies').scroll({
        left: category.querySelector('.movies').scrollLeft + left,
        behavior: 'smooth',
      });

      const check = () => {
        const position = category.querySelector('.movies').getBoundingClientRect().left;

        if (position === lastPosition) {
          if (same ++ > 2) {
            return resolve(left);
          }
        } else {
          same = 0;
          lastPosition = position;
        }

        requestAnimationFrame(check);
      };

      requestAnimationFrame(check);
    });
  };

  category.querySelector('.control-right').addEventListener('click', () => {
    scrollTo(movieWidth * 2).then(controls);
  });

  category.querySelector('.control-left').addEventListener('click', () => {
    scrollTo(-movieWidth * 2).then(controls);
  });

  controls();
});


