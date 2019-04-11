import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieInfo.scss';
import Film from '../Film';

class MovieInfo extends React.Component {
  componentDidMount() {
    const { fetchAllFilms } = this.props;
    fetchAllFilms();
  }

  onClickHandler = (film) => {
    const { makeMainFilm } = this.props;
    makeMainFilm(film);
  }

  render() {
    const { films } = this.props;
    return (
      <div className={styles.list}>
        {films && films.map(film => (
          <Film
            key={film.id}
            film={film}
            onClick={this.onClickHandler}
          />
        ))}
      </div>
    );
  }
}

MovieInfo.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllFilms: PropTypes.func.isRequired,
  makeMainFilm: PropTypes.func.isRequired,
};

export default MovieInfo;
