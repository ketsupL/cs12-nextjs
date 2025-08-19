import { Search, X } from "lucide-react";
import { useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchBarProps = {
  searchBarValue: string;
  setSearchBarValue: (val: string) => void;
  setSearchTerm: (val: string) => void;
};

export default function SearchBar({
  searchBarValue,
  setSearchBarValue,
  setSearchTerm
}: SearchBarProps) {
  const isMounted = useRef(true);
  const DEBOUNCE_TIME = 200;
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (term: string) => {
    if (!isMounted.current) return;
    // Ensure the search term is properly passed to the parent component
    setSearchTerm(term);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Update the local input value immediately for UI responsiveness
    setSearchBarValue(value);

    // Clear any existing debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new debounce timer for the actual search
    debounceTimeout.current = setTimeout(() => {
      if (isMounted.current) {
        console.log('SearchBar triggering search with term:', value);
        // This will trigger the search in the parent component
        handleSearch(value);
      }
    }, DEBOUNCE_TIME);
  };

  // Handle clearing the search
  const handleClear = () => {
    setSearchBarValue("");
    setSearchTerm("");

    // Clear any pending debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative w-72 flex">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchBarValue}
        placeholder="Search customers..."
        className="pl-8 pr-8"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Immediately perform search on Enter key
            if (debounceTimeout.current) {
              clearTimeout(debounceTimeout.current);
            }
            handleSearch(searchBarValue);
          } else if (e.key === "Escape") {
            // Clear search on Escape key
            handleClear();
          }
        }}
      />
      {searchBarValue && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
