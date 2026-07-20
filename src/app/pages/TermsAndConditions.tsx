import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms & Conditions | SKML Mobiles</title>
        <meta name="description" content="Read the Terms & Conditions for using SKML Mobiles website. Learn about our policies on orders, payments, shipping, returns, and more." />
        <meta name="keywords" content="SKML Mobiles terms, terms and conditions, return policy, shipping policy, privacy policy Yellamanchili" />
        <link rel="canonical" href="https://skmlmobiles.com/terms" />
        <meta property="og:title" content="Terms & Conditions | SKML Mobiles" />
        <meta property="og:description" content="Read the Terms & Conditions for using SKML Mobiles website." />
        <meta property="og:url" content="https://skmlmobiles.com/terms" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-[900px] mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="font-poppins font-bold text-3xl text-foreground mb-2">Terms & Conditions</h1>
        <p className="text-muted-foreground text-sm mb-8">Effective Date: 18 July 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to SKML Mobiles, Yellamanchili. By accessing or using our website, you agree to the following Terms & Conditions.
          </p>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">1. General</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SKML Mobiles provides information and sells mobile phones, accessories, and related products through this website. By using our website, you agree to comply with these terms.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">2. Product Information</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We strive to provide accurate product descriptions, specifications, prices, and images. However, errors may occur. We reserve the right to correct any errors and update product information without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">3. Pricing</h2>
            <ul className="list-disc list-inside text-muted-foreground text-sm leading-relaxed space-y-1">
              <li>All prices are displayed in Indian Rupees (INR).</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>Orders will be confirmed only after successful payment verification.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">4. Orders</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We reserve the right to accept or cancel any order due to product availability, pricing errors, suspected fraud, or any other valid reason.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">5. Payments</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We accept secure payment methods such as UPI, Debit/Credit Cards, Net Banking, and Cash (where applicable).
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">6. Shipping & Delivery</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Delivery timelines may vary depending on the customer's location and courier services. Delays caused by courier companies or unforeseen circumstances are beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">7. Returns & Warranty</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Returns, replacements, and warranty claims are subject to our Return Policy and the manufacturer's warranty terms. Physical damage or misuse is not covered under warranty.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">8. User Responsibilities</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Users must provide accurate information while placing orders and must not misuse the website for unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">9. Intellectual Property</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All website content, including logos, images, text, and graphics, is the property of SKML Mobiles and may not be copied or reused without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">10. Limitation of Liability</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SKML Mobiles shall not be responsible for any indirect or consequential damages arising from the use of this website or purchased products, except where required by law.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">11. Privacy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your personal information is handled according to our Privacy Policy and will not be shared except as required for order processing or by law.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">12. Changes to Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We reserve the right to update or modify these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">13. Contact Us</h2>
            <div className="text-muted-foreground text-sm leading-relaxed">
              <p className="font-semibold text-foreground">SKML Mobiles</p>
              <p>Yellamanchili, Andhra Pradesh, India</p>
              <p className="mt-2">For any queries regarding these Terms & Conditions, please contact us through the phone number or email provided on our website.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
