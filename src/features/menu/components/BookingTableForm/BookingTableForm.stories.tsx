import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BookingTableForm } from '@features/menu/components/BookingTableForm';

export default {
  title: 'Menu/BookingTableForm',
  component: BookingTableForm,
} as ComponentMeta<typeof BookingTableForm>;

const Template: ComponentStory<typeof BookingTableForm> = () => <BookingTableForm />;

export const Main = Template.bind({});
