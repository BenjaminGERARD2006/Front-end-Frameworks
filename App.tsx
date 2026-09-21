import { useState } from "react"
import MovieList from "./components/MovieList"
import SearchBar from "./components/SearchBar"
import { SAMPLE_MOVIES } from "./src/data/sampleMovies"
import type { Movie } from "./types"

function App() {
  const [search, setSearch] = useState("")

  const movies = SAMPLE_MOVIES as Movie[]

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main>
      <h1>Movie App</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <MovieList movies={filteredMovies} />
    </main>
  )
}

export default App