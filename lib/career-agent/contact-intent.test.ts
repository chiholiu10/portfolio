import { describe, expect, it } from "@jest/globals";
import { getDirectContactResponse } from "./contact-intent";

describe("getDirectContactResponse", () => {
  it("shows both options for a general Dutch contact question", () => {
    expect(
      getDirectContactResponse("Hoe kan je contact opnemen met jou?")?.answer,
    ).toContain("[[contact_actions:email,whatsapp]]");
  });

  it("shows only email for an email request", () => {
    expect(getDirectContactResponse("Kan ik Chiho mailen?")?.answer).toContain(
      "[[contact_actions:email]]",
    );
  });

  it("does not intercept an ordinary career question", () => {
    expect(
      getDirectContactResponse("Hoeveel ervaring heeft Chiho?"),
    ).toBeNull();
  });
});
