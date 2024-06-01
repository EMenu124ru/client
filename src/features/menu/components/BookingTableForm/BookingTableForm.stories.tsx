import { BookingTableForm } from "@features/menu/components/BookingTableForm";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
    title: "Menu/ClientOrderCard",
    component: BookingTableForm,
} as ComponentMeta<typeof BookingTableForm>;

const Template: ComponentStory<typeof BookingTableForm> = () => <BookingTableForm />;

export const Main = Template.bind({});
