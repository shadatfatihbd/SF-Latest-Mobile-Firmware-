import {
  FirmwareRecord,
  SamsungFirmwareRecord,
  AppleFirmwareRecord,
  UpcomingFirmwareRecord,
  ProviderHealthReport,
  DataFreshnessStatus,
  FirmwareClassification,
} from '../../types/firmware';

export interface ProviderFetchOptions {
  timeoutMs?: number;
  maxRetries?: number;
  skipCache?: boolean;
}

export interface ProviderResult<T> {
  success: boolean;
  data: T | null;
  error?: string;
  httpStatus?: string | number;
  latencyMs: number;
  sourceUrl: string;
  sourceName: string;
  fetchedAt: string;
  freshness: DataFreshnessStatus;
  cacheHit?: boolean;
}

export interface IFirmwareProvider {
  readonly id: string;
  readonly name: string;
  readonly endpoint: string;
  isEnabled: boolean;

  checkHealth(): Promise<ProviderHealthReport>;
}
