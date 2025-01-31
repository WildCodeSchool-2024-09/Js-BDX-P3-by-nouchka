export default function Description({ text }: { text: string }) {
  return (
    <article>
      {text
        .trim()
        .split("\n\n")
        .map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
    </article>
  );
}
