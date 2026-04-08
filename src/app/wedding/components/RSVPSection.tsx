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

      if (!response.ok) throw new Error('Submission failed');
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
      {/* Ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 60% 0%, rgba(212,160,160,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {submitted ? (
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Reply received</span>
            <h2 className="mt-5 font-display text-5xl leading-[0.92] text-ivory-deep md:text-6xl">
              Thank you, {form.fullName.split(' ')[0]}.
            </h2>
            <div className="editorial-card mt-10 p-10 md:p-14">
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#4A4040] md:text-xl">
                {form.attending === 'yes'
                  ? 'We are so glad you will be with us. We have your reply and will confirm any accommodation details once RSVPs close.'
                  : 'Thank you for letting us know. We will miss you on the day, and we are grateful to have shared this invitation with you.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
            {/* Left info */}
            <div className="reveal">
              <span className="section-kicker">Reply</span>
              <h2 className="mt-5 font-display text-5xl leading-[0.92] text-ivory-deep md:text-6xl lg:text-7xl">
                Please reply
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
                By <span className="text-ivory-deep">14 August 2026</span>. Your invitation is
                already prepared with the seats reserved for you.
              </p>

              <div className="glass-card mt-8 p-6 md:p-7">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-bloom">
                  Prepared for
                </p>
                <h3 className="mt-3 font-display text-3xl text-ivory-deep">
                  {guest?.name || 'Our guest'}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-light">{seatSummary}</p>
                <p
                  className="mt-5 border-t pt-4 text-[0.74rem] uppercase tracking-[0.18em] text-muted-light"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  RSVP by 14 August 2026
                </p>
              </div>
            </div>

            {/* Right form */}
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

                {/* Name + email */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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

                {/* Phone + seats */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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

                {/* Attendance toggle */}
                <div>
                  <label className="mb-3 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
                    Attendance
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, attending: 'yes' }))}
                      className="rounded-sm px-6 py-4 text-sm tracking-[0.03em] transition-all duration-300"
                      style={{
                        background:
                          form.attending === 'yes'
                            ? 'linear-gradient(135deg, rgba(212,160,160,0.9), rgba(180,120,128,0.95))'
                            : 'rgba(212,160,160,0.06)',
                        color: form.attending === 'yes' ? '#FBF8F3' : '#4D443D',
                        border:
                          form.attending === 'yes'
                            ? '1px solid rgba(212,160,160,0.4)'
                            : '1px solid rgba(212,160,160,0.15)',
                        boxShadow:
                          form.attending === 'yes' ? '0 8px 24px rgba(212,160,160,0.25)' : 'none',
                      }}
                    >
                      Joyfully attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, attending: 'no' }))}
                      className="rounded-sm px-6 py-4 text-sm tracking-[0.03em] transition-all duration-300"
                      style={{
                        background:
                          form.attending === 'no' ? 'rgba(90,71,75,0.85)' : 'rgba(90,71,75,0.06)',
                        color: form.attending === 'no' ? '#FBF8F3' : '#5A474B',
                        border:
                          form.attending === 'no'
                            ? '1px solid rgba(90,71,75,0.5)'
                            : '1px solid rgba(90,71,75,0.12)',
                      }}
                    >
                      Unable to attend
                    </button>
                  </div>
                </div>

                {/* Extra guest names */}
                {form.attending === 'yes' && guest && guest.maxGuests > 1 && (
                  <div>
                    <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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

                {/* Dietary + accommodation */}
                {form.attending === 'yes' && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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
                        <label className="mb-3 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
                          Accommodation
                        </label>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {['yes', 'no'].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() =>
                                setForm((p) => ({
                                  ...p,
                                  needsAccommodation: val as 'yes' | 'no',
                                }))
                              }
                              className="rounded-sm px-4 py-4 text-sm tracking-[0.03em] transition-all duration-300"
                              style={{
                                background:
                                  form.needsAccommodation === val
                                    ? val === 'yes'
                                      ? 'linear-gradient(135deg, rgba(168,197,176,0.85), rgba(120,160,140,0.9))'
                                      : 'rgba(90,71,75,0.8)'
                                    : 'rgba(23,20,23,0.06)',
                                color: form.needsAccommodation === val ? '#FBF8F3' : '#4D443D',
                                border:
                                  form.needsAccommodation === val
                                    ? val === 'yes'
                                      ? '1px solid rgba(168,197,176,0.4)'
                                      : '1px solid rgba(90,71,75,0.4)'
                                    : '1px solid rgba(23,20,23,0.12)',
                                boxShadow:
                                  form.needsAccommodation === val
                                    ? val === 'yes'
                                      ? '0 6px 18px rgba(168,197,176,0.2)'
                                      : 'none'
                                    : 'none',
                              }}
                            >
                              {val === 'yes' ? 'Yes please' : 'No thanks'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {form.needsAccommodation === 'yes' && (
                        <div>
                          <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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

                {/* Message */}
                <div>
                  <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
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
                      background: 'rgba(212,160,160,0.1)',
                      border: '1px solid rgba(212,160,160,0.22)',
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
                    className="btn-glow inline-flex items-center justify-center rounded-sm px-8 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(212,160,160,0.9) 0%, rgba(180,120,128,0.95) 100%)',
                      boxShadow: '0 10px 28px rgba(212,160,160,0.28)',
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
