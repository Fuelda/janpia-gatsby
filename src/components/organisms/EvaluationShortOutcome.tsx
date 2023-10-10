import React from "react";
import { table, td, th, th2Sub } from "../../styles/table";
import "twin.macro";

type evaluationShortOutcomeType = {
  node: {
    biz_cd_executive: string | null;
    biz_cd_fund_distr: string | null;
    business_cd: string | null;
    business_org_type: string | null;
    create_date: Date | null;
    criteria_method: string | null;
    criteria_st_value: string | null;
    eval_factors: string | null;
    eval_item: string | null;
    eval_season: string | null;
    eval_sub_item: string | null;
    index_achievement: string | null;
    index_business_goals: string | null;
    index_goal: string | null;
    index_grasp: string | null;
    index_index: string | null;
    index_monitoring: string | null;
    index_output: string | null;
    info_type: number;
    insert_id: string | null;
    mm_col_method: string | null;
    mm_if_source: string | null;
    mm_required_data: string | null;
    row_no: number;
  };
};

const EvaluationShortOutcome = (props: {
  data: evaluationShortOutcomeType[];
}) => {
  const data = props.data;

  return (
    <table css={table}>
      {props &&
        data.map((item, i) => (
          <tbody key={item.node.info_type + i}>
            <tr tw="lg:hidden">
              <th css={th2Sub} rowSpan={7}>
                {i + 1}
              </th>
              <th css={th}>
                {item.node.index_business_goals
                  ? "短期アウトカム"
                  : "アウトプット"}
              </th>
              <td css={td}>
                {item.node.index_business_goals && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.node.index_business_goals.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                )}
                {item.node.index_output && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.node.index_output.replace(/\n/g, "<br />"),
                    }}
                  />
                )}
              </td>
            </tr>
            <tr tw="lg:hidden">
              <th css={th}>モニタリング</th>
              <td css={td}>
                {(item.node.index_monitoring === "true" && "はい") ||
                  (item.node.index_monitoring === "false" && "いいえ")}
              </td>
            </tr>
            {item.node.index_index && (
              <tr tw="lg:hidden">
                <th css={th}>実施・到達状況の目安となる指標</th>
                <td css={td}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.node.index_index.replace(/\n/g, "<br />"),
                    }}
                  />
                </td>
              </tr>
            )}
            <tr tw="lg:hidden">
              <th css={th}>把握方法</th>
              <td css={td}>{item.node.index_grasp}</td>
            </tr>
            {item.node.index_goal && (
              <tr tw="lg:hidden">
                <th css={th}>目標値/目標状態</th>
                <td css={td}>
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.node.index_goal.replace(/\n/g, "<br />"),
                      }}
                    />
                  }
                </td>
              </tr>
            )}
            <tr tw="lg:hidden">
              <th css={th}>目標達成時期</th>
              <td css={td}>{item.node.index_achievement}</td>
            </tr>

            <tr tw="hidden lg:block">
              <th css={th2Sub} rowSpan={7}>
                {i + 1}
              </th>
              <td>
                <p css={th}>
                  {item.node.index_business_goals
                    ? "短期アウトカム"
                    : "アウトプット"}
                </p>
                <div css={td}>
                  {item.node.index_business_goals && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.node.index_business_goals.replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    />
                  )}
                  {item.node.index_output && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.node.index_output.replace(/\n/g, "<br />"),
                      }}
                    />
                  )}
                </div>
                <div>
                  <p css={th}>モニタリング</p>
                  <div css={td}>
                    {(item.node.index_monitoring === "true" && "はい") ||
                      (item.node.index_monitoring === "false" && "いいえ")}
                  </div>
                </div>
                {item.node.index_index && (
                  <div>
                    <p css={th}>実施・到達状況の目安となる指標</p>
                    <div css={td}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.node.index_index.replace(
                            /\n/g,
                            "<br />"
                          ),
                        }}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <p css={th}>把握方法</p>
                  <div css={td}>{item.node.index_grasp}</div>
                </div>
                {item.node.index_goal && (
                  <div>
                    <p css={th}>目標値/目標状態</p>
                    <div css={td}>
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.node.index_goal.replace(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        />
                      }
                    </div>
                  </div>
                )}
                <div>
                  <p css={th}>目標達成時期</p>
                  <div css={td}>{item.node.index_achievement}</div>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  );
};

export default EvaluationShortOutcome;
