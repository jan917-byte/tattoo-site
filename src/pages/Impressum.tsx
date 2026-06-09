import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Impressum() {
  return (
    <PageTransition>
      <section className="pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Impressum
        </motion.h1>
        <p className="font-display text-[#0D0D0D]/40 text-sm mb-16">
          Letzte Aktualisierung: Juni 2026 / Last updated: June 2026
        </p>

        {/* ===================== DEUTSCH ===================== */}
        <div className="font-display text-[#0D0D0D]/70 leading-relaxed space-y-12">

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
            </h2>
            {/* Replace bracketed placeholders with the real legal details before going live */}
            <address className="not-italic leading-relaxed">
              [Vollständiger Name des Inhabers / der Inhaberin]<br />
              Baby Berlin Tattoo Studio<br />
              Wipperstr. 14<br />
              12055 Berlin<br />
              Deutschland
            </address>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Kontakt</h2>
            <p className="leading-relaxed">
              Telefon: [Telefonnummer]<br />
              E-Mail: [studio@example.com]
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Umsatzsteuer</h2>
            <p className="leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [USt-IdNr.]
            </p>
            <p className="leading-relaxed mt-2 text-[#0D0D0D]/40 text-sm">
              [Falls Kleinunternehmer nach § 19 UStG: diesen Block durch folgenden Satz ersetzen:
              "Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet."]
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Redaktionell verantwortlich (§ 18 Abs. 2 MStV)
            </h2>
            <address className="not-italic leading-relaxed">
              [Vollständiger Name des Inhabers / der Inhaberin]<br />
              Wipperstr. 14, 12055 Berlin, Deutschland
            </address>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Verbraucherstreitbeilegung
            </h2>
            <p className="leading-relaxed">
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 Verbraucherstreitbeilegungsgesetz, VSBG).
            </p>
            <p className="leading-relaxed mt-2 text-[#0D0D0D]/40 text-sm">
              Hinweis: Die OS-Plattform der EU wurde zum 20. Juli 2025 eingestellt. Ein Link auf
              ec.europa.eu/consumers/odr ist daher nicht mehr erforderlich.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Haftung für Inhalte</h2>
            <p className="leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
              Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
              wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Haftung für Links</h2>
            <p className="leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
              Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
              verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
              entfernen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Urheberrecht</h2>
            <p className="leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
              nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
              dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
              wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Inhalte umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Schriften und Bildnachweise</h2>
            <p className="leading-relaxed">
              Schrift "Absans", gestaltet von Collletttivo (collletttivo.it), verwendet unter der
              jeweiligen Open-Font-Lizenz. Sämtliche Tattoo-, Kunst- und Studiofotografien sind, sofern
              nicht anders angegeben, Eigentum des Seitenbetreibers.
            </p>
          </div>
        </div>

        <hr className="border-[#0D0D0D]/10 my-16" />

        {/* ===================== ENGLISH ===================== */}
        <h2 className="font-display text-3xl md:text-4xl font-light text-[#0D0D0D] leading-tight mb-2">
          Legal Notice
        </h2>
        <p className="font-display text-[#0D0D0D]/40 text-sm mb-12">
          English translation. The German version above is legally binding.
        </p>

        <div className="font-display text-[#0D0D0D]/70 leading-relaxed space-y-12">
          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Information pursuant to § 5 DDG (German Digital Services Act)
            </h3>
            <address className="not-italic leading-relaxed">
              [Full name of the owner]<br />
              Baby Berlin Tattoo Studio<br />
              Wipperstr. 14<br />
              12055 Berlin<br />
              Germany
            </address>
          </div>

          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Contact</h3>
            <p className="leading-relaxed">
              Phone: [phone number]<br />
              Email: [studio@example.com]
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">VAT</h3>
            <p className="leading-relaxed">
              VAT identification number pursuant to § 27a German VAT Act: [VAT ID]
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Responsible for content (§ 18 (2) MStV)
            </h3>
            <address className="not-italic leading-relaxed">
              [Full name of the owner]<br />
              Wipperstr. 14, 12055 Berlin, Germany
            </address>
          </div>

          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">
              Consumer dispute resolution
            </h3>
            <p className="leading-relaxed">
              We are neither willing nor obliged to participate in dispute resolution proceedings
              before a consumer arbitration board (§ 36 VSBG). Note: the EU online dispute resolution
              platform was discontinued on 20 July 2025, so a link to it is no longer required.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-light text-[#0D0D0D] mb-4">Liability and copyright</h3>
            <p className="leading-relaxed">
              As a service provider we are responsible for our own content on these pages in
              accordance with § 7 (1) DDG and general law. Pursuant to §§ 8 to 10 DDG we are not
              obliged to monitor transmitted or stored third-party information. External links point
              to content for which the respective provider is responsible. All content and works
              created by the site operator are subject to German copyright law and may not be
              reproduced or used outside the limits of copyright without written consent. Where
              content was not created by the operator, the copyrights of third parties are respected.
              Please notify us of any infringement and we will remove the content without delay.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
