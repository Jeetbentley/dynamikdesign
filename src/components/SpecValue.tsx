// Any "TODO" left in a data value renders as a muted "to be confirmed".
export default function SpecValue({ value }: { value: string }) {
  const parts = value.split('TODO')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="italic text-text-muted">to be confirmed</span>}
        </span>
      ))}
    </>
  )
}
