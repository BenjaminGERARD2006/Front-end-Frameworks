
import { useState } from "react"
import { useOptionalAppContext } from "../context/AppContext"
import { getPosterUrl, getPlaceholderPoster } from "../data/sampleMovies"
import type { Movie } from "../types"

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const context = useOptionalAppContext()
  const [localFavorite, setLocalFavorite] = useState(false)

  const favorite = context
    ? context.isFavorite(movie.id)
    : localFavorite

  function handleToggleFavorite() {
    if (context) {
      context.toggleFavorite(movie)
    } else {
      setLocalFavorite((previous) => !previous)
    }
  }

  return (
    <article>
      <img
        src={getPosterUrl(movie.poster_path) || getPlaceholderPoster()}
        alt={`${movie.title} poster`}
      />

      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>

      <button
        type="button"
        onClick={handleToggleFavorite}
        aria-label={
  favorite ? "Remove from favourites" : "Add to favourites"
}
        aria-pressed={favorite}
      >
        {favorite ? "\u2764\uFE0F" : "\uD83E\uDD0D"}
      </button>
    </article>
  )
}

export default MovieCard
