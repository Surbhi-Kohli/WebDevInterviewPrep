## Question 1: Handling Product vs. Engineering Conflict"As a Senior Engineer, you will often face situations where the Product Manager wants to rush a critical feature to market, but you know the code needs major refactoring or has high technical debt. Can you tell me about a time you disagreed with a Product Manager or stakeholder on a timeline due to technical concerns, and how you resolved it?" OR How did you navigate between a long term stable but time-consuming vs short term , easy to ship solution

* Situation: "We were tasked with adding Single Sign-On (SSO) to our platform. The immediate business requirement was to integrate with PingFederate."
* Task: "The Product Manager wanted to ship the PingFed integration rapidly to close a deal. However, looking at our roadmap, I knew we would eventually need to support Azure AD, Okta, and Google Workspace.
* "Action (The Critical Part): "Instead of just saying 'no,' I translated the technical risk into business terms for the PM. I explained that hardcoding PingFed would mean a 3x development cost later when onboarding the next client. I proposed a compromise: we would build an abstraction layer (an IdP broker) internally. To keep the timeline intact, I narrowed the scope of the broker to only support PingFed for the first release, but kept the architecture pluggable."
* Result: "We shipped the PingFed integration on time. Six months later, when a major enterprise client demanded Okta integration, we spun it up in two weeks instead of two months because the architecture was already there. The PM later thanked me for fighting for that design."


## Question 2 : Can you tell me about a time you noticed a peer or junior engineer struggling with a technical concept or project, and how you mentored them through it? What was the outcome?"
* Situation: "A junior engineer on my team was tasked with building a feature to process a massive export of historical data from our primary database."
* Task: "During the pull request review, I noticed they implemented traditional offset-based pagination. While this worked in staging, I knew that in production, concurrent background processes were constantly updating the same tables. This meant the junior's approach would cause data duplication, skipped rows, and heavy database load."
* Action (The Mentorship Part): "Instead of just rejecting the PR or giving them the answer, I set up a quick 15-minute pairing session. I used a digital whiteboard to visualize how database writes happen during an offset scan, allowing them to realize the race condition on their own. Once they understood the 'why,' I guided them toward a cursor-based pagination strategy using indexed keys. I pointed them to a couple of internal architectural patterns to read through and let them refactor the code themselves.
* "Result: "The junior successfully refactored the pipeline to use cursor pagination. The feature launched smoothly with zero data inconsistencies. More importantly, the junior learned a foundational distributed systems concept and successfully applied cursor-based logic to their next two projects completely independently."

## Question 3 : As seniors, we take risks and sometimes things break. Can you tell me about a time you made a technical mistake or misjudgment that caused an issue in production? What happened, how did you handle the immediate fallout, and what did you put in place to ensure it didn't happen again?

* Situation & Task: "During a high-pressure week on production support, I was simultaneously managing a critical production deployment while triaging multiple red alerts and support tickets."
* Action: "Due to the context-switching, I missed a manual configuration update during the deployment step, which triggered a production fallout. The moment the monitoring alerts fired, I owned the mistake immediately. I notified my manager and tech lead, triaged the root cause, and collaborated to quickly coordinate an emergency change request (CRQ) to redeploy with the correct configuration, minimizing our downtime."
* Result: "Once production was stable, I drafted a detailed Root Cause Analysis (RCA). I realized the true vulnerability wasn't human error, but the manual step itself. I partnered with our SRE team to completely automate the configuration injection into our continuous delivery (CD) pipeline. This eliminated manual drift entirely, ensuring that this specific category of deployment failure could never happen again."

## Question 4: Give an example of some work which shows your Customer obsession, security vs UX, ownership ?

One project I'm particularly proud of was improving the account-linking experience for Cisco Security Cloud customers who were linking their existing Duo accounts.

* The flow worked like this (Sitaution): when an administrator initiated account linking, we sent them an email containing a secure provisioning link. That link contained a short-lived bearer token valid for seven days. If the administrator didn't use the link within that period, it expired and they had no self-service recovery path—they had to contact support to generate a new link.
* Task : We wanted to make the resend link flow somehow self service or better UX for customer.
* Action : At first glance, one possible solution was simply to increase the token validity from 7 days to 14 or even 30 days. That would reduce the number of expired links. However, after analyzing the security implications, we realized this wasn't the right solution.
The provisioning link contained a bearer token embedded in the email URL. If an attacker gained temporary access to the administrator's mailbox through phishing or email compromise, they could use that token to link the wrong Duo account to a Cisco Security Cloud billing relationship. Increasing the token lifetime would significantly increase that attack window, which weakened our security posture.

Instead, we focused on solving the customer's actual problem rather than the symptom. The customer didn't need longer-lived tokens—they needed a simple way to recover when a token expired.

We designed a secure self-service resend flow. When an administrator clicked an expired link, we showed a "Resend provisioning email" option. Behind the scenes, the resend request went through our existing event-driven provisioning pipeline, where we validated that the request still existed, hadn't already been completed, belonged to the correct administrator, and hadn't exceeded the allowed resend limit before generating a brand-new short-lived token. The original expired token remained unusable.

I liked this solution because it balanced both customer experience and security. Customers could recover without contacting support, while we preserved the security principle of keeping bearer tokens short-lived. We also added controls like resend limits and an audit trail, making the feature secure, observable, and easier to operate.


## Question 5 : You clearly have the technical depth and leadership skills we are looking for. But out of all the companies you could join right now, why do you want to bring your talents specifically to our company?

I want to join XX because I am genuinely fascinated by the IAM and security domain. In my past roles, I’ve had hands-on experience building custom SSO flows and working alongside enterprise identity products like Duo. I know firsthand how incredibly complex, business-critical, and high-stakes identity infrastructure is. XX is the gold standard in this space. Joining this team allows me to apply my domain expertise to solve identity problems at a massive, global scale, alongside the engineers who are actively shaping the future of web security.

