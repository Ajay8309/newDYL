import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Decode Your Life | Science + Spirituality",
    description = "Transform your life with consciousness decoding, tarot guidance, and integrated healing. Science meets spirituality for lasting shifts.",
    keywords = "consciousness decoding, tarot guidance, reiki healing, akashic records, numerology, spiritual healing",
    image = "https://www.decodeyourlife.in/og-image.jpg", // Replace with actual OG image URL
    url = "https://www.decodeyourlife.in",
    type = "website",
    schemaData = null
}) => {
    const siteTitle = title.includes("Decode Your Life") ? title : `${title} | Decode Your Life`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Structured Data */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical Link */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
