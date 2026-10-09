type ContactResponse = {
  answer: string;
  provider: "local";
  model: "contact-router";
};

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("nl-NL")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "");

export const getDirectContactResponse = (
  message: string,
): ContactResponse | null => {
  const normalized = normalize(message);
  const asksForContact =
    /\b(contact opnemen|contacteer|bereiken|in contact komen|contact chiho|get in touch|contact you|contact chiho|reach chiho|reach you)\b/.test(
      normalized,
    );
  const asksForEmail = /\b(e-?mail|mailen)\b/.test(normalized);
  const asksForWhatsApp = /\bwhats\s?app(?:en)?\b/.test(normalized);

  if (!asksForContact && !asksForEmail && !asksForWhatsApp) {
    return null;
  }

  if (asksForEmail && !asksForWhatsApp && !asksForContact) {
    return {
      answer:
        "Neem rechtstreeks contact op via e-mail:\n[[contact_actions:email]]",
      provider: "local",
      model: "contact-router",
    };
  }

  if (asksForWhatsApp && !asksForEmail && !asksForContact) {
    return {
      answer:
        "Neem rechtstreeks contact op via WhatsApp:\n[[contact_actions:whatsapp]]",
      provider: "local",
      model: "contact-router",
    };
  }

  return {
    answer:
      "Neem contact op met Chiho via onderstaande opties:\n[[contact_actions:email,whatsapp]]",
    provider: "local",
    model: "contact-router",
  };
};
