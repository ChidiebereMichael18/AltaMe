import { Identity } from './generate';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function formatIdentityAsText(identity: Identity): string {
  const w = (label: string, value: string) =>
    `${label.padEnd(26)}${value}`;

  const lines = [
    `ALTAME — Generated Identity`,
    `Country: ${identity.country}`,
    `═══════════════════════════════════════════════════════`,
    ``,
    `── PERSONAL ──`,
    w('Full Name',           identity.fullName),
    w('Date of Birth',       identity.dateOfBirth),
    w('Age',                 `${identity.age}`),
    w('Gender',              identity.gender),
    w('Zodiac Sign',         identity.zodiacSign),
    w("Mother's Maiden",     identity.mothersMaidenName),
    w('Nationality',         identity.nationality),
    ``,
    `── PHYSICAL ──`,
    w('Height',              identity.height),
    w('Weight',              identity.weight),
    w('Blood Type',          identity.bloodType),
    ``,
    `── OFFICIAL DOCUMENTS ──`,
    w(identity.nationalIdLabel, identity.nationalId),
    w(identity.licenseLabel,    identity.licenseId),
    ``,
    `── CONTACT ──`,
    w('Address',             identity.fullAddress),
    w('Phone',               identity.phone),
    w('Email',               identity.email),
    w('Geo Coordinates',     `${identity.latitude}, ${identity.longitude}`),
    ``,
    `── ONLINE ──`,
    w('Username',            identity.username),
    w('Password',            identity.password),
    w('Website',             identity.website),
    w('GUID',                identity.guid),
    w('User Agent',          identity.userAgent),
    ``,
    `── FINANCE ──`,
    w('Card Type',           identity.cardType),
    w('Card Number',         identity.cardNumber),
    w('Expiry',              identity.cardExpiry),
    w('CVV',                 identity.cardCVV),
    ``,
    `── EMPLOYMENT ──`,
    w('Company',             identity.company),
    w('Occupation',          identity.occupation),
    ``,
    `── OTHER ──`,
    w('Favourite Color',     identity.favoriteColor),
    w('Vehicle',             identity.vehicle),
    ``,
    `═══════════════════════════════════════════════════════`,
    `Generated ${new Date(identity.generatedAt).toLocaleString('en-GB')}`,
    `altame.io`,
  ];
  return lines.join('\n');
}
