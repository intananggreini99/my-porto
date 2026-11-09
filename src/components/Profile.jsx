import profile from "../data/profile";
import { asset, emailLink } from "../lib/utils";
import { Button, Icon, Socials } from "./ui";

/* Sticky sidebar card on desktop, a wide card on tablets, a centred card on phones. */
export default function ProfileCard() {
  const s = profile.socials;
  return (
    <aside
      aria-label="Profile"
      className="grid items-center gap-5 rounded-card border border-blue-400/20 bg-linear-175 from-blue-600/20 via-white/[0.04] to-gold-400/[0.06] p-4 text-center md:grid-cols-[minmax(200px,240px)_minmax(0,1fr)] md:gap-7 md:text-left xl:sticky xl:top-[calc(var(--header-h)+16px)] xl:block xl:px-4 xl:pt-4 xl:pb-6 xl:text-center"
    >
      <div className="mx-auto aspect-[4/5] w-full max-w-[250px] overflow-hidden rounded-card bg-surface-strong shadow-[0_0_0_1px_rgb(106_165_255/0.25)] md:max-w-none">
        <img
          src={asset(profile.photo.src)}
          alt={profile.photo.alt}
          width={profile.photo.width}
          height={profile.photo.height}
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      <div className="px-1 pb-2 md:py-2 md:pr-2 md:pl-0 xl:p-0">
        <h2 className="text-[26px] leading-tight font-semibold sm:text-[30px] xl:mt-5 xl:text-[27px] 2xl:text-[30px]">{profile.name}</h2>
        <p className="mx-auto mt-3 max-w-[30ch] text-[15px] leading-relaxed text-muted md:mx-0 md:max-w-[46ch] xl:mx-auto xl:max-w-[28ch]">
          {profile.intro}
        </p>
        <Socials
          items={[s.linkedin, s.github, s.instagram, s.whatsapp, { label: "Email", url: emailLink(profile.email), icon: "i-mail" }]}
          className="mt-5 md:justify-start xl:justify-center"
        />
        <Button href={asset(profile.cv)} download className="mt-6 w-full xs:w-auto">
          Download CV <Icon id="i-download" />
        </Button>
        <p className="mt-4 text-[13px] text-faint">&copy; {new Date().getFullYear()} {profile.name}</p>
      </div>
    </aside>
  );
}
