function MatchCard({ title, date, location }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
    </article>
  );
}
export default MatchCard;
