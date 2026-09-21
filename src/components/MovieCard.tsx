import { useState } from "react"
import type { Movie } from "../types"
import { getPosterUrl } from "../src/data/sampleMovies"

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false)

  const toggleFavourite = () => {
    setIsFavourite((current) => !current)
  }

  return (
    <article>
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
      />

      <h2>{movie.title}</h2>

      <p>{movie.vote_average.toFixed(1)}</p>

      <button onClick={toggleFavourite}>
        {isFavourite
          ? "Remove from favourites"
          : "Add to favourites"}
      </button>
    </article>
  )
}

export default MovieCard