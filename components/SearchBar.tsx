interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search movies..."
    />
  )
}

export default SearchBar