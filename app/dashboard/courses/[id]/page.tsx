import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course || error) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 text-muted-foreground">{course.description}</p>
    </div>
  );
}
