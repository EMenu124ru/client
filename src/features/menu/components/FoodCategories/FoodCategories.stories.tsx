import { FoodCategories } from '@features/menu/components/FoodCategories';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

export default {
  title: 'Menu/FoodCategories',
  component: FoodCategories,
} as ComponentMeta<typeof FoodCategories>;

const Template: ComponentStory<typeof FoodCategories> = () => <FoodCategories />;

export const Main = Template.bind({});
