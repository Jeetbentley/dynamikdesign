'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { z } from 'zod'
import FadeIn from '@/components/FadeIn'
import { site } from '@/config/site'
import { CONTACT_SERVICES } from '@/data/approach'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import CopyButton from '@/components/CopyButton'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please choose an option'),
  description: z.string().min(10, 'Tell us a bit more about your project'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const requested = useSearchParams().get('service') ?? ''
  const preselected = CONTACT_SERVICES.some((o) => o.value === requested) ? requested : ''
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { service: preselected } })

  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => setFiles((f) => [...f, ...accepted]),
    accept: {
      'application/octet-stream': ['.stl', '.step', '.stp', '.obj', '.3mf', '.iges'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 50 * 1024 * 1024,
  })

  const onSubmit = async (data: FormData) => {
    // Demo submit — wire to backend / email service later.
    await new Promise((r) => setTimeout(r, 600))
    console.log({ data, files })
    setSubmitted(true)
    reset()
    setFiles([])
  }

  return (
    <>
      <section className="bg-white">
        <div className="container-x py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <FadeIn>
              <h2 className="heading-h2">Tell us about your project</h2>
              <p className="mt-4 text-text-body">
                Drop your file or just describe what you need. Quote within 24
                hours.
              </p>

              {submitted ? (
                <div className="mt-10 border border-red bg-red/5 p-8 rounded-md">
                  <div className="text-red font-semibold text-[15px] tracking-[0.1em] uppercase mb-2">
                    Sent
                  </div>
                  <p className="text-text-primary text-[18px]">
                    Thanks — we’ll get back to you within one working day. For
                    anything urgent, ping us on WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className="form-input"
                    />
                    {errors.name && (
                      <p className="text-red text-[13px] mt-2">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      {...register('email')}
                      placeholder="you@company.com"
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="text-red text-[13px] mt-2">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Phone <span className="text-text-muted normal-case tracking-normal">(optional)</span></label>
                    <input
                      {...register('phone')}
                      placeholder="+91 00000 00000"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">How can we help?</label>
                    <select {...register('service')} className="form-input bg-transparent">
                      <option value="" disabled>
                        Select an engagement
                      </option>
                      {CONTACT_SERVICES.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red text-[13px] mt-2">{errors.service.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Project description</label>
                    <textarea
                      {...register('description')}
                      placeholder="Tell us what you're building, quantity, timeline, materials of interest…"
                      rows={5}
                      className="form-input resize-none"
                    />
                    {errors.description && (
                      <p className="text-red text-[13px] mt-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Files</label>
                    <div
                      {...getRootProps()}
                      className={`mt-3 border border-dashed border-border rounded-md p-8 text-center cursor-pointer transition-colors ${
                        isDragActive ? 'border-red bg-red/5' : 'hover:border-text-muted'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <p className="text-text-body text-[15px]">
                        {isDragActive
                          ? 'Drop your file here'
                          : 'Drag a file here, or click to choose'}
                      </p>
                      <p className="text-text-muted text-[13px] mt-2">
                        STL · STEP · OBJ · 3MF · PDF · up to 50MB
                      </p>
                    </div>
                    {files.length > 0 && (
                      <ul className="mt-3 text-[13px] text-text-body space-y-1">
                        {files.map((f) => (
                          <li key={f.name}>· {f.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-red disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>

            {/* Right contact info */}
            <FadeIn delay={0.1}>
              <div className="lg:pl-8">
                <h2 className="heading-h2">Or reach us directly</h2>

                <div className="mt-10 space-y-8">
                  <div>
                    <div className="form-label mb-3">WhatsApp</div>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-text-primary text-[18px] hover:text-red transition-colors"
                    >
                      <WhatsAppIcon size={36} />
                      {site.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <div className="form-label mb-3">Email</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${site.email}`}
                        className="text-text-primary text-[18px] hover:text-red transition-colors"
                      >
                        {site.email}
                      </a>
                      <CopyButton text={site.email} label="Copy email address" />
                    </div>
                  </div>

                  <div>
                    <div className="form-label mb-3">Instagram</div>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary text-[18px] hover:text-red transition-colors"
                    >
                      {site.social.instagramHandle}
                    </a>
                  </div>

                  <div>
                    <div className="form-label mb-3">Studio</div>
                    <p className="text-text-primary text-[18px] leading-[1.6]">
                      {site.address.slice(1).map((line, i) => (
                        <span key={line}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div>
                    <div className="form-label mb-3">Hours</div>
                    <p className="text-text-primary text-[18px] leading-[1.6]">
                      {site.hours.map((line, i) => (
                        <span key={line}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Simple map placeholder */}
                <div className="mt-12 relative aspect-[4/3] bg-bg-light overflow-hidden">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <rect width="400" height="300" fill="#F5F5F5" />
                    <g
                      fill="none"
                      stroke="#E8E8E8"
                      strokeWidth="1"
                    >
                      {Array.from({ length: 20 }).map((_, i) => (
                        <line
                          key={`h${i}`}
                          x1="0"
                          y1={i * 15}
                          x2="400"
                          y2={i * 15}
                        />
                      ))}
                      {Array.from({ length: 26 }).map((_, i) => (
                        <line
                          key={`v${i}`}
                          x1={i * 15}
                          y1="0"
                          x2={i * 15}
                          y2="300"
                        />
                      ))}
                    </g>
                    {/* Stylized India outline */}
                    <path
                      d="M180 50 L240 60 L260 100 L280 130 L260 180 L230 230 L210 260 L190 240 L170 220 L150 180 L140 140 L150 100 L170 70 Z"
                      fill="#FFFFFF"
                      stroke="#1A1A1A"
                      strokeWidth="1.5"
                    />
                    {/* Pune pin */}
                    <circle cx="195" cy="170" r="6" fill="#E63328" />
                    <circle cx="195" cy="170" r="14" fill="#E63328" fillOpacity="0.2" />
                    <text
                      x="210"
                      y="174"
                      fontFamily="system-ui"
                      fontSize="12"
                      fontWeight="600"
                      fill="#1A1A1A"
                    >
                      Pune
                    </text>
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
