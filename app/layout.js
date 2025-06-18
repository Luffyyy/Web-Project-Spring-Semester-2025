import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import ClientLayout from "@/components/layout/client-layout";
import { CookiesProvider } from "next-client-cookies/server";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getUser } from "@/lib/server-utils";
import ChatWidget from "@/components/chat-widget";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "NextFit",
	description: "A site for watching exercise clips so you can get the best out of you!",
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value ?? 'dark';
    const user = await getUser();

	return <CookiesProvider>
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <body className={theme}>
                <div className="relative min-h-screen" id="root">
                    <ClientLayout theme={theme} user={user}>
                        <NuqsAdapter>
                            { children }
                            <ChatWidget />
                        </NuqsAdapter>
                    </ClientLayout>
                </div>
            </body>
        </html>
    </CookiesProvider>;
}
