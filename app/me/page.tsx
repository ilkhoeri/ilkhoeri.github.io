import { ContentPage } from "@/components/component-content";
import { Mdx } from "@/components/content/mdx-component";
import { cn } from "@/lib/utils";
import { allDocuments } from "contentlayer/generated";
import { cvx } from "xuxi";

const readmeRaw = `https://raw.githubusercontent.com/ilkhoeri/ilkhoeri/refs/heads/master/README.md`;

export default async function TemplatesPage() {
  const response = await fetch(readmeRaw);
  const raw = await response.text();

  const md = allDocuments.find(doc => doc.url === "/me");

  if (!md?.body.code) {
    return (
      <pre
        className={cn(
          classes({ s: "wrapper" }),
          "whitespace-pre-line mt-12 xl:mt-18"
        )}>
        <code dangerouslySetInnerHTML={{ __html: raw }} />
      </pre>
    );
  }

  return (
    <ContentPage
      title="Profile"
      description="I am open to you getting to know me better."
      subtitle="Let's collaborate and become a strong team.">
      <div
        className={cn(
          classes({ s: "wrapper" }),
          "[&_br:has(+h1,+h2,+h3,+h4)]:[br]:hidden [&_hr:has(+h1,+h2,+h3,+h4)]:[&_+h1,+h2,+h3,+h4]:mt-0 [&_p:has(*:is(a>img))]:[p]:inline-flex [&_p:has(*:is(a>img))]:[p]:space-x-1 [&_p:has(+ul,+ol)]:[p,p]:-mb-1"
        )}>
        <Mdx code={md?.body.code} />
      </div>
    </ContentPage>
  );
}

const classes = cvx({
  variants: {
    s: {
      wrapper:
        "p-8 rounded-xl max-w-[90dvw] xl:max-w-7xl mx-auto mb-12 border border-black/12 dark:border-white/12"
    }
  }
});
