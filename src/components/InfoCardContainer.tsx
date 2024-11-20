import { FunctionComponent } from "react";
import { css } from "@emotion/css";

export type InfoCardContainerType = {
  className?: string;
};

const InfoCardContainer: FunctionComponent<InfoCardContainerType> = ({
  className = "",
}) => {
  return (
    <div
      className={[
        css`
          width: 1195px;
          margin: 0 !important;
          position: absolute;
          bottom: -90px;
          left: -1075px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-3xl) var(--padding-base) var(--padding-lgi);
          box-sizing: border-box;
          gap: var(--gap-13xl);
          z-index: 3;
          text-align: left;
          font-size: var(--font-size-base);
          color: var(--color-white);
          font-family: var(--font-inter);
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 361px;
          border-radius: var(--br-xs);
          background-color: var(--secondary);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-45xl) var(--padding-xl) var(--padding-18xl)
            var(--padding-5xl);
          box-sizing: border-box;
          position: relative;
          gap: var(--gap-14xl);
          max-width: 100%;
          z-index: 1;
        `}
      >
        <b
          className={css`
            position: relative;
            letter-spacing: 0.02em;
            line-height: 20px;
          `}
        >
          No Recruitment Agent Fees
        </b>
        <div
          className={css`
            align-self: stretch;
            height: 80px;
            position: relative;
            letter-spacing: 0.02em;
            line-height: 22px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
          `}
        >
          Say goodbye to costly recruitment agents. You’ll have the power to
          navigate the entire process yourself, equipped with all the tools and
          information you need to succeed.
        </div>
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: absolute;
            margin: 0 !important;
            bottom: -0.3px;
            left: -0.5px;
          `}
        >
          <img
            className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              z-index: 1;
            `}
            alt=""
            src="/overlay.svg"
          />
          <img
            className={css`
              position: absolute;
              top: 23.7px;
              left: 24px;
              width: 24px;
              height: 24px;
              overflow: hidden;
              z-index: 2;
            `}
            loading="lazy"
            alt=""
            src="/radio.svg"
          />
        </div>
      </div>
      <div
        className={css`
          flex: 1;
          border-radius: var(--br-xs);
          background-color: var(--secondary);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-5xl) var(--padding-xl) var(--padding-5xl)
            var(--padding-5xl);
          box-sizing: border-box;
          position: relative;
          gap: var(--gap-base);
          max-width: 100%;
        `}
      >
        <img
          className={css`
            width: 24px;
            height: 24px;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
          `}
          alt=""
          src="/radio-1.svg"
        />
        <b
          className={css`
            position: relative;
            letter-spacing: 0.02em;
            line-height: 20px;
          `}
        >
          Direct Access to Recruitment Contacts
        </b>
        <div
          className={css`
            position: relative;
            letter-spacing: 0.02em;
            line-height: 22px;
          `}
        >
          Get essential contacts for athletic programs and colleges, allowing
          you to take control of your recruitment process, communicate with
          coaches, and secure your spot—all on your own terms.
        </div>
        <img
          className={css`
            width: 1175px;
            height: 255px;
            position: absolute;
            margin: 0 !important;
            top: -12px;
            right: -402px;
          `}
          alt=""
          src="/overlay-1.svg"
        />
      </div>
      <div
        className={css`
          width: 361px;
          border-radius: var(--br-xs);
          background-color: var(--secondary);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-5xl) var(--padding-xl) var(--padding-5xl)
            var(--padding-5xl);
          box-sizing: border-box;
          gap: var(--gap-base);
          max-width: 100%;
          z-index: 1;
        `}
      >
        <img
          className={css`
            width: 24px;
            height: 24px;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
          `}
          loading="lazy"
          alt=""
          src="/maximize.svg"
        />
        <b
          className={css`
            position: relative;
            letter-spacing: 0.02em;
            line-height: 20px;
          `}
        >
          Data-Driven Insights
        </b>
        <div
          className={css`
            position: relative;
            letter-spacing: 0.02em;
            line-height: 22px;
          `}
        >{`Our AI doesn’t just rely on your current data—it pulls from the results of past college sports seasons to match you with schools that have historically recruited athletes like you. `}</div>
      </div>
    </div>
  );
};

export default InfoCardContainer;
