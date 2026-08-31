// Detailed view for a selected movie
import React from "react";
import { MovieDetails } from "../api/utopia";
import { groupByDay } from "../utils/schedule";
import Eyebrow from "./Eyebrow";
import InfoField from "./InfoField";
import PosterFrame from "./PosterFrame";
import SectionTitle from "./SectionTitle";
import Tag from "./Tag";

interface MovieDetailProps {
  details: MovieDetails;
}

const isYouTubeUrl = (url: string) => url.startsWith("https://www.youtube.com/embed/") || url.includes("youtu.be/");

export default function MovieDetail({ details }: MovieDetailProps) {
  const { info } = details;
  const badges = [info.version, info.duration, [info.country, info.year].filter(Boolean).join(" · "), info.genre];
  const paragraphs = details.description.split("\n\n").filter(Boolean);
  const days = groupByDay(details.showtimes);
  const [next, ...rest] = days;

  return (
    <article>
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] border-b border-ink/10 px-4 lg:px-8">
        <div className="lg:pr-8 pt-8 lg:py-16 flex flex-col gap-3.5">
          <div className="lg:max-w-none mx-auto w-full [&_img]:h-[200px] mobileWide:[&_img]:h-[350px] md:[&_img]:h-[550px] lg:[&_img]:h-full">
            <PosterFrame title={details.title} image={details.image} priority />
          </div>
          {next && (
            <div className="flex flex-col gap-1">
              <Eyebrow size="mini" className="tracking-[0.2em]">
                Prochaine séance
              </Eyebrow>
              <span className="text-note font-medium">{next.day}</span>
            </div>
          )}
        </div>

        <div className="wide:px-0 py-8 lg:py-16 flex flex-col gap-6">
          <Eyebrow size="mini" className="tracking-[0.2em]">
            À l'affiche
          </Eyebrow>
          <h1 className="font-archivo text-[64px] md:text-[102px] leading-[0.9] tracking-[-0.03em] uppercase">
            {details.title}
          </h1>

          <div className="grid grid-cols-[auto_1fr] gap-x-[22px] gap-y-4 text-lg leading-relaxed">
            <InfoField label="Réalisation" value={info.director} />
            <InfoField label="Casting" value={info.cast} />
            <InfoField label="Scénario" value={info.screenplay} />
            <InfoField label="Sortie" value={info.release} />
          </div>

          {badges.filter(Boolean).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.filter(Boolean).map((badge) => (
                <Tag key={badge} variant="outline">
                  {badge}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Synopsis */}
      {paragraphs.length > 0 && (
        <section className="px-5 sm:px-8 wide:px-0 py-[77px] border-b border-ink/10">
          <SectionTitle title="Synopsis" className="mb-8" />
          <div className="flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[18px] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Bande-annonce hébergée par Utopia, sinon repli YouTube */}
      {details.trailer && (
        <section className="px-5 sm:px-8 wide:px-0 py-[77px] border-b border-ink/10">
          <SectionTitle title="Bande-annonce" className="mb-8" />
          <div className="relative w-full h-0 pb-[56.25%]">
            {isYouTubeUrl(details.trailer) ? (
              <iframe
                src={details.trailer}
                title={`Bande-annonce de ${details.title}`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                poster={details.image || undefined}
                src={details.trailer}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        </section>
      )}

      {/* Séances : la prochaine mise en avant, les suivantes une ligne par jour */}
      {days.length > 0 && (
        <section className="px-5 sm:px-8 wide:px-0 py-[77px]">
          <SectionTitle
            title="Séances"
            aside={
              <Tag variant="ink" className="py-[8px] text-[13px]">
                {details.showtimes.length} séances · {days.length} jours
              </Tag>
            }
            className="mb-8"
          />

          {/* Même traitement que le film à l'affiche du programme du jour */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 bg-ink text-cream">
            <span className="font-archivo text-[26px] tracking-[-0.01em]">{next.day}</span>
            <span className="flex flex-wrap gap-2">
              {next.times.map((time, idx) => (
                <Tag key={`${time}-${idx}`} className="py-1.5 text-note">
                  {time}
                </Tag>
              ))}
            </span>
          </div>

          {rest.length > 0 && (
            <div className="flex flex-col mt-6">
              {rest.map((day, i) => (
                <div
                  key={day.day}
                  className={`flex items-center justify-between gap-6 py-3.5 ${
                    i === rest.length - 1 ? "" : "border-b border-ink/[0.14]"
                  }`}
                >
                  <span className="text-note font-medium">{day.day}</span>
                  <span className="flex flex-wrap justify-end gap-2">
                    {day.times.map((time, idx) => (
                      <Tag key={`${time}-${idx}`} className="py-1.5 text-note">
                        {time}
                      </Tag>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </article>
  );
}
