import { Helmet } from "react-helmet-async";


const HelmetSeo = ({ title, canonical, description }) => {
    return (
        <Helmet>
            <title>{`${title || ""} - The winter brand`}</title>
            <link rel="canonical" href={`https://the-winter-brand.web.app/${canonical || ""}`} />
            <meta name="description" content={description || ""} />
        </Helmet>
    );
};

export default HelmetSeo;