import MatchCard from "./MatchCard";

function MatchList({ matches }) {
  return (
    <section className="match-list">
      {matches.map((m) => (
        <MatchCard
          key={m._id}
          id={m._id}
          title={m.title}
          date={m.date}
          location={m.location}
        />
      ))}
    </section>
  );
}

export default MatchList;
