import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DishCard } from './DishCard';

export default {
  title: 'Menu/DishCard',
  component: DishCard,
} as ComponentMeta<typeof DishCard>;

const Template: ComponentStory<typeof DishCard> = args => <DishCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  description: 'Нежный осьминог с молодыми тропическими фруктами',
  title: 'Морской кошмар',
  weight: 100,
  composition: 'Lalala',
  price: 1100,
};

export const Quantity = Template.bind({});
Quantity.args = {
  description: 'Нежный осьминог с молодыми тропическими фруктами',
  title: 'Морской кошмар',
  weight: 100,
  composition: 'Lalala',
  price: 1100,
  quantity: 1,
};
