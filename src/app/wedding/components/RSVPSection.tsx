'use client';

import React, { useMemo, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { createGuestOptions } from '@/lib/auth';
import { useReveal } from '@/hooks/useReveal';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no' | '';
  guestCount: string;
  guestNames: string;
  dietary: string;
  needsAccommodation: 'yes' | 'no' | '';
  accommodationType: string;
  message: string;
}

const accommodationOptions = [
  { value: 'unit-a', label: 'Unit Type A' },
  { value: 'unit-b', label: 'Unit Type B' },
  { value: 'guest-house', label: 'Guest House' },
  { value: 'nyala-lodge', label: 'Nyala Lodge' },
];

export default function RSVPSection() {
  const { guest } = useAuth();
  const sectionRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState<FormData>({
    fullName: guest?.name || '',
    email: '',
    phone: '',
    attending: '',
    guestCount: String(guest?.maxGuests ? Math.min(guest.maxGuests, 1) : 1),
    guestNames: '',
    dietary: '',
    needsAccommodation: '',
    accommodationType: '',
    message: '',
  });

  React.useEffect(() => {
    if (!guest) return;

    setForm((previous) => ({
      ...previous,
      fullName: guest.name,
      guestCount: String(Math.min(Number(previous.guestCount) || 1, guest.maxGuests)),
    }));
  }, [guest]);

  const guestOptions = useMemo(() => createGuestOptions(guest?.maxGuests || 1), [guest?.maxGuests]);
  const seatSummary =
    guest?.maxGuests && guest.maxGuests > 1
      ? `${guest.maxGuests} seats are reserved on this invitation.`
      : 'One seat is reserved on this invitation.';

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      const formData = new URLSearchParams();
      const payload = {
        ...form,
        guestCount: form.attending === 'yes' ? form.guestCount : '0',
        guestCode: guest?.code || '',
      };

      formData.append('form-name', 'rsvp');
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your reply just now. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark-alt px-6 py-24 md:px-12"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {submitted ? (
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Reply received</span>
            <h2 className="mt-5 text-5xl font-display leading-[0.92] text-ivory-deep md:text-6xl">
              Thank you, {form.fullName.split(' ')[0]}.
            </h2>
            <div className="mt-10 editorial-card p-10 md:p-14">
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#5E554D] md:text-xl">
                {form.attending === 'yes'
                  ? 'We are so glad you will be with us. We have your reply and will confirm any accommodation details once RSVPs close.'
                  : 'Thank you for letting us know. We will miss you on the day, and we are grateful to have shared this invitation with you.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
            <div className="reveal">
              <span className="section-kicker">Reply</span>
              <h2 className="mt-5 text-5xl font-display leading-[0.92] text-ivory-deep md:text-6xl lg:text-7xl">
                Please reply
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
                By <span className="text-ivory-deep">14 August 2026</span>. Your invitation is
                already prepared with the seats reserved for you.
              </p>

              <div className="mt-8 glass-card p-6 md:p-7">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">
                  Prepared for
                </p>
                <h3 className="mt-3 text-3xl font-display text-ivory-deep">
                  {guest?.name || 'Our guest'}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-muted-light">{seatSummary}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-[0.74rem] uppercase tracking-[0.18em] text-muted-light">
                  RSVP by 14 August 2026
                </p>
              </div>
            </div>

            <div className="editorial-card reveal reveal-delay-2 overflow-hidden">
              <form
                name="rsvp"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-8 p-8 md:p-12"
              >
                <input type="hidden" name="form-name" value="rsvp" />
                <input type="hidden" name="guestCode" value={guest?.code || ''} />
                <p className="hidden">
                  <label>
                    Do not fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                      Guest name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="082 123 4567"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                      Invitation seats
                    </label>
                    {guest && guest.maxGuests > 1 ? (
                      <select
                        name="guestCount"
                        value={form.guestCount}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {guestOptions.map((count) => (
                          <option key={count} value={count}>
                            {count} {count === 1 ? 'Seat' : 'Seats'}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="form-input flex items-center">1 seat reserved for you</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                    Attendance
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setForm((previous) => ({ ...previous, attending: 'yes' }))}
                      className="rounded-sm px-6 py-4 text-sm tracking-[0.03em] transition-all"
                      style={{
                        background: form.attending === 'yes' ? '#171417' : 'rgba(23, 20, 23, 0.06)',
                        color: form.attending === 'yes' ? '#FBF8F3' : '#4D443D',
                        border: '1px solid rgba(23, 20, 23, 0.12)',
                      }}
                    >
                      Joyfully attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((previous) => ({ ...previous, attending: 'no' }))}
                      className="rounded-sm px-6 py-4 text-sm tracking-[0.03em] transition-all"
                      style={{
                        background: form.attending === 'no' ? '#5A474B' : 'rgba(90, 71, 75, 0.08)',
                        color: form.attending === 'no' ? '#FBF8F3' : '#5A474B',
                        border: '1px solid rgba(90, 71, 75, 0.12)',
                      }}
                    >
                      Unable to attend
                    </button>
                  </div>
                </div>

                {form.attending === 'yes' && guest && guest.maxGuests > 1 && (
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                      Additional guest names
                    </label>
                    <input
                      type="text"
                      name="guestNames"
                      value={form.guestNames}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="List additional guest names"
                    />
                  </div>
                )}

                {form.attending === 'yes' && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                        Dietary requirements
                      </label>
                      <textarea
                        name="dietary"
                        value={form.dietary}
                        onChange={handleChange}
                        className="form-input min-h-[132px]"
                        placeholder="Allergies, dietary requirements, or preferences"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="mb-3 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                          Accommodation
                        </label>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              setForm((previous) => ({ ...previous, needsAccommodation: 'yes' }))
                            }
                            className="rounded-sm px-4 py-4 text-sm tracking-[0.03em]"
                            style={{
                              background:
                                form.needsAccommodation === 'yes'
                                  ? '#171417'
                                  : 'rgba(23, 20, 23, 0.06)',
                              color: form.needsAccommodation === 'yes' ? '#FBF8F3' : '#4D443D',
                              border: '1px solid rgba(23, 20, 23, 0.12)',
                            }}
                          >
                            Yes please
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((previous) => ({ ...previous, needsAccommodation: 'no' }))
                            }
                            className="rounded-sm px-4 py-4 text-sm tracking-[0.03em]"
                            style={{
                              background:
                                form.needsAccommodation === 'no'
                                  ? '#5A474B'
                                  : 'rgba(90, 71, 75, 0.08)',
                              color: form.needsAccommodation === 'no' ? '#FBF8F3' : '#5A474B',
                              border: '1px solid rgba(90, 71, 75, 0.12)',
                            }}
                          >
                            No thanks
                          </button>
                        </div>
                      </div>

                      {form.needsAccommodation === 'yes' && (
                        <div>
                          <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                            Preferred stay
                          </label>
                          <select
                            name="accommodationType"
                            value={form.accommodationType}
                            onChange={handleChange}
                            className="form-input"
                          >
                            <option value="">Select an option</option>
                            {accommodationOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-[#D4A0A0]">
                    A note for us
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-input min-h-[132px]"
                    placeholder="Anything you would like us to know"
                  />
                </div>

                {submitError && (
                  <p
                    className="rounded-sm px-4 py-3 text-base text-[#5A474B]"
                    style={{
                      background: 'rgba(201, 123, 134, 0.12)',
                      border: '1px solid rgba(201, 123, 134, 0.2)',
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-base text-[#5E554D]">Your reply comes straight to us.</p>
                  <button
                    type="submit"
                    disabled={loading || !form.attending}
                    className="inline-flex items-center justify-center rounded-sm px-8 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(23, 20, 23, 0.96), rgba(201, 123, 134, 0.92))',
                    }}
                  >
                    {loading ? 'Sending reply' : 'Send RSVP'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
