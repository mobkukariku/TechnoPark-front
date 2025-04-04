import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} max-w-[1186px] px-4 sm:px-6 lg:px-8 mx-auto`}>
      {children}
    </div>
  );
};
