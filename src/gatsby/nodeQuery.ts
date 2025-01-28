const nodeQuery = {
  bizPlan: `{
    allStrapiBizPlan {
      edges {
        node {
          business_cd
          business_org_type
          biz_cd_fund_distr
          fund_distr_grp_cd
          executive_grp_cd
          insert_id
        }
      }
    }
  }`,
  bizPlanGroup: `{
    allStrapiBizPlanGroup {
      edges {
        node {
          business_cd
          organization_cd
        }
      }
    }
  }`,
  group: `{
    allStrapiGroup {
      edges {
        node {
          insert_id
          organization_cd
          
          
        }
      }
    }
  }`,
  evaluationPlan: `{
    allStrapiEvaluationPlan {
      edges {
        node {
          business_cd
          insert_id
        }
      }
    }
  }`,

  bizPlanManual: `{
    allStrapiBizPlanManual {
      edges {
        node {
          business_org_type
          biz_cd_executive
          biz_cd_fund_distr
          fund_distr_grp_cd
          executive_grp_cd
        }
      }
    }
  }`,
  bizPlanGroupManual: `{
    allStrapiBizPlanGroupManual {
      edges {
        node {
          business_org_type
          biz_cd_executive
          biz_cd_fund_distr
          fund_distr_grp_cd
          executive_grp_cd
        }
      }
    }
  }`,
  news: `{
    allStrapiNew {
      edges {
        node {
          id 
        }
      }
    }
  }`,
};

module.exports = nodeQuery;
