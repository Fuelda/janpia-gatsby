const algoliaQuery = {
  attachedFiles: `{
    allStrapiAttachedFile {
      edges {
        node {
          id
          insert_id
          file_name
          notes
        }
      }
    }
  }`,
  attachedFileText: `{
    allStrapiAttachedFileText {
      edges {
        node {
          id
          insert_id
          content {
            data {
              content
            }
          }
        }
      }
    }
  }`,
  bizPlan: `{
    allStrapiBizPlan {
      edges {
        node {
          id
          business_cd
          business_name
          business_name_sub
          vision {
            data {
              vision
            }
          }
          mission {
            data {
              mission
            }
          }
          business_overview {
            data {
              business_overview 
            }
          }       
          social_issues {
            data {
              social_issues
            }
          }      
          significance {
            data {
              significance
            }
          }    
        }
      }
    }
  }`,
  group: `{
    allStrapiGroup {
      edges {
        node {
          id
          organization_cd
          representative_kana
          representative_kana2
          organization_name
        }
      }
    }
  }`,
  bizPlanManual: `{
    allStrapiBizPlanManual {
      edges {
        node {
          id
          biz_cd_executive
          biz_cd_fund_distr
          business_name
          business_overview {
            data {
              business_overview
            }
          }
        }
      }
    }
  }`,
  bizPlanSub: `{
    allStrapiBizPlanSub {
      edges {
        node {
          id
          business_goals {
            data {
              business_goals
            }
          }
          goals_monitoring {
            data {
              goals_monitoring
            }
          }
          goals_index {
            data {
              goals_index
            }
          }
          goals_index_arrival {
            data {
              goals_index_arrival
            }
          }
          goals_grasp {
            data {
              goals_grasp 
            }
          }
          output {
            data {
              output
            }
          }
          output_monitor {
            data {
              output_monitor
            }
          }
          output_index {
            data {
              output_index
            }
          }
          output_index_arrival {
            data {
              output_index_arrival
            }
          }
          output_grasp {
            data {
              output_grasp
            }
          }
          output_activity {
            data {
              output_activity
            }
          }        
          activity {
            data {
              activity
            }
          }
          business_cd
        }
      }
    }
  }`,
};

module.exports = algoliaQuery;
