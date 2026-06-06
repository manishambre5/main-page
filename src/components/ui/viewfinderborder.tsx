export function ViewFinderBorder() {
  return (
    <>
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent" />
    </>
  );
}