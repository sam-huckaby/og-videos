import { useEffect, useRef } from "react";

interface VideoPlaybackProps {
	videoUrl?: string;
};

export const VideoPlayback = ({ videoUrl }: VideoPlaybackProps) => {
	const player = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (videoUrl && player.current) {
			player.current.src = videoUrl;
			player.current.load();
		}
	}, [videoUrl, player.current]);

	return (
		<div className="bg-red-600">
			{videoUrl && <video ref={player} controls />}
		</div>
	);
};
