import styled from 'styled-components';
import { palette } from 'styled-theme';

import ContentView from 'components/utility/contentView';

import { media } from 'helpers/styleHelper';

export const ContentWrapper = styled(ContentView)`
  padding: 0;
  background: transparent;

  .pool-new-row {
    .label-title {
      padding-bottom: 0;
      letter-spacing: 2.5px;
    }

    .token-details-view,
    .add-asset-view {
      ${media.lg`
        height: 470px;
      `}
    }

    .token-detail-container,
    .create-detail-wrapper {
      height: 100%;
      background: ${palette('background', 1)};
      box-shadow: 0px 1px 3px ${palette('gray', 1)};
      border-radius: 3px;
    }

    .token-details-view {
      padding-top: 8px;
      ${media.sm`
        padding-top: 0px;
      `}

      .new-token-coin {
        padding-top: 20px;
        padding-bottom: 10px;
      }

      .left-arrow-wrapper {
        display: flex;
        justify-content: left;
        align-items: center;
        flex-grow: 1;
        padding-left: 20px;

        img {
          transform: rotate(180deg);
        }
      }

      .token-detail-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 20px;
        padding-top: 30px;
        ${media.sm`
          padding-top: 10px;
        `}

        .new-token-detail-wrapper {
          width: 90%;
          ${media.sm`
            width: 70%;
          `}
          height: 300px;
          padding: 30px;
          margin-top: 60px;
          margin-bottom: 30px;
          border: 1px solid ${palette('gray', 0)};

          .new-token-coin {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: -70px;
          }

          .token-name {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          }

          .status-wrapper {
            margin-bottom: 20px;
          }
        }
      }
    }

    .add-asset-view {
      padding-left: 0px;
      padding-top: 8px;
      ${media.sm`
        padding-top: 0px;
        padding-left: 8px;
      `}

      .create-detail-wrapper {
        padding: 10px 20px;
      }

      .label-no-padding {
        padding-top: 0;
        ${media.lg`
          padding: 0;
        `}
      }
      .label-description {
        padding-bottom: 0;
      }

      .stake-card-wrapper {
        & > * {
          margin-bottom: 20px;
        }

        ${media.lg`
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 15px 0;
          & > * {
            margin-bottom: auto;
          }
        `}

        .coinCard-wrapper {
          ${media.lg`
            width: calc(50% - 20px);
          `}
        }
      }

      .slider-wrapper {
        width: 100%;
      }

      .create-pool-info-wrapper {
        display: flex;
        flex: auto;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;

        .create-token-detail {
          width: 100%;
          ${media.lg`
            display: flex;
            justify-content: space-between;
          `}

          .info-status-wrapper {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            > * {
              width: 50%;
            }

            ${media.lg`
              align-items: center;
              > * {
                width: auto;
              }
            `}

            .status-wrapper {
              ${media.lg`
                width: 21%;
                margin-right: 20px;
              `}

              ${media.xxl`
                width: 27%;
                margin-right: 30px;
              `}

              .label-wrapper {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }

          .drag-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 12px;
            padding-bottom: 12px;
            ${media.lg`
              padding-top: 24px;
              padding-right: 24px;
              padding-bottom: 0px;
            `}
          }
        }
      }
    }
  }
`;

export const LoaderWrapper = styled.div`
  text-align: center;
  border-radius: 4px;
  margin: 20px 0;
  height: 100%;
`;
