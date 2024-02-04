export default function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="inline-block px-8 py-2 mb-8 border-2 border-solid border-[#FFF56D] text-xl font-bold text-[#FFF56D] uppercase tracking-wider">
      {children}
    </h1>
  );
}
