"use client"

import type React from "react"
import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

interface TermsAndConditionsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  firstName: string
  lastName: string
  brokerName?: string
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  firstName,
  lastName,
  brokerName = "AJ Rana",
}) => {
  // Add custom scrollbar styles
  const scrollbarStyles = `
  .custom-scrollbar {
    -ms-overflow-style: none;  /* Internet Explorer and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .custom-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
`
  const [hasReadTerms, setHasReadTerms] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const signatureRef = useRef<SignatureCanvas>(null)
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setIsSigned(false)
    }
  }

  const handleAccept = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty() && hasReadTerms) {
      onAccept()
    } else {
      if (!hasReadTerms) {
        alert("Please confirm that you have read and agree to the terms")
      } else {
        alert("Please sign the agreement before accepting")
      }
    }
  }

  const checkSignature = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setIsSigned(true)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-md p-4 overflow-hidden">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[98vh] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">INDEPENDENT CONTRACTOR AGREEMENT BETWEEN BROKER AND SALESPERSON</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            className="p-6 overflow-y-auto flex-grow custom-scrollbar"
            style={{ fontSize: "16px", lineHeight: "1.7", maxWidth: "900px", margin: "0 auto" }}
          >
            <p className="mb-6">
              This Independent Contractor Agreement ("Agreement"), dated {currentDate} is made by and between{" "}
              {brokerName} and Lemara Commercial, a California corporation, hereafter referred to collectively and
              individually as "Broker" and {firstName} {lastName} hereafter referred to as "Salesperson."
            </p>

            <p className="mb-6">
              In consideration of the covenants and representations contained in this Agreement, Broker and Salesperson
              agree as follows:
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">BROKER:</p>
            <p className="mb-6">
              Broker represents that {brokerName} is a duly licensed real estate broker by the State of California and
              is the broker of record for Lemara Commercial, and Broker further represents that Broker shall keep
              Broker's license and Lemara Commercial's corporate real estate license current during the term of this
              Agreement.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">SALESPERSON:</p>
            <p className="mb-6">
              Salesperson represents that he or she is duly licensed by the State of California as a real estate broker
              or salesperson. Salesperson shall keep his/her California CalDRE license current during the term of this
              Agreement, including satisfying all applicable continuing education and provisional license requirements.
            </p>

            <div className="my-6 border-t border-gray-200"></div>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              BROKER AND SALESPERSON RELATIONSHIP:
            </p>
            <p className="mb-4">
              Broker and Salesperson are independent contracting parties and this Agreement does not constitute an
              employment agreement by either party, nor shall it be construed as a partnership. Also, Broker shall not
              be liable for any obligation, injury, disability, or liability incurred by Salesperson.
            </p>

            <p className="mb-4">
              Salesperson assumes and agrees to perform no other professional real estate activities other than those
              pursuant to Salesperson's association with the Broker. Salesperson may solicit and obtain listings and
              sales of real estate and businesses for the parties' mutual benefit; however, Salesperson agrees to do so
              in accordance with the law as well as the ethical and professional standards set by the CalDRE.
              Salesperson agrees to refrain from committing any act of any type for which the Real Estate Commissioner
              of the State of California is authorized to suspend or to revoke a real estate license. Salesperson must,
              and agrees to, obtain written approval from Broker to perform any other business activities, other than
              the listing and sale of real estate and businesses, such as short sale negotiation, co-agency, processing
              loans, property management, loans modification, etc. , Salesperson is not authorized to give legal or tax
              advice. Further, Salesperson agrees to indemnify Broker against, and to accept liability for, any damages,
              costs, or fees, legal or other, sustained or expended by Broker, as a result of Salesperson breaching this
              paragraph.
            </p>

            <p className="mb-4">
              Broker shall not limit Salesperson's activities to geographical areas, or manner in which services are to
              be performed, except to the extent required by all applicable laws, policies, regulations, agreements, and
              procedures.
            </p>

            <p className="mb-4">
              All lawful actions, which are taken or performed pursuant to this Agreement, shall be taken and performed
              in the name of Lemara Commercial. Salesperson agrees and does hereby contribute all rights and title to
              any listings to Broker for the benefit and use of Broker, Salesperson, and any other Licensees of Broker.
              Salesperson must provide the Broker a completed file of each transaction with all necessary documentation.
            </p>

            <p className="mb-4">
              Salesperson shall have no authority to bind Broker by any promises or representations and Broker shall not
              be liable for any obligation or liability incurred by Salesperson unless the Broker specifically
              authorized the same in writing.
            </p>

            <p className="mb-4">
              The Broker may provide workers' compensation insurance for Broker's own benefit but this fact shall not
              create an inference of employment and Salesperson shall not be treated as an employee for state and
              federal tax purposes.
            </p>

            <p className="mb-6">
              Salesperson is considered to be an Independent Contractor for tax purposes and will receive an IRS Form
              1099-MISC at the end of each calendar year. The Broker will NOT withhold taxes or Social Security from
              Salesperson's compensation. Payment of taxes and Social Security contributions are Salesperson's
              responsibility. Salesperson is also considered an independent contractor for purposes of Unemployment
              Insurance.
            </p>

            <div className="my-6 border-t border-gray-200"></div>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">BUSINESS EXPENSES:</p>
            <p className="mb-6">
              Broker shall not be liable to Salesperson for any expenses incurred by Salesperson. Salesperson agrees to
              provide and pay for all necessary professional licenses and dues. Salesperson understands and agrees that
              Broker shall not provide any office, supplies, advertisements, or marketing materials, and that
              Salesperson is responsible for conducting business pursuant to this agreement at their own cost.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">LICENSED ACTIVITY:</p>
            <p className="mb-6">
              Salesperson shall be familiar and comply with, all applicable laws, policies, and procedures, including,
              but not limited to, anti-discrimination laws, restrictions against giving or accepting a fees or other
              things of value for the referral of business pursuant to the California Business and Professions Code, the
              Real Estate Settlement Procedures Acts (RESPA), and any other applicable laws.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">COMPENSATION:</p>
            <p className="mb-6">Salesperson shall sign a separate fee agreement.</p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">DOCUMENTS AND FILES:</p>
            <p className="mb-6">
              All files and documents pertaining to listings, leads and transactions are the property of Broker and
              shall be delivered to Broker by Salesperson according to the manner and term indicated from time to time
              by Broker.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">AUTOMOBILE INSURANCE:</p>
            <p className="mb-6">
              Salesperson shall maintain automobile insurance coverage for liability and property damage. Further,
              Salesperson agrees to indemnify Broker against any claims or demands resulting from any automobile
              accident involving Salesperson.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              TRUST FUND (EARNEST MONEY DEPOSIT) HANDLING:
            </p>
            <p className="mb-6">
              According to the Business and Professions Code and Commissioner's Regulation, trust funds received MUST be
              placed into a neutral escrow depository (escrow/title company), or a trust account maintained by the
              Broker no later than three business days after receiving the funds. Salesperson agrees to refrain from
              receiving funds from clients in his/her personal name, to include receiving any cash payments from
              clients.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              FICTITIOUS BUSINESS NAMES AND LOGOS:
            </p>
            <p className="mb-6">
              While affiliated with Broker, Salesperson shall use the Lemara Commercial name and/or corresponding
              distinctive logo on signage, stationery, Web sites, and/or any other marketing materials. Salesperson
              agrees that Lemara Commercial retains exclusive rights to the Lemara Commercial name and any trademark,
              logo, or identifying graphics. Salesperson agrees to discontinue the use of the Broker's trademark logo
              and graphics immediately upon the termination of this Agreement.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              ADVERTISING AND SOLICITATIONS:
            </p>
            <p className="mb-6">
              All advertising done by Salesperson must receive prior written approval of Broker. Broker is not liable or
              responsible for any advertising done by Salesperson on its behalf and Salesperson agrees to indemnify and
              hold Broker blameless for any costs or damages, legal or otherwise, specifically arising as a result of
              Salesperson's failure to comply with the guidelines outlined in this paragraph.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              LIABILITY/INDEMNITY, FRAUD AND MISREPRESENTATION:
            </p>
            <p className="mb-4">
              In addition to all other legal or equitable remedies of Broker, Salesperson shall indemnify and hold
              Broker and its owner(s), affiliates, shareholders, directors, officers, agents, employees, successors, and
              assigns harmless and shall reimburse the same with respect to any and all losses, damages, demands,
              claims, liabilities, costs and expenses, including reasonable attorney fees (collectively "Losses"),
              incurred by reason of, arising out of, or in connection with any fraud or misrepresentation, or claim or
              accusation thereof, concerning Salesperson, including, but not limited to, Salesperson's misrepresentation
              of its relationship with Broker to any third party or any action or omission by Salesperson taken or
              omitted pursuant to this Agreement. This paragraph shall include all damages related to claims of fraud
              independent of whether or not said claims have been adjudicated or are covered by E&O insurance.
            </p>

            <p className="mb-4">
              Salesperson agrees to pay, reimburse, or otherwise be liable to Broker, and its agents and assigns, for
              any reasonable legal expenses or expenditures, to include, but not limited to, court fees, damages, and
              representation costs, resulting from, or in connection with, Salesperson's real estate transaction(s) or
              affiliation with Broker, regardless of whether or not said transaction(s) or affiliation produced any
              commissions paid to Salesperson.
            </p>

            <p className="mb-4">
              Salesperson agrees to indemnify and hold Broker blameless for any legal, equitable, or other actions
              arising from, out of, or in relation to Salesperson's real estate transaction(s) or affiliation with
              Broker.
            </p>

            <p className="mb-6">
              Salesperson agrees to assist Broker in the defense or mitigation of any controversy legal or otherwise
              that arises from, out of, or in relation to Salesperson's real estate transaction(s) or affiliation with
              Broker. Salesperson's assistance will include, but not be limited to, aiding Broker and its employees or
              counsel in: preparing testimony, attending court proceedings, presenting documents, and assisting in any,
              and all, other ways that Broker, or its counsel, deems necessary.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">WORKING PLACE:</p>
            <p className="mb-6">
              Salesperson may work from home, personal office, vehicle or any other locations of Salesperson's choice,
              including office space that may be provided by Broker. However, Salesperson is responsible to store all
              transaction documents in a secure place and be able to present them at the Broker's request within 24
              hours. Salesperson must be accessible by phone, e-mail and postal mail, and respond to voicemails within a
              maximum time frame of 24 hours.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">ACTIVITY REPORTING:</p>
            <p className="mb-6">
              Salesperson is required to report all his/her real estate activities to the Broker within 48 hours of the
              occurrence. Real estate activities include listing agreements, newly opened escrows (accepted purchase
              agreements), earnest money deposits, cancelled and expired agreements, renewed agreements, referral fee
              agreements and/or any other business contract or arrangement involving a Salesperson and his/her
              client(s).
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">ENTIRE AGREEMENT:</p>
            <p className="mb-6">
              This Agreement contains the entire Agreement of the parties and there are no promises or conditions in any
              other Agreement, whether verbal or written. This Agreement supersedes any prior written or verbal
              Agreements between the parties. This Agreement may be modified or amended if the amendment is made in
              writing and is signed by both parties. If any provision of this Agreement shall be held to be invalid or
              unenforceable for any reason, the remaining provisions shall continue to be valid and enforceable.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">APPLICABLE LAW:</p>
            <p className="mb-6">
              This Agreement is entered into in the County of Sacramento, California, and shall be governed by the laws
              of the State of California. Consent to Jurisdiction and Forum Selection, the parties hereto agree that all
              actions or proceedings arising in connection with this Agreement shall be tried and litigated exclusively
              in the State courts located in the County of Sacramento, State of California.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              TERMINATION OF AGREEMENT:
            </p>
            <p className="mb-6">
              This Agreement may be terminated by either party, at any time, with or without cause. Even after
              termination, this Agreement shall govern all disputes and claims between Broker and Salesperson connected
              with their relationship under this Agreement.
            </p>

            <p className="font-bold text-xl mb-4 text-blue-700 border-b pb-2 border-gray-200">
              CONFIDENTIAL INFORMATION AND NON-DISCLOSURE:
            </p>
            <p className="mb-6">
              The Salesperson will have access to and become acquainted with data, various trade secrets and
              Confidential Information which are owned by the Broker. "Confidential Information" means any information
              identified or reasonably identifiable as confidential and not generally available to third parties.
              Salesperson shall keep confidential and not disclose, directly or indirectly, to anyone, or use
              Confidential Information during the period of association with Broker and after termination of this
              Agreement. Under no circumstances shall Salesperson seek to derive benefit from such Confidential
              Information.
            </p>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold mb-1">
                  I have read and agree to abide by the terms of this independent contractor agreement
                </p>
                <p className="mb-1">Broker: Lemara Commercial</p>
                <p className="mb-2">By: {brokerName}, President and Broker</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold mb-1">Salesperson:</p>
                  <p className="mb-1">
                    Printed Name: {firstName} {lastName}
                  </p>
                </div>
                <div>
                  <p className="font-bold mb-1">DRE:</p>
                  <p className="mb-1 text-gray-600 italic">
                    Dicta qui autem tempora accusantium veniam dolor voluptatem quod provident eiusmod
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mb-4">
                <label className="block text-base font-medium text-gray-700 mb-2">Signature:</label>
                <div className="border-2 border-gray-300 rounded-md shadow-sm hover:border-blue-400 transition-colors h-32">
                  <SignatureCanvas
                    ref={signatureRef}
                    onEnd={checkSignature}
                    canvasProps={{
                      className: "signature-canvas w-full h-full bg-white rounded-md",
                      style: { minWidth: "100%", height: "100%" },
                    }}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear Signature
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="mb-4">
                  <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReadTerms}
                      onChange={() => setHasReadTerms(!hasReadTerms)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 font-medium">
                      I confirm that I have read and agree to all terms and conditions in this agreement
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-6 mt-auto">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAccept}
                    disabled={!hasReadTerms || !isSigned}
                    className={`px-6 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                      hasReadTerms && isSigned ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save & Accept
                  </button>
                </div>
                {!hasReadTerms && (
                  <p className="text-sm text-red-500 mt-2 text-center font-medium">
                    Please confirm that you have read and agree to the terms
                  </p>
                )}
                {hasReadTerms && !isSigned && (
                  <p className="text-sm text-red-500 mt-2 text-center font-medium">
                    Please sign the agreement to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndConditionsModal
