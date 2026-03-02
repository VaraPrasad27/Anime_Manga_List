export default function Selector({
  options,
  handler,
}: {
  options: { name: string; value: string }[];
  handler: (value: string) => void;
}) {
  return (
    <>
      <select name="type" id="select" onChange={(e) => handler(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );
}
