import { FC } from "react";

const Music: FC = () => {
  return (
    <div>
      <iframe
        title="SoundCloud"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/166877736&color=ff5500"
      ></iframe>
      <div
        style={{
          fontSize: "10px",
          color: "#cccccc",
          lineBreak: "anywhere",
          wordBreak: "normal",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontFamily:
            "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
          fontWeight: "lighter",
        }}
      >
        <a
          href="https://soundcloud.com/doomgrip776"
          title="Bone Removal Services, Inc."
          target="_blank"
          rel="noreferrer"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Bone Removal Services, Inc.
        </a>{" "}
        ·{" "}
        <a
          href="https://soundcloud.com/doomgrip776/rick-astley-never-gonna-give-you-up-airhorn-remix"
          title="Rick Astley - Never Gonna Give You Up (Airhorn Remix)"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Rick Astley - Never Gonna Give You Up (Airhorn Remix)
        </a>
      </div>{" "}
    </div>
  );
};

export default Music;
