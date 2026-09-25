import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieList from "../components/MovieList"
import type { Movie } from "../types"

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              accept: "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch movies")
        }

        const data = await response.json()
        setMovies(data.results ?? [])
      } catch {
        setMovies([])
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main>
      <h1>Movie App</h1>

      <SearchBar query={query} onChange={setQuery} />

      <MovieList movies={filteredMovies} />
    </main>
  )
}

export default HomePage