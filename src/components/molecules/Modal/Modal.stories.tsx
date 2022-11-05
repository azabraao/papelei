import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from ".";
import { Button } from "components/atoms";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Molecules/Modal",
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const NicestModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button backgroundColor="success" onClick={openModal}>
        Open the modal
      </Button>
      <Modal isOpen={isOpen} close={closeModal}>
        A lot of nice content to be displayed
      </Modal>
    </>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = () => <NicestModal />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
