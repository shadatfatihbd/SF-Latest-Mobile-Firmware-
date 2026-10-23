/**
 * SF Latest Firmware - Robust Version Parsing & Selection Engine
 * 
 * Accurately parses Samsung PDA strings and Apple iOS build numbers,
 * resolving true chronological ordering without relying on naive string comparison.
 */

export interface ParsedSamsungPda {
  valid: boolean;
  model: string;
  region: string;
  type: 'feature' | 'security' | 'unknown';
  bootloaderRevision: number;
  osCycleCode: string;
  yearLetter: string;
  year: number;
  monthLetter: string;
  month: number;
  sequence: string;
  sequenceNumber: number;
  chronologicalScore: number;
}

export interface ParsedAppleBuild {
  valid: boolean;
  raw: string;
  epochMajor: number;        // e.g. 22 for iOS 18, 21 for iOS 17
  milestoneLetter: string;   // e.g. 'C' for 18.2, 'B' for 18.1, 'A' for 18.0
  milestoneIndex: number;    // 1 for A, 2 for B, 3 for C...
  buildSequence: number;     // e.g. 152, 91, 3354
  isBeta: boolean;           // true if has trailing lowercase letter (e.g. 22D5034e)
  chronologicalScore: number;
}

/**
 * Parses Samsung PDA strings (e.g. S928BXXU3AXK4 or A556EXXS4AXK2)
 * Format breakdown:
 * [Model Prefix][Region][Type(U/S)][Bootloader][OS Code][Year][Month][Sequence]
 */
export function parseSamsungPda(pda: string): ParsedSamsungPda {
  const clean = (pda || '').trim().toUpperCase();
  // Standard Samsung build is typically 12-14 chars:
  // e.g. A556EXXS4AXK2 -> Model: A556E, Region: XX, Type: S, BL: 4, OS: A, Year: X, Month: K, Seq: 2
  // e.g. S928BXXU3AXK4 -> Model: S928B, Region: XX, Type: U, BL: 3, OS: A, Year: X, Month: K, Seq: 4
  const regex = /^([A-Z0-9]+?)([A-Z]{2})([US])([0-9A-Z])([A-Z])([V-Z])([A-L])([0-9A-Z])$/;
  const match = clean.match(regex);

  if (!match) {
    return {
      valid: false,
      model: '',
      region: '',
      type: 'unknown',
      bootloaderRevision: 0,
      osCycleCode: '',
      yearLetter: '',
      year: 0,
      monthLetter: '',
      month: 0,
      sequence: '',
      sequenceNumber: 0,
      chronologicalScore: 0,
    };
  }

  const [_, model, region, typeChar, blChar, osCode, yearLetter, monthLetter, seqChar] = match;

  // Year mapping: V=2022, W=2023, X=2024, Y=2025, Z=2026
  const yearMap: Record<string, number> = {
    V: 2022,
    W: 2023,
    X: 2024,
    Y: 2025,
    Z: 2026,
  };
  const year = yearMap[yearLetter] || (2020 + (yearLetter.charCodeAt(0) - 'T'.charCodeAt(0)));

  // Month mapping: A=Jan(1), B=Feb(2) ... L=Dec(12)
  const month = monthLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

  // Sequence char: 1-9, A=10, B=11 ... Z=35
  let seqNumber = 0;
  if (/[0-9]/.test(seqChar)) {
    seqNumber = parseInt(seqChar, 10);
  } else {
    seqNumber = seqChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }

  // Bootloader rev (can be hex, e.g. 1..9, A=10, B=11, C=12)
  let bootloader = 1;
  if (/[0-9]/.test(blChar)) {
    bootloader = parseInt(blChar, 10);
  } else if (/[A-F]/.test(blChar)) {
    bootloader = blChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }

  // Chronological score represents the absolute release timeline position:
  // (Year * 1000000) + (Month * 10000) + (OS Code ordinal * 1000) + (SeqNumber * 10) + (Type == 'U' ? 1 : 0)
  const osOrdinal = osCode.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const score = year * 1000000 + month * 10000 + osOrdinal * 1000 + seqNumber * 10 + (typeChar === 'U' ? 2 : 1);

  return {
    valid: true,
    model,
    region,
    type: typeChar === 'U' ? 'feature' : 'security',
    bootloaderRevision: bootloader,
    osCycleCode: osCode,
    yearLetter,
    year,
    monthLetter,
    month,
    sequence: seqChar,
    sequenceNumber: seqNumber,
    chronologicalScore: score,
  };
}

/**
 * Compare two Samsung PDA build numbers.
 * Returns:
 *  > 0 if buildA is newer than buildB
 *  < 0 if buildA is older than buildB
 *  0 if they are identical in chronological score
 */
export function compareSamsungBuilds(pdaA: string, pdaB: string): number {
  const a = parseSamsungPda(pdaA);
  const b = parseSamsungPda(pdaB);

  if (a.valid && b.valid) {
    if (a.chronologicalScore !== b.chronologicalScore) {
      return a.chronologicalScore - b.chronologicalScore;
    }
    // If scores match, higher bootloader revision wins
    return a.bootloaderRevision - b.bootloaderRevision;
  }

  // Fallback if one or both are non-standard PDA strings
  if (a.valid && !b.valid) return 1;
  if (!a.valid && b.valid) return -1;
  return pdaA.localeCompare(pdaB);
}

/**
 * Parses Apple iOS build numbers (e.g. 22C152, 22B91, 22D5034e)
 */
export function parseAppleBuild(build: string): ParsedAppleBuild {
  const clean = (build || '').trim();
  // Standard format: [MajorEpochDigits][MilestoneLetter][BuildDigits][OptionalBetaLetter]
  const regex = /^(\d{2})([A-Z])(\d+)([a-z])?$/;
  const match = clean.match(regex);

  if (!match) {
    return {
      valid: false,
      raw: clean,
      epochMajor: 0,
      milestoneLetter: '',
      milestoneIndex: 0,
      buildSequence: 0,
      isBeta: false,
      chronologicalScore: 0,
    };
  }

  const [_, epochStr, milestoneLetter, buildSeqStr, betaSuffix] = match;
  const epochMajor = parseInt(epochStr, 10);
  const milestoneIndex = milestoneLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const buildSequence = parseInt(buildSeqStr, 10);
  const isBeta = Boolean(betaSuffix);

  // Score:
  // Epoch * 10000000 + Milestone * 100000 + BuildSeq
  const score = epochMajor * 10000000 + milestoneIndex * 100000 + buildSequence;

  return {
    valid: true,
    raw: clean,
    epochMajor,
    milestoneLetter,
    milestoneIndex,
    buildSequence,
    isBeta,
    chronologicalScore: score,
  };
}

/**
 * Compares two Apple iOS build numbers.
 * When prioritizeStable is true, a stable build always outranks a beta of the same milestone.
 */
export function compareAppleBuilds(buildA: string, buildB: string, prioritizeStable: boolean = true): number {
  const a = parseAppleBuild(buildA);
  const b = parseAppleBuild(buildB);

  if (a.valid && b.valid) {
    if (prioritizeStable) {
      if (!a.isBeta && b.isBeta && a.epochMajor >= b.epochMajor) {
        // A is stable and at least same epoch -> prefer stable
        return 1;
      }
      if (a.isBeta && !b.isBeta && b.epochMajor >= a.epochMajor) {
        return -1;
      }
    }

    if (a.epochMajor !== b.epochMajor) {
      return a.epochMajor - b.epochMajor;
    }
    if (a.milestoneIndex !== b.milestoneIndex) {
      return a.milestoneIndex - b.milestoneIndex;
    }
    return a.buildSequence - b.buildSequence;
  }

  if (a.valid && !b.valid) return 1;
  if (!a.valid && b.valid) return -1;
  return buildA.localeCompare(buildB);
}

/**
 * Select the true latest verified Samsung record for a given model and optional CSC.
 */
export function selectLatestSamsungRecord<T extends { latestPda: string; releaseDate: string; csc: string; model: string; rolloutStatus: string }>(
  records: T[],
  exactCsc?: string
): { latestRecord: T | null; statusLabel: string; isAmbiguous: boolean } {
  if (!records || records.length === 0) {
    return {
      latestRecord: null,
      statusLabel: 'Latest build could not be verified',
      isAmbiguous: false,
    };
  }

  // Filter by CSC if specified
  let pool = records;
  if (exactCsc) {
    const cleanCsc = exactCsc.trim().toUpperCase();
    const cscMatches = records.filter(r => r.csc.toUpperCase() === cleanCsc);
    if (cscMatches.length > 0) {
      pool = cscMatches;
    }
  }

  // Sort pool using chronological PDA parser and release dates
  const sorted = [...pool].sort((a, b) => {
    const pdaComp = compareSamsungBuilds(b.latestPda, a.latestPda);
    if (pdaComp !== 0) return pdaComp;
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  });

  const best = sorted[0];

  // Determine status label based on verified data
  let statusLabel = 'Verified Latest';
  if (best.rolloutStatus === 'rolling_out') {
    statusLabel = 'Rolling Out';
  } else if (best.rolloutStatus === 'announced') {
    statusLabel = 'Officially Announced';
  } else if (best.rolloutStatus === 'not_verified') {
    statusLabel = 'Not Verified';
  }

  return {
    latestRecord: best,
    statusLabel,
    isAmbiguous: false,
  };
}
