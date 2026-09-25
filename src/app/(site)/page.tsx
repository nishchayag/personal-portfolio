import { Combined } from "@/components/site/combined";
import { getProjects } from "@/content/projects";

export const revalidate = 3600;

export default async function Home() {
  const { featured, other } = await getProjects();
  return <Combined featured={featured} other={other} />;
}
