import { useRef, useState } from "react";
import profile from "../data/profile";
import { cn, emailLink, newTabProps } from "../lib/utils";
import { Button, cardClass, Icon, IconTile, Reveal, SectionHeader } from "./ui";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", required: true, placeholder: "Your name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", required: true, placeholder: "name@example.com" },
  { name: "subject", label: "Subject", type: "text", full: true, placeholder: "Internship, project or collaboration" },
  { name: "message", label: "Message", textarea: true, full: true, required: true, placeholder: "Tell me a little about the opportunity" },
];

const inputClass =
  "w-full rounded-card border border-gray-300/10 bg-blue-950/35 px-4 py-3.5 text-base font-medium placeholder:text-faint focus:border-blue-400 focus:outline-none md:px-[18px] md:py-4 aria-[invalid=true]:border-danger/70";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const formRef = useRef(null);

  const validate = () => {
    const next = {};
    for (const f of FIELDS) {
      const v = values[f.name].trim();
      if (f.required && !v) next[f.name] = "Please fill in this field.";
      else if (f.name === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = "Enter an email address like name@example.com.";
    }
    setErrors(next);
    const first = FIELDS.find((f) => next[f.name]);
    if (first) formRef.current?.elements[first.name]?.focus();
    return !first;
  };

  const compose = () => {
    const v = Object.fromEntries(Object.entries(values).map(([k, x]) => [k, x.trim()]));
    const subject = v.subject || "Hello from your portfolio";
    const body = `${v.message}\n\n${v.name}${v.email ? ` (${v.email})` : ""}`;
    return { subject, body };
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { subject, body } = compose();
    const url = emailLink(profile.email, { subject, body });
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      setStatus("Your email app should open with the message ready to send.");
    } else {
      window.open(url, "_blank", "noopener");
      setStatus("Gmail opened in a new tab with your message ready to send.");
    }
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const { subject, body } = compose();
    window.open(`https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
    setStatus("WhatsApp opened in a new tab with your message.");
  };

  const s = profile.socials;
  const items = [
    { href: emailLink(profile.email), icon: "i-mail", label: "Email", value: profile.email },
    { href: s.whatsapp.url, icon: "b-whatsapp", label: "WhatsApp", value: profile.whatsapp.label, external: true },
    { href: s.linkedin.url, icon: "b-linkedin", label: "LinkedIn", value: s.linkedin.handle, external: true },
    { href: s.github.url, icon: "b-github", label: "GitHub", value: s.github.handle, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 xl:pt-30">
      <SectionHeader id="contact-title" eyebrow="Contact" lines={["Have an Opportunity", "in Mind? Let's"]} accent="Talk" />

      <div className="mt-14 grid gap-6">
        <Reveal
          as="form"
          ref={formRef}
          noValidate
          onSubmit={sendEmail}
          className={cn(cardClass, "border-blue-400/20 bg-linear-165 from-blue-600/15 to-white/[0.035] to-60%")}
        >
          <h3 className="text-[26px] leading-tight font-semibold md:text-[30px]">Let's work together!</h3>
          <div className="mt-6 grid gap-x-4 gap-y-2 sm:grid-cols-2 md:mt-7">
            {FIELDS.map((f) => {
              const id = `f-${f.name}`;
              const Field = f.textarea ? "textarea" : "input";
              return (
                <div key={f.name} className={cn("flex flex-col gap-2", f.full && "sm:col-span-2")}>
                  <label htmlFor={id} className="text-sm font-semibold text-muted">{f.label}</label>
                  <Field
                    id={id}
                    name={f.name}
                    {...(f.textarea ? {} : { type: f.type, autoComplete: f.autoComplete })}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={values[f.name]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    aria-invalid={errors[f.name] ? "true" : "false"}
                    aria-describedby={`${id}-err`}
                    className={cn(inputClass, f.textarea && "min-h-[150px] resize-y")}
                  />
                  <span id={`${id}-err`} aria-live="polite" className="min-h-[18px] text-[13px] text-danger">{errors[f.name]}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button as="button" type="submit">Send by email <Icon id="i-send" /></Button>
            <Button as="button" type="button" variant="ghost" onClick={sendWhatsApp}><Icon id="b-whatsapp" />Send on WhatsApp</Button>
          </div>
          <p className="mt-3.5 text-sm text-faint">Both buttons open a ready-to-send message: Gmail on a computer, your email app on a phone, or WhatsApp.</p>
          <p role="status" aria-live="polite" className="mt-1.5 text-sm text-blue-400 empty:hidden">{status}</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal
              as="a"
              key={it.label}
              href={it.href}
              {...newTabProps(it.href)}
              className={cn(cardClass, "flex items-center gap-4 px-5 py-5 hover:border-blue-400 md:px-6 md:py-[22px]")}
            >
              <IconTile icon={it.icon} tone={i % 2 === 1 ? "gold" : "blue"} />
              <span className="min-w-0">
                <small className="block text-sm text-muted">{it.label}</small>
                <strong className="block font-semibold break-words">{it.value}</strong>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
