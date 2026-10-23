import { IFirmwareProvider, ProviderResult, ProviderFetchOptions } from './types';
import { UpcomingFirmwareRecord, ProviderHealthReport } from '../../types/firmware';

export class SamsungTestFotaProvider implements IFirmwareProvider {
  public readonly id = 'samsung_test_fota';
  public readonly name = 'Samsung Internal Test Server (version.test.xml)';
  public readonly endpoint = 'https://fota-cloud-dn.ospserver.net';
  public isEnabled = true;

  private lastChecked: string = new Date().toISOString();
  private lastSuccessfulSync: string = new Date().toISOString();
  private failureCount: number = 0;

  public static readonly TEST_WARNING_DISCLAIMER =
    'Test firmware is not necessarily publicly released or installable. Availability and rollout may change.';

  public async probeTestBranch(
    model: string,
    csc: string = 'EUX',
    commercialName: string = '',
    options: ProviderFetchOptions = {}
  ): Promise<ProviderResult<UpcomingFirmwareRecord>> {
    const timeoutMs = options.timeoutMs || 6000;
    const cleanModel = model.trim().toUpperCase();
    const cleanCsc = csc.trim().toUpperCase();
    const url = `https://fota-cloud-dn.ospserver.net/firmware/${cleanCsc}/${cleanModel}/version.test.xml`;
    const startTime = Date.now();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Samsung Update Client / Test-Probe (SF-Firmware/3.0)',
          'Accept': 'application/xml, text/xml',
        },
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;
      this.lastChecked = new Date().toISOString();

      if (res.status === 200) {
        const text = await res.text();
        const candidateMatches = [...text.matchAll(/<value[^>]*>([^<]+)<\/value>/g)];

        if (candidateMatches.length > 0) {
          const nowStr = this.lastChecked.split('T')[0];
          const testRecord: UpcomingFirmwareRecord = {
            id: `up-samsung-live-test-${cleanModel.toLowerCase()}-${cleanCsc.toLowerCase()}`,
            brand: 'samsung',
            deviceModel: cleanModel,
            commercialName: commercialName || cleanModel,
            deviceFamily: cleanModel.startsWith('SM-S')
              ? 'Galaxy S Series'
              : cleanModel.startsWith('SM-F')
              ? 'Galaxy Z Series'
              : 'Galaxy A Series',
            expectedVersion: 'Next Maintenance / OS Build Candidate',
            expectedReleaseWindow: 'Release date not announced.',
            regionOrCsc: `${cleanCsc} (Regional Test Cluster)`,
            status: 'Testing Reported',
            category: 'internal_testing',
            evidenceSource: 'Samsung FOTA Internal Test Server (version.test.xml)',
            evidenceUrl: url,
            evidenceDate: nowStr,
            verifiedAt: this.lastChecked,
            testingHashCount: candidateMatches.length,
            rolloutScope: `Active candidate builds verified on ${cleanCsc} test cluster (${candidateMatches.length} binary validation hashes recorded).`,
            notes: SamsungTestFotaProvider.TEST_WARNING_DISCLAIMER,
          };

          this.lastSuccessfulSync = this.lastChecked;
          return {
            success: true,
            data: testRecord,
            httpStatus: 200,
            latencyMs,
            sourceUrl: url,
            sourceName: this.name,
            fetchedAt: this.lastChecked,
            freshness: 'LIVE',
          };
        } else {
          return {
            success: false,
            data: null,
            httpStatus: '200 (No test candidate tags)',
            latencyMs,
            sourceUrl: url,
            sourceName: this.name,
            fetchedAt: this.lastChecked,
            freshness: 'LIVE',
            error: 'No active test hashes in version.test.xml',
          };
        }
      } else {
        return {
          success: false,
          data: null,
          httpStatus: res.status,
          latencyMs,
          sourceUrl: url,
          sourceName: this.name,
          fetchedAt: this.lastChecked,
          freshness: 'SOURCE UNAVAILABLE',
          error: `Test server returned HTTP ${res.status}`,
        };
      }
    } catch (e: any) {
      clearTimeout(timeoutId);
      this.failureCount++;
      return {
        success: false,
        data: null,
        httpStatus: 'Connection Timeout',
        latencyMs: Date.now() - startTime,
        sourceUrl: url,
        sourceName: this.name,
        fetchedAt: new Date().toISOString(),
        freshness: 'SOURCE UNAVAILABLE',
        error: `Could not reach Samsung test server: ${e.message}`,
      };
    }
  }

  public async checkHealth(): Promise<ProviderHealthReport> {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch('https://fota-cloud-dn.ospserver.net/firmware/EUX/SM-S928B/version.test.xml', {
        signal: controller.signal,
        headers: { 'User-Agent': 'Samsung Update Client / Health-Probe' },
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;
      const isAvailable = res.status === 200 || res.status === 403;

      return {
        providerId: this.id,
        name: this.name,
        endpoint: this.endpoint,
        isEnabled: this.isEnabled,
        isAvailable,
        httpStatus: `${res.status} ${res.statusText}`,
        latencyMs,
        lastChecked: new Date().toISOString(),
        lastSuccessfulSync: this.lastSuccessfulSync,
        failureCount: this.failureCount,
        cacheTtlMinutes: 30,
        notes: isAvailable ? 'Test server responding.' : 'Test server unreachable.',
      };
    } catch (e: any) {
      return {
        providerId: this.id,
        name: this.name,
        endpoint: this.endpoint,
        isEnabled: this.isEnabled,
        isAvailable: false,
        httpStatus: 'Connection Error',
        latencyMs: Date.now() - startTime,
        lastChecked: new Date().toISOString(),
        lastSuccessfulSync: this.lastSuccessfulSync,
        failureCount: this.failureCount,
        cacheTtlMinutes: 30,
        notes: `Probe failed: ${e.message}`,
      };
    }
  }
}
