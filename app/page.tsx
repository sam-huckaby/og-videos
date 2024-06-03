import VideoRecorder from "@/components/VideoRecorder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl text-neutral-200">Potato Stream</h1>
      <div className="mb-32 text-center lg:mb-0 lg:w-full lg:max-w-5xl">
        WHAT WILL YOU STREAM TODAY?
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <VideoRecorder />
      </div>

    </main>
  );
}
