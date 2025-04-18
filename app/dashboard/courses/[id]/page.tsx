import { createClient } from "@/utils/supabase/server"; // Adjust path as needed
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function CoursePage({ params }: PageProps) {
  const supabase = createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!course || error) {
    return notFound(); // Renders the 404 page if course isn't found
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 text-muted-foreground">{course.description}</p>
    </div>
  );
}
