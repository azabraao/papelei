import { memo } from "react";
import Container from "../Container";

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="pt-10">
      <Container>
        <h1 className="text-2xl text-black-70">{children}</h1>
      </Container>
    </div>
  );
};

export default memo(PageHeader);
