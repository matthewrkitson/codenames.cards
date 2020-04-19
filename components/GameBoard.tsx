import React, { useState } from "react";
import {
  useBoardView,
  usePushTurn,
  useSelfPlayer,
  useSendChat,
} from "../hooks/game";
import { ICardView, ClassicGridItem, ITurn, IPlayer } from "../lib/game";
import classnames from "classnames";

export default () => {
  const selfPlayer = useSelfPlayer();
  const boardView = useBoardView();
  const pushTurn = usePushTurn();
  return (
    <div className="grid grid-cols-5 md:gap-2 gap-1 max-w-4xl mx-auto">
      {boardView.map((w: ICardView, i: number) => {
        return (
          <Card
            pushTurn={pushTurn}
            selfPlayer={selfPlayer}
            cardView={w}
            index={i}
            key={i}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  pushTurn,
  selfPlayer,
  cardView,
  index,
}: {
  pushTurn: (turn: ITurn) => void;
  selfPlayer: IPlayer;
  cardView: ICardView;
  index: number;
}) => {
  const w = cardView;

  const colorStyles = {
    "border cursor-pointer": !w.revealed,
    "border-4": w.revealed,
    "border-gray-600 hover:bg-gray-100": !w.shown,
    "border-red-800 bg-red-700 text-red-300":
      w.revealed && w.shown && w.color === ClassicGridItem.Red,
    "border-blue-800 bg-blue-700 text-blue-300":
      w.revealed && w.shown && w.color === ClassicGridItem.Blue,
    "border-yellow-800 bg-yellow-100 text-yellow-800":
      w.revealed && w.shown && w.color === ClassicGridItem.Neutral,
    "border-gray-800 bg-gray-800 text-gray-200":
      w.revealed && w.shown && w.color === ClassicGridItem.Black,
    "border-red-800 bg-red-200 text-red-900 hover:bg-red-300":
      !w.revealed && w.shown && w.color === ClassicGridItem.Red,
    "border-blue-800 bg-blue-200 text-blue-900 hover:bg-blue-300":
      !w.revealed && w.shown && w.color === ClassicGridItem.Blue,
    "border-yellow-800 bg-yellow-100 text-yellow-800 hover:bg-yellow-200":
      !w.revealed && w.shown && w.color === ClassicGridItem.Neutral,
    "border-black bg-gray-700 text-gray-100 hover:bg-gray-600":
      !w.revealed && w.shown && w.color === ClassicGridItem.Black,
  };

  return (
    <div
      onClick={() => {
        if (!w.revealed && selfPlayer) {
          pushTurn({
            type: "click",
            value: index,
            from: selfPlayer.id,
          });
        }
      }}
      className={classnames(
        "font-bold rounded w-full h-12 flex flex-col items-center justify-center",
        colorStyles
      )}
    >
      {w.word}
    </div>
  );
};