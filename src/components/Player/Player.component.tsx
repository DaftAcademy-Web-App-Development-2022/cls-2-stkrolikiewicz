import React from "react";
import usePlayer from "~/hooks/usePlayer.hook";
import trackData from "~/data/trackData.json";

import styles from "./Player.module.css";
import { format } from "path";
// import { time } from "console";

const Player = () => {
    const { state, actions } = usePlayer();

    const timeFormat = (number: any) => {
        let b = Math.floor(number / 60);
        let f = b.toString().padStart(2, "0");
        f += `:${(number % 60).toString().padStart(2, "0")}`;

        return f;
    };

    return (
        <div className={styles.root}>
            <div className={styles.playerItems}>
                {state.playing ? (
                    <button onClick={() => actions.pause()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="2 2 20 20"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                            />
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            actions.play({
                                id: trackData.id,
                                name: trackData.name,
                                src: trackData.preview_url,
                                artists: trackData.artists.map(
                                    (artist) => artist.name
                                ),
                            })
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="1 2 20 20"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                        </svg>
                    </button>
                )}

                <div className={styles.infoBar}>
                    <p>{trackData.name}</p>
                    <div className={styles.inlineItems}>
                        <div className={styles.progressBar}>
                            <div
                                style={{ width: `${state.progress * 100}%` }}
                            ></div>
                        </div>
                        <span className={styles.songDuration}>
                            {timeFormat(state.currentTime)} /
                            {timeFormat(state.duration)}
                        </span>
                    </div>
                    <p className={styles.artist}>
                        {trackData.artists.map((artist) => artist.name)}
                    </p>
                </div>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Player;
