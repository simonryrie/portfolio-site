"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { PortableText } from "next-sanity";
import "swiper/css";
import type { Project } from "@/app/types/sanity";
import { Typography } from "../Typography/Typography";
import { SanityImage } from "sanity-image";

const SANITY_BASE_URL = "https://cdn.sanity.io/images/dbcs3j7f/production/";

type ProjectsCarouselProps = {
  projects: Project[];
};

function ProjectSlide({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8 p-8">
      <div className="col-span-1 flex flex-col gap-4">
        <Typography as="h3" variant="heading3">
          {project.title}
        </Typography>

        <PortableText value={project.description} />

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline w-max"
          >
            View project
          </a>
        )}
      </div>

      <div className="col-span-3 flex gap-4 items-start">
        {/* Desktop */}
        <div className="col-span-1">
          <SanityImage
            id={project.image_1.asset._ref}
            baseUrl={SANITY_BASE_URL}
            width={1600}
            alt={`${project.title} desktop screenshot`}
            className="w-full aspect-video object-cover"
          />
        </div>
        {/* Tablet */}
        <div className="w-1/3">
          <SanityImage
            id={project.image_2.asset._ref}
            baseUrl={SANITY_BASE_URL}
            width={300}
            alt={`${project.title} tablet screenshot`}
            className="w-full aspect-3/4 object-cover"
          />
        </div>
        {/* Mobile */}
        <div className="w-1/6">
          <SanityImage
            id={project.image_3.asset._ref}
            baseUrl={SANITY_BASE_URL}
            width={200}
            alt={`${project.title} mobile screenshot`}
            className="w-full aspect-9/19 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  return (
    <div className="bg-sea dark:bg-sea-dark text-sea-text dark:text-seat-text-dark">
      <Typography as="h2" variant="heading2" className="pt-8 pl-8 pb-4">
        My Projects →
      </Typography>
      <Swiper spaceBetween={50} slidesPerView={1}>
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <ProjectSlide project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
