import { getDictionary } from './dictionaries';
import { PageContent } from './PageContent';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  if (!dict) {
    return null;
  }

  return <PageContent dict={dict} lang={lang} />;
}