import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../context/ThemeContext";
import { Hero } from "./Hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    layout: "fullScreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
