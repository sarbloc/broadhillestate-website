import Link from 'next/link';
import { H1, H2, H3 } from '../components/typography';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <H1 className="mb-4">Privacy &amp; GDPR Policy</H1>
      <p>
        Our website uses cookies. Your acceptance of these terms by using this website, you consent
        to the collection and use of your information as set out in this privacy and cookie policy.
        If we change our privacy and cookie policy in any way, these changes will be posted on this
        page.
      </p>

      <div className="flex flex-col mb-4 gap-2">
        <H2>About Cookies</H2>
        <p>
          A cookie is a file containing an identifier (a string of letters and numbers) that is sent
          by a web server to a web browser, and stored by the browser. The identifier is then sent
          back to the server each time the browser requests a page from the server.
        </p>
        <p>
          Cookies can be used by web servers to identify and track users as they navigate different
          pages on a website and to identify users returning to a website.
        </p>
        <p>
          Cookies may be either “persistent” cookies or “session” cookies. A persistent cookie
          consists of a text file sent by a web server to a web browser, which will be stored by the
          browser and will remain valid until its set expiry date (unless deleted by the user before
          the expiry date). A session cookie, on the other hand, will expire at the end of the user
          session, when the web browser is closed.
        </p>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <H2>Cookies on this website</H2>
        <p>We use both session cookies and persistent cookies on this website.</p>

        <h2>How we use cookies</h2>
        <p>
          Cookies do not contain any information that personally identifies you, but personal
          information that we store about you may be linked, by us, to the information stored in and
          obtained from cookies.
        </p>
        <p>
          We may use the information we obtain from your use of our cookies for the following
          purposes:
        </p>
        <ul>
          <li>to recognise your computer when you visit our website;</li>
          <li>
            to track you as you navigate our website, and to enable certain features, such as
            bookmarking content and logging in;
          </li>
          <li>to improve the website’s usability;</li>
          <li>to analyse the use of our website;</li>
          <li>in the administration of this website;</li>
          <li>to prevent fraud and improve the security of the website;</li>
          <li>
            to personalise our website for you, including targeting advertisements which may be of
            particular interest to you.
          </li>
        </ul>

        <h2>Third party cookies</h2>
        <p>When you use our website, you may also be sent third party cookies.</p>
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <H2>Managing cookies</H2>
        <p>
          The user has the option to allow, block or remove installed ‘cookies’ on your computer by
          setting your browser options installed on your computer. When cookies are disabled, some
          available services may no longer be operational.
        </p>

        <h2>Your Personal Data and GDPR</h2>
        <h3>What information we collect</h3>
        <p>
          As a business we collect, use, store and transfer different types of personal data
          depending on who you are.
        </p>
        <p>
          If you are renting or letting a property through Broadhill Estate, or renting/letting a
          property from one of our clients, we collect and use your personal data in order for us to
          provide you with our services. The personal data we collect and use may include:
        </p>
        <ul>
          <li>
            Identity Data (name, marital status, title, date of birth, gender, feedback and survey
            responses)
          </li>
          <li>
            Contact Data (billing address, delivery address, email address and telephone numbers)
          </li>
          <li>Financial Data (bank account and payment details)</li>
          <li>
            Transaction Data (details about payments to and from you and other services you have
            purchased through us)
          </li>
          <li>
            Technical Data (internet protocol address, login information, browser type and version,
            time zone setting, browser plug-in types and versions, operating system and platform,
            identification number, online identified, location data and other similar identifying
            information required for the customer’s device(s) to communicate with websites and
            applications on the internet)
          </li>
          <li>Marketing and Communications Data (your marketing preferences from us)</li>
        </ul>
        <p>
          It is important that the personal data we hold about you is accurate and current. Please
          keep us informed if your personal data changes during your relationship with us. You can
          ask us to rectify or update your personal information at any time by email to{' '}
          <a href="mailto:info@broadhillestate.com">info@broadhillestate.com</a> FAO of The Data
          Protection Officer or by writing to The Data Protection Officer, Broadhill Estate 11-12
          Old Bond Street London W1S 4PN.
        </p>

        <H3>How we use your personal data</H3>
        <p>
          We will only use your personal data for the purposes for which we have collected it. If we
          need to process your personal data for a different purpose that is not compatible with the
          original purpose that we collected your personal data, we will let you know.
        </p>

        <H3>Data security</H3>
        <p>
          Once we have received your personal data we will use reasonable and necessary procedures
          and security features to try and prevent unauthorised access. For example, we limit who
          can access your personal data to those individuals and third parties who need to know it
          and who are subject to a duty of confidentiality. If we become aware of a data breach we
          will notify the Information Commissioner’s Office. If we believe that the data breach is
          serious, we may notify you in accordance with our legal requirements.
        </p>

        <H3>Your legal rights</H3>
        <p>
          Under data protection laws you have the right to protect and look after your personal
          data. You have the right to:
        </p>
        <ul>
          <li>
            ask us for the personal data that we hold and process about you (this is commonly known
            as a data subject access request). You have rights to the following information:
            <ul>
              <li>the purpose(s) for which we are processing your information;</li>
              <li>the categories of personal information we hold about you;</li>
              <li>
                the recipients or categories of recipient to whom the personal data have been or
                will be disclosed;
              </li>
              <li>
                the period for which we will store your information, or the criteria used to
                determine that period;
              </li>
            </ul>
          </li>
          <li>
            prevent the use of your personal data for marketing purposes by:
            <ul>
              <li>informing a Broadhill Estate telephone operator; or</li>
              <li>by ticking the relevant boxes on the data collection forms; or</li>
              <li>
                by emailing{' '}
                <Link className="text-primary" href="mailto:info@broadhillestate.com">
                  info@broadhillestate.com
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          The rights listed above may apply in certain circumstances, and so we may not always be
          able to comply with your request to exercise these rights. We will usually respond to a
          request from you to exercise your rights within 1 month of receipt, but it might take
          longer if your request is particularly complex or if you have made a number of requests.
          Please be aware that we may need to process your personal data and/or request specific
          information from you to help us comply with your request. You will not usually have to pay
          a fee to exercise these rights, but we reserve the right to if your request is clearly
          unfounded, repetitive or excessive, alternatively we may refuse to comply with your
          request.
        </p>

        <H3>Complaints and Feedback</H3>
        <p>
          If you would like to speak to us about how we handle your personal data, please contact
          our Data Protection Officer in the first instance at{' '}
          <Link className="text-primary" href="mailto:info@broadhillestate.com">
            info@broadhillestate.com
          </Link>
          . You can also complain to the Information Commissioner’s Office who is the UK supervisory
          authority for data protection issues.
        </p>
        <p>The ICO’s telephone number is: 0303 123 1113</p>
      </div>
    </div>
  );
}
