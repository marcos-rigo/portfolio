import React from "react";

interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ tag, title, description, align = "center" }: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white px-4 py-1.5 rounded-full bg-primary">
        {tag}
      </span>
      <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground mt-5 mb-3 tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed font-sans mb-4 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
      <div className={`w-12 h-1 bg-primary rounded-full ${isCenter ? "mx-auto" : ""}`} />
    </div>
  );
}
