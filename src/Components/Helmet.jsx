import React from "react";
import { Helmet } from "react-helmet";

const CustomHelmet = ({data}) => {
    const {title, description, twitterTitle, twitterDesc, twitterSite, twitterCreator, twitterImage, ogType, ogUrl, ogTitle, ogDesc, ogImage} = data;
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      {/* Twitter SEO */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={twitterTitle} />
      <meta
        property="twitter:description"
        content={twitterDesc}
      />
      <meta property="twitter:site" content={twitterSite} />
      <meta property="twitter:creator" content={twitterCreator} />
      <meta property="twitter:image:src" content={twitterImage} />
      {/* Facebook SEO */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta
        property="og:description"
        content={ogDesc}
      />
      <meta property="og:image" content={ogImage} />

    </Helmet>
  );
};

export default CustomHelmet;
