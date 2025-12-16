import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import * as matchesApi from "../api/matches";
import * as likesApi from "../api/likes";
import * as joinsApi from "../api/joins";

function MatchDetails({ matches, onDeleted }) {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const match = matches.find((m) => m._id === matchId);

  const [likesCount, setLikesCount] = useState(0);
  const [myLikeId, setMyLikeId] = useState(null);

  const [joinsCount, setJoinsCount] = useState(0);
  const [myJoinId, setMyJoinId] = useState(null);

  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!match) {
      return;
    }

    (async () => {
      try {
        setActionError("");

        const likes = await likesApi.getLikesForMatch(matchId);
        setLikesCount(likes.length);

        if (isAuthenticated) {
          const mineLike = likes.find((l) => l._ownerId === user._id);
          setMyLikeId(mineLike ? mineLike._id : null);
        } else {
          setMyLikeId(null);
        }

        const joins = await joinsApi.getJoinsForMatch(matchId);
        setJoinsCount(joins.length);

        if (isAuthenticated) {
          const mineJoin = joins.find((j) => j._ownerId === user._id);
          setMyJoinId(mineJoin ? mineJoin._id : null);
        } else {
          setMyJoinId(null);
        }
      } catch (err) {
        setActionError(err.message);
      }
    })();
  }, [matchId, match, isAuthenticated, user?._id]);

  if (!match) {
    return (
      <main>
        <h2>Match not found.</h2>
      </main>
    );
  }

  const isOwner = isAuthenticated && match._ownerId === user._id;
  const canInteract = isAuthenticated && !isOwner;

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );
    if (!confirmed) return;

    try {
      await matchesApi.deleteMatch(match._id, user.accessToken);
      if (onDeleted) {
        await onDeleted();
      }
      navigate("/catalog");
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleLike() {
    try {
      setActionError("");
      await likesApi.likeMatch(matchId, user.accessToken);

      const likes = await likesApi.getLikesForMatch(matchId);
      setLikesCount(likes.length);

      const mine = likes.find((l) => l._ownerId === user._id);
      setMyLikeId(mine ? mine._id : null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleUnlike() {
    try {
      setActionError("");
      await likesApi.unlikeMatch(myLikeId, user.accessToken);

      const likes = await likesApi.getLikesForMatch(matchId);
      setLikesCount(likes.length);
      setMyLikeId(null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleJoin() {
    try {
      setActionError("");
      await joinsApi.joinMatch(matchId, user.accessToken);

      const joins = await joinsApi.getJoinsForMatch(matchId);
      setJoinsCount(joins.length);

      const mine = joins.find((j) => j._ownerId === user._id);
      setMyJoinId(mine ? mine._id : null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleLeave() {
    try {
      setActionError("");
      await joinsApi.leaveMatch(myJoinId, user.accessToken);

      const joins = await joinsApi.getJoinsForMatch(matchId);
      setJoinsCount(joins.length);
      setMyJoinId(null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <main>
      <h1 className="page-title">{match.title}</h1>

      <p>
        <strong>Date:</strong> {match.date}
      </p>
      <p>
        <strong>Location:</strong> {match.location}
      </p>

      <p>Likes: {likesCount}</p>
      <p>Players joined: {joinsCount}</p>

      {actionError && <p className="error">{actionError}</p>}

      {canInteract && (
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          {myLikeId ? (
            <button onClick={handleUnlike}>Unlike</button>
          ) : (
            <button onClick={handleLike}>Like</button>
          )}

          {myJoinId ? (
            <button onClick={handleLeave}>Leave</button>
          ) : (
            <button onClick={handleJoin}>Join</button>
          )}
        </div>
      )}

      {isOwner && (
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <Link to={`/matches/${matchId}/edit`} className="btn-link">
            Edit
          </Link>

          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </main>
  );
}

export default MatchDetails;
