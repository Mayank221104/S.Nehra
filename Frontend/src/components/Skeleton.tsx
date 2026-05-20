export function Skeleton({
  width = "100%",
  height = 24,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return <div className="animate-pulse rounded bg-muted" style={{ width, height }} />;
}
