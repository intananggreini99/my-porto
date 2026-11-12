import profile from "../data/profile";
import { asset, emailLink } from "../lib/utils";
import { Button, Icon, Socials } from "./ui";

/*
 * Phones: photo and name/intro side by side, socials and CV button centred below.
 * Tablets: photo on the left, everything else stacked on the right.
 * Desktop: sticky sidebar card, everything stacked and centred.
 */
export default function ProfileCard() {
  const s = profile.socials;
  return (
    <aside
      aria-label="Profile"
      className="grid grid-cols-[clamp(104px,36%,180px)_minmax(0,1fr)] items-center gap-x-4 gap-y-5 rounded-card border border-blue-400/20 bg-linear-175 from-blue-600/20 via-white/[0.04] to-gold-400/[0.06] p-4 md:grid-cols-[minmax(200px,240px)_minmax(0,1fr)] md:gap-x-7 xl:sticky xl:top-[calc(var(--header-h)+16px)] xl:block xl:px-4 xl:pt-4 xl:pb-6 xl:text-center"
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-card bg-surface-strong shadow-[0_0_0_1px_rgb(106_165_255/0.25)] md:row-span-2">
        <img
          src={asset(profile.photo.src)}
          alt={profile.photo.alt}
          width={profile.photo.width}
          height={profile.photo.height}
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>

      <div className="text-left md:self-end md:pt-2 md:pr-2 xl:p-0 xl:text-center">
        <h2 className="text-[21px] leading-tight font-semibold xs:text-[23px] sm:text-[28px] md:text-[30px] xl:mt-5 xl:text-[27px] 2xl:text-[30px]">
          {profile.name}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted sm:mt-3 sm:text-[15px] md:max-w-[46ch] xl:mx-auto xl:max-w-[28ch]">
          {profile.intro}
        </p>
      </div>

      <div className="col-span-2 px-1 pb-2 text-center md:col-span-1 md:col-start-2 md:self-start md:pr-2 md:pb-2 md:pl-0 md:text-left xl:p-0 xl:text-center">
        <Socials
          items={[s.linkedin, s.github, s.instagram, s.whatsapp, { label: "Email", url: emailLink(profile.email), icon: "i-mail" }]}
          className="md:justify-start xl:mt-5 xl:justify-center"
        />
        <Button href={asset(profile.cv)} download className="mt-6 w-full xs:w-auto">
          Download CV <Icon id="i-download" />
        </Button>
        <p className="mt-4 text-[13px] text-faint">&copy; {new Date().getFullYear()} {profile.name}</p>
      </div>
    </aside>
  );
}
