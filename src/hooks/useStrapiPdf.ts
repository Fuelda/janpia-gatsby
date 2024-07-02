import { useState, useEffect } from "react";

const useStrapiPdf = (slug: string, endpoint: string) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const strapiApiURL = process.env.STRAPI_API_URL;

  useEffect(() => {
    const fetchStrapiPdf = async () => {
      setIsPdfLoading(true);
      setError(null);
      try {
        const fdoResponse = await fetch(
          `${strapiApiURL}api/${endpoint}?fields[0]=biz_cd_fund_distr&populate[data][fields][0]=url&filters[$and][0][biz_cd_fund_distr][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=F`
        );
        const adoResponse = await fetch(
          `${strapiApiURL}api/${endpoint}?fields[0]=biz_cd_executive&populate[data][fields][0]=url&filters[$and][0][biz_cd_executive][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=A`
        );
        const fdoData = await fdoResponse.json();
        const adoData = await adoResponse.json();

        let data;
        if (fdoData.data && fdoData.data.length > 0) {
          data = fdoData.data[0].attributes.data.data.attributes.url;
        }
        if (adoData.data && adoData.data.length > 0) {
          data = adoData.data[0].attributes.data.data.attributes.url;
        }

        if (data) {
          setPdfUrl(`https://docs.google.com/viewer?url=${data}&embedded=true`);
        } else {
          setError("No PDF URL found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch PDF URL");
      } finally {
        setIsPdfLoading(false);
      }
    };

    fetchStrapiPdf();
  }, [slug, strapiApiURL]);

  return { pdfUrl, isPdfLoading, error };
};

export default useStrapiPdf;
