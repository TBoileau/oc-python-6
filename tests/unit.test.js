import EventDispatcher from "../assets/js/event_dispatcher/EventDispatcher";
import Paginator from "../assets/js/helper/Paginator";
import CategoryRepository from "../assets/js/repository/CategoryRepository";
import axios from "axios";
import MovieRepository from "../assets/js/repository/MovieRepository";
import Movie from "../assets/js/entity/Movie";
import Category from "../assets/js/entity/Category";

jest.mock('axios');

test('lister is called when an event is dispatched', () => {
  let data = false;

  const eventDispatcher = new EventDispatcher();
  eventDispatcher.register('test');
  eventDispatcher.addEventListener('test', () => {
    data = true;
  });

  eventDispatcher.dispatch('test');
  expect(data).toBeTruthy();
});

test('paginator with 2 pages works', () => {
  const elements = (new Array(5)).fill(true);

  const paginator = new Paginator(
    elements,
    10,
    1,
    (page) => {
      return new Paginator((new Array(5)).fill(true), 10, page, () => {
      }, [])
    },
    []
  );

  expect(paginator.elements.length).toBe(5);
  expect(paginator.pages).toBe(2);
  expect(paginator.currentPage).toBe(1);

  const nextPage = paginator.next();

  expect(nextPage.elements.length).toBe(5);
  expect(nextPage.pages).toBe(2);
  expect(nextPage.currentPage).toBe(2);
});

test('paginator with 1 page works', () => {
  const elements = (new Array(5)).fill(true);

  const paginator = new Paginator(
    elements,
    5,
    1,
    (page) => {
      return new Paginator((new Array(5)).fill(true), 5, page, () => {
      }, [])
    },
    []
  );

  expect(paginator.elements.length).toBe(5);
  expect(paginator.pages).toBe(1);
  expect(paginator.currentPage).toBe(1);

  const nextPage = paginator.next();

  expect(nextPage).toBeNull();
});

test('retrieve all categories', () => {
  axios.get.mockResolvedValue({data: {count: 25, results: (new Array(5)).fill({id: 0, name: 'Category'})}});
  const categoryRepository = new CategoryRepository('http://127.0.0.1:8000');
  categoryRepository.getCategories().then((paginator) => {
    expect(paginator).toBeInstanceOf(Paginator);
  });
});

test('retrieve most rated movie', () => {
  axios.get.mockResolvedValue({data: {count: 10, results: (new Array(5)).fill({id: 0, name: 'Category'})}});
  const movieRepository = new MovieRepository('http://127.0.0.1:8000');
  movieRepository.getMostRatedMovie().then((movie) => {
    expect(movie).toBeInstanceOf(Movie);
  });
});

test('retrieve full movie details', () => {
  axios.get.mockResolvedValue({data: {
      genres: ['Category 1'],
      date_published: '2020-01-01',
      rated: 'R',
      imdb_score: '9.8',
      directors: ['Director 1'],
      actors: ['Actor 1'],
      duration: 128,
      countries: ['France'],
      worldwide_gross_income: 100000,
      description: 'description'
    }});
  const movieRepository = new MovieRepository('http://127.0.0.1:8000');
  const movie = new Movie(1, 'Title', 'image.png');
  movieRepository.getFullDetailOfMovie(movie).then((movie) => {
    expect(movie).toBeInstanceOf(Movie);
  });
});

test('retrieve movies by category', () => {
  axios.get.mockResolvedValue({data: {count: 10, results: (new Array(5)).fill({id: 0, name: 'Category'})}});
  const movieRepository = new MovieRepository('http://127.0.0.1:8000');
  const category = new Category(1, 'Category');
  movieRepository.getMoviesByCategory(1, category).then((paginator) => {
    expect(paginator).toBeInstanceOf(Paginator);
  });
});


test('retrieve best rated movies', () => {
  axios.get.mockResolvedValue({data: {count: 10, results: (new Array(5)).fill({id: 0, name: 'Category'})}});
  const movieRepository = new MovieRepository('http://127.0.0.1:8000');
  movieRepository.getMoviesByCategory().then((paginator) => {
    expect(paginator).toBeInstanceOf(Paginator);
  });
});
