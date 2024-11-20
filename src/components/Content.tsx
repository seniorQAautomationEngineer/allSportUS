import { FunctionComponent } from "react";
import { css } from "@emotion/css";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  return (
    <section
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          padding: 0px var(--padding-xl);
          box-sizing: border-box;
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-61xl);
          color: var(--color-gray-200);
          font-family: var(--font-inter);
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 705px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-29xl-6);
          max-width: 100%;
          @media screen and (max-width: 800px) {
            gap: var(--gap-5xl);
          }
        `}
      >
        <div
          className={css`
            align-self: stretch;
            height: 235px;
            position: relative;
          `}
        >
          <h1
            className={css`
              margin: 0;
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: inherit;
              line-height: 75px;
              font-weight: 700;
              font-family: inherit;
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              @media screen and (max-width: 800px) {
                font-size: var(--font-size-21xl);
                line-height: 45px;
              }
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-5xl);
                line-height: 30px;
              }
            `}
          >
            <span
              className={css`
                width: 100%;
              `}
            >
              <span className={css``}>{`Your College `}</span>
              <span className={css``}>Athletic</span>
              <span className={css``}> Journey, Simplified</span>
            </span>
          </h1>
          <img
            className={css`
              position: absolute;
              top: 213.6px;
              left: 139.9px;
              width: 399.7px;
              height: 32.6px;
              object-fit: contain;
              z-index: 1;
            `}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
        <div
          className={css`
            width: 589.5px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-end;
            max-width: 100%;
            font-size: var(--font-size-base);
            color: var(--color-gray-100);
          `}
        >
          <div
            className={css`
              width: 474px;
              position: relative;
              letter-spacing: 0.02em;
              line-height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              max-width: 100%;
            `}
          >
            Unlock the door to scholarships with data-driven AI matches based on
            real sports season insights.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
