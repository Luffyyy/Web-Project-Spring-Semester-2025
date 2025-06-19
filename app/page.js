import Link from "next/link";

export default function Home() {
	return <>
        <div className="absolute inset-0 -z-10">
            <img src="assets/Hero.jpg" alt="Hero Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <section className="flex flex-col items-center justify-center text-center text-white px-4 py-32 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to NextFit</h1>
            <p className="text-lg md:text-xl mb-6">Train smart. Stay fit. Anywhere.</p>
            <div className="flex gap-1">
                <Link href="/browse" className="btn primary transition">
                    Browse Exercises
                </Link>
                <Link href="/routine" className="btn primary text-lg transition">
                    Exercise Routines
                </Link>
            </div>
        </section>

        <div className="px-4 my-8 flex flex-col items-center text-white">
            <strong className="text-3xl">What is NextFit?</strong>
            <div className="text-xl text-center max-w-xl mt-2">
                A site for watching exercise clips so you can get the best out of you!
            </div>
        </div>
    </>;
}
