import ServiceDetail from '@/components/ServiceDetail'
import { SERVICES } from '@/data/services'

const page = SERVICES.design

export const metadata = { title: page.metaTitle, description: page.metaDescription }

export default function Page() {
  return <ServiceDetail page={page} />
}
