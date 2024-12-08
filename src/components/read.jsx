import NoteCard from "./note-card";

export default function Read({ texts }) {
  return (
    <>
      {texts.length > 0 ? (
        texts.map((text) => <NoteCard key={text?.id} note={text} />)
      ) : (
        <section className="card">
          <p className="font-bold">No notes to display</p>
        </section>
      )}
    </>
  );
}
