export enum Filter {
  All = "All",
  Completed = "Completed",
  Pending = "Pending",
}

interface FilterButtonProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const FilterButton = ({ filter, setFilter }: FilterButtonProps) => {
  return <button onClick={() => setFilter(filter)}>{filter}</button>;
};
