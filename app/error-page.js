import Link from "next/link";

export default function ErrorPage({ status, message }) {
    return <div className="flex flex-col gap-2 items-center">
        <b className="text-6xl m-auto">
            { status }
        </b>
        <div className="text-lg">
            { message }
        </div>

        <Link href="/">Return Home</Link>
    </div>
}