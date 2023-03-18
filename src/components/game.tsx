/* @leny/bowlstats
 *
 * /src/components/game.tsx
 */

import type {FC, ReactElement} from "react";
import {Game} from "types";
import type {Dayjs} from "dayjs";

import {useCallback, useState} from "react";
import classnames from "classnames";
import GameFrames from "components/game-frames";
import GameStats from "components/game-stats";
import {useMemo} from "react";
import dayjs from "dayjs";

const NBSP: string = "\u00a0";

const getBallColor = (ball: string): string => {
    switch (ball.slice(ball.startsWith("H") ? 1 : 0)) {
        case "6":
            return "#f8362f";
        case "7":
            return "#c6c20d";
        case "8":
            return "#c81108";
        case "9":
            return "#46435a";
        case "10":
            return "#9b2527";
        case "11":
            return "#1b417d";
        case "12":
            return "#1b6626";
        case "13":
            return "#1f3c7c";
        case "14":
            return "#0aa025";
        case "15":
            return "#262b4b";
        case "16":
            return "#983d28";
        default:
            return "black";
    }
};

export interface GameProps {
    game: Game;
    isBest: boolean;
}

const Game: FC<GameProps> = ({game, isBest}: GameProps): ReactElement => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const date = useMemo<Dayjs>(
        () =>
            dayjs(new Date(game.date.year, game.date.month - 1, game.date.day)),
        [game],
    );

    const toggleDetails = useCallback(() => {
        setShowDetails(!showDetails);
    }, [showDetails]);

    const $date = (
        <div className={classnames("mr-2", "has-background-white")}>
            <span
                className={classnames(
                    "is-block",
                    "px-2",
                    "has-background-danger",
                    "has-text-white",
                    "is-size-7",
                    "has-text-weight-semibold",
                    "is-uppercase",
                    "has-text-centered",
                )}>
                {date.format("MMM")}
            </span>
            <span
                className={classnames(
                    "is-block",
                    "has-text-centered",
                    "has-text-black",
                    "has-text-weight-bold",
                )}
                style={{border: "1px solid #dbdbdb", borderTop: 0}}>
                {game.date.day}
            </span>
        </div>
    );

    if (!showDetails) {
        return (
            <div
                className={classnames(
                    "notification",
                    "is-light",
                    isBest && "is-link",
                    "is-flex",
                    "is-justify-content-space-between",
                    "is-align-content-center",
                    "px-5",
                    "is-unselectable",
                    "is-clickable",
                )}
                onClick={toggleDetails}>
                {$date}

                <GameFrames score={game.score} frames={game.frames} compact />
            </div>
        );
    }

    return (
        <div
            className={classnames(
                "notification",
                "is-light",
                isBest && "is-link",
                "px-5",
            )}>
            <div
                className={classnames(
                    "is-flex",
                    "mb-3",
                    "is-justify-content-space-between",
                    "is-align-content-center",
                )}>
                {$date}
                <div
                    className={classnames(
                        "is-flex",
                        "is-relative",
                        "is-justify-content-center",
                        "is-align-items-center",
                        "has-text-weight-bold",
                        "is-family-secondary",
                        "is-size-5",
                        "has-text-white",
                    )}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "100%",
                        backgroundColor: getBallColor(game.ball),
                    }}
                    title={`Played with ${game.ball.slice(1)}lbs ball ${
                        game.ball.startsWith("H") ? "(house ball)" : ""
                    }`}>
                    <span className={classnames("is-block")}>
                        {game.ball.slice(1)}
                    </span>
                    {game.ball.startsWith("H") && (
                        <span
                            className={classnames("has-text-light")}
                            style={{
                                position: "absolute",
                                bottom: -1,
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: 9,
                            }}>
                            {"H"}
                        </span>
                    )}
                </div>
                <button
                    type={"button"}
                    className={classnames("delete")}
                    onClick={toggleDetails}>
                    {"(hide details)"}
                </button>
            </div>
            <GameFrames score={game.score} frames={game.frames} />
            {game.note && (
                <p className={classnames("mb-3")}>
                    <strong>{"Note:"}</strong>
                    {NBSP}
                    <span className={classnames("is-italic")}>{game.note}</span>
                </p>
            )}
            <GameStats game={game} />
        </div>
    );
};

export default Game;
