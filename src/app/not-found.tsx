import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-x min-h-[60vh] flex items-center">
        <div>
          <span className="eyebrow text-red">404</span>
          <h1 className="heading-h1 mt-4">Page not found</h1>
          <p className="mt-4 text-text-body max-w-lg">
            The page you’re looking for has moved or doesn’t exist.
          </p>
          <Link href="/" className="btn-red mt-8 inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
