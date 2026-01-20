import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../context/ThemeContext";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { mockProjects } from "@/app/data/mockProjectsData";

const meta = {
  title: "Components/ProjectsCarousel",
  component: ProjectsCarousel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProjectsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: mockProjects,
  },
};
