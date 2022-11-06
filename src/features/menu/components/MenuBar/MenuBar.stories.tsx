import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuBar } from '@features/menu/components/MenuBar';
import React from 'react';

export default {
  title: 'Menu/MenuBar',
  component: MenuBar,
} as ComponentMeta<typeof MenuBar>;

const Template: ComponentStory<typeof MenuBar> = () => <MenuBar />;

export const Main = Template.bind({});
