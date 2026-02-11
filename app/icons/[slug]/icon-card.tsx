"use client";

import type { ComponentType } from "react";
import { useMemo, useRef } from "react";
import { Card, CardActions } from "@/components/card";
import { getIconList } from "@/lib/icons";
import type {
  AnimatedIconHandle,
  AnimatedIconProps,
  IconManifestItem,
} from "@/types/icon";

type Props = {
  icon: IconManifestItem;
};

const IconCard = ({ icon }: Props) => {
  const animationRef = useRef<AnimatedIconHandle | null>(null);

  const IconComponent = useMemo(() => {
    return getIconList().find((item) => item.name === icon.name)?.icon as
      | ComponentType<AnimatedIconProps>
      | undefined;
  }, [icon.name]);

  if (!IconComponent) {
    return null;
  }

  return (
    <Card
      animationRef={animationRef}
      className="w-full min-[880px]:w-auto"
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
    >
      <IconComponent
        className="flex items-center justify-center [&>svg]:size-12 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
        ref={animationRef}
      />
      <CardActions alwaysVisible name={icon.name} />
    </Card>
  );
};

export { IconCard };
