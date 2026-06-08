import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SNehra Solutions" },
      { name: "description", content: "How SNEHRA SOLUTIONS LLP collects, uses, and protects your personal information." },
    ],
  }),
  component: Privacy,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-medium text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="eyebrow">Legal</div>
          <h1 className="mt-6 font-display text-display-lg text-ink">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This Privacy Policy describes how SNEHRA SOLUTIONS LLP and its affiliates
            (collectively "SNEHRA SOLUTIONS LLP, we, our, us") collect, use, share,
            protect or otherwise process your information / personal data through our
            website{" "}
            <a href="https://www.snehrasolutions.com" className="text-ink underline underline-offset-4 hover:text-gold transition-colors">
              www.snehrasolutions.com
            </a>{" "}
            (hereinafter referred to as Platform). Please note that you may be able to
            browse certain sections of the Platform without registering with us. We do
            not offer any product/service under this Platform outside India and your
            personal data will primarily be stored and processed in India. By visiting
            this Platform, providing your information or availing any product/service
            offered on the Platform, you expressly agree to be bound by the terms and
            conditions of this Privacy Policy, the Terms of Use and the applicable
            service/product terms and conditions, and agree to be governed by the laws
            of India including but not limited to the laws applicable to data protection
            and privacy. If you do not agree please do not use or access our Platform.
          </p>

          <Section title="Collection">
            <p>
              We collect your personal data when you use our Platform, services or
              otherwise interact with us during the course of our relationship and related
              information provided from time to time. Some of the information that we may
              collect includes but is not limited to personal data / information provided
              to us during sign-up/registering or using our Platform such as name, date
              of birth, address, telephone/mobile number, email ID and/or any such
              information shared as proof of identity or address.
            </p>
            <p>
              Some of the sensitive personal data may be collected with your consent,
              such as your bank account or credit or debit card or other payment
              instrument information or biometric information such as your facial features
              or physiological information (in order to enable use of certain features
              when opted for, available on the Platform) etc., all of the above being in
              accordance with applicable law(s). You always have the option to not provide
              information, by choosing not to use a particular service or feature on the
              Platform.
            </p>
            <p>
              We may track your behaviour, preferences, and other information that you
              choose to provide on our Platform. This information is compiled and analysed
              on an aggregated basis. We will also collect your information related to
              your transactions on Platform and such third-party business partner
              platforms. When such a third-party business partner collects your personal
              data directly from you, you will be governed by their privacy policies. We
              shall not be responsible for the third-party business partner's privacy
              practices or the content of their privacy policies, and we request you to
              read their privacy policies prior to disclosing any information.
            </p>
            <p>
              If you receive an email, a call from a person/association claiming to be
              SNEHRA SOLUTIONS LLP seeking any personal data like debit/credit card PIN,
              net-banking or mobile banking password, we request you to never provide
              such information. If you have already revealed such information, report it
              immediately to an appropriate law enforcement agency.
            </p>
          </Section>

          <Section title="Usage">
            <p>
              We use personal data to provide the services you request. To the extent we
              use your personal data to market to you, we will provide you the ability to
              opt-out of such uses. We use your personal data to assist sellers and
              business partners in handling and fulfilling orders; enhancing customer
              experience; to resolve disputes; troubleshoot problems; inform you about
              online and offline offers, products, services, and updates; customise your
              experience; detect and protect us against error, fraud and other criminal
              activity; enforce our terms and conditions; conduct marketing research,
              analysis and surveys; and as otherwise described to you at the time of
              collection of information. You understand that your access to these
              products/services may be affected in the event permission is not provided
              to us.
            </p>
          </Section>

          <Section title="Sharing">
            <p>
              We may share your personal data internally within our group entities, our
              other corporate entities, and affiliates to provide you access to the
              services and products offered by them. These entities and affiliates may
              market to you as a result of such sharing unless you explicitly opt-out.
            </p>
            <p>
              We may disclose personal data to third parties such as sellers, business
              partners, third party service providers including logistics partners,
              prepaid payment instrument issuers, third-party reward programs and other
              payment opted by you. These disclosures may be required for us to provide
              you access to our services and products offered to you, to comply with our
              legal obligations, to enforce our user agreement, to facilitate our
              marketing and advertising activities, to prevent, detect, mitigate, and
              investigate fraudulent or illegal activities related to our services.
            </p>
            <p>
              We may disclose personal and sensitive personal data to government agencies
              or other authorised law enforcement agencies if required to do so by law or
              in the good faith belief that such disclosure is reasonably necessary to
              respond to subpoenas, court orders, or other legal process.
            </p>
          </Section>

          <Section title="Security Precautions">
            <p>
              To protect your personal data from unauthorised access or disclosure, loss
              or misuse we adopt reasonable security practices and procedures. Once your
              information is in our possession or whenever you access your account
              information, we adhere to our security guidelines to protect it against
              unauthorised access and offer the use of a secure server.
            </p>
            <p>
              However, the transmission of information is not completely secure for
              reasons beyond our control. By using the Platform, the users accept the
              security implications of data transmission over the internet and the World
              Wide Web which cannot always be guaranteed as completely secure, and
              therefore, there would always remain certain inherent risks regarding use
              of the Platform. Users are responsible for ensuring the protection of login
              and password records for their account.
            </p>
          </Section>

          <Section title="Data Deletion and Retention">
            <p>
              You have an option to delete your account by visiting your profile and
              settings on our Platform; this action would result in you losing all
              information related to your account. You may also write to us at the
              contact information provided below to assist you with these requests. We
              may in event of any pending grievance, claims, pending shipments or any
              other services refuse or delay deletion of the account. Once the account
              is deleted, you will lose access to the account.
            </p>
            <p>
              We retain your personal data information for a period no longer than is
              required for the purpose for which it was collected or as required under
              any applicable law. However, we may retain data related to you if we
              believe it may be necessary to prevent fraud or future abuse or for other
              legitimate purposes. We may continue to retain your data in anonymised
              form for analytical and research purposes.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              You may access, rectify, and update your personal data directly through
              the functionalities provided on the Platform.
            </p>
          </Section>

          <Section title="Consent">
            <p>
              By visiting our Platform or by providing your information, you consent to
              the collection, use, storage, disclosure and otherwise processing of your
              information on the Platform in accordance with this Privacy Policy. If you
              disclose to us any personal data relating to other people, you represent
              that you have the authority to do so and permit us to use the information
              in accordance with this Privacy Policy.
            </p>
            <p>
              You, while providing your personal data over the Platform or any partner
              platforms or establishments, consent to us (including our other corporate
              entities, affiliates, lending partners, technology partners, marketing
              channels, business partners and other third parties) to contact you through
              SMS, instant messaging apps, call and/or e-mail for the purposes specified
              in this Privacy Policy.
            </p>
            <p>
              You have an option to withdraw your consent that you have already provided
              by writing to the Grievance Officer at the contact information provided
              below. Please mention "Withdrawal of consent for processing personal data"
              in your subject line of your communication. We may verify such requests
              before acting on our request. However, please note that your withdrawal of
              consent will not be retrospective and will be in accordance with the Terms
              of Use, this Privacy Policy, and applicable laws. In the event you withdraw
              consent given to us under this Privacy Policy, we reserve the right to
              restrict or deny the provision of our services for which we consider such
              information to be necessary.
            </p>
          </Section>

          <Section title="Changes to this Privacy Policy">
            <p>
              Please check our Privacy Policy periodically for changes. We may update
              this Privacy Policy to reflect changes to our information practices. We may
              alert / notify you about the significant changes to the Privacy Policy, in
              the manner as may be required under applicable laws.
            </p>
          </Section>

          <Section title="Grievance Officer">
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5 space-y-2">
              <p><strong className="text-ink">Company:</strong> SNEHRA SOLUTIONS LLP</p>
              <p><strong className="text-ink">Address:</strong> Deolawas, Buhana, Jhunjhunu, Rajasthan 333515</p>
              <p><strong className="text-ink">Phone hours:</strong> Monday – Friday, 9:00 – 18:00</p>
              <p>
                <strong className="text-ink">Contact:</strong>{" "}
                <a href="/contact" className="text-ink underline underline-offset-4 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </p>
            </div>
          </Section>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}