# Supplier outreach template — DRAFT, NOT SENT

**Status: not sent to anyone. D-015 — no supplier, roaster or business may be contacted without
Ihor's explicit approval.** This file exists because most Polish roasters do not publish MOQ or
private-label pricing, so the missing evidence can only be closed by asking. Ihor sends it, or
approves Claude Code to prepare individual variants; nothing goes out automatically.

## Why an enquiry is needed at all

The Gate 0 model has holes that no amount of desk research closes, because the numbers are
genuinely not public: contract-roasting price per kg at low volume, real MOQ for a brand with no
history, whether the roaster will pack into our packaging, and lead time. Those four inputs move
the GO/NO-GO conclusion more than anything else in the model.

## What to ask — the four questions that matter

Keep the enquiry short. A long email from an unknown startup gets ignored; four specific questions
get an answer, and the specificity signals that the sender knows what they are doing.

1. **MOQ** — the minimum single order, in kg, for roasting under our own brand.
2. **Price per kg** at that minimum, and at the next volume step.
3. **Packaging** — do you pack into packaging we supply, do you supply it, and can you apply our
   labels? Is there a setup or plate cost?
4. **Lead time** from order to dispatch, and whether you roast to order.

Two more worth adding once a roaster replies positively, but not in the first email: whether they
will supply a sample set, and whether they will work with a business that starts at the very
bottom of their volume range.

## Draft — Polish

> **Temat:** Zapytanie o palenie kawy pod marką własną — małe wolumeny
>
> Dzień dobry,
>
> nazywam się [imię i nazwisko], przygotowuję uruchomienie małej marki kawy speciality
> (Homie Coffee, [miasto]). Jesteśmy na etapie wyboru partnera do palenia, dlatego chciałbym
> zapytać o cztery rzeczy:
>
> 1. Jakie jest minimum zamówienia (MOQ) przy paleniu pod marką własną?
> 2. Jaka jest cena za kilogram przy tym minimum i przy kolejnym progu ilościowym?
> 3. Czy pakują Państwo w opakowania dostarczone przez klienta, czy zapewniają własne?
>    Czy jest możliwość naklejenia naszych etykiet i czy wiąże się to z kosztem przygotowania?
> 4. Jaki jest czas realizacji od zamówienia do wysyłki?
>
> Startujemy od bardzo małych ilości i będziemy z Państwem szczerzy co do skali — zależy nam na
> partnerze, który pracuje z małymi markami, a nie na jednorazowej transakcji.
>
> Z góry dziękuję za odpowiedź,
> [imię i nazwisko]
> [firma, NIP]
> [telefon] · [e-mail]

## Draft — English (for roasters that operate in English)

> **Subject:** Private-label roasting enquiry — small volumes
>
> Hello,
>
> I'm [name], preparing the launch of a small speciality coffee brand (Homie Coffee, [city]).
> We're choosing a roasting partner and I'd like to ask four things:
>
> 1. What is your minimum order quantity for roasting under our own brand?
> 2. What is the price per kg at that minimum, and at the next volume tier?
> 3. Do you pack into customer-supplied packaging, or do you supply it? Can you apply our labels,
>    and is there a setup cost?
> 4. What is the lead time from order to dispatch?
>
> We're starting at genuinely small volumes and would rather be straightforward about that — we're
> looking for a partner who works with small brands, not a one-off transaction.
>
> Thank you,
> [name] · [company, NIP] · [phone] · [email]

## Handling the replies

Record every answer straight into `params.json` with `src` pointing at the reply date and the
company, e.g. `"src": "outreach:RoasterName:2026-08-27"`, and log it in `sources.md` as a private
communication rather than a public source. A quoted price is a **fact about that supplier**, not a
market rate — three quotes are needed before anything is treated as a market rate.

## What not to do

- Do not send this to twenty roasters at once. Five carefully chosen ones produce better answers
  and do not burn the brand's name in a small industry.
- Do not ask for a quote on a volume we cannot actually buy.
- Do not imply funding or volume that does not exist. The Polish speciality scene is small and
  people talk to each other.
- Do not send anything from an address that is not a real, monitored inbox.
