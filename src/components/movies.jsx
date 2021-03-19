import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from "../services/fakeGenreService";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        pageSize: 6,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });
        deleteMovie(movie._id);
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const { movies: allMovies, currentPage, pageSize, selectedGenre, searchQuery, sortColumn } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if(selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => 
                m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, selectedGenre, genres, sortColumn, searchQuery } = this.state;
        if (count === 0) return <p className="m-2">There are no movies available.</p>
        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link 
                        to="/movies/new" 
                        className="btn btn-primary btn-sm float-left">
                        New Movie
                    </Link>
                    <p className="float-right">
                        Showing&nbsp;
                        <span className="badge badge-light">
                            {totalCount}
                        </span>&nbsp;
                        items.
                    </p>
                    <SearchBox 
                        value={searchQuery} 
                        onChange={this.handleSearch} 
                    />
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
};

export default Movies;