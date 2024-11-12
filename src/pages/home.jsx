import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <p className="font-bold">Hey there,</p>
        <p>This is a notes app. Make notes with noted.</p>
      </article>
      <div className="flex gap-2">
        <Link to="/auth">
          <button>Get started</button>
        </Link>
        <a href="https://github.com/pr4j3sh/noted" target="_blank">
          <button className="secondary">Github</button>
        </a>
      </div>
    </section>
  );
}
