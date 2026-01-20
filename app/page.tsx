import { Hero } from "./components/Hero/Hero";
import { ProjectsCarousel } from "./components/ProjectsCarousel/ProjectsCarousel";
import { client } from "./sanity/client";
import type { Project } from "./types/sanity";

const PROJECTS_QUERY = `*[_type == "project"]|order(_createdAt asc)[0...12]{_id, title, description, image_1, image_2, image_3, link}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  return (
    <>
      <Hero />
      <ProjectsCarousel projects={projects} />
    </>
  );
}
