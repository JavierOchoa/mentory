import Header from "@/components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">
      <div className="flex flex-col items-center gap-y-20 w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
