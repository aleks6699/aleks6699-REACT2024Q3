export default function ErrorMessage({ error }: { error: string | undefined }) {
  return <p className="error">{error}</p>;
}
