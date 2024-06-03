"use client";

import React, { useEffect, useRef, useState } from 'react';
import { VideoPlayback } from './VideoPlayback';

/** 
 * Goals and plans
 * A simple recording component that shows only a "Start Stream" button to start
 * Once the "Start Stream" button is clicked, the preview pane appears to show camera position
 * A single button under the preview pane says "Record" which changes to "Stop" when clicked
 * When the "Stop" button is clicked, the recording is saved and made available to download via link
 *
 * FUTURE:
 * Modify page to show a video preview in OG
 * */

const mimeType = "video/webm";

const VideoRecorder: React.FC = () => {

	const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isRecording, setIsRecording] = useState(false);

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const liveVideoFeed = useRef<HTMLVideoElement | null>(null);
	const recordedVideoFeed = useRef<HTMLVideoElement | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [recordedVideo, setRecordedVideo] = useState<string | undefined>();

	useEffect(() => {
		return () => {
			// Clean up previous video URLs to avoid memory leaks
			if (recordedVideo) {
				URL.revokeObjectURL(recordedVideo);
			}
		};
	}, [recordedVideo]);

	/** Begin the stream by requesting media access and then creating a stream to the preview pane */
	const beginStream = async () => {
		// Check if the preview pane is present on the page
		if (!liveVideoFeed || !liveVideoFeed.current) {
			return "No preview pane given";
		}
		// Confirm that this code is being run on the client
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: true,
				});
				setStream(streamData);
				//set videostream to live feed player
				liveVideoFeed.current.srcObject = streamData;
				setIsStreaming(true);
			} catch (err: any) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const endStream = async () => {
		if (stream) {
			// Shut down the tracks that are being recorded, so we don't leak memory
			stream.getTracks().forEach((track) => track.stop());

			// Check if the preview pane is present on the page and clear it out if so
			if (!liveVideoFeed || !liveVideoFeed.current) {
				return "No preview pane given";
			}
			liveVideoFeed.current.srcObject = null;

			// Remove the reference to the stream so it will be cleaned up
			setStream(null);
			// Tell the view that streaming has ended
			setIsStreaming(false);
		}
	};

	const startRecording = async () => {
		if (!stream) {
			return false;
		}

		const media = new MediaRecorder(stream, { mimeType }); // Which is better mp4 or webm?

		mediaRecorder.current = media;
		mediaRecorder.current.start(1000);

		// Actually tell the View that we are recording...
		setIsRecording(true);

		mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
			if (event.data.size > 0) {
				setRecordedChunks((prev) => [...prev, event.data]);
			}
		};
	};

	const stopRecording = () => {
		if (mediaRecorder.current && isRecording) {
			mediaRecorder.current.stop();
			mediaRecorder.current.onstop = () => {
				const videoBlob = new Blob(recordedChunks, { type: mimeType });
				const videoUrl = URL.createObjectURL(videoBlob);

				setRecordedVideo(videoUrl);
				console.log("test");
				setRecordedChunks([]);

				if (recordedVideoFeed.current) {
					recordedVideoFeed.current.src = videoUrl;
					recordedVideoFeed.current.load();
				}

				setIsRecording(false);
				endStream();
			};
		}
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			<video ref={liveVideoFeed} autoPlay muted />
			{!isRecording && stream && <button className='p-4 rounded border border-solid border-neutral-200' onClick={startRecording} disabled={isRecording}>Start Recording</button>}
			{isRecording && stream && <button className='p-4 rounded border border-solid border-neutral-200' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>}
			{!stream && <button className='p-4 rounded border border-solid border-neutral-200' onClick={beginStream}>Initialize Stream</button>}
			<VideoPlayback videoUrl={recordedVideo} />
			{recordedVideo && <a download href={recordedVideo}>Download File</a>}
		</div>
	);
};

export default VideoRecorder;
