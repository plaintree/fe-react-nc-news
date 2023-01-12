const SelectOptions = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <section className="select__container">
      <select
        className="select__sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Date</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
      </select>
      <select
        className="select__sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </section>
  );
};
export default SelectOptions;
