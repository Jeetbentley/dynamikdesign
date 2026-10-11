import LegalPage, { A, Email, H2, List, Phone } from '@/components/LegalPage'
import { legal, telHref } from '@/data/legal'
import { inr, tileLaunch } from '@/data/tile-launch'

export const metadata = {
  title: 'Terms & Conditions — Dynamik Design Lab',
  description: `Terms for buying from ${legal.businessName}: orders, payments, shipping, returns, warranty and grievance redressal.`,
}

const g = legal.grievanceOfficer

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <H2>Who we are</H2>
      <p>
        This website and the products sold on it are offered by {legal.businessName}, {legal.entity} (GSTIN {legal.gstin}),
        registered at {legal.registeredAddress}. You can reach us at <Email /> or <Phone />.
      </p>

      <H2>Accepting these terms</H2>
      <p>
        By using this website or placing an order, you agree to these terms. You must be 18 or older to place an order, or
        order with the consent of a parent or guardian.
      </p>

      <H2>Products and pricing</H2>
      <List>
        <li>All prices are in Indian Rupees (INR) and include GST.</li>
        <li>
          Founders pricing of {inr(tileLaunch.foundersPrice)} applies to the first {tileLaunch.foundersBatchSize} orders only.
          After that, the regular price of {inr(tileLaunch.regularPrice)} applies.
        </li>
        <li>
          Product images, renders and on-screen simulations are illustrative. The actual product may differ slightly in colour
          and appearance.
        </li>
      </List>

      <H2>Orders</H2>
      <p>
        An order is confirmed only after payment is received, or for cash on delivery, after we confirm the order with you. We
        may cancel an order if the product is out of stock, if a price was shown in error, or if we suspect fraud. If we
        cancel, you get a full refund of anything you paid.
      </p>

      <H2>Payments</H2>
      <p>
        Online payments are processed by Razorpay and accept cards, UPI, net banking and wallets. We never see or store your
        card details.
        {legal.codAvailable && (
          <> Cash on delivery is available on serviceable pin codes for a fee of {inr(legal.codFee)}.</>
        )}
      </p>

      <H2>Shipping, returns, cancellations and warranty</H2>
      <p>These are covered by their own policies, which form part of these terms:</p>
      <List>
        <li>
          <A href="/shipping-policy">Shipping &amp; Delivery</A>
        </li>
        <li>
          <A href="/refund-policy">Returns, Refunds &amp; Cancellation</A>
        </li>
        <li>
          <A href="/warranty">Warranty</A>
        </li>
      </List>

      <H2>Device software</H2>
      <p>
        Tile runs firmware installed by us. Firmware updates are provided by {legal.businessName}. Installing modified or
        third-party firmware voids the warranty and may make Tile stop working as intended.
      </p>
      <p>
        Smart-home features, such as Alexa, depend on third-party services that we don&apos;t control. If a third party
        changes or withdraws its service, those features may stop working.
      </p>

      <H2>Intellectual property</H2>
      <p>
        The content of this website, the design of our products and their firmware belong to {legal.businessName}. You may
        not copy, reproduce or redistribute them without our written permission.
      </p>

      <H2>Using this website</H2>
      <p>
        Please use this website lawfully. Don&apos;t attempt to disrupt it, gain unauthorised access to it, submit false
        information or orders, or use it to send spam or harmful content.
      </p>

      <H2>Limitation of liability</H2>
      <p>
        To the extent permitted by law, our total liability for any claim about a product is limited to the amount you paid
        for that product. Nothing in these terms limits your statutory rights as a consumer.
      </p>

      <H2>Force majeure</H2>
      <p>
        We are not responsible for delays or failures caused by events beyond our reasonable control, such as natural
        disasters, strikes, pandemics, government action, or courier and network outages.
      </p>

      <H2>Governing law</H2>
      <p>
        These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at{' '}
        {legal.jurisdiction}.
      </p>

      <H2 id="grievance">Grievance redressal</H2>
      <p>
        If you have a complaint, contact our Grievance Officer. We acknowledge complaints within {legal.grievanceAckHours} hours and resolve them
        within one month of receipt, in line with the Consumer Protection (E-Commerce) Rules, 2020.
      </p>
      <List>
        <li>
          {g.name}, {g.designation}
        </li>
        <li>
          Email: <Email email={g.email} />
        </li>
        <li>
          Phone: <A href={telHref(g.phone)}>{g.phone}</A>
        </li>
        <li>Hours: {legal.supportHours}</li>
      </List>

      <H2>Changes to these terms</H2>
      <p>
        We may update these terms from time to time. The version on this page, with its &ldquo;Last updated&rdquo; date,
        applies to orders placed from that date.
      </p>
    </LegalPage>
  )
}
