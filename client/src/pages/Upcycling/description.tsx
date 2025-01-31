export default function Description({ text }: { text: string }) {
  return (
    <section>
      {text
        .trim()
        .split("\n\n")
        .map((paragraph) => (
          <p key={Date.now()}>{paragraph}</p>
        ))}
    </section>
  );
}
