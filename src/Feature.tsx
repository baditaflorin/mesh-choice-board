import { useState } from "react";
import { useSharedChoices } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

const starterChoices = ["Walk and talk", "Coffee break", "Sketch together"];

export function Feature({ room, config }: Props) {
  const board = useSharedChoices(room, "choice-board");
  const [draft, setDraft] = useState("");

  const addChoice = () => {
    if (board.add(draft)) setDraft("");
  };

  return (
    <main className="choice-board">
      <div className="eyebrow">Shared preference board</div>
      <h1>Choice Board</h1>
      <p className="lede">Add options, then tap every option you would happily choose.</p>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          addChoice();
        }}
      >
        <label className="sr-only" htmlFor="choice-draft">
          Add a choice
        </label>
        <input
          id="choice-draft"
          maxLength={100}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add an option…"
          value={draft}
        />
        <button disabled={!draft.trim() || !room} type="submit">
          Add choice
        </button>
      </form>

      {board.choices.length === 0 ? (
        <section className="empty-state">
          <p>Start with a simple question, then add the options together.</p>
          <div className="starter-row" aria-label="Starter choices">
            {starterChoices.map((label) => (
              <button key={label} type="button" onClick={() => board.add(label)}>
                {label}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Shared choices" className="choice-list">
          {board.choices.map((choice) => {
            const selected = board.selectedIds.includes(choice.id);
            return (
              <article className={selected ? "choice selected" : "choice"} key={choice.id}>
                <button
                  aria-pressed={selected}
                  className="choice-main"
                  type="button"
                  onClick={() => board.toggle(choice.id)}
                >
                  <span>{choice.label}</span>
                  <strong>
                    {choice.count} {choice.count === 1 ? "pick" : "picks"}
                  </strong>
                </button>
                {choice.createdBy === room?.peerId ? (
                  <button
                    aria-label={`Remove ${choice.label}`}
                    className="remove"
                    type="button"
                    onClick={() => board.remove(choice.id)}
                  >
                    ×
                  </button>
                ) : null}
              </article>
            );
          })}
        </section>
      )}

      {board.selectedIds.length > 0 ? (
        <button className="clear" type="button" onClick={board.clearMine}>
          Clear my picks ({board.selectedIds.length})
        </button>
      ) : null}
      <p className="status" aria-live="polite">
        {room
          ? `${room.peerCount} peer${room.peerCount === 1 ? "" : "s"} in this room`
          : config.description}
      </p>
    </main>
  );
}
