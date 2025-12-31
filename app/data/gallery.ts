export const galleryData = {
  name: "Boiler",
  title: "Boiler - underground gallery in Copenhagen",
  description:
    "Boiler is an underground gallery in Copenhagen by architect Kristian Eley and art historian Johanne Schrøder. The program is focused on project-based artist collaborations and is shaped by curiosity, a sensibility to matter, and the meeting of generations. The first exhibitions will feature established Danish artists.",
  shortDescription:
    "BOILER is an underground gallery by architect Kristian Eley and art historian Johanne Schrøder.",
  url: "https://boiler19.com",
  siteName: "Boiler",
  address: {
    streetAddress: "Store Strandstræde 19",
    addressLocality: "Copenhagen",
    postalCode: "1255",
    addressCountry: "DK",
  },
  geo: {
    latitude: "55.6805",
    longitude: "12.5849",
  },
  telephone: "+45 41 27 11 88",
  email: "kristian@boiler19.com",
  instagramUrl: "https://www.instagram.com/boiler_19/",
  keywords:
    "art gallery, contemporary art, Copenhagen, Denmark, exhibitions, artworks",
  ogImage: "https://boiler19.com/og-image.png",
  ogImageAlt: "Boiler - underground gallery in Copenhagen",
  companyName: "Boiler19",
  contactPoints: [
    {
      name: "Kristian Eley",
      title: "Founder and Director",
      email: "kristian@boiler19.com",
      telephone: "+45 42628688",
    },
    {
      name: "Johanne Schrøder",
      title: "Director",
      email: "johanne@boiler19.com",
      telephone: "+45 60240966",
    },
  ],
} as const;

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  name: galleryData.name,
  description: galleryData.description,
  url: galleryData.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: galleryData.address.streetAddress,
    addressLocality: galleryData.address.addressLocality,
    postalCode: galleryData.address.postalCode,
    addressCountry: galleryData.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: galleryData.geo.latitude,
    longitude: galleryData.geo.longitude,
  },
  telephone: galleryData.telephone,
  email: galleryData.email,
} as const;

export const structuredDataAbout = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: structuredData,
} as const;

export const structuredDataContact = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "ArtGallery",
    name: galleryData.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: galleryData.address.streetAddress,
      addressLocality: galleryData.address.addressLocality,
      postalCode: galleryData.address.postalCode,
      addressCountry: galleryData.address.addressCountry,
    },
    telephone: galleryData.telephone,
    email: galleryData.email,
    contactPoint: galleryData.contactPoints.map((point) => ({
      "@type": "ContactPoint",
      telephone: point.telephone,
      email: point.email,
      contactType: point.title,
    })),
  },
} as const;
