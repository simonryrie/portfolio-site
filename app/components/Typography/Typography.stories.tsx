import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["heading1", "heading2", "heading3", "body", "caption"],
    },
    className: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Typography",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography as="h1" variant="heading1">
        Heading 1
      </Typography>
      <Typography as="h2" variant="heading2">
        Heading 2
      </Typography>
      <Typography as="h3" variant="heading3">
        Heading 3
      </Typography>
      <Typography as="p" variant="body">
        Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography as="span" variant="caption">
        Caption text
      </Typography>
    </div>
  ),
};
