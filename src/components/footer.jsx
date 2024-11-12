export default function Footer({ author }) {
  return (
    <footer>
      <p>
        <a href={author?.URL} target="_blank">
          {author?.USERNAME}
        </a>
      </p>
    </footer>
  );
}
