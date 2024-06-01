import { mockDish } from "@lib/mockData";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { DishCard } from "./DishCard";

export default {
    title: "Menu/DishCard",
    component: DishCard,
} as ComponentMeta<typeof DishCard>;

const Template: ComponentStory<typeof DishCard> = (args) => <DishCard {...args} />;

export const Main = Template.bind({});
Main.args = {
    dish: mockDish,
};

export const Quantity = Template.bind({});
Quantity.args = {
    dish: mockDish,
    quantity: 1,
};
