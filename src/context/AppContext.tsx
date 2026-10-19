
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react"
import type { Movie } from "../types"

type Theme = "dark" | "light"

interface AppState {
  favorites: Movie[]
  theme: Theme
}

type AppAction =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme }

interface AppContextValue {
  favorites: Movie[]
  theme: Theme
  toggleFavorite: (movie: Movie) => void
  isFavorite: (movieId: number) => boolean
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

function getInitialState(): AppState {
  let favorites: Movie[] = []
  let theme: Theme = "dark"

  try {
    const savedFavorites = localStorage.getItem("cinegrid_favorites")
    if (savedFavorites) {
      const parsed: unknown = JSON.parse(savedFavorites)
      if (Array.isArray(parsed)) {
        favorites = parsed as Movie[]
      }
    }

    const savedTheme = localStorage.getItem("cinegrid_theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme
    }
  } catch {
    // Use default values if saved data is invalid.
  }

  return { favorites, theme }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadyFavorite = state.favorites.some(
        (movie) => movie.id === action.payload.id
      )

      return {
        ...state,
        favorites: alreadyFavorite
          ? state.favorites.filter((movie) => movie.id !== action.payload.id)
          : [...state.favorites, action.payload],
      }
    }

    case "SET_THEME":
      return { ...state, theme: action.payload }

    default:
      return state
  }
}

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    getInitialState
  )

  useEffect(() => {
    localStorage.setItem("cinegrid_favorites", JSON.stringify(state.favorites))
  }, [state.favorites])

  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme)
    document.documentElement.setAttribute("data-theme", state.theme)
  }, [state.theme])

  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie })
  }

  const isFavorite = (movieId: number) =>
    state.favorites.some((movie) => movie.id === movieId)

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    })
  }

  return (
    <AppContext.Provider
      value={{
        favorites: state.favorites,
        theme: state.theme,
        toggleFavorite,
        isFavorite,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }

  return context
}

export function useOptionalAppContext(): AppContextValue | undefined {
  return useContext(AppContext)
}
