interface IMoviesListType {
    id: String
    titleText: {
        text: String
    }
    primaryImage: {
        url: String
    }
}

interface IMovieDetailType extends IMoviesListType{
    releaseYear: {
        year: number
    }
}

export type { IMoviesListType, IMovieDetailType}