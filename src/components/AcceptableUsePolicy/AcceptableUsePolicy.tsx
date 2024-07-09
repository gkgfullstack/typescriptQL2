import React from 'react';
import { Row, Col, Layout } from 'antd';


type AcceptableUsePolicyProps = {};

const AcceptableUsePolicy: React.FC<AcceptableUsePolicyProps> = () => {
  return (
    <Layout>
      <Row style={{ marginBottom: '24px' }}>
        <Col span={24} className="gutter-row" style={{ textAlign: 'center', padding: '15px' }}>
          <h2>Acceptable Use Policy<br />
Last Modified: 02/12/2019</h2>
        </Col>
      </Row>
      <Row style={{ marginBottom: '24px' }}>
        <Col span={24} className="gutter-row" style={{  padding: '25px' }}>
          <h5>A. General</h5>
          <p style={{ lineHeight: '20px' }}>QL2 and its affiliates ("QL2") provide a variety of commercially available information, Internet, network and technology related services ("Services"). QL2 has formulated this Acceptable Use Policy ("AUP") to ensure the appropriate completeness and use of the Services and the QL2 network, systems and facilities ("Infrastructure") by our customers, our customers customers, member, or end-users and any other parties who use or access the Services or the Infrastructure (collectively, "Users"). All Users must comply with this AUP. QL2 reserves the right to change this AUP from time to time and will notify Users by posting a revised copy of the AUP on the QL2 website. By using or accessing the QL2 Services or Infrastructure, Users agree to be bound by the terms of this AUP. Any indirect or attempted violation of this policy by or on behalf of a User, and any actual or attempted violation by a third party on behalf of a User, shall be considered a violation of the policy by the User and the User shall be held directly accountable therefore.</p>
          <p></p>
          <h5>B. Acceptable Use</h5>

          <p style={{ lineHeight: '20px' }}>Users shall not use the QL2 Services or Infrastructure to transmit, distribute, or store material: (a) in violation of any applicable law, regulations or judicial order (b) that violates the terms of this AUP, the terms of any applicable agreement with QL2, or any other QL2 policy applicable through the Agreement; (c) that interferes with or adversely affects the Services or Infrastructure or use of the Services or Infrastructure by other QL2 customers; or (d) that may expose QL2 to criminal or civil liability. Users shall cooperate with QL2 in investigating and correcting any apparent breach of this AUP. Users shall be solely responsible for any material that they maintain, transmit, download, view, post, distribute, or otherwise access or make available using the Services or Infrastructure.</p>
          <p></p>
          <p style={{ lineHeight: '20px' }}>In particular, but without limiting the more general prohibitions in this AUP, Users shall not use the Services or Infrastructure, or assist anyone else to:</p>
          <ol style={{ margin: '0px', padding: '10px 10px', lineHeight: '20px' }}>
            <li style={{ marginBottom: '20px' }}>Transmit, distribute, or store information or material that, as reasonably determined by QL2, is (a) inappropriate, obscene (including child pornography), defamatory, threatening, abusive, advocating violence or which violates a law, regulations, or public policy; (b) harmful to or interferes with QL2's provision of Services, the Infrastructure, or any third party's networks, equipment, applications, services or Web sites (e.g. viruses, worms, Trojan horses, etc.); (c) would infringe, dilute misappropriate, or otherwise violate any privacy, intellectual property, publicity or other personal rights including, without limitation, copyrights, patents, trademarks, trade secrets or other proprietary information (including unauthorized use of domain names); (d) fraudulent or contains false, deceptive, or misleading statements, claims or representations (such as "phishing"); (e) violates generally accepted standards of Internet usage;</li>
            <li style={{ marginBottom: '20px' }}>Attempt to disrupt, degrade, impair or violate the integrity or security of the Services or Infrastructure or the computers, services, accounts or networks of any other party (e.g., "hacking", "denial of service" attacks, etc.), including any activity that typically precedes attempts to breach security such as scanning, probing, or other testing or vulnerability assessment activity, or engaging in or permitting any network or hosting activity that results in the blacklisting or other blockage of QL2 IP space;</li>
            <li style={{ marginBottom: '20px' }}> Avoid incurring charges or otherwise being required to pay for Services;</li>
            <li style={{ marginBottom: '20px' }}>Transmit unsolicited bulk e-mail messages ("Spam"); having third parties send out Spam on any user's behalf; receiving replies from unsolicited emails (commonly referred to as "drop-box" accounts), or configuring any email server in such a way that it will accept third party emails for forwarding (e.g. "open mail relay"). Bulk email may only be sent to recipients how have expressly requested receipt of such e-mail messages via a "verified opt-in" process, which must be adhered to in its entirety for QL2 to consider any bulk email to be "solicited". Users that send bulk email must maintain complete and accurate records of all e-mail subscription requests (verified opt-ins), specifically including the email and associated headers sent by every subscriber, and to immediately provide QL2 with such records upon request of QL2. If a site has roaming users who wish to use a common mail server, the mail server must be configured to require user identification and authorization. Users are also prohibited from using the service of another provider to send Spam in order to promote a site hosted on or connected to the Services or Infrastructure, and Users shall not use the Services or Infrastructure in order to (a) send e-mail messages that are excessive and/or intended to harass or annoy others, (b) continue to send e-mail message to a recipient that has indicated that he/she does not wish to receive them, (c) send e-mail with forged TCP/IP packet header information, or (d) send malicious e-mail including, without limitation,"mailbombing".</li>
            <li style={{ marginBottom: '20px' }}>Violate any charters, policies, rules, or agreements promulgated by any search engines, subscription Web services, chat areas, bulletin boards, Web pages, USENET, or other services accessed via the Services or Infrastructure ("Usenet Rules"), including, ,without limitation, any cross postings to unrelated news groups, continued posting of off-topic messages, and disrupting newsgroups with materials, postings, or activities that are inappropriate (as determined by QL2 in its sole discretion), unless such materials or activities are expressly allowed or encourage under the Usenet Rules;</li>
            <li style={{ marginBottom: '20px' }}>Violate the applicable acceptable use policies of other ISPs when data, content, or other communications are carried across the networks of such ISPs.</li>
          </ol>
          <p></p>
          <h5>C. QL2's Rights and Remedies</h5>
          <p style={{ lineHeight: '20px' }}>QL2 has no responsibility for any material or information created, stored, maintained, transmitted, or accessible on or through the Services or Infrastructure and is not obligated to monitor or exercise any editorial control over such material. In the event that QL2 becomes aware that any such material may violate this AUP and/or expose QL2 to civil or criminal liability, QL2 reserves the right to investigate such material, block access to such material and suspend or terminate any Services without liability. QL2 further reserves the right to cooperate with legal authorities and third parties in investigating any alleged violations of this AUP, including disclosing the identity of any User that QL2 believes is responsible for such violation. QL2 also reserves the right to implement technical mechanisms to prevent AUP violations. QL2 may collect and distribute information from User's websites to Users as part of the Services.</p>
          <p></p>
          <p style={{ lineHeight: '20px' }}>
            Nothing in this AUP shall limit in any way QL2's rights and remedies at law or in equity that may otherwise be available.
</p>
        </Col>
      </Row>


    </Layout>
  );
};
export default AcceptableUsePolicy;
