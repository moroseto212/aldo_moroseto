import { profile, skills } from "@/data/profile";
import { contact, sameAs, site } from "@/data/site";

type StructuredData = Record<string, unknown>;

function person(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: profile.shortName,
    url: site.url,
    image: `${site.url}${profile.photo}`,
    jobTitle: profile.role,
    description: site.description,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    knowsAbout: [...new Set(skills.flatMap((group) => group.items))],
    alumniOf: profile.education.map((item) => ({
      "@type": item.type,
      name: item.name,
      description: item.degree,
    })),
    sameAs,
  };
}

function website(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    publisher: { "@id": `${site.url}/#person` },
  };
}

export function profilePage(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/tentang#profile-page`,
    url: `${site.url}/tentang`,
    name: `Tentang ${site.name}`,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
  };
}

/** Structured data untuk identitas & situs, dipakai di layout utama. */
export function IdentityJsonLd() {
  return (
    <>
      <JsonLd data={person()} />
      <JsonLd data={website()} />
    </>
  );
}

export default function JsonLd({ data }: { data: StructuredData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
