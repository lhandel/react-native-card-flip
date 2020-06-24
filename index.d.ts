import { Component } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type FlipDirection = "y" | "x";

export type Direction = "right" | "left";

export type FlipCardProps = {
  style?: StyleProp<ViewStyle>;
  duration?: number;
  flipZoom?: number;
  flipDirection?: FlipDirection;
  flipReverse?: boolean;
  onFlip?: (index: number) => void;
  onFlipEnd?: (index: number) => void;
  onFlipStart?: (index: number) => void;
  perspective?: number;
};

declare class FlipCard extends Component<FlipCardProps> {
  flip: () => void;

  tip: ({
    direction,
    duration,
    progress
  }: {
    direction?: Direction;
    duration?: number;
    progress?: number;
  }) => void;

  jiggle: ({
    count,
    duration,
    progress
  }: {
    count?: number;
    duration?: number;
    progress?: number;
  }) => void;
}

export default FlipCard;
