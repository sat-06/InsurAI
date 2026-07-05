import Link from "next/link";
import { ActivitySquare } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Predict", href: "/predict" },
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#ml" },
  ],
  Resources: [
    { label: "API Docs", href: "https://insurai-api.onrender.com/docs" },
    { label: "GitHub", href: "https://github.com/sat-06/InsurAI" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-surface">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <ActivitySquare className="h-4 w-4 text-white" />
              </div>

              <span className="text-base font-semibold text-white">
                Insur<span className="text-gradient">AI</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              AI-powered health insurance analytics — prediction, risk
              scoring, segmentation, and underwriting in one platform.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-zinc-200">
                {heading}
              </h4>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-zinc-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} InsurAI. All rights reserved.
          </p>

          <p>
            Built with Next.js, FastAPI &amp; Scikit-Learn
          </p>
        </div>
      </div>
    </footer>
  );
}