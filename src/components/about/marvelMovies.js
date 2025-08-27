const marvelMovies = [
  {
    id: 1,
    title: "Iron Man (2008)",
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
  },
  {
    id: 2,
    title: "The Incredible Hulk (2008)",
    poster: "https://image.tmdb.org/t/p/w500/qK7Ssnrfvrt65F66A1thvehfQg2.jpg",
  },
  {
    id: 3,
    title: "Iron Man 2 (2010)",
    poster: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
  },
  {
    id: 4,
    title: "Thor (2011)",
    poster: "https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
  },
  {
    id: 5,
    title: "Captain America: The First Avenger (2011)",
    poster: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
  },
  {
    id: 6,
    title: "The Avengers (2012)",
    poster: "https://image.tmdb.org/t/p/w500/bWGX05c3NdUZglb0xK06SVOmYKF.jpg",
  },
  {
    id: 7,
    title: "Iron Man 3 (2013)",
    poster: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
  },
  {
    id: 8,
    title: "Thor: The Dark World (2013)",
    poster: "https://image.tmdb.org/t/p/w500/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg",
  },
  {
    id: 9,
    title: "Captain America: The Winter Soldier (2014)",
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
  },
  {
    id: 10,
    title: "Guardians of the Galaxy (2014)",
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
  },
  {
    id: 11,
    title: "Avengers: Age of Ultron (2015)",
    poster: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
  },
  {
    id: 12,
    title: "Ant-Man (2015)",
    poster: "https://image.tmdb.org/t/p/w500/D6e8RJf2qUstnfkTslTXNTUAlT.jpg",
  },
  {
    id: 13,
    title: "Captain America: Civil War (2016)",
    poster: "https://image.tmdb.org/t/p/w500/kSBXou5Ac7vEqKd97wotJumyJvU.jpg",
  },
  {
    id: 14,
    title: "Doctor Strange (2016)",
    poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
  },
  {
    id: 15,
    title: "Guardians of the Galaxy Vol. 2 (2017)",
    poster: "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
  },
  {
    id: 16,
    title: "Spider-Man: Homecoming (2017)",
    poster: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
  },
  {
    id: 17,
    title: "Thor: Ragnarok (2017)",
    poster: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
  },
  {
    id: 18,
    title: "Black Panther (2018)",
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
  },
  {
    id: 19,
    title: "Avengers: Infinity War (2018)",
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 20,
    title: "Ant-Man and the Wasp (2018)",
    poster: "https://image.tmdb.org/t/p/w500/eivQmS8xKRhMVoNj3MYp3rcEpPv.jpg",
  },
  {
    id: 21,
    title: "Captain Marvel (2019)",
    poster: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
  },
  {
    id: 22,
    title: "Avengers: Endgame (2019)",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 23,
    title: "Spider-Man: Far From Home (2019)",
    poster: "https://image.tmdb.org/t/p/w500/lcq8dVxeeOqHvvgcte707K0KVx5.jpg",
  },
  {
    id: 24,
    title: "Black Widow (2021)",
    poster: "https://image.tmdb.org/t/p/w500/ytnhzdwtj0YfC7CzJaf0RZpQvo.jpg",
  },
  {
    id: 25,
    title: "Shang-Chi and the Legend of the Ten Rings (2021)",
    poster: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
  },
  {
    id: 26,
    title: "Eternals (2021)",
    poster: "https://image.tmdb.org/t/p/w500/b6qUu00iIIkXX13szFy7d0CyNcg.jpg",
  },
  {
    id: 27,
    title: "Spider-Man: No Way Home (2021)",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
  {
    id: 28,
    title: "Doctor Strange in the Multiverse of Madness (2022)",
    poster: "https://image.tmdb.org/t/p/w500/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg",
  },
  {
    id: 29,
    title: "Thor: Love and Thunder (2022)",
    poster: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
  },
  {
    id: 30,
    title: "Black Panther: Wakanda Forever (2022)",
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
  },
  {
    id: 31,
    title: "Ant-Man and the Wasp: Quantumania (2023)",
    poster: "https://image.tmdb.org/t/p/w500/giKFqcncuYcPLKhfAyjN0tsqTo.jpg",
  },
  {
    id: 32,
    title: "Guardians of the Galaxy Vol. 3 (2023)",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
  }
];

export default marvelMovies;
