import MatchCard from "./MatchCard.jsx";

export default function MatchList({ matches }) {
  return (
    <section>
      {matches.map((m) => {
        return (
          <MatchCard
            key={m.id}
            title={m.title}
            date={m.date}
            location={m.location}
          />
        );
      })}
    </section>
  );
}
