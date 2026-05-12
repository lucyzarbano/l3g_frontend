import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";

interface BoxProps {
  title: string;
  icon: IconDefinition;
  children: ReactNode;
}

export default function Box({ title, icon, children }: BoxProps) {
  return (
    <div className="box">
      <h3 className="box__title">
        <FontAwesomeIcon icon={icon} /> {title}
      </h3>
      <div className="box__content">{children}</div>
    </div>
  );
}
