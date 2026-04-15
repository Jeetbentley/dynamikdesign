'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden bg-bg-light aspect-[3/2] mb-5">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.category.map((c) => (
          <span key={c} className="tag">
            {c}
          </span>
        ))}
        <span className="tag">{project.industry}</span>
      </div>
      <h3 className="heading-h3 text-text-primary group-hover:text-red transition-colors">
        {project.title}
      </h3>
      <p className="text-[13px] text-text-muted mt-1">{project.client}</p>
    </Link>
  )
}
