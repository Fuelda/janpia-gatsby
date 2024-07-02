import { useState, useEffect } from "react";

const useStrapiSelectedReportPdf = (slug: string, endpoint: string) => {
  const [pdfUrlArray, setPdfUrlArray] = useState<
    { url: string; round: number; updatedAt: string }[]
  >([]);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const strapiApiURL = process.env.STRAPI_API_URL;

  useEffect(() => {
    const fetchStrapiPdf = async () => {
      setIsPdfLoading(true);
      setError(null);
      try {
        const fdoResponse = await fetch(
          `${strapiApiURL}api/${endpoint}?fields[0]=round&populate[data][fields][0]=url&filters[$and][0][biz_cd_fund_distr][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=F`
        );
        const adoResponse = await fetch(
          `${strapiApiURL}api/${endpoint}?fields[0]=round&populate[data][fields][0]=url&filters[$and][0][biz_cd_executive][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=A`
        );
        const fdoData = await fdoResponse.json();
        const adoData = await adoResponse.json();

        let dataArray;
        if (fdoData.data && fdoData.data.length > 0) {
          dataArray = fdoData.data.map((item: any) => {
            return {
              url: item.attributes.data.data.attributes.url,
              round: item.attributes.round,
              updatedAt: item.attributes.updatedAt,
            };
          });
        }
        if (adoData.data && adoData.data.length > 0) {
          dataArray = adoData.data.map((item: any) => {
            return {
              url: item.attributes.data.data.attributes.url,
              round: item.attributes.round,
              updatedAt: item.attributes.updatedAt,
            };
          });
        }

        if (dataArray.length > 0) {
          setPdfUrlArray(dataArray);
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

  return { pdfUrlArray, isPdfLoading, error };
};

export default useStrapiSelectedReportPdf;
