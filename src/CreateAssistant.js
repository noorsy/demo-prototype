import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const microSegments = ["Auto Loan", "Mortgage", "Credit Card"];
const channelOptions = [
  {
    key: "Voice",
    icon: "🔊",
    desc: "Automated or live voice calls.",
  },
  {
    key: "SMS",
    icon: "💬",
    desc: "Text messaging for quick alerts.",
  },
  {
    key: "Email",
    icon: "✉️",
    desc: "Send detailed information via email.",
  },
  {
    key: "Web Chat",
    icon: "💻",
    desc: "Chat with users on your website.",
  },
];
const attributes = [
  { name: "account_id", desc: "Unique account identifier.", mandatory: true },
  {
    name: "customer_name",
    desc: "Full name of the customer.",
    mandatory: true,
  },
  {
    name: "primary_phone_number",
    desc: "Primary contact number (for Voice/SMS).",
    mandatory: true,
  },
  {
    name: "email_address",
    desc: "Primary email contact (for Email).",
    mandatory: true,
  },
  { name: "dpd", desc: "Days Past Due.", mandatory: true },
  { name: "amount_due", desc: "Current outstanding balance.", mandatory: true },
  {
    name: "product_type",
    desc: "Matches products defined earlier.",
    mandatory: true,
  },
  {
    name: "timezone",
    desc: "Customers timezone (e.g., America/New_York).",
    mandatory: true,
  },
];
const sources = [
  {
    key: "SFTP",
    icon: "📁",
    desc: "Secure File Transfer Protocol for batch uploads.",
  },
  { key: "API", icon: "🔗", desc: "Real-time integration with your systems." },
];
const segmentOptions = [
  {
    key: "manual",
    title: "Manual Segment",
    desc: "Define segments and rules yourself.",
  },
  {
    key: "ai",
    title: "AI-driven Segment",
    desc: "Let AI analyze and create segments for you.",
  },
];

const steps = [
  {
    title: "Assistant Details",
    desc: "Name, description, segment, and channels.",
    icon: "📝",
  },
  {
    title: "Attributes & Data Source",
    desc: "Configure attributes, data source and segmentation.",
    icon: "📄",
  },
  {
    title: "AI Processing",
    desc: "AI analyzes and creates intelligent segments.",
    icon: "🤖",
  },
  {
    title: "Segmentation",
    desc: "Review and manage AI-generated segments.",
    icon: "🔎",
  },
];

const tasksList = [
  {
    id: 1,
    title: "Segmenting Accounts",
    icon: FunnelIcon,
    subtasks: [
      "Dividing accounts into primary behavioral groups",
      "Applying propensity scoring to each segment",
      "Identifying high-value recovery opportunities",
      "Creating smart segment boundaries 📊",
    ],
  },
  {
    id: 2,
    title: "Optimizing Treatment Strategies",
    icon: ChatBubbleLeftRightIcon,
    subtasks: [
      "Matching communication approaches to segments",
      "Calculating optimal contact timing windows",
      "Personalizing message content by segment",
      "Fine-tuning approach sensitivity 🎯",
    ],
  },
  {
    id: 3,
    title: "Defining Segment Characteristics",
    icon: UserCircleIcon,
    subtasks: [
      "Analyzing segment behavioral patterns",
      "Identifying segment communication preferences",
      "Determining segment risk profiles",
      "Mapping segment response tendencies 📊",
    ],
  },
  {
    id: 4,
    title: "Building Journey Mapping",
    icon: CalendarDaysIcon,
    subtasks: [
      "Creating communication sequence flows",
      "Setting up channel-specific touchpoints",
      "Establishing decision points and branches",
      "Optimizing timing between touchpoints ⏱️",
    ],
  },
];

// Add mock segments data for demonstration
const initialSegments = {
  "Early Stage": [
    {
      name: "High Value Early",
      rules: "DPD 5-10 AND Amount > $5,000",
      characteristics: "High balance, first-time delinquent",
      focus: "Empathy, payment plan options",
    },
    {
      name: "Repeat Early",
      rules: "DPD 5-10 AND Repeat delinquents",
      characteristics: "Multiple past dues, moderate balance",
      focus: "Reminder, urgency messaging",
    },
  ],
  "Mid Stage": [
    {
      name: "Mid Risk",
      rules: "DPD 21-30, Amount $1,000-$5,000",
      characteristics: "Medium risk, some prior contact",
      focus: "Escalation, offer settlement",
    },
  ],
  "Late Stage": [],
  "Very Late Stage": [],
  "Pre-Chargeoff": [],
  "Post-Chargeoff": [],
};

// Map DPD names to display names for tabs
const dpdDisplayNames = {
  "Early Stage": "Early Delinquency",
  "Mid Stage": "Mid Delinquency",
  "Late Stage": "Late Delinquency",
  "Very Late Stage": "Very Late",
  "Pre-Chargeoff": "Pre-Chargeoff",
  "Post-Chargeoff": "Post-Chargeoff",
};

const recommendedAttributes = [
  {
    name: "risk_score",
    desc: "Enables risk-based segments (e.g., High/Medium/Low).",
  },
  {
    name: "first_default_date / total_defaults_count",
    desc: "Identifies first-time vs. repeat defaulters.",
  },
  {
    name: "last_payment_date / last_payment_amount",
    desc: "Provides payment history insights.",
  },
  { name: "language_preference", desc: "Enables multilingual outreach." },
];

const actualSegments = [
  {
    id: "SEG0: Vulnerable / Special Handling",
    logic:
      'Vulnerability_Flag IS TRUE OR account_notes CONTAIN keywords ("hardship", "illness", "dispute bureau", etc.)',
    characteristics:
      "Customer facing significant personal challenges; potential compliance/reputational risk.",
    focus:
      "Understanding, empathy, offering support/options, pausing standard collections.",
  },
  {
    id: "SEG1: High Priority - Broken Promises (PTP Failures)",
    logic:
      "Number_of_Broken_PTPs_Last_6_Months >= 1 AND Days_Since_Last_Broken_PTP <= 7 (or other short timeframe)",
    characteristics:
      "Explicit commitment made and not met recently. Potentially willing but facing new obstacles.",
    focus:
      "Direct, reference broken promise, understand reason, secure new firm commitment, reiterate importance.",
  },
  {
    id: "SEG2: High Potential / Active Engagement",
    logic:
      "Last_Customer_Response_Channel IS NOT NULL AND Days_Since_Last_Customer_Response <= 5 AND Last_Customer_Response_Sentiment IS Positive/Neutral",
    characteristics:
      "Recently engaged with client, potentially showing willingness to resolve.",
    focus:
      "Conversational, reference prior interaction, easy payment options, gratitude for engagement.",
  },
  {
    id: "SEG3: Forgetful / Early Stage Delinquency",
    logic:
      "DPD >= 5 AND DPD <= 30 AND Number_of_Broken_PTPs_Last_12_Months == 0 AND (Payment_History_Shows_Previous_On_Time_Payments OR Client_Risk_Score IS Low OR Client_Risk_Score IS NULL)",
    characteristics:
      "Likely good payers who missed a payment. Low history of delinquency. No recent high-risk flags.",
    focus:
      'Gentle, helpful reminders. "Looks like your payment is overdue. Pay easily here..."',
  },
  {
    id: "SEG4: Repeat Offenders / Consistent Late Payers",
    logic:
      "(DPD > 30) AND (Number_of_Previous_Delinquency_Cycles_Last_12_Months >= 2-3 OR Payment_History_Shows_Sporadic_Payments) OR (Number_of_Broken_PTPs_Last_12_Months >= 2 but not recent)",
    characteristics:
      "History of multiple delinquencies or broken promises over time.",
    focus:
      "More direct about overdue status, consequences (compliant), focus on payment plan or firm PTP.",
  },
  {
    id: "SEG5: High Risk / Significant Delinquency (Non-PTP Breakers)",
    logic: "(Client_Risk_Score IS High OR DPD > 60) AND NOT IN SEG1",
    characteristics:
      "Represents higher risk due to client scoring or prolonged delinquency, without a recent PTP break.",
    focus:
      "Professional, understand situation, negotiate payment plans/settlements, assertiveness based on risk/DPD.",
  },
  {
    id: "SEG6: Long-Term Low Engagement",
    logic:
      "Days_Since_Last_Customer_Response > 60 AND DPD > 120 AND NOT IN SEG0 or SEG1",
    characteristics:
      "Significantly past due with no recent engagement for an extended period.",
    focus:
      "Standard reminder messages; less personalization. Focus on re-engagement.",
  },
  {
    id: "SEG7: General Delinquency (Catch-All)",
    logic:
      "Accounts not fitting other segments AND DPD > Minimum_DPD_for_Action (e.g., 1 day)",
    characteristics:
      "Delinquent but doesn't meet specific criteria of other prioritized segments.",
    focus: "Standard collection messaging, tone adjusted primarily by DPD.",
  },
];

// Place this outside the component, near the top of the file
const attributeCategories = [
  {
    title: "I. Client Portfolio Data (Source: Client CRM / Lead File / Servicing System)",
    groups: [
      {
        group: "A. Borrower & Co-Borrower Information",
        items: [
          "Primary Borrower Full Name",
          "Primary Borrower Account Number / Client Internal ID",
          "Primary Borrower Date of Birth / Age",
          "Co-Borrower(s) Full Name(s) (if applicable)",
          "Co-Borrower(s) Date(s) of Birth / Age(s) (if applicable)",
          "Relationship between Borrowers (if known)",
          "Language Preference (if known by client)",
          "Vulnerable Customer Indicators (if provided by client, handle ethically)",
          "Military Status / SCRA Protection Indicator (known by client)",
          "Deceased Indicator (known by client)",
          "Bankruptcy Filed Indicator (known by client, Chapter 7/13)",
          "Cease & Desist / Litigious Customer Flag (from client system)",
          "Fraud Indicator (from client system)",
        ],
      },
      {
        group: "B. Contact Information (Associated with Borrowers)",
        items: [
          "Primary Address (Street, City, State, ZIP)",
          "Mailing Address (if different)",
          "Garage Address (where vehicle is primarily kept, if different)",
          "Address Type (Primary, Mailing, Previous, etc.)",
          "Address Tenure (if known)",
          "Primary Phone Number (Mobile)",
          "Home Phone Number (Landline)",
          "Work Phone Number",
          "Other Phone Numbers on File",
          "Phone Number Type (Mobile/Landline/Work designation by client)",
          "Phone Number Source/Verification Notes (from client)",
          "Primary Email Address",
          "Secondary Email Address(es)",
          "Email Address Source/Verification Notes (from client)",
          "Client-defined Preferred Contact Method/Time (if available)",
        ],
      },
      {
        group: "C. Loan & Account Details (Core Auto Loan Data)",
        items: [
          "Loan Origination Date",
          "Original Loan Amount",
          "Current Outstanding Balance (Total)",
          "Principal Balance",
          "Accrued Interest Balance",
          "Fees Balance (Late Fees, Other Fees)",
          "Total Amount Due (Current Billing Cycle)",
          "Past Due Amount",
          "Days Past Due (DPD) - Critical",
          "Loan Status in Client System (e.g., Delinquent, Grace, Pre-Charge Off, Pre-Repossession)",
          "Original Loan Term (e.g., 60 months)",
          "Remaining Loan Term (months)",
          "Interest Rate / APR",
          "Scheduled Monthly Payment Amount",
          "Next Payment Due Date",
          "Last Payment Date (Client System)",
          "Last Payment Amount (Client System)",
          "Payment Frequency (e.g., Monthly)",
          "Billing Cycle Date",
          "Grace Period Length (Days)",
          "Loan Type / Product Code (e.g., New Auto Purchase, Used Auto Purchase, Refinance)",
          "Security Type (Secured - Auto)",
          "Account Open Date",
        ],
      },
      {
        group: "D. Collateral Details (Vehicle Information)",
        items: [
          "Vehicle Year",
          "Vehicle Make",
          "Vehicle Model",
          "Vehicle Trim/Series",
          "Vehicle Identification Number (VIN)",
          "Vehicle License Plate Number & State (if known)",
          "Original Vehicle Value / Purchase Price",
          "Estimated Current Vehicle Value (if client provides updates, e.g., KBB/NADA)",
          "Loan-to-Value (LTV) Ratio at Origination",
          "Current Estimated LTV (if current value available)",
          "GAP Insurance Coverage Indicator",
          "Insurance Policy Information (Carrier, Policy #, Expiry - if tracked by client)",
        ],
      },
      {
        group: "E. Borrower Financial Profile (From Client Records)",
        items: [
          "Credit Score (e.g., FICO, VantageScore) at Origination",
          "Updated Credit Score (if client performs periodic reviews and provides)",
          "Client Internal Credit Tier/Grade at Origination",
          "Stated Income at Origination",
          "Verified Income at Origination (if applicable)",
          "Employment Status at Origination",
          "Employer Name at Origination (if known)",
          "Debt-to-Income (DTI) Ratio at Origination",
          "Payment Method on File (e.g., ACH, Card, Coupon Book)",
          "Autopay / Recurring Payment Enrollment Status",
        ],
      },
      {
        group: "F. Account History & Client Operations Data",
        items: [
          "Payment History Rating (Client internal score, e.g., # times 30/60/90 DPD)",
          "History of Returned Payments / NSF (Non-Sufficient Funds)",
          "History of Broken Promises (Tracked in client system)",
          "Date Account Placed into Collections / Assigned to Platform",
          "Delinquency Reason Code (if provided by client)",
          "Previous Collection Efforts / Notes (Summary or key flags if provided by client)",
          "Client-defined Risk Score / Segmentation Code",
          "Number of Previous Loan Modifications/Forbearances",
          "Date of Last Loan Modification/Forbearance",
          "Hardship Program Enrollment Status (in client system)",
          "Repossession Status / History (if previously repossessed & reinstated)",
          "Cosigner Delinquency History (if tracked separately by client)",
        ],
      },
    ],
  },
  {
    title: "II. Internal Interaction History (Source: Our AI Platform)",
    groups: [
      {
        group: "A. Contact Attempt & Connectivity Metrics",
        items: [
          "Total Contact Attempts (Platform Lifetime)",
          "Contact Attempts by Channel (Voice, SMS, Email)",
          "Contact Attempts by Phone Number / Email Address",
          "Contact Attempts by Day of Week",
          "Contact Attempts by Time of Day (Hourly Buckets)",
          "Date/Time of Last Attempt (Overall & by Channel)",
          "Voice Call Outcome History (Answered, Busy, No Answer, Voicemail, Failed, System Error)",
          "Answer Machine Detection (AMD) Results History",
          "Right Party Contact (RPC) Success Rate (Overall & per Number)",
          "Date/Time of Last Successful RPC",
          "Voicemail Drop Success/Failure History",
          "SMS Delivery Status History (Delivered, Failed, Unknown) per Number",
          "SMS Delivery Error Codes (if available)",
          "Email Delivery Status History (Sent, Delivered, Bounced, Spam Complaint) per Address",
          "Email Bounce Reason Codes (Hard/Soft)",
          "Connectivity Score per Contact Point (Phone/Email)",
        ],
      },
      {
        group: "B. Engagement & Responsiveness Metrics",
        items: [
          "Total Successful Conversations (Platform Lifetime)",
          "Date/Time of Last Successful Conversation",
          "Average Conversation Duration (Overall & RPC)",
          "Longest Conversation Duration",
          "Conversation Containment Rate (Handled by Bot vs. Escalated)",
          "SMS Response Received (Yes/No History)",
          "SMS Response Rate (Responses / Delivered Messages)",
          "Email Open Rate History (Requires tracking pixel)",
          "Email Click-Through Rate History (If links used & tracked)",
          "Inbound Call Received (Yes/No History)",
          "Inbound SMS Received (Yes/No History)",
          "Inbound Email Received (Yes/No History)",
          "Inferred Best Time to Contact (Based on successful interactions)",
          "Inferred Best Channel to Contact (Based on successful interactions/responses)",
          "Channel Responsiveness Score (Propensity to engage on Voice/SMS/Email)",
          "Authentication Success Rate History",
          "Date/Time of Last Successful Authentication",
        ],
      },
      {
        group: "C. Payment & Promise History (within Platform)",
        items: [
          "Number of Promises-to-Pay (PTP) Secured via Platform",
          "Date/Time of Last PTP Secured",
          "Amount of Last PTP Secured",
          "Number of PTPs Kept (Payment received matching PTP terms)",
          "Number of PTPs Broken",
          "PTP Kept Rate (Platform specific)",
          "Number of Payments Processed via Platform (if applicable)",
          "Total Amount Collected via Platform (if applicable)",
          "Date/Time of Last Payment via Platform",
          "Payment Methods Used via Platform (if applicable)",
        ],
      },
      {
        group: "D. Conversational Insights (Platform Derived)",
        items: [
          "Historical Sentiment Score Trend (Positive/Negative/Neutral)",
          "Detected Language History (if multilingual)",
          "Frequency of Key Topics Mentioned (e.g., 'Payment', 'Hardship', 'Dispute', 'Vehicle', 'Insurance', 'Repossession')",
          "Escalation History (# times escalated, reason codes if tracked)",
          "Bot Version History interacted with",
          "Specific Prompts/Flows Encountered History",
        ],
      },
    ],
  },
  {
    title: "III. External Enrichment Data (Source: Third-Party Providers & Public Records)",
    groups: [
      {
        group: "A. Contact Data Validation & Enhancement",
        items: [
          "Phone Number Validation (Active/Inactive/Disconnected Status, Confidence Score)",
          "Phone Number Type Identification (Mobile, Landline, VoIP, Business - Updated)",
          "Phone Number Carrier & Original Provider Information",
          "Phone Porting Status & Date",
          "Do Not Call (DNC) Registry Status Check (Federal & State)",
          "Phone Number Association Score to Individual/Address",
          "Additional Phone Numbers Associated with Borrower/Address (Scored for likelihood)",
          "Email Address Validation (Valid/Invalid/Risky/Accept-All, Syntax Check, Domain Check)",
          "Email Address Hygiene (Known Spam Trap, Disposable Domain, Role Account)",
          "Email Address Association Score to Individual",
          "Additional Email Addresses Associated with Borrower (Scored for likelihood)",
          "Address Verification / Standardization (CASS Certified, DPV, LACSLink)",
          "Address Type (Residential, Business, PO Box, CMRA)",
          "Address Deliverability Score / Vacancy Indicator",
          "Address Change History / National Change of Address (NCOA) Linkage (Usually requires license)",
          "Address Tenure / Length of Residence (Modeled)",
          "Geocoding (Latitude/Longitude Coordinates)",
          "Time Zone Identification based on verified Address/Phone",
        ],
      },
      {
        group: "B. Identity Verification & Contextual Data",
        items: [
          "Identity Verification Score / Confidence Level",
          "Alias / Name Variation Information (AKAs, maiden names)",
          "Date of Birth Verification / Range",
          "Deceased Indicator Scrub (e.g., SSDI Match, State/Local Records - Verified)",
          "Active Military Duty Scrub (SCRA Database Match - Verified)",
          "Possible Relatives / Associates & Relationship Type (for skip tracing context)",
          "Household Composition / Number of Adults/Children (Modeled)",
          "Professional Licenses Held & Status (Public Records)",
          "Voter Registration Information (Public Records)",
          "Global Watchlist / Sanctions Screening (e.g., OFAC)",
          "Incarceration Status Check (Public Records)",
          "Social Media Profile Links (Publicly available - e.g., LinkedIn, sometimes others via providers like Spokeo) - Use ethically",
          "Domain Name Registrations (Public Records)",
        ],
      },
      {
        group: "C. Property & Asset Indicators (Public Records & Modeled)",
        items: [
          "Home Ownership Indicator (Owner/Renter Status)",
          "Property Ownership Records (Address, Assessed Value, Purchase Date/Price - Public)",
          "Mortgage Holder Information (Lender Name, Estimated Loan Amount/Date - Public Records)",
          "Number of Properties Owned",
          "Property Type (Single Family, Condo, Multi-Family)",
          "Property Characteristics (Square Footage, Year Built, Beds/Baths - Public Records)",
          "Estimated Home Equity (Modeled)",
          "Property Foreclosure Status / History (Public Records)",
          "Property Tax Delinquency Status (Public Records)",
          "Other Vehicle Registrations (Make, Model, Year - Public Records, State specific)",
          "Watercraft / Boat Registrations (Public Records)",
          "Aircraft Registrations (Public Records)",
          "UCC Filings (Indicates other secured debts/assets - Public)",
        ],
      },
      {
        group: "D. Financial & Risk Indicators (Non-FCRA - Modeled or Public)",
        items: [
          "Estimated Income Model Score / Range (Often based on demographics, location, profession)",
          "Estimated Salary Status / Range (Modeled, potentially inferred from job title/industry)",
          "Employment Status Likelihood (Employed/Unemployed - Modeled)",
          "Employer Name / Industry Type (Modeled or from self-reported sources like LinkedIn if available)",
          "Propensity to Pay Score (Vendor-specific model predicting likelihood to resolve debt)",
          "Collections Propensity Score (Likelihood of account needing collections)",
          "Financial Stability Score (Vendor-specific model)",
          "Economic Hardship Indicator Score (Modeled based on geo-demographics, etc.)",
          "Wealth Indicator Score / Affluence Rating (Modeled)",
          "Liens / Judgments Records (Dollar Amount, Filing Date - Public)",
          "Civil Litigation Search Results (Plaintiff/Defendant - Public)",
          "Corporate Affiliations / Business Ownership (Public Records)",
          "Net Worth Estimate (Modeled)",
          "Disposable Income Estimate (Modeled)",
          "Presence of Derogatory Public Records (Summary flag)",
        ],
      },
      {
        group: "E. Behavioral & Contact Strategy Indicators (Vendor Models)",
        items: [
          "Best Time to Contact Score/Recommendation (Day of Week, Time of Day - e.g., TransUnion Contact Optimization)",
          "Best Channel Preference Score (Voice vs. SMS vs. Email - Modeled)",
          "Contact Frequency Recommendation (Modeled tolerance)",
          "Likelihood to Answer Phone Score",
          "Likelihood to Respond to SMS/Email Score",
          "Communication Style Preference (e.g., Direct vs. Empathetic - Modeled, experimental)",
          "Propensity for Self-Service / Digital Engagement Score",
        ],
      },
      {
        group: "F. Financial & Risk Indicators (FCRA Data - Requires Permissible Purpose)",
        items: [
          "Updated Credit Score / Range (e.g., FICO, VantageScore - if PP exists)",
          "Credit Score Trend (Improving/Declining - if PP exists)",
          "Bankruptcy Public Filings & Status (Verified - Chapter 7/13, Discharge/Dismissal)",
          "Updated Tradeline Summary (e.g., Number of open/closed accounts, Total balance, Utilization - if PP exists)",
          "Presence/Severity of Other Delinquencies (30/60/90+ DPD on other accounts - if PP exists)",
          "Presence of Accounts in Collections (Other debts - if PP exists)",
          "Credit Inquiry History (Number/type of recent inquiries - if PP exists)",
          "Thin File / No Hit Indicator (Lack of credit history - if PP exists)",
        ],
      },
    ],
  },
  {
    title: "IV. Real-time Interaction Data (Source: Live Conversation Analysis)",
    groups: [
      {
        group: "A. Real-time Interaction Data",
        items: [
          "Current Channel of Interaction (Voice, SMS, Email)",
          "Live Sentiment Detection Score (Per utterance/message)",
          "Live Emotion Detection (e.g., Anger, Frustration, Cooperation - Voice specific)",
          "Live Keyword Spotting (Specific terms triggering rules/flows)",
          "Speech Rate / Pace (Voice)",
          "Silence / Hesitation Duration (Voice)",
          "Background Noise Level / Type (Voice - call quality/environment indicator)",
          "Caller Authentication Status (During call)",
          "Current Step/Intent in Conversational Flow",
          "Real-time System Confidence Score (e.g., NLU confidence)",
        ],
      },
    ],
  },
];

function AIMagicProgress({ tasksList, onComplete }) {
  const [current, setCurrent] = React.useState(0);
  const [subtaskIdx, setSubtaskIdx] = React.useState(0);
  // Calculate progress
  const totalSubtasks = tasksList.reduce(
    (sum, t) => sum + t.subtasks.length,
    0
  );
  const completedSubtasks =
    tasksList.slice(0, current).reduce((sum, t) => sum + t.subtasks.length, 0) +
    subtaskIdx;
  const progress = Math.min((completedSubtasks / totalSubtasks) * 100, 100);

  React.useEffect(() => {
    if (current < tasksList.length) {
      if (subtaskIdx < tasksList[current].subtasks.length - 1) {
        const timeout = setTimeout(() => setSubtaskIdx(subtaskIdx + 1), 900);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrent(current + 1);
          setSubtaskIdx(0);
        }, 1200);
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(onComplete, 1200);
    }
  }, [current, subtaskIdx, tasksList, onComplete]);

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center">
          <div className="mb-2 animate-pulse">
            {/* Smaller glowing brain icon */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#EEF4FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="20" fill="url(#glow)" />
              <circle cx="20" cy="20" r="15" fill="#EEF4FF" />
              <path
                d="M15 26c-2 0-3.3-1.7-3.3-3.7 0-1.2.4-2.1 1.3-2.8C13 18.5 13 17.8 13 17c0-3.1 2.5-5.6 5.6-5.6 1.2 0 2.1.4 2.8 1.3C22.5 13 23.2 13 24 13c3.1 0 5.6 2.5 5.6 5.6 0 .8-.4 1.5-1.3 2.2.9.7 1.3 1.6 1.3 2.8 0 2-1.3 3.7-3.3 3.7"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-xl font-extrabold text-zinc-900 text-center tracking-tight mb-1">
            AI Magic in Progress
          </div>
          <div className="text-zinc-500 text-center max-w-base mb-2 text-base">
            Our AI is analyzing your attributes and dpd buckets to create
            intelligent segments for optimized collections.
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-lg mx-auto mt-2 mb-2">
            <div className="h-3 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-zinc-500 mt-1 text-right font-inter">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {tasksList.map((task, idx) => {
            const Icon = task.icon;
            let state = "pending";
            if (idx < current) state = "done";
            else if (idx === current) state = "active";
            return (
              <div
                key={task.id}
                className={
                  state === "done"
                    ? "flex items-center justify-between rounded-xl border border-black-100 bg-black-50 px-5 py-3 shadow-sm"
                    : state === "active"
                    ? "flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 shadow-sm animate-pulse"
                    : "flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-3 shadow-sm opacity-70"
                }
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      state === "done"
                        ? "bg-black-100 text-black-600 rounded-full p-1"
                        : state === "active"
                        ? "bg-blue-100 text-blue-600 rounded-full p-1"
                        : "bg-zinc-100 text-zinc-400 rounded-full p-1"
                    }
                  >
                    {state === "done" ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <Icon className="w-5 h-5 text-blue-500" />
                    )}
                  </span>
                  <div>
                    <div className="font-medium text-zinc-900 text-base">
                      {task.title}
                    </div>
                    {state === "active" && (
                      <div className="text-xs text-blue-600 mt-1 flex items-center gap-2">
                        <span className="animate-pulse">
                          {task.subtasks[subtaskIdx]}
                        </span>
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                      </div>
                    )}
                    {state === "done" && (
                      <div className="text-xs text-black-600 mt-1">
                        Completed
                      </div>
                    )}
                    {state === "pending" && (
                      <div className="text-xs text-zinc-400 mt-1">Pending</div>
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium text-right">
                  {state === "active"
                    ? `${subtaskIdx + 1}/${task.subtasks.length}`
                    : state === "done"
                    ? "Completed"
                    : "Pending"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Button style classes for consistency
const primaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition";
const secondaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-200 text-zinc-900 font-inter text-sm font-semibold hover:bg-zinc-300 transition";

export default function CreateAssistant() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "Q2 Auto Loan Recovery",
    desc: "Automated campaign for Q2 auto loan collections.",
    creditorName: "",
    creditorPhone: "+1 555-123-4567",
    creditorEmail: "contact@nubank.com",
    creditorTimezone: "America/New_York",
    segment: "First-party",
    microSegment: "Auto Loan",
    channels: [],
    attributes: attributes.map((attr) => ({
      ...attr,
      autoCreate: false,
      mandatory: attr.mandatory,
    })),
    source: "SFTP",
    segmentType: "manual",
    dpds: [
      { name: "Early Stage", from: 5, to: 20 },
      { name: "Mid Stage", from: 21, to: 40 },
      { name: "Late Stage", from: 41, to: 60 },
      { name: "Very Late Stage", from: 61, to: 90 },
      { name: "Pre-Chargeoff", from: 91, to: 120 },
      { name: "Post-Chargeoff", from: 121, to: 180 },
    ],
    businessHours: [
      { day: "Monday", start: "09:00", end: "18:00" },
      { day: "Tuesday", start: "09:00", end: "18:00" },
      { day: "Wednesday", start: "09:00", end: "18:00" },
      { day: "Thursday", start: "09:00", end: "18:00" },
      { day: "Friday", start: "09:00", end: "18:00" },
      { day: "Saturday", start: "10:00", end: "14:00" },
      { day: "Sunday", start: "Closed", end: "Closed" },
    ],
  });
  const [aiMagic, setAiMagic] = useState(false);
  const [showAIMagic, setShowAIMagic] = useState(false);
  const navigate = useNavigate();
  const [selectedDPD, setSelectedDPD] = useState(
    form.dpds[0]?.name || "Early Stage"
  );
  const [segments, setSegments] = useState(initialSegments);
  const [showAllAttributes, setShowAllAttributes] = useState(false);
  const [currentAttributes, setCurrentAttributes] = useState(attributes);
  const [currentRecommendedAttributes, setCurrentRecommendedAttributes] = useState(recommendedAttributes);

  useEffect(() => {
    const storedName = localStorage.getItem("creditorName");
    const storedEmail = localStorage.getItem("creditorEmail");
    if (storedName) {
      setForm(f => ({ 
        ...f, 
        creditorName: storedName,
        creditorEmail: storedEmail || `contact@${storedName.toLowerCase().replace(/\s+/g, '')}.com`
      }));
    } else {
      window.location.href = "/setup-creditor";
    }
  }, []);

  // Function to add attribute to mandatory list
  const addToMandatory = (attribute) => {
    if (!currentAttributes.find(attr => attr.name === attribute.name)) {
      setCurrentAttributes([...currentAttributes, { ...attribute, mandatory: true }]);
    }
  };

  // Function to add attribute to recommended list
  const addToRecommended = (attribute) => {
    if (!currentRecommendedAttributes.find(attr => attr.name === attribute.name)) {
      setCurrentRecommendedAttributes([...currentRecommendedAttributes, { ...attribute, mandatory: false }]);
    }
  };

  function toggleChannel(channel) {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((ch) => ch !== channel)
        : [...prev.channels, channel],
    }));
  }
  function handleAttrChange(idx, key, value) {
    setForm((prev) => {
      const updated = [...prev.attributes];
      updated[idx][key] = value;
      return { ...prev, attributes: updated };
    });
  }
  function handleDpdChange(idx, key, value) {
    setForm((prev) => {
      const updated = [...prev.dpds];
      updated[idx][key] = value;
      return { ...prev, dpds: updated };
    });
  }
  function addDpd() {
    setForm((prev) => ({
      ...prev,
      dpds: [...prev.dpds, { name: "", from: "", to: "" }],
    }));
  }
  function removeDpd(idx) {
    setForm((prev) => ({
      ...prev,
      dpds: prev.dpds.filter((_, i) => i !== idx),
    }));
  }
  function handleNext() {
    if (step === 2) {
      setShowAIMagic(true);
    } else if (step === 5) {
      setAiMagic(true);
      setTimeout(() => {
        navigate("/segments");
      }, 2200);
    } else {
      setStep(step + 1);
    }
  }
  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <div className="min-h-screen font-inter text-sm">
      <PageHeader
        title="Create Assistant"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "AI Agents", href: "/ai-agents" },
          { label: "Create Assistant" },
        ]}
      />
      <div
        className="max-w-6xl mx-auto bg-white rounded-xl shadow p-0 flex min-h-[calc(100vh-64px)]"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* Left: Stepper */}
        <div className="w-1/3 py-4 pl-4 border-r border-zinc-100 bg-zinc-50 rounded-l-xl flex flex-col min-h-full">
          <div className="sticky top-0 h-fit">
            <div>
              <div className="text-zinc-900 font-semibold text-lg mb-1">
                Onboarding
              </div>
              <div className="text-zinc-500 text-[11px] mb-4">
                to setup your assistant profile
              </div>
              <ol className="space-y-1">
                {steps.map((stepObj, idx) => {
                  const isCompleted = step > idx + 1;
                  const isCurrent = step === idx + 1;
                  return (
                    <li key={stepObj.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mb-2 transition-all border-2 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 border-green-300"
                              : isCurrent
                              ? "bg-blue-50 text-blue-600 border-blue-400"
                              : "bg-zinc-50 text-zinc-400 border-zinc-200"
                          }`}
                        >
                          {isCompleted ? (
                            <svg width="22" height="22" fill="none">
                              <circle cx="11" cy="11" r="11" fill="#22C55E" />
                              <path
                                d="M7 12l3 3 5-5"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <span className="text-lg">{stepObj.icon}</span>
                          )}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              isCompleted ? "bg-green-200" : "bg-zinc-200"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          className={`font-medium text-sm ${
                            isCurrent
                              ? "text-blue-600 font-bold"
                              : isCompleted
                              ? "text-green-700 font-bold"
                              : "text-zinc-400"
                          }`}
                        >
                          {stepObj.title}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1 max-w-[180px]">
                          {stepObj.desc}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        {/* Right: Step Content */}
        <div className="flex-1 flex flex-col min-h-full">
          <div className="flex-1 p-5">
            {showAIMagic ? (
              <div className="h-full w-full flex items-center justify-center overflow-hidden">
                <AIMagicProgress
                  tasksList={tasksList}
                  onComplete={() => {
                    setShowAIMagic(false);
                    setStep(4);
                  }}
                />
              </div>
            ) : step === 1 ? (
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Assistant Details
                </h2>
                <div className="text-zinc-500 text-sm mb-4">
                  Set up your assistant's name, description, client, segment,
                  and communication channels.
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Assistant Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Assistant Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={form.desc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                  />
                </div>
                {/* Client Information Section */}
                <h3 className="text-base font-semibold mb-1">
                  Creditor Details
                </h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Enter the creditor's contact information and timezone.
                </div>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Creditor Name
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.creditorName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, creditorName: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.creditorPhone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          creditorPhone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.creditorEmail}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          creditorEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Timezone
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.creditorTimezone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          creditorTimezone: e.target.value,
                        }))
                      }
                    >
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Chicago">America/Chicago</option>
                      <option value="America/Denver">America/Denver</option>
                      <option value="America/Los_Angeles">
                        America/Los_Angeles
                      </option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                      <option value="Australia/Sydney">Australia/Sydney</option>
                    </select>
                  </div>
                </div>
                {/* Business Hours Section */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold mb-1">
                    Business Hours
                  </h3>
                  <div className="text-zinc-500 text-xs mb-2">
                    Set your organization's business hours for each day.
                  </div>
                  <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-700 text-sm">
                        <th className="px-4 py-2 text-left">Day</th>
                        <th className="px-4 py-2 text-left">Start Time</th>
                        <th className="px-4 py-2 text-left">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.businessHours.map((row, idx) => (
                        <tr
                          key={row.day}
                          className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                        >
                          <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap">
                            {row.day}
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type={row.start === "Closed" ? "text" : "time"}
                              className="w-28 px-2 py-1 border border-zinc-200 rounded-md text-sm"
                              value={row.start}
                              onChange={(e) => {
                                const value = e.target.value;
                                setForm((f) => {
                                  const hours = [...f.businessHours];
                                  hours[idx].start = value;
                                  return { ...f, businessHours: hours };
                                });
                              }}
                              disabled={row.start === "Closed"}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type={row.end === "Closed" ? "text" : "time"}
                              className="w-28 px-2 py-1 border border-zinc-200 rounded-md text-sm"
                              value={row.end}
                              onChange={(e) => {
                                const value = e.target.value;
                                setForm((f) => {
                                  const hours = [...f.businessHours];
                                  hours[idx].end = value;
                                  return { ...f, businessHours: hours };
                                });
                              }}
                              disabled={row.end === "Closed"}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.segment}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, segment: e.target.value }))
                      }
                    >
                      <option value="First-party">First-party</option>
                      <option value="Third-party">Third-party</option>
                    </select>
                  </div>
                  {form.segment === "First-party" && (
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Micro-segment
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.microSegment}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            microSegment: e.target.value,
                          }))
                        }
                      >
                        {microSegments.map((seg) => (
                          <option key={seg} value={seg}>
                            {seg}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    Channels
                  </label>
                  <div className="text-zinc-500 text-xs mb-2">
                    Select the communication channels your assistant will use to
                    reach customers.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {channelOptions.map((channel) => (
                      <label
                        key={channel.key}
                        className={`flex items-center border rounded-lg p-4 w-full cursor-pointer transition-colors font-inter text-sm
                          ${
                            form.channels.includes(channel.key)
                              ? "border-blue-600 bg-blue-50"
                              : "border-zinc-200 bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.channels.includes(channel.key)}
                          onChange={() => toggleChannel(channel.key)}
                          className="mr-3 accent-blue-600"
                        />
                        <div className="flex flex-col">
                          <span className="text-xl mb-1">{channel.icon}</span>
                          <span className="font-medium text-zinc-900">
                            {channel.key}
                          </span>
                          <span className="text-xs text-zinc-500 text-left mt-1">
                            {channel.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className={primaryBtn} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            ) : step === 2 ? (
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Attributes & Data Source
                </h2>
                <div className="text-zinc-500 text-sm mb-4">
                  Review required data attributes and select your data source
                  and segmentation method.
                </div>
                <div className="overflow-x-auto mb-8">
                  {/* Info Banner for Attributes */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">
                          💡 Pro Tip: More Attributes = Better AI Predictions
                        </h4>
                        <p className="text-sm text-blue-700 mb-3">
                          We are only showing a limited set of attributes here, but there are <strong>200+ more attributes</strong> available. The more attributes you provide, the better our AI algorithm can predict user patterns, create more accurate segments, and deliver personalized collection strategies for optimal results.
                        </p>
                        <button
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium"
                          onClick={() => setShowAllAttributes(true)}
                        >
                          View All Available Attributes
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <table className="min-w-full border-separate border-spacing-y-2 bg-white rounded-xl shadow font-inter text-sm">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-700 text-sm">
                        <th className="px-4 py-2 rounded-tl-xl">Auto-create</th>
                        <th className="px-4 py-2 text-left">Attribute Name</th>
                        <th className="px-4 py-2 text-left">
                          Attribute Description
                        </th>
                        <th className="px-4 py-2 rounded-tr-xl">Mandatory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAttributes.map((attr) => (
                        <tr
                          key={attr.name}
                          className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                        >
                          <td className="px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly
                              className="accent-blue-600"
                            />
                          </td>
                          <td className="px-4 py-2 font-medium text-zinc-900">
                            {attr.name}
                          </td>
                          <td className="px-4 py-2 text-zinc-600">
                            {attr.desc}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span className="text-xs text-zinc-400">Yes</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Attribute Summary */}
                <div className="bg-zinc-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-zinc-600">
                        <strong>{attributes.length}</strong> Mandatory Attributes
                      </span>
                      <span className="text-zinc-600">
                        <strong>{recommendedAttributes.length}</strong> Recommended Attributes
                      </span>
                    </div>
                    <span className="text-blue-600 font-medium">
                      +30+ More Available
                    </span>
                  </div>
                </div>
                
                <h4 className="text-base font-semibold mb-1 mt-6">
                  Recommended Attributes
                </h4>
                <div className="text-zinc-500 text-xs mb-2">
                  Adding these attributes will improve segmentation and campaign
                  performance.
                </div>
                <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700 text-sm">
                      <th className="px-4 py-2 text-center">Auto-create</th>
                      <th className="px-4 py-2 text-left">Attribute Name</th>
                      <th className="px-4 py-2 text-left">
                        Attribute Description
                      </th>
                      <th className="px-4 py-2 text-center">Mandatory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecommendedAttributes.map((attr) => (
                      <tr
                        key={attr.name}
                        className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                      >
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={false}
                            readOnly
                            className="accent-blue-600"
                          />
                        </td>
                        <td className="px-4 py-2 font-medium text-zinc-900">
                          {attr.name}
                        </td>
                        <td className="px-4 py-2 text-zinc-600">{attr.desc}</td>
                        <td className="px-4 py-2 text-center">
                          <span className="text-xs text-zinc-400">No</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="text-base font-semibold mb-1">Data Source</h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Choose how you'll provide account data for the assistant.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 w-full">
                  {sources.map((src) => (
                    <label
                      key={src.key}
                      className={`flex items-center border rounded-lg p-6 w-full cursor-pointer transition-colors font-inter text-sm
                        ${
                          form.source === src.key
                            ? "border-blue-600 bg-blue-50"
                            : "border-zinc-200 bg-white hover:bg-zinc-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="source"
                        checked={form.source === src.key}
                        onChange={() =>
                          setForm((f) => ({ ...f, source: src.key }))
                        }
                        className="mr-4 accent-blue-600"
                      />
                      <span className="text-2xl mr-3">{src.icon}</span>
                      <div>
                        <span className="font-medium text-zinc-900">
                          {src.key}
                        </span>
                        <div className="text-xs text-zinc-500 mt-1">
                          {src.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <h3 className="text-base font-semibold mb-1">Segmentation</h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Select how segments will be defined for your accounts.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 w-full">
                  {segmentOptions.map((seg) => (
                    <label
                      key={seg.key}
                      className={`flex items-center border rounded-lg p-6 w-full cursor-pointer transition-colors font-inter text-sm
                        ${
                          form.segmentType === seg.key
                            ? "border-blue-600 bg-blue-50"
                            : "border-zinc-200 bg-white hover:bg-zinc-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="segmentType"
                        checked={form.segmentType === seg.key}
                        onChange={() =>
                          setForm((f) => ({ ...f, segmentType: seg.key }))
                        }
                        className="mr-4 accent-blue-600"
                      />
                      <div>
                        <span className="font-medium text-zinc-900">
                          {seg.title}
                        </span>
                        <div className="text-xs text-zinc-500 mt-1">
                          {seg.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Account Upload Section */}
                <div className="mt-4">
                  <h3 className="text-base font-semibold mb-1">
                    Upload Accounts
                  </h3>
                  <div className="text-zinc-500 text-xs mb-2">
                    Upload your account data in CSV format to begin processing.
                  </div>
                  <div className="border border-zinc-200 rounded-lg p-4 bg-white flex items-center gap-4">
                    <svg
                      className="w-6 h-6 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-900">
                        Drag and drop your CSV file here or
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      id="account-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          // Handle file upload
                          console.log("File selected:", e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="account-upload"
                      className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-black transition"
                    >
                      Choose File
                    </label>
                  </div>
                </div>

                <h3 className="text-base font-semibold mb-1 mt-4">
                  DPD Stages
                </h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Define the delinquency stages (DPD buckets) for your
                  portfolio.
                </div>
                <div className="mb-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-3 font-inter text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-700 text-sm">
                          <th className="px-4 py-2 text-left">Stage Name</th>
                          <th className="px-4 py-2 text-left">From (days)</th>
                          <th className="px-4 py-2 text-left">To (days)</th>
                          <th className="px-4 py-2 text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.dpds.map((dpd, idx) => (
                          <tr
                            key={idx}
                            className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl shadow-sm"
                          >
                            <td className="px-4 py-2">
                              <input
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.name}
                                onChange={(e) =>
                                  handleDpdChange(idx, "name", e.target.value)
                                }
                                placeholder="e.g. Early Stage"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.from}
                                onChange={(e) =>
                                  handleDpdChange(idx, "from", e.target.value)
                                }
                                placeholder="From"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.to}
                                onChange={(e) =>
                                  handleDpdChange(idx, "to", e.target.value)
                                }
                                placeholder="To"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className="relative group">
                                <button
                                  className="p-2 rounded-full hover:bg-red-100 transition"
                                  onClick={() => removeDpd(idx)}
                                  disabled={form.dpds.length === 1}
                                  aria-label="Remove DPD Stage"
                                >
                                  <svg width="20" height="20" fill="none">
                                    <circle
                                      cx="10"
                                      cy="10"
                                      r="10"
                                      fill="#D1FADF"
                                    />
                                    <path
                                      d="M6 10.5l3 3 5-5"
                                      stroke="#12B76A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-30 whitespace-nowrap shadow-lg">
                                  Remove DPD Stage
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 rounded-md bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 font-inter text-sm border border-blue-100"
                    onClick={addDpd}
                  >
                    + Add DPD Stage
                  </button>
                </div>
              </div>
            ) : step === 4 ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-5">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-zinc-900 mb-1">
                      AI Generated Segments
                    </h2>
                    <div className="text-zinc-500 text-sm mb-4">
                      Review and manage the segments generated by AI for your
                      portfolio.
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    {actualSegments.map((seg, idx) => (
                      <div
                        key={seg.id}
                        className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 shadow-sm"
                      >
                        <div className="text-lg font-bold text-blue-800 mb-2 truncate">
                          {seg.id}
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                              Conditions
                            </span>
                            <span className="text-sm text-zinc-700 font-mono bg-blue-50 px-2 py-1 rounded break-words">
                              {seg.logic}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                              Key Characteristics
                            </span>
                            <span className="text-sm text-zinc-700 bg-zinc-50 px-2 py-1 rounded break-words">
                              {seg.characteristics}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                              Messaging Focus
                            </span>
                            <span className="text-sm text-zinc-700 bg-green-50 px-2 py-1 rounded break-words">
                              {seg.focus}
                            </span>
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="flex flex-row gap-3 mt-2 justify-end border-t border-zinc-200 pt-4">
                          <button className={primaryBtn}>Edit</button>
                          <button className={secondaryBtn}>
                            Go to Journey
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Sticky Go to Dashboard button */}
                <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4 z-10">
                  <div className="flex justify-end">
                    <button
                      className={primaryBtn}
                      onClick={() => navigate("/")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* Sticky button within content area */}
          {!showAIMagic && step === 2 && (
            <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4">
              <div className="flex justify-end">
                <button className={primaryBtn} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showAllAttributes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">All Available Attributes</h2>
                  <p className="text-blue-100 mt-1">Browse and add attributes to your mandatory or recommended lists</p>
                </div>
                <button
                  className="text-white hover:text-blue-200 transition-colors p-2"
                  onClick={() => setShowAllAttributes(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
              {attributeCategories.map((category) => (
                <div key={category.title} className="mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      {category.title.includes("Client Portfolio") && "Data from your CRM, lead files, and servicing systems"}
                      {category.title.includes("Internal Interaction") && "Data generated through our AI platform interactions"}
                      {category.title.includes("External Enrichment") && "Data from third-party providers and public records"}
                      {category.title.includes("Real-time Interaction") && "Data captured during live conversations"}
                    </p>
                  </div>
                  {category.groups.map((group) => (
                    <div key={group.group} className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-medium text-gray-800">{group.group}</h4>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {group.items.map((item) => {
                          const isInMandatory = currentAttributes.find(attr => attr.name === item);
                          const isInRecommended = currentRecommendedAttributes.find(attr => attr.name === item);
                          return (
                            <div key={item} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 text-sm">{item}</div>
                                  {isInMandatory && (
                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                      ✓ Added to Mandatory
                                    </span>
                                  )}
                                  {isInRecommended && !isInMandatory && (
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                      ✓ Added to Recommended
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                  {!isInMandatory && (
                                    <button
                                      onClick={() => addToMandatory({ name: item, desc: item, mandatory: true })}
                                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                                    >
                                      Add to Mandatory
                                    </button>
                                  )}
                                  {!isInRecommended && (
                                    <button
                                      onClick={() => addToRecommended({ name: item, desc: item, mandatory: false })}
                                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                      Add to Recommended
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{currentAttributes.length}</span> Mandatory • 
                  <span className="font-medium"> {currentRecommendedAttributes.length}</span> Recommended
                </div>
                <button
                  onClick={() => setShowAllAttributes(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
