import { RemoteData } from '@devexperts/remote-data-ts';
import BigNumber from 'bignumber.js';

import { Maybe, FixmeType } from 'types/bepswap';
import {
  AssetDetail,
  PoolDetail,
  StatsData,
  StakersAssetData,
  ThorchainEndpoints,
  ThorchainEndpoint,
  InlineResponse2001,
  TxDetailsTypeEnum,
  PoolAggChanges,
  NetworkInfo,
  PoolEarningDetail,
  StatsChanges,
} from 'types/generated/midgard';

export type AssetDetailMap = {
  [asset: string]: AssetDetail;
};

export type GetAssetsPayload = {
  assetDetailIndex: AssetDetailMap;
  assetDetails: AssetDetail[];
};

export type PoolDataMap = {
  [symbol: string]: PoolDetail;
};

export type PoolEarningDetailsMap = {
  [symbol: string]: PoolEarningDetail;
};

export type GetPoolEarningDetailsPayload = {
  symbol: string;
  poolEarningDetail: PoolEarningDetail;
};

export type GetPoolDataPayload = {
  assets: string[];
  type?: 'simple' | 'full';
};

export type GetStakerPoolDataPayload = {
  asset: string;
  address: string;
};

export type StakerPoolData = {
  [symbol: string]: StakersAssetData;
};

export type PriceDataIndex = {
  [symbol: string]: BigNumber;
};

export type TxDetailType =
  | TxDetailsTypeEnum.Swap
  | TxDetailsTypeEnum.Stake
  | TxDetailsTypeEnum.Unstake
  | TxDetailsTypeEnum.DoubleSwap;

export type TxDetailData = RemoteData<Error, InlineResponse2001>;

export type TxSuccessPayload = {
  data: InlineResponse2001,
  refresh?: boolean;
}

export type GetTxPayload = {
  offset: number;
  limit: number;
  address?: string;
  txId?: string;
  asset?: string;
  type?: string;
  refresh?: boolean;
};

export type Interval = '5min' | 'hour' | 'day' | 'week' | 'month' | 'year';

export type GetRTStatsPayload = {
  from?: number;
  to?: number;
  interval?: Interval;
};

export type GetRTAggregateByAssetPayload = {
  asset?: string;
  from?: number;
  to?: number;
  interval?: Interval;
  type?: string;
};

export type RTStatsData = {
  allTimeData: Array<StatsChanges>;
  weekData: Array<StatsChanges>;
};

export type GetPoolDetailByAssetPayload = {
  asset: string;
};

export type RTAggregateData = {
  allTimeData: Array<PoolAggChanges>;
  weekData: Array<PoolAggChanges>;
};

export type ApiBasePathRD = RemoteData<Error, string>;

export type ThorchainQueue = {
  swap?: string;
  outbound?: string;
};

export type ThorchainData = {
  constants?: FixmeType;
  lastBlock?: FixmeType;
  mimir?: FixmeType;
  queue?: ThorchainQueue;
};

export type PoolStatus = 'enabled' | 'bootstrap' | 'suspended' | undefined;

export type State = {
  assets: AssetDetailMap;
  assetArray: AssetDetail[];
  pools: string[];
  stats: StatsData;
  rtStats: RTStatsData;
  rtStatsLoading: boolean;
  poolAddressData: Maybe<ThorchainEndpoints>;
  bnbPoolAddress: Maybe<ThorchainEndpoint>;
  poolAddress: Maybe<string>;
  poolAddressLoading: boolean;
  poolData: PoolDataMap;
  poolDetailedData: PoolDataMap;
  poolEarningDetails: PoolEarningDetailsMap;
  poolLoading: boolean;
  assetLoading: boolean;
  poolDataLoading: boolean;
  poolDetailedDataLoading: boolean;
  poolEarningDetailsLoading: boolean;
  stakerPoolData: Maybe<StakerPoolData>;
  stakerPoolDataLoading: boolean;
  stakerPoolDataError: Maybe<Error>;
  runePrice: number;
  basePriceAsset: string; // set base price asset as a RUNE
  priceIndex: PriceDataIndex;
  error: Maybe<Error>;
  statsLoading: boolean;
  txData: TxDetailData;
  txRefreshing: boolean;
  rtAggregateLoading: boolean;
  rtAggregate: RTAggregateData;
  apiBasePath: ApiBasePathRD;
  thorchain: ThorchainData;
  networkInfo: NetworkInfo;
  networkInfoLoading: boolean;
};
