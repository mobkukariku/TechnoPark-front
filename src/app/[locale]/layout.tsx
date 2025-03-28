import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Toaster} from "react-hot-toast";
import * as React from "react";
import {Footer, Header} from "@/shared/components";

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="min-h-screen mt-[150px] flex flex-col">
                <main className="flex-grow">
                    {children}
                </main>
            </div>
            <Footer />
        </NextIntlClientProvider>
    );
}