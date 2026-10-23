import {
  SamsungCatalogueEntry,
  AppleCatalogueEntry,
  CscDirectoryEntry,
  SearchSuggestionItem,
} from '../types/firmware';

export const CATALOGUE_METADATA = {
  lastUpdated: '2026-10-23T01:15:00Z',
  version: '2.5.0',
  providerSources: [
    'Official Samsung Mobile Release Documentation (doc.samsungmobile.com)',
    'Samsung Security Updates Scope & Bulletins (security.samsungmobile.com)',
    'Samsung Global FOTA Gateway Architecture',
    'Apple Official Hardware Identification (support.apple.com/en-us/HT201296)',
    'Apple Official Security & Software Release Notes (support.apple.com/en-us/HT201222)',
  ],
  coverageNotice: 'Covers major historical and contemporary Samsung Galaxy product lines (S, Z, A, M, F, XCover, Note, Tab) and Apple iPhone generations (original through iPhone 17).',
};

// ============================================================================
// 1. COMPLETE SAMSUNG GALAXY DEVICE CATALOGUE
// ============================================================================
export const SAMSUNG_DEVICE_CATALOGUE: SamsungCatalogueEntry[] = [
  // --- Galaxy S Series ---
  {
    id: 'sam-s24-ultra',
    model: 'SM-S928B',
    commercialName: 'Galaxy S24 Ultra',
    deviceFamily: 'Galaxy S',
    releaseYear: 2024,
    modelVariants: ['SM-S928B', 'SM-S928U', 'SM-S928U1', 'SM-S9280', 'SM-S928N', 'SM-S928W'],
    supportedAndroidRange: 'Android 14 -> Android 21 (7-Year OS Support)',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.5+',
    commonCscs: ['EUX', 'INS', 'XME', 'BKD', 'THL', 'DBT', 'BTU', 'XSA', 'XAA', 'KOO'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S24 Ultra', 'S24U', 'Galaxy S24 Ultra 5G', 'SM-S928'],
  },
  {
    id: 'sam-s24-plus',
    model: 'SM-S926B',
    commercialName: 'Galaxy S24+',
    deviceFamily: 'Galaxy S',
    releaseYear: 2024,
    modelVariants: ['SM-S926B', 'SM-S926U', 'SM-S9260', 'SM-S926N'],
    supportedAndroidRange: 'Android 14 -> Android 21',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.5+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S24 Plus', 'S24+', 'Galaxy S24 Plus', 'SM-S926'],
  },
  {
    id: 'sam-s24',
    model: 'SM-S921B',
    commercialName: 'Galaxy S24',
    deviceFamily: 'Galaxy S',
    releaseYear: 2024,
    modelVariants: ['SM-S921B', 'SM-S921U', 'SM-S9210', 'SM-S921N'],
    supportedAndroidRange: 'Android 14 -> Android 21',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.5+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S24', 'Galaxy S24 5G', 'SM-S921'],
  },
  {
    id: 'sam-s24-fe',
    model: 'SM-S721B',
    commercialName: 'Galaxy S24 FE',
    deviceFamily: 'Galaxy S',
    releaseYear: 2024,
    modelVariants: ['SM-S721B', 'SM-S721U', 'SM-S7210'],
    supportedAndroidRange: 'Android 14 -> Android 21',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S24 FE', 'Galaxy S24 FE 5G', 'SM-S721'],
  },
  {
    id: 'sam-s23-ultra',
    model: 'SM-S918B',
    commercialName: 'Galaxy S23 Ultra',
    deviceFamily: 'Galaxy S',
    releaseYear: 2023,
    modelVariants: ['SM-S918B', 'SM-S918U', 'SM-S9180', 'SM-S918N'],
    supportedAndroidRange: 'Android 13 -> Android 17 (4-Year OS Support)',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'BKD', 'THL', 'DBT', 'BTU', 'XSA', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S23 Ultra', 'S23U', 'Galaxy S23 Ultra 5G', 'SM-S918'],
  },
  {
    id: 'sam-s23-plus',
    model: 'SM-S916B',
    commercialName: 'Galaxy S23+',
    deviceFamily: 'Galaxy S',
    releaseYear: 2023,
    modelVariants: ['SM-S916B', 'SM-S916U', 'SM-S9160'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S23 Plus', 'S23+', 'SM-S916'],
  },
  {
    id: 'sam-s23',
    model: 'SM-S911B',
    commercialName: 'Galaxy S23',
    deviceFamily: 'Galaxy S',
    releaseYear: 2023,
    modelVariants: ['SM-S911B', 'SM-S911U', 'SM-S9110'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S23', 'Galaxy S23 5G', 'SM-S911'],
  },
  {
    id: 'sam-s23-fe',
    model: 'SM-S711B',
    commercialName: 'Galaxy S23 FE',
    deviceFamily: 'Galaxy S',
    releaseYear: 2023,
    modelVariants: ['SM-S711B', 'SM-S711U', 'SM-S7110'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 6.0 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S23 FE', 'SM-S711'],
  },
  {
    id: 'sam-s22-ultra',
    model: 'SM-S908B',
    commercialName: 'Galaxy S22 Ultra',
    deviceFamily: 'Galaxy S',
    releaseYear: 2022,
    modelVariants: ['SM-S908B', 'SM-S908U', 'SM-S9080', 'SM-S908N'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S22 Ultra', 'S22U', 'SM-S908'],
  },
  {
    id: 'sam-s22-plus',
    model: 'SM-S906B',
    commercialName: 'Galaxy S22+',
    deviceFamily: 'Galaxy S',
    releaseYear: 2022,
    modelVariants: ['SM-S906B', 'SM-S906U', 'SM-S9060'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S22 Plus', 'S22+', 'SM-S906'],
  },
  {
    id: 'sam-s22',
    model: 'SM-S901B',
    commercialName: 'Galaxy S22',
    deviceFamily: 'Galaxy S',
    releaseYear: 2022,
    modelVariants: ['SM-S901B', 'SM-S901U', 'SM-S9010'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S22', 'SM-S901'],
  },
  {
    id: 'sam-s21-ultra',
    model: 'SM-G998B',
    commercialName: 'Galaxy S21 Ultra 5G',
    deviceFamily: 'Galaxy S',
    releaseYear: 2021,
    modelVariants: ['SM-G998B', 'SM-G998U', 'SM-G9980'],
    supportedAndroidRange: 'Android 11 -> Android 15',
    supportedOneUiRange: 'One UI 3.1 -> One UI 6.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S21 Ultra', 'S21U', 'SM-G998'],
  },
  {
    id: 'sam-s21-plus',
    model: 'SM-G996B',
    commercialName: 'Galaxy S21+ 5G',
    deviceFamily: 'Galaxy S',
    releaseYear: 2021,
    modelVariants: ['SM-G996B', 'SM-G996U'],
    supportedAndroidRange: 'Android 11 -> Android 15',
    supportedOneUiRange: 'One UI 3.1 -> One UI 6.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S21 Plus', 'S21+', 'SM-G996'],
  },
  {
    id: 'sam-s21',
    model: 'SM-G991B',
    commercialName: 'Galaxy S21 5G',
    deviceFamily: 'Galaxy S',
    releaseYear: 2021,
    modelVariants: ['SM-G991B', 'SM-G991U'],
    supportedAndroidRange: 'Android 11 -> Android 15',
    supportedOneUiRange: 'One UI 3.1 -> One UI 6.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S21', 'SM-G991'],
  },
  {
    id: 'sam-s20-ultra',
    model: 'SM-G988B',
    commercialName: 'Galaxy S20 Ultra 5G',
    deviceFamily: 'Galaxy S',
    releaseYear: 2020,
    modelVariants: ['SM-G988B', 'SM-G988U'],
    supportedAndroidRange: 'Android 10 -> Android 13',
    supportedOneUiRange: 'One UI 2.1 -> One UI 5.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S20 Ultra', 'S20U', 'SM-G988'],
  },
  {
    id: 'sam-s20-fe',
    model: 'SM-G781B',
    commercialName: 'Galaxy S20 FE 5G',
    deviceFamily: 'Galaxy S',
    releaseYear: 2020,
    modelVariants: ['SM-G781B', 'SM-G780F'],
    supportedAndroidRange: 'Android 10 -> Android 13',
    supportedOneUiRange: 'One UI 2.5 -> One UI 5.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S20 FE', 'SM-G781'],
  },
  {
    id: 'sam-s10-plus',
    model: 'SM-G975F',
    commercialName: 'Galaxy S10+',
    deviceFamily: 'Galaxy S',
    releaseYear: 2019,
    modelVariants: ['SM-G975F', 'SM-G975U'],
    supportedAndroidRange: 'Android 9.0 -> Android 12',
    supportedOneUiRange: 'One UI 1.1 -> One UI 4.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S10 Plus', 'S10+', 'SM-G975'],
  },
  {
    id: 'sam-s10',
    model: 'SM-G973F',
    commercialName: 'Galaxy S10',
    deviceFamily: 'Galaxy S',
    releaseYear: 2019,
    modelVariants: ['SM-G973F', 'SM-G973U'],
    supportedAndroidRange: 'Android 9.0 -> Android 12',
    supportedOneUiRange: 'One UI 1.1 -> One UI 4.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S10', 'SM-G973'],
  },
  {
    id: 'sam-s9-plus',
    model: 'SM-G965F',
    commercialName: 'Galaxy S9+',
    deviceFamily: 'Galaxy S',
    releaseYear: 2018,
    modelVariants: ['SM-G965F', 'SM-G965U'],
    supportedAndroidRange: 'Android 8.0 -> Android 10',
    supportedOneUiRange: 'Samsung Experience 9.0 -> One UI 2.5',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S9 Plus', 'S9+', 'SM-G965'],
  },
  {
    id: 'sam-s8',
    model: 'SM-G950F',
    commercialName: 'Galaxy S8',
    deviceFamily: 'Galaxy S',
    releaseYear: 2017,
    modelVariants: ['SM-G950F', 'SM-G950U'],
    supportedAndroidRange: 'Android 7.0 -> Android 9.0',
    supportedOneUiRange: 'Samsung Experience -> One UI 1.0',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S8', 'SM-G950'],
  },
  {
    id: 'sam-s7-edge',
    model: 'SM-G935F',
    commercialName: 'Galaxy S7 edge',
    deviceFamily: 'Galaxy S',
    releaseYear: 2016,
    modelVariants: ['SM-G935F', 'SM-G935A'],
    supportedAndroidRange: 'Android 6.0 -> Android 8.0',
    supportedOneUiRange: 'TouchWiz -> Samsung Experience 9.0',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['S7 Edge', 'SM-G935'],
  },

  // --- Galaxy Z Fold & Z Flip Series ---
  {
    id: 'sam-zfold6',
    model: 'SM-F956B',
    commercialName: 'Galaxy Z Fold 6',
    deviceFamily: 'Galaxy Z Fold',
    releaseYear: 2024,
    modelVariants: ['SM-F956B', 'SM-F956U', 'SM-F9560', 'SM-F956N'],
    supportedAndroidRange: 'Android 14 -> Android 21 (7-Year Support)',
    supportedOneUiRange: 'One UI 6.1.1 -> One UI 8.5+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU', 'KOO', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Fold 6', 'Fold 6', 'Galaxy Z Fold6', 'SM-F956'],
  },
  {
    id: 'sam-zflip6',
    model: 'SM-F741B',
    commercialName: 'Galaxy Z Flip 6',
    deviceFamily: 'Galaxy Z Flip',
    releaseYear: 2024,
    modelVariants: ['SM-F741B', 'SM-F741U', 'SM-F7410', 'SM-F741N'],
    supportedAndroidRange: 'Android 14 -> Android 21',
    supportedOneUiRange: 'One UI 6.1.1 -> One UI 8.5+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU', 'KOO', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Flip 6', 'Flip 6', 'Galaxy Z Flip6', 'SM-F741'],
  },
  {
    id: 'sam-zfold5',
    model: 'SM-F946B',
    commercialName: 'Galaxy Z Fold 5',
    deviceFamily: 'Galaxy Z Fold',
    releaseYear: 2023,
    modelVariants: ['SM-F946B', 'SM-F946U', 'SM-F9460', 'SM-F946N'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'BKD', 'THL', 'DBT', 'BTU', 'XSA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Fold 5', 'Fold 5', 'Galaxy Z Fold5', 'SM-F946'],
  },
  {
    id: 'sam-zflip5',
    model: 'SM-F731B',
    commercialName: 'Galaxy Z Flip 5',
    deviceFamily: 'Galaxy Z Flip',
    releaseYear: 2023,
    modelVariants: ['SM-F731B', 'SM-F731U', 'SM-F7310', 'SM-F731N'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'INS', 'XME', 'THL', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Flip 5', 'Flip 5', 'Galaxy Z Flip5', 'SM-F731'],
  },
  {
    id: 'sam-zfold4',
    model: 'SM-F936B',
    commercialName: 'Galaxy Z Fold 4',
    deviceFamily: 'Galaxy Z Fold',
    releaseYear: 2022,
    modelVariants: ['SM-F936B', 'SM-F936U', 'SM-F9360'],
    supportedAndroidRange: 'Android 12L -> Android 16',
    supportedOneUiRange: 'One UI 4.1.1 -> One UI 6.1.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Fold 4', 'Fold 4', 'SM-F936'],
  },
  {
    id: 'sam-zflip4',
    model: 'SM-F721B',
    commercialName: 'Galaxy Z Flip 4',
    deviceFamily: 'Galaxy Z Flip',
    releaseYear: 2022,
    modelVariants: ['SM-F721B', 'SM-F721U', 'SM-F7210'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1.1 -> One UI 6.1.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Flip 4', 'Flip 4', 'SM-F721'],
  },
  {
    id: 'sam-zfold3',
    model: 'SM-F926B',
    commercialName: 'Galaxy Z Fold 3 5G',
    deviceFamily: 'Galaxy Z Fold',
    releaseYear: 2021,
    modelVariants: ['SM-F926B', 'SM-F926U', 'SM-F9260'],
    supportedAndroidRange: 'Android 11 -> Android 15',
    supportedOneUiRange: 'One UI 3.1.1 -> One UI 6.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Fold 3', 'Fold 3', 'SM-F926'],
  },
  {
    id: 'sam-zflip3',
    model: 'SM-F711B',
    commercialName: 'Galaxy Z Flip 3 5G',
    deviceFamily: 'Galaxy Z Flip',
    releaseYear: 2021,
    modelVariants: ['SM-F711B', 'SM-F711U'],
    supportedAndroidRange: 'Android 11 -> Android 15',
    supportedOneUiRange: 'One UI 3.1.1 -> One UI 6.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Z Flip 3', 'Flip 3', 'SM-F711'],
  },

  // --- Galaxy A Series ---
  {
    id: 'sam-a55',
    model: 'SM-A556E',
    commercialName: 'Galaxy A55 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2024,
    modelVariants: ['SM-A556E', 'SM-A556B', 'SM-A5560', 'SM-A556U'],
    supportedAndroidRange: 'Android 14 -> Android 18 (4 OS Upgrades)',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.0+',
    commonCscs: ['XME', 'INS', 'BKD', 'XXV', 'THL', 'EUX', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A55 5G', 'Galaxy A55', 'A55', 'SM-A556'],
  },
  {
    id: 'sam-a54',
    model: 'SM-A546E',
    commercialName: 'Galaxy A54 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2023,
    modelVariants: ['SM-A546E', 'SM-A546B', 'SM-A5460', 'SM-A546U'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['XME', 'INS', 'BKD', 'XXV', 'THL', 'EUX'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A54 5G', 'Galaxy A54', 'A54', 'SM-A546'],
  },
  {
    id: 'sam-a53',
    model: 'SM-A536E',
    commercialName: 'Galaxy A53 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2022,
    modelVariants: ['SM-A536E', 'SM-A536B', 'SM-A5360'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1',
    commonCscs: ['XME', 'INS', 'EUX', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A53 5G', 'Galaxy A53', 'SM-A536'],
  },
  {
    id: 'sam-a52s',
    model: 'SM-A528B',
    commercialName: 'Galaxy A52s 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2021,
    modelVariants: ['SM-A528B', 'SM-A528N'],
    supportedAndroidRange: 'Android 11 -> Android 14',
    supportedOneUiRange: 'One UI 3.1 -> One UI 6.0',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A52s 5G', 'Galaxy A52s', 'SM-A528'],
  },
  {
    id: 'sam-a51',
    model: 'SM-A515F',
    commercialName: 'Galaxy A51',
    deviceFamily: 'Galaxy A',
    releaseYear: 2019,
    modelVariants: ['SM-A515F', 'SM-A515U'],
    supportedAndroidRange: 'Android 10 -> Android 13',
    supportedOneUiRange: 'One UI 2.0 -> One UI 5.1',
    commonCscs: ['XME', 'INS', 'EUX', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A51', 'Galaxy A51', 'SM-A515'],
  },
  {
    id: 'sam-a50',
    model: 'SM-A505F',
    commercialName: 'Galaxy A50',
    deviceFamily: 'Galaxy A',
    releaseYear: 2019,
    modelVariants: ['SM-A505F', 'SM-A505G'],
    supportedAndroidRange: 'Android 9.0 -> Android 11',
    supportedOneUiRange: 'One UI 1.1 -> One UI 3.1',
    commonCscs: ['XME', 'INS', 'EUX', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A50', 'Galaxy A50', 'SM-A505'],
  },
  {
    id: 'sam-a35',
    model: 'SM-A356E',
    commercialName: 'Galaxy A35 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2024,
    modelVariants: ['SM-A356E', 'SM-A356B', 'SM-A3560'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.0+',
    commonCscs: ['XME', 'INS', 'BKD', 'XXV', 'THL', 'EUX'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A35 5G', 'Galaxy A35', 'A35', 'SM-A356'],
  },
  {
    id: 'sam-a34',
    model: 'SM-A346E',
    commercialName: 'Galaxy A34 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2023,
    modelVariants: ['SM-A346E', 'SM-A346B', 'SM-A3460'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['XME', 'INS', 'BKD', 'XXV', 'THL', 'EUX'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A34 5G', 'Galaxy A34', 'A34', 'SM-A346'],
  },
  {
    id: 'sam-a25',
    model: 'SM-A256E',
    commercialName: 'Galaxy A25 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2024,
    modelVariants: ['SM-A256E', 'SM-A256B'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.0 -> One UI 7.0+',
    commonCscs: ['XME', 'INS', 'EUX', 'THL'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A25 5G', 'Galaxy A25', 'SM-A256'],
  },
  {
    id: 'sam-a15',
    model: 'SM-A156E',
    commercialName: 'Galaxy A15 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2024,
    modelVariants: ['SM-A156E', 'SM-A156B', 'SM-A155F'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.0 -> One UI 7.0+',
    commonCscs: ['XME', 'INS', 'BKD', 'XXV', 'THL', 'EUX'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A15 5G', 'Galaxy A15', 'SM-A156', 'SM-A155'],
  },
  {
    id: 'sam-a05s',
    model: 'SM-A057F',
    commercialName: 'Galaxy A05s',
    deviceFamily: 'Galaxy A',
    releaseYear: 2023,
    modelVariants: ['SM-A057F', 'SM-A057M'],
    supportedAndroidRange: 'Android 13 -> Android 15',
    supportedOneUiRange: 'One UI Core 5.1 -> One UI Core 6.1',
    commonCscs: ['XME', 'INS', 'BKD', 'THL', 'EUX'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A05s', 'Galaxy A05s', 'SM-A057'],
  },
  {
    id: 'sam-a73',
    model: 'SM-A736B',
    commercialName: 'Galaxy A73 5G',
    deviceFamily: 'Galaxy A',
    releaseYear: 2022,
    modelVariants: ['SM-A736B'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1',
    commonCscs: ['XME', 'INS', 'THL'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['A73 5G', 'Galaxy A73', 'SM-A736'],
  },

  // --- Galaxy Note Series ---
  {
    id: 'sam-note20-ultra',
    model: 'SM-N986B',
    commercialName: 'Galaxy Note 20 Ultra 5G',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2020,
    modelVariants: ['SM-N986B', 'SM-N986U', 'SM-N9860', 'SM-N986N'],
    supportedAndroidRange: 'Android 10 -> Android 13',
    supportedOneUiRange: 'One UI 2.5 -> One UI 5.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 20 Ultra', 'Note 20U', 'Galaxy Note20 Ultra', 'SM-N986'],
  },
  {
    id: 'sam-note20',
    model: 'SM-N980F',
    commercialName: 'Galaxy Note 20',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2020,
    modelVariants: ['SM-N980F', 'SM-N981B', 'SM-N981U'],
    supportedAndroidRange: 'Android 10 -> Android 13',
    supportedOneUiRange: 'One UI 2.5 -> One UI 5.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 20', 'Galaxy Note20', 'SM-N980', 'SM-N981'],
  },
  {
    id: 'sam-note10-plus',
    model: 'SM-N975F',
    commercialName: 'Galaxy Note 10+',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2019,
    modelVariants: ['SM-N975F', 'SM-N976B', 'SM-N975U'],
    supportedAndroidRange: 'Android 9.0 -> Android 12',
    supportedOneUiRange: 'One UI 1.5 -> One UI 4.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 10+', 'Note 10 Plus', 'Galaxy Note10+', 'SM-N975'],
  },
  {
    id: 'sam-note10',
    model: 'SM-N970F',
    commercialName: 'Galaxy Note 10',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2019,
    modelVariants: ['SM-N970F', 'SM-N970U'],
    supportedAndroidRange: 'Android 9.0 -> Android 12',
    supportedOneUiRange: 'One UI 1.5 -> One UI 4.1',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 10', 'Galaxy Note10', 'SM-N970'],
  },
  {
    id: 'sam-note9',
    model: 'SM-N960F',
    commercialName: 'Galaxy Note 9',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2018,
    modelVariants: ['SM-N960F', 'SM-N960U'],
    supportedAndroidRange: 'Android 8.1 -> Android 10',
    supportedOneUiRange: 'Samsung Experience 9.5 -> One UI 2.5',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 9', 'Galaxy Note9', 'SM-N960'],
  },
  {
    id: 'sam-note8',
    model: 'SM-N950F',
    commercialName: 'Galaxy Note 8',
    deviceFamily: 'Galaxy Note',
    releaseYear: 2017,
    modelVariants: ['SM-N950F', 'SM-N950U'],
    supportedAndroidRange: 'Android 7.1.1 -> Android 9.0',
    supportedOneUiRange: 'Samsung Experience -> One UI 1.0',
    commonCscs: ['EUX', 'INS', 'XME', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Note 8', 'Galaxy Note8', 'SM-N950'],
  },

  // --- Galaxy M & F Series ---
  {
    id: 'sam-m55',
    model: 'SM-M556B',
    commercialName: 'Galaxy M55 5G',
    deviceFamily: 'Galaxy M',
    releaseYear: 2024,
    modelVariants: ['SM-M556B'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.0+',
    commonCscs: ['INS', 'XME', 'THL'],
    multiCscGroup: 'ODM',
    hasLiveFirmwareSupport: true,
    aliases: ['M55 5G', 'Galaxy M55', 'SM-M556'],
  },
  {
    id: 'sam-m54',
    model: 'SM-M546B',
    commercialName: 'Galaxy M54 5G',
    deviceFamily: 'Galaxy M',
    releaseYear: 2023,
    modelVariants: ['SM-M546B'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['INS', 'XME', 'THL'],
    multiCscGroup: 'ODM',
    hasLiveFirmwareSupport: true,
    aliases: ['M54 5G', 'Galaxy M54', 'SM-M546'],
  },
  {
    id: 'sam-f55',
    model: 'SM-E556B',
    commercialName: 'Galaxy F55 5G',
    deviceFamily: 'Galaxy F',
    releaseYear: 2024,
    modelVariants: ['SM-E556B'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.1 -> One UI 8.0+',
    commonCscs: ['INS', 'BKD'],
    multiCscGroup: 'ODM',
    hasLiveFirmwareSupport: true,
    aliases: ['F55 5G', 'Galaxy F55', 'SM-E556'],
  },

  // --- Galaxy XCover Series ---
  {
    id: 'sam-xcover7',
    model: 'SM-G556B',
    commercialName: 'Galaxy XCover 7',
    deviceFamily: 'Galaxy XCover',
    releaseYear: 2024,
    modelVariants: ['SM-G556B'],
    supportedAndroidRange: 'Android 14 -> Android 18',
    supportedOneUiRange: 'One UI 6.0 -> One UI 7.0+',
    commonCscs: ['EUX', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['XCover 7', 'Galaxy XCover7', 'SM-G556'],
  },
  {
    id: 'sam-xcover6-pro',
    model: 'SM-G736B',
    commercialName: 'Galaxy XCover 6 Pro',
    deviceFamily: 'Galaxy XCover',
    releaseYear: 2022,
    modelVariants: ['SM-G736B', 'SM-G736U'],
    supportedAndroidRange: 'Android 12 -> Android 16',
    supportedOneUiRange: 'One UI 4.1 -> One UI 6.1',
    commonCscs: ['EUX', 'DBT', 'BTU', 'XAA'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['XCover 6 Pro', 'SM-G736'],
  },

  // --- Galaxy Tab Series ---
  {
    id: 'sam-tab-s9-ultra',
    model: 'SM-X910',
    commercialName: 'Galaxy Tab S9 Ultra',
    deviceFamily: 'Galaxy Tab',
    releaseYear: 2023,
    modelVariants: ['SM-X910', 'SM-X916B'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'XME', 'INS', 'DBT', 'BTU'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Tab S9 Ultra', 'Galaxy Tab S9 Ultra 5G', 'SM-X910', 'SM-X916'],
  },
  {
    id: 'sam-tab-s9',
    model: 'SM-X710',
    commercialName: 'Galaxy Tab S9',
    deviceFamily: 'Galaxy Tab',
    releaseYear: 2023,
    modelVariants: ['SM-X710', 'SM-X716B'],
    supportedAndroidRange: 'Android 13 -> Android 17',
    supportedOneUiRange: 'One UI 5.1 -> One UI 7.0+',
    commonCscs: ['EUX', 'XME', 'INS', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Tab S9', 'Galaxy Tab S9', 'SM-X710', 'SM-X716'],
  },
  {
    id: 'sam-tab-a9',
    model: 'SM-X110',
    commercialName: 'Galaxy Tab A9',
    deviceFamily: 'Galaxy Tab',
    releaseYear: 2023,
    modelVariants: ['SM-X110', 'SM-X115'],
    supportedAndroidRange: 'Android 13 -> Android 15',
    supportedOneUiRange: 'One UI 5.1 -> One UI 6.1',
    commonCscs: ['EUX', 'XME', 'INS', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['Tab A9', 'Galaxy Tab A9 LTE', 'SM-X110', 'SM-X115'],
  },

  // --- Galaxy J & C Series (Historical / Legacy) ---
  {
    id: 'sam-j7-pro',
    model: 'SM-J730F',
    commercialName: 'Galaxy J7 Pro (2017)',
    deviceFamily: 'Galaxy J',
    releaseYear: 2017,
    modelVariants: ['SM-J730F', 'SM-J730GM'],
    supportedAndroidRange: 'Android 7.0 -> Android 9.0',
    supportedOneUiRange: 'Samsung Experience -> One UI 1.1',
    commonCscs: ['INS', 'XME', 'THL', 'DBT'],
    multiCscGroup: 'OXM',
    hasLiveFirmwareSupport: true,
    aliases: ['J7 Pro', 'Galaxy J7', 'SM-J730'],
  },
  {
    id: 'sam-c9-pro',
    model: 'SM-C9000',
    commercialName: 'Galaxy C9 Pro',
    deviceFamily: 'Galaxy C',
    releaseYear: 2016,
    modelVariants: ['SM-C9000', 'SM-C900F'],
    supportedAndroidRange: 'Android 6.0.1 -> Android 8.0',
    supportedOneUiRange: 'TouchWiz -> Samsung Experience',
    commonCscs: ['TGY', 'BRI', 'INS'],
    multiCscGroup: 'OZS',
    hasLiveFirmwareSupport: false,
    statusNotice: 'Legacy device. Official manufacturer software support concluded.',
    aliases: ['C9 Pro', 'Galaxy C9', 'SM-C900'],
  },
];

// ============================================================================
// 2. COMPLETE SAMSUNG CSC CATALOGUE (Worldwide Sales Codes & Multi-CSC Packages)
// ============================================================================
export const EXTENDED_CSC_CATALOGUE: CscDirectoryEntry[] = [
  // Southeast Asia (OLM / OXM)
  { csc: 'XME', country: 'Malaysia', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B', 'SM-S918B', 'SM-F946B'], verifiedDate: '2026-10-23' },
  { csc: 'SIN', country: 'Singapore', carrier: 'SingTel', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'XSP', country: 'Singapore', carrier: 'Open Market / Retail', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-S928B', 'SM-A556E', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'THL', country: 'Thailand', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B', 'SM-F946B'], verifiedDate: '2026-10-23' },
  { csc: 'XXV', country: 'Vietnam', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'XID', country: 'Indonesia', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'XTC', country: 'Philippines', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'GLB', country: 'Philippines', carrier: 'Globe Telecom', multiCscGroup: 'OXM', region: 'Southeast Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },

  // South Asia (ODM / OXM)
  { csc: 'INS', country: 'India', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'South Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B', 'SM-S918B', 'SM-F946B', 'SM-M556B'], verifiedDate: '2026-10-23' },
  { csc: 'BKD', country: 'Bangladesh', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'South Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B', 'SM-A356E'], verifiedDate: '2026-10-23' },
  { csc: 'SLK', country: 'Sri Lanka', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'South Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'NPL', country: 'Nepal', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'South Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'PAK', country: 'Pakistan', carrier: 'Open Market / Unlocked', multiCscGroup: 'OJM', region: 'South Asia', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },

  // Europe (Pan-European OXM multi-CSC package)
  { csc: 'EUX', country: 'European Union (Pan-Europe)', carrier: 'Open Market / Unlocked (Unified European CSC)', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B', 'SM-F946B', 'SM-A556B'], verifiedDate: '2026-10-23' },
  { csc: 'DBT', country: 'Germany', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B', 'SM-F946B'], verifiedDate: '2026-10-23' },
  { csc: 'BTU', country: 'United Kingdom', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B', 'SM-F946B'], verifiedDate: '2026-10-23' },
  { csc: 'XEF', country: 'France', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'ITV', country: 'Italy', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'PHE', country: 'Spain', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'PHN', country: 'Netherlands', carrier: 'Open Market / Unlocked', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'NEE', country: 'Nordic Countries (Sweden, Norway, Denmark, Finland)', carrier: 'Open Market', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'POL', country: 'Poland', carrier: 'Open Market / Orange / Play', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B', 'SM-S918B'], verifiedDate: '2026-10-23' },
  { csc: 'SEB', country: 'Baltic Countries (Estonia, Latvia, Lithuania)', carrier: 'Open Market', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'ROM', country: 'Romania', carrier: 'Open Market', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'BGL', country: 'Bulgaria', carrier: 'Open Market', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'SEE', country: 'South East Europe (Serbia / Albania)', carrier: 'Open Market', multiCscGroup: 'OXM', region: 'Europe', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },

  // East Asia (OZS / OKR)
  { csc: 'KOO', country: 'South Korea', carrier: 'Open Market / Unbranded', multiCscGroup: 'OKR', region: 'East Asia', sampleCompatibleModels: ['SM-S928N', 'SM-S918N', 'SM-F946N'], verifiedDate: '2026-10-23' },
  { csc: 'SKC', country: 'South Korea', carrier: 'SK Telecom', multiCscGroup: 'OKR', region: 'East Asia', sampleCompatibleModels: ['SM-S928N', 'SM-F946N'], verifiedDate: '2026-10-23' },
  { csc: 'KTC', country: 'South Korea', carrier: 'KT Telecom', multiCscGroup: 'OKR', region: 'East Asia', sampleCompatibleModels: ['SM-S928N'], verifiedDate: '2026-10-23' },
  { csc: 'LUC', country: 'South Korea', carrier: 'LG Uplus', multiCscGroup: 'OKR', region: 'East Asia', sampleCompatibleModels: ['SM-S928N'], verifiedDate: '2026-10-23' },
  { csc: 'BRI', country: 'Taiwan', carrier: 'Open Market / Retail', multiCscGroup: 'OZS', region: 'East Asia', sampleCompatibleModels: ['SM-S9280', 'SM-S9180', 'SM-A5560'], verifiedDate: '2026-10-23' },
  { csc: 'TGY', country: 'Hong Kong', carrier: 'Open Market / Retail', multiCscGroup: 'OZS', region: 'East Asia', sampleCompatibleModels: ['SM-S9280', 'SM-S9180', 'SM-A5560'], verifiedDate: '2026-10-23' },

  // Middle East & Africa (OJM)
  { csc: 'XSG', country: 'United Arab Emirates', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'Middle East', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'KSA', country: 'Saudi Arabia', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'Middle East', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'TUR', country: 'Turkey', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'Middle East', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'EGY', country: 'Egypt', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'North Africa', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'MID', country: 'Iraq', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'Middle East', sampleCompatibleModels: ['SM-A556E', 'SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'TUN', country: 'Tunisia', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'North Africa', sampleCompatibleModels: ['SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'XFE', country: 'South Africa', carrier: 'Open Market / Retail', multiCscGroup: 'OJM', region: 'Africa', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },

  // North America (OYM)
  { csc: 'XAA', country: 'United States', carrier: 'Unbranded / Factory Unlocked', multiCscGroup: 'OYM', region: 'North America', sampleCompatibleModels: ['SM-S928U1', 'SM-S918U1', 'SM-F946U1'], verifiedDate: '2026-10-23' },
  { csc: 'TMB', country: 'United States', carrier: 'T-Mobile US', multiCscGroup: 'OYM', region: 'North America', sampleCompatibleModels: ['SM-S928U', 'SM-S918U', 'SM-F946U'], verifiedDate: '2026-10-23' },
  { csc: 'VZW', country: 'United States', carrier: 'Verizon Wireless', multiCscGroup: 'OYM', region: 'North America', sampleCompatibleModels: ['SM-S928U', 'SM-S918U'], verifiedDate: '2026-10-23' },
  { csc: 'ATT', country: 'United States', carrier: 'AT&T Mobility', multiCscGroup: 'OYM', region: 'North America', sampleCompatibleModels: ['SM-S928U', 'SM-S918U'], verifiedDate: '2026-10-23' },
  { csc: 'XAC', country: 'Canada', carrier: 'Unbranded / Factory Unlocked', multiCscGroup: 'OYA', region: 'North America', sampleCompatibleModels: ['SM-S928W', 'SM-S918W'], verifiedDate: '2026-10-23' },

  // Latin America (OWO)
  { csc: 'ZTO', country: 'Brazil', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'ARO', country: 'Argentina', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'MXO', country: 'Mexico', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'CHO', country: 'Chile', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'COO', country: 'Colombia', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },
  { csc: 'TPA', country: 'Panama', carrier: 'Open Market / Retail', multiCscGroup: 'OWO', region: 'Latin America', sampleCompatibleModels: ['SM-S928B'], verifiedDate: '2026-10-23' },

  // Oceania
  { csc: 'XSA', country: 'Australia', carrier: 'Open Market / Retail', multiCscGroup: 'OXM', region: 'Oceania', sampleCompatibleModels: ['SM-S928B', 'SM-S918B', 'SM-A556E'], verifiedDate: '2026-10-23' },
  { csc: 'NZC', country: 'New Zealand', carrier: 'Open Market / Retail', multiCscGroup: 'OXM', region: 'Oceania', sampleCompatibleModels: ['SM-S928B', 'SM-A556E'], verifiedDate: '2026-10-23' },
];

// ============================================================================
// 3. COMPLETE APPLE IPHONE CATALOGUE (Original through iPhone 17 Generation)
// ============================================================================
export const APPLE_DEVICE_CATALOGUE: AppleCatalogueEntry[] = [
  // --- 17th Generation (2026) ---
  {
    id: 'app-iphone-17-promax',
    marketingName: 'iPhone 17 Pro Max',
    generation: '18th Generation (2026 Flagship)',
    hardwareIdentifiers: ['iPhone18,2'],
    aModelNumbers: ['A3295', 'A3296', 'A3297'],
    releaseYear: 2026,
    supportedOsRange: 'iOS 27.0 - Current',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 17 Pro Max', '17 Pro Max', '17PM', 'A3295', 'iPhone18,2'],
  },
  {
    id: 'app-iphone-17-pro',
    marketingName: 'iPhone 17 Pro',
    generation: '18th Generation (2026)',
    hardwareIdentifiers: ['iPhone18,1'],
    aModelNumbers: ['A3292', 'A3293', 'A3294'],
    releaseYear: 2026,
    supportedOsRange: 'iOS 27.0 - Current',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 17 Pro', '17 Pro', '17P', 'A3292', 'iPhone18,1'],
  },
  {
    id: 'app-iphone-17',
    marketingName: 'iPhone 17',
    generation: '18th Generation (2026 Standard)',
    hardwareIdentifiers: ['iPhone18,3'],
    aModelNumbers: ['A3289', 'A3290', 'A3291'],
    releaseYear: 2026,
    supportedOsRange: 'iOS 27.0 - Current',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 17', '17 Standard', 'A3289', 'iPhone18,3'],
  },
  {
    id: 'app-iphone-air',
    marketingName: 'iPhone Air',
    generation: '18th Generation (Ultra-Thin 2026)',
    hardwareIdentifiers: ['iPhone18,4'],
    aModelNumbers: ['A3298', 'A3299'],
    releaseYear: 2026,
    supportedOsRange: 'iOS 27.0 - Current',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone Air', 'iPhone Slim', 'A3298', 'iPhone18,4'],
  },

  // --- 16th Generation (2024) ---
  {
    id: 'app-iphone-16-promax',
    marketingName: 'iPhone 16 Pro Max',
    generation: '17th Generation (2024 Flagship)',
    hardwareIdentifiers: ['iPhone17,2'],
    aModelNumbers: ['A3296', 'A3084', 'A3297'],
    releaseYear: 2024,
    supportedOsRange: 'iOS 18.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 16 Pro Max', '16 Pro Max', '16PM', 'A3296', 'A3084', 'iPhone17,2'],
  },
  {
    id: 'app-iphone-16-pro',
    marketingName: 'iPhone 16 Pro',
    generation: '17th Generation (2024)',
    hardwareIdentifiers: ['iPhone17,1'],
    aModelNumbers: ['A3293', 'A3083', 'A3294'],
    releaseYear: 2024,
    supportedOsRange: 'iOS 18.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 16 Pro', '16 Pro', '16P', 'A3293', 'A3083', 'iPhone17,1'],
  },
  {
    id: 'app-iphone-16-plus',
    marketingName: 'iPhone 16 Plus',
    generation: '17th Generation (2024)',
    hardwareIdentifiers: ['iPhone17,4'],
    aModelNumbers: ['A3082', 'A3290'],
    releaseYear: 2024,
    supportedOsRange: 'iOS 18.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 16 Plus', '16 Plus', 'A3082', 'iPhone17,4'],
  },
  {
    id: 'app-iphone-16',
    marketingName: 'iPhone 16',
    generation: '17th Generation (2024)',
    hardwareIdentifiers: ['iPhone17,3'],
    aModelNumbers: ['A3081', 'A3287'],
    releaseYear: 2024,
    supportedOsRange: 'iOS 18.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 16', '16 Standard', 'A3081', 'iPhone17,3'],
  },

  // --- 15th Generation (2023) ---
  {
    id: 'app-iphone-15-promax',
    marketingName: 'iPhone 15 Pro Max',
    generation: '16th Generation (2023 Flagship)',
    hardwareIdentifiers: ['iPhone16,2'],
    aModelNumbers: ['A3106', 'A2849', 'A3105', 'A3108'],
    releaseYear: 2023,
    supportedOsRange: 'iOS 17.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 15 Pro Max', '15 Pro Max', '15PM', 'A3106', 'iPhone16,2'],
  },
  {
    id: 'app-iphone-15-pro',
    marketingName: 'iPhone 15 Pro',
    generation: '16th Generation (2023)',
    hardwareIdentifiers: ['iPhone16,1'],
    aModelNumbers: ['A3102', 'A2848', 'A3101', 'A3104'],
    releaseYear: 2023,
    supportedOsRange: 'iOS 17.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 15 Pro', '15 Pro', 'A3102', 'iPhone16,1'],
  },
  {
    id: 'app-iphone-15-plus',
    marketingName: 'iPhone 15 Plus',
    generation: '16th Generation (2023)',
    hardwareIdentifiers: ['iPhone15,5'],
    aModelNumbers: ['A3094', 'A2847', 'A3093'],
    releaseYear: 2023,
    supportedOsRange: 'iOS 17.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 15 Plus', '15 Plus', 'A3094', 'iPhone15,5'],
  },
  {
    id: 'app-iphone-15',
    marketingName: 'iPhone 15',
    generation: '16th Generation (2023)',
    hardwareIdentifiers: ['iPhone15,4'],
    aModelNumbers: ['A3090', 'A2846', 'A3089'],
    releaseYear: 2023,
    supportedOsRange: 'iOS 17.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 15', 'A3090', 'iPhone15,4'],
  },

  // --- 14th Generation (2022) ---
  {
    id: 'app-iphone-14-promax',
    marketingName: 'iPhone 14 Pro Max',
    generation: '15th Generation (2022)',
    hardwareIdentifiers: ['iPhone15,3'],
    aModelNumbers: ['A2894', 'A2651', 'A2893', 'A2896'],
    releaseYear: 2022,
    supportedOsRange: 'iOS 16.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 14 Pro Max', '14 Pro Max', '14PM', 'A2894', 'iPhone15,3'],
  },
  {
    id: 'app-iphone-14-pro',
    marketingName: 'iPhone 14 Pro',
    generation: '15th Generation (2022)',
    hardwareIdentifiers: ['iPhone15,2'],
    aModelNumbers: ['A2890', 'A2650', 'A2889', 'A2892'],
    releaseYear: 2022,
    supportedOsRange: 'iOS 16.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 14 Pro', '14 Pro', 'A2890', 'iPhone15,2'],
  },
  {
    id: 'app-iphone-14-plus',
    marketingName: 'iPhone 14 Plus',
    generation: '15th Generation (2022)',
    hardwareIdentifiers: ['iPhone14,8'],
    aModelNumbers: ['A2886', 'A2632', 'A2885'],
    releaseYear: 2022,
    supportedOsRange: 'iOS 16.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 14 Plus', '14 Plus', 'A2886', 'iPhone14,8'],
  },
  {
    id: 'app-iphone-14',
    marketingName: 'iPhone 14',
    generation: '15th Generation (2022)',
    hardwareIdentifiers: ['iPhone14,7'],
    aModelNumbers: ['A2882', 'A2649', 'A2881'],
    releaseYear: 2022,
    supportedOsRange: 'iOS 16.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 14', 'A2882', 'iPhone14,7'],
  },
  {
    id: 'app-iphone-se-3',
    marketingName: 'iPhone SE (3rd generation)',
    generation: 'SE Series (2022)',
    hardwareIdentifiers: ['iPhone14,6'],
    aModelNumbers: ['A2783', 'A2595', 'A2782', 'A2784', 'A2785'],
    releaseYear: 2022,
    supportedOsRange: 'iOS 15.4 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone SE 3', 'iPhone SE 2022', 'SE 3', 'A2783', 'iPhone14,6'],
  },

  // --- 13th Generation (2021) ---
  {
    id: 'app-iphone-13-promax',
    marketingName: 'iPhone 13 Pro Max',
    generation: '14th Generation (2021)',
    hardwareIdentifiers: ['iPhone14,3'],
    aModelNumbers: ['A2643', 'A2484', 'A2641'],
    releaseYear: 2021,
    supportedOsRange: 'iOS 15.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 13 Pro Max', '13 Pro Max', '13PM', 'A2643', 'iPhone14,3'],
  },
  {
    id: 'app-iphone-13-pro',
    marketingName: 'iPhone 13 Pro',
    generation: '14th Generation (2021)',
    hardwareIdentifiers: ['iPhone14,2'],
    aModelNumbers: ['A2638', 'A2483', 'A2636'],
    releaseYear: 2021,
    supportedOsRange: 'iOS 15.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 13 Pro', '13 Pro', 'A2638', 'iPhone14,2'],
  },
  {
    id: 'app-iphone-13',
    marketingName: 'iPhone 13',
    generation: '14th Generation (2021)',
    hardwareIdentifiers: ['iPhone14,5'],
    aModelNumbers: ['A2633', 'A2482', 'A2631'],
    releaseYear: 2021,
    supportedOsRange: 'iOS 15.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 13', 'A2633', 'iPhone14,5'],
  },
  {
    id: 'app-iphone-13-mini',
    marketingName: 'iPhone 13 mini',
    generation: '14th Generation (2021)',
    hardwareIdentifiers: ['iPhone14,4'],
    aModelNumbers: ['A2628', 'A2481', 'A2626'],
    releaseYear: 2021,
    supportedOsRange: 'iOS 15.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 13 mini', '13 mini', 'A2628', 'iPhone14,4'],
  },

  // --- 12th Generation (2020) ---
  {
    id: 'app-iphone-12-promax',
    marketingName: 'iPhone 12 Pro Max',
    generation: '13th Generation (2020)',
    hardwareIdentifiers: ['iPhone13,4'],
    aModelNumbers: ['A2411', 'A2342', 'A2410'],
    releaseYear: 2020,
    supportedOsRange: 'iOS 14.1 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 12 Pro Max', '12 Pro Max', '12PM', 'A2411', 'iPhone13,4'],
  },
  {
    id: 'app-iphone-12-pro',
    marketingName: 'iPhone 12 Pro',
    generation: '13th Generation (2020)',
    hardwareIdentifiers: ['iPhone13,3'],
    aModelNumbers: ['A2407', 'A2341', 'A2406'],
    releaseYear: 2020,
    supportedOsRange: 'iOS 14.1 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 12 Pro', '12 Pro', 'A2407', 'iPhone13,3'],
  },
  {
    id: 'app-iphone-12',
    marketingName: 'iPhone 12',
    generation: '13th Generation (2020)',
    hardwareIdentifiers: ['iPhone13,2'],
    aModelNumbers: ['A2403', 'A2172', 'A2402'],
    releaseYear: 2020,
    supportedOsRange: 'iOS 14.1 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 12', 'A2403', 'iPhone13,2'],
  },
  {
    id: 'app-iphone-12-mini',
    marketingName: 'iPhone 12 mini',
    generation: '13th Generation (2020)',
    hardwareIdentifiers: ['iPhone13,1'],
    aModelNumbers: ['A2399', 'A2176', 'A2398'],
    releaseYear: 2020,
    supportedOsRange: 'iOS 14.1 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 12 mini', '12 mini', 'A2399', 'iPhone13,1'],
  },
  {
    id: 'app-iphone-se-2',
    marketingName: 'iPhone SE (2nd generation)',
    generation: 'SE Series (2020)',
    hardwareIdentifiers: ['iPhone12,8'],
    aModelNumbers: ['A2296', 'A2275', 'A2298'],
    releaseYear: 2020,
    supportedOsRange: 'iOS 13.4 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone SE 2', 'iPhone SE 2020', 'SE 2', 'A2296', 'iPhone12,8'],
  },

  // --- 11th Generation (2019) ---
  {
    id: 'app-iphone-11-promax',
    marketingName: 'iPhone 11 Pro Max',
    generation: '12th Generation (2019)',
    hardwareIdentifiers: ['iPhone12,5'],
    aModelNumbers: ['A2218', 'A2160', 'A2220'],
    releaseYear: 2019,
    supportedOsRange: 'iOS 13.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 11 Pro Max', '11 Pro Max', '11PM', 'A2218', 'iPhone12,5'],
  },
  {
    id: 'app-iphone-11-pro',
    marketingName: 'iPhone 11 Pro',
    generation: '12th Generation (2019)',
    hardwareIdentifiers: ['iPhone12,3'],
    aModelNumbers: ['A2215', 'A2161', 'A2217'],
    releaseYear: 2019,
    supportedOsRange: 'iOS 13.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 11 Pro', '11 Pro', 'A2215', 'iPhone12,3'],
  },
  {
    id: 'app-iphone-11',
    marketingName: 'iPhone 11',
    generation: '12th Generation (2019)',
    hardwareIdentifiers: ['iPhone12,1'],
    aModelNumbers: ['A2221', 'A2111', 'A2223'],
    releaseYear: 2019,
    supportedOsRange: 'iOS 13.0 - iOS 27+',
    latestCompatibleOs: 'iOS 27.0.1',
    latestBuildNumber: '24A446',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 11', 'A2221', 'iPhone12,1'],
  },

  // --- 10th Generation / X Era (2017 - 2018) ---
  {
    id: 'app-iphone-xs-max',
    marketingName: 'iPhone XS Max',
    generation: '11th Generation (2018)',
    hardwareIdentifiers: ['iPhone11,6', 'iPhone11,4'],
    aModelNumbers: ['A2101', 'A1921', 'A2102'],
    releaseYear: 2018,
    supportedOsRange: 'iOS 12.0 - iOS 18.2 (Max Compatible)',
    latestCompatibleOs: 'iOS 18.2',
    latestBuildNumber: '22C152',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone XS Max', 'XS Max', 'A2101', 'iPhone11,6'],
  },
  {
    id: 'app-iphone-xs',
    marketingName: 'iPhone XS',
    generation: '11th Generation (2018)',
    hardwareIdentifiers: ['iPhone11,2'],
    aModelNumbers: ['A2097', 'A1920', 'A2098'],
    releaseYear: 2018,
    supportedOsRange: 'iOS 12.0 - iOS 18.2',
    latestCompatibleOs: 'iOS 18.2',
    latestBuildNumber: '22C152',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone XS', 'XS', 'A2097', 'iPhone11,2'],
  },
  {
    id: 'app-iphone-xr',
    marketingName: 'iPhone XR',
    generation: '11th Generation (2018)',
    hardwareIdentifiers: ['iPhone11,8'],
    aModelNumbers: ['A2105', 'A1984', 'A2106'],
    releaseYear: 2018,
    supportedOsRange: 'iOS 12.0 - iOS 18.2',
    latestCompatibleOs: 'iOS 18.2',
    latestBuildNumber: '22C152',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone XR', 'XR', 'A2105', 'iPhone11,8'],
  },
  {
    id: 'app-iphone-x',
    marketingName: 'iPhone X',
    generation: '10th Anniversary Generation (2017)',
    hardwareIdentifiers: ['iPhone10,3', 'iPhone10,6'],
    aModelNumbers: ['A1901', 'A1865', 'A1902'],
    releaseYear: 2017,
    supportedOsRange: 'iOS 11.0 - iOS 16.7.10 (Final Support)',
    latestCompatibleOs: 'iOS 16.7.10',
    latestBuildNumber: '20H350',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone X', 'iPhone 10', 'A1901', 'A1865', 'iPhone10,3'],
  },
  {
    id: 'app-iphone-8-plus',
    marketingName: 'iPhone 8 Plus',
    generation: '10th Generation (2017)',
    hardwareIdentifiers: ['iPhone10,2', 'iPhone10,5'],
    aModelNumbers: ['A1897', 'A1864', 'A1898'],
    releaseYear: 2017,
    supportedOsRange: 'iOS 11.0 - iOS 16.7.10',
    latestCompatibleOs: 'iOS 16.7.10',
    latestBuildNumber: '20H350',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 8 Plus', '8 Plus', '8+', 'A1897', 'iPhone10,2'],
  },
  {
    id: 'app-iphone-8',
    marketingName: 'iPhone 8',
    generation: '10th Generation (2017)',
    hardwareIdentifiers: ['iPhone10,1', 'iPhone10,4'],
    aModelNumbers: ['A1905', 'A1863', 'A1906'],
    releaseYear: 2017,
    supportedOsRange: 'iOS 11.0 - iOS 16.7.10',
    latestCompatibleOs: 'iOS 16.7.10',
    latestBuildNumber: '20H350',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 8', 'A1905', 'iPhone10,1'],
  },

  // --- Historical Legacy Generations ---
  {
    id: 'app-iphone-7-plus',
    marketingName: 'iPhone 7 Plus',
    generation: '9th Generation (2016)',
    hardwareIdentifiers: ['iPhone9,2', 'iPhone9,4'],
    aModelNumbers: ['A1784', 'A1661', 'A1785'],
    releaseYear: 2016,
    supportedOsRange: 'iOS 10.0 - iOS 15.8.3 (Final Support)',
    latestCompatibleOs: 'iOS 15.8.3',
    latestBuildNumber: '19H384',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 7 Plus', '7 Plus', 'A1784', 'iPhone9,2'],
  },
  {
    id: 'app-iphone-7',
    marketingName: 'iPhone 7',
    generation: '9th Generation (2016)',
    hardwareIdentifiers: ['iPhone9,1', 'iPhone9,3'],
    aModelNumbers: ['A1778', 'A1660', 'A1779'],
    releaseYear: 2016,
    supportedOsRange: 'iOS 10.0 - iOS 15.8.3',
    latestCompatibleOs: 'iOS 15.8.3',
    latestBuildNumber: '19H384',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 7', 'A1778', 'iPhone9,1'],
  },
  {
    id: 'app-iphone-se-1',
    marketingName: 'iPhone SE (1st generation)',
    generation: 'SE Series (2016)',
    hardwareIdentifiers: ['iPhone8,4'],
    aModelNumbers: ['A1723', 'A1662', 'A1724'],
    releaseYear: 2016,
    supportedOsRange: 'iOS 9.3 - iOS 15.8.3',
    latestCompatibleOs: 'iOS 15.8.3',
    latestBuildNumber: '19H384',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone SE 1', 'iPhone SE 2016', 'SE 1', 'A1723', 'iPhone8,4'],
  },
  {
    id: 'app-iphone-6s-plus',
    marketingName: 'iPhone 6s Plus',
    generation: '8th Generation (2015)',
    hardwareIdentifiers: ['iPhone8,2'],
    aModelNumbers: ['A1687', 'A1634', 'A1699'],
    releaseYear: 2015,
    supportedOsRange: 'iOS 9.0 - iOS 15.8.3',
    latestCompatibleOs: 'iOS 15.8.3',
    latestBuildNumber: '19H384',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 6s Plus', '6s Plus', 'A1687', 'iPhone8,2'],
  },
  {
    id: 'app-iphone-6s',
    marketingName: 'iPhone 6s',
    generation: '8th Generation (2015)',
    hardwareIdentifiers: ['iPhone8,1'],
    aModelNumbers: ['A1688', 'A1633', 'A1700'],
    releaseYear: 2015,
    supportedOsRange: 'iOS 9.0 - iOS 15.8.3',
    latestCompatibleOs: 'iOS 15.8.3',
    latestBuildNumber: '19H384',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 6s', 'A1688', 'iPhone8,1'],
  },
  {
    id: 'app-iphone-6-plus',
    marketingName: 'iPhone 6 Plus',
    generation: '7th Generation (2014)',
    hardwareIdentifiers: ['iPhone7,1'],
    aModelNumbers: ['A1524', 'A1522', 'A1593'],
    releaseYear: 2014,
    supportedOsRange: 'iOS 8.0 - iOS 12.5.7 (Final Support)',
    latestCompatibleOs: 'iOS 12.5.7',
    latestBuildNumber: '16H81',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 6 Plus', '6 Plus', 'A1524', 'iPhone7,1'],
  },
  {
    id: 'app-iphone-6',
    marketingName: 'iPhone 6',
    generation: '7th Generation (2014)',
    hardwareIdentifiers: ['iPhone7,2'],
    aModelNumbers: ['A1586', 'A1549', 'A1589'],
    releaseYear: 2014,
    supportedOsRange: 'iOS 8.0 - iOS 12.5.7',
    latestCompatibleOs: 'iOS 12.5.7',
    latestBuildNumber: '16H81',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 6', 'A1586', 'iPhone7,2'],
  },
  {
    id: 'app-iphone-5s',
    marketingName: 'iPhone 5s',
    generation: '6th Generation (2013)',
    hardwareIdentifiers: ['iPhone6,1', 'iPhone6,2'],
    aModelNumbers: ['A1457', 'A1533', 'A1453'],
    releaseYear: 2013,
    supportedOsRange: 'iOS 7.0 - iOS 12.5.7',
    latestCompatibleOs: 'iOS 12.5.7',
    latestBuildNumber: '16H81',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 5s', 'A1457', 'iPhone6,1'],
  },
  {
    id: 'app-iphone-5c',
    marketingName: 'iPhone 5c',
    generation: '6th Generation (2013)',
    hardwareIdentifiers: ['iPhone5,3', 'iPhone5,4'],
    aModelNumbers: ['A1507', 'A1532', 'A1456'],
    releaseYear: 2013,
    supportedOsRange: 'iOS 7.0 - iOS 10.3.3 (Final 32-bit)',
    latestCompatibleOs: 'iOS 10.3.3',
    latestBuildNumber: '14G60',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 5c', 'A1507', 'iPhone5,3'],
  },
  {
    id: 'app-iphone-5',
    marketingName: 'iPhone 5',
    generation: '5th Generation (2012)',
    hardwareIdentifiers: ['iPhone5,1', 'iPhone5,2'],
    aModelNumbers: ['A1429', 'A1428'],
    releaseYear: 2012,
    supportedOsRange: 'iOS 6.0 - iOS 10.3.4',
    latestCompatibleOs: 'iOS 10.3.4',
    latestBuildNumber: '14G61',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 5', 'A1429', 'iPhone5,1'],
  },
  {
    id: 'app-iphone-4s',
    marketingName: 'iPhone 4S',
    generation: '4th Generation (2011)',
    hardwareIdentifiers: ['iPhone4,1'],
    aModelNumbers: ['A1387', 'A1431'],
    releaseYear: 2011,
    supportedOsRange: 'iOS 5.0 - iOS 9.3.6',
    latestCompatibleOs: 'iOS 9.3.6',
    latestBuildNumber: '13G37',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 4S', 'A1387', 'iPhone4,1'],
  },
  {
    id: 'app-iphone-4',
    marketingName: 'iPhone 4',
    generation: '4th Generation (2010)',
    hardwareIdentifiers: ['iPhone3,1', 'iPhone3,2', 'iPhone3,3'],
    aModelNumbers: ['A1332', 'A1349'],
    releaseYear: 2010,
    supportedOsRange: 'iOS 4.0 - iOS 7.1.2',
    latestCompatibleOs: 'iOS 7.1.2',
    latestBuildNumber: '11D257',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 4', 'A1332', 'iPhone3,1'],
  },
  {
    id: 'app-iphone-3gs',
    marketingName: 'iPhone 3GS',
    generation: '3rd Generation (2009)',
    hardwareIdentifiers: ['iPhone2,1'],
    aModelNumbers: ['A1303', 'A1325'],
    releaseYear: 2009,
    supportedOsRange: 'iPhone OS 3.0 - iOS 6.1.6',
    latestCompatibleOs: 'iOS 6.1.6',
    latestBuildNumber: '10B500',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 3GS', 'A1303', 'iPhone2,1'],
  },
  {
    id: 'app-iphone-3g',
    marketingName: 'iPhone 3G',
    generation: '2nd Generation (2008)',
    hardwareIdentifiers: ['iPhone1,2'],
    aModelNumbers: ['A1241', 'A1324'],
    releaseYear: 2008,
    supportedOsRange: 'iPhone OS 2.0 - iOS 4.2.1',
    latestCompatibleOs: 'iOS 4.2.1',
    latestBuildNumber: '8C148',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone 3G', 'A1241', 'iPhone1,2'],
  },
  {
    id: 'app-iphone-original',
    marketingName: 'iPhone (1st generation)',
    generation: '1st Generation (2007 Original)',
    hardwareIdentifiers: ['iPhone1,1'],
    aModelNumbers: ['A1203'],
    releaseYear: 2007,
    supportedOsRange: 'iPhone OS 1.0 - iPhone OS 3.1.3',
    latestCompatibleOs: 'iPhone OS 3.1.3',
    latestBuildNumber: '7E18',
    hasLiveFirmwareSupport: true,
    aliases: ['iPhone Original', 'iPhone 2G', 'A1203', 'iPhone1,1'],
  },
];

// ============================================================================
// 4. SMART QUERY PARSING & AUTOCOMPLETE SEARCH SUGGESTION ENGINE
// ============================================================================

export interface ParsedSearchQuery {
  raw: string;
  normalized: string;
  model: string;
  csc?: string;
  brand?: 'samsung' | 'apple';
  isCscOnly?: boolean;
}

/**
 * Normalizes input string by removing extra whitespace, symbols, and lowercasing
 */
export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/[\s\-_]+/g, ' ');
}

/**
 * Intelligent parser capable of extracting:
 * - "SM-A556E XME" -> model: "SM-A556E", csc: "XME", brand: "samsung"
 * - "Galaxy S24 Ultra EUX" -> model: "SM-S928B", csc: "EUX", brand: "samsung"
 * - "Samsung + INS" or "INS" -> csc: "INS", brand: "samsung", isCscOnly: true
 * - "A3295" -> model: "iPhone 17 Pro Max", brand: "apple"
 * - "iPhone 17 Pro Max" -> model: "iPhone 17 Pro Max", brand: "apple"
 */
export function parseUniversalSearchQuery(rawQuery: string): ParsedSearchQuery {
  const clean = rawQuery.trim();
  if (!clean) {
    return { raw: '', normalized: '', model: '' };
  }

  const upper = clean.toUpperCase();
  const normalized = normalizeQuery(clean);

  // 1. Check if query is CSC code alone (e.g. "XME", "INS", "EUX", "BKD", "THL", "DBT")
  if (/^[A-Z]{3,4}$/.test(upper)) {
    const matchedCsc = EXTENDED_CSC_CATALOGUE.find(c => c.csc === upper);
    if (matchedCsc) {
      return {
        raw: clean,
        normalized,
        model: '',
        csc: matchedCsc.csc,
        brand: 'samsung',
        isCscOnly: true,
      };
    }
  }

  // 2. Check for combined query like "Samsung + INS" or "Samsung INS"
  const cscOnlyMatch = clean.match(/^(?:SAMSUNG\s*(?:\+|\/)?\s*)([A-Za-z]{3,4})$/i);
  if (cscOnlyMatch) {
    const c = cscOnlyMatch[1].toUpperCase();
    return {
      raw: clean,
      normalized,
      model: '',
      csc: c,
      brand: 'samsung',
      isCscOnly: true,
    };
  }

  // 3. Apple A-Model search (e.g. "A3295", "A3106", "A2894", "A2403")
  const aModelMatch = upper.match(/^(A\d{4})$/);
  if (aModelMatch) {
    const aNum = aModelMatch[1];
    const appleEntry = APPLE_DEVICE_CATALOGUE.find(d => d.aModelNumbers.includes(aNum));
    if (appleEntry) {
      return {
        raw: clean,
        normalized,
        model: appleEntry.marketingName,
        brand: 'apple',
      };
    }
  }

  // 4. Apple Hardware Identifier search (e.g. "iPhone18,2", "iPhone17,1")
  const hwIdMatch = clean.match(/^iPhone\d+,\d+$/i);
  if (hwIdMatch) {
    const hwId = clean;
    const appleEntry = APPLE_DEVICE_CATALOGUE.find(d =>
      d.hardwareIdentifiers.some(h => h.toLowerCase() === hwId.toLowerCase())
    );
    if (appleEntry) {
      return {
        raw: clean,
        normalized,
        model: appleEntry.marketingName,
        brand: 'apple',
      };
    }
  }

  // 5. Check if query is Apple iPhone query
  if (normalized.includes('iphone') || normalized.includes('apple') || clean.toLowerCase().startsWith('a3') || clean.toLowerCase().startsWith('a2')) {
    // Find closest Apple marketing name
    const appleEntry = APPLE_DEVICE_CATALOGUE.find(d => {
      const dName = normalizeQuery(d.marketingName);
      return dName.includes(normalized) || normalized.includes(dName);
    });

    return {
      raw: clean,
      normalized,
      model: appleEntry ? appleEntry.marketingName : clean,
      brand: 'apple',
    };
  }

  // 6. Check for Combined Samsung Model + CSC (e.g. "SM-A556E XME", "SM-S928B EUX", "SM-A556E/BKD", "Galaxy A55 INS")
  const tokens = clean.split(/[\s,+/]+/);
  if (tokens.length >= 2) {
    const lastToken = tokens[tokens.length - 1].toUpperCase();
    if (/^[A-Z]{3,4}$/.test(lastToken)) {
      const isKnownCsc = EXTENDED_CSC_CATALOGUE.some(c => c.csc === lastToken);
      if (isKnownCsc) {
        const potentialModel = tokens.slice(0, tokens.length - 1).join(' ').trim();
        // Check if potentialModel matches a known Samsung device
        const samsungDevice = findSamsungDevice(potentialModel);
        return {
          raw: clean,
          normalized,
          model: samsungDevice ? samsungDevice.model : potentialModel,
          csc: lastToken,
          brand: 'samsung',
        };
      }
    }
  }

  // 7. Standard Samsung Model or Name Search
  const samsungDevice = findSamsungDevice(clean);
  if (samsungDevice) {
    return {
      raw: clean,
      normalized,
      model: samsungDevice.model,
      brand: 'samsung',
    };
  }

  // Default fallback
  return {
    raw: clean,
    normalized,
    model: clean,
    brand: upper.startsWith('SM-') ? 'samsung' : undefined,
  };
}

function findSamsungDevice(input: string): SamsungCatalogueEntry | undefined {
  const norm = normalizeQuery(input);
  const upper = input.toUpperCase().trim();

  return SAMSUNG_DEVICE_CATALOGUE.find(d => {
    if (d.model.toUpperCase() === upper || d.model.toUpperCase().includes(upper)) return true;
    if (d.modelVariants.some(v => v.toUpperCase() === upper || v.toUpperCase().includes(upper))) return true;
    const commNorm = normalizeQuery(d.commercialName);
    if (commNorm.includes(norm) || norm.includes(commNorm)) return true;
    if (d.aliases.some(a => normalizeQuery(a).includes(norm) || norm.includes(normalizeQuery(a)))) return true;
    return false;
  });
}

/**
 * Generates fast, typo-tolerant, categorized autocomplete suggestions
 */
export function getSearchSuggestions(input: string, maxPerCategory: number = 5): {
  samsungDevices: SearchSuggestionItem[];
  samsungCscs: SearchSuggestionItem[];
  appleDevices: SearchSuggestionItem[];
  totalCount: number;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    // Return popular supported devices when query is empty (recent/trending state)
    const popSamsung = SAMSUNG_DEVICE_CATALOGUE.slice(0, 4).map(d => ({
      id: d.id,
      type: 'samsung_device' as const,
      title: `${d.commercialName} (${d.model})`,
      subtitle: `${d.deviceFamily} · Release: ${d.releaseYear}`,
      model: d.model,
      commercialName: d.commercialName,
      brand: 'samsung' as const,
      badge: d.deviceFamily,
      familyOrGeneration: d.deviceFamily,
    }));

    const popCsc = EXTENDED_CSC_CATALOGUE.slice(0, 4).map(c => ({
      id: `csc-${c.csc}`,
      type: 'samsung_csc' as const,
      title: `${c.csc} — ${c.country}`,
      subtitle: `${c.region} · ${c.carrier}`,
      model: c.sampleCompatibleModels?.[0] || 'SM-S928B',
      csc: c.csc,
      commercialName: `${c.country} (${c.csc})`,
      brand: 'samsung' as const,
      badge: 'CSC Code',
      familyOrGeneration: c.region,
    }));

    const popApple = APPLE_DEVICE_CATALOGUE.slice(0, 4).map(a => ({
      id: a.id,
      type: 'apple_device' as const,
      title: a.marketingName,
      subtitle: `${a.generation} · ${a.hardwareIdentifiers[0]} (${a.aModelNumbers[0]})`,
      model: a.marketingName,
      commercialName: a.marketingName,
      brand: 'apple' as const,
      badge: 'Apple iOS',
      familyOrGeneration: a.generation,
    }));

    return {
      samsungDevices: popSamsung,
      samsungCscs: popCsc,
      appleDevices: popApple,
      totalCount: popSamsung.length + popCsc.length + popApple.length,
    };
  }

  const parsed = parseUniversalSearchQuery(trimmed);
  const norm = normalizeQuery(trimmed);
  const upper = trimmed.toUpperCase();

  // 1. Samsung Devices suggestions
  const samsungMatches: SearchSuggestionItem[] = [];
  for (const d of SAMSUNG_DEVICE_CATALOGUE) {
    const modelMatch = d.model.toUpperCase().includes(upper);
    const variantMatch = d.modelVariants.some(v => v.toUpperCase().includes(upper));
    const nameMatch = normalizeQuery(d.commercialName).includes(norm);
    const aliasMatch = d.aliases.some(a => normalizeQuery(a).includes(norm));

    if (modelMatch || variantMatch || nameMatch || aliasMatch) {
      samsungMatches.push({
        id: d.id,
        type: 'samsung_device',
        title: `${d.commercialName} (${d.model})`,
        subtitle: `${d.deviceFamily} · ${d.releaseYear} · Primary CSC: ${d.commonCscs[0]}`,
        model: d.model,
        csc: parsed.csc || d.commonCscs[0],
        commercialName: d.commercialName,
        brand: 'samsung',
        badge: d.deviceFamily,
        familyOrGeneration: d.deviceFamily,
      });
      if (samsungMatches.length >= maxPerCategory) break;
    }
  }

  // 2. Samsung CSC suggestions
  const cscMatches: SearchSuggestionItem[] = [];
  for (const c of EXTENDED_CSC_CATALOGUE) {
    const cscCodeMatch = c.csc.toUpperCase().includes(upper) || upper.includes(c.csc.toUpperCase());
    const countryMatch = normalizeQuery(c.country).includes(norm);
    const regionMatch = normalizeQuery(c.region).includes(norm);

    if (cscCodeMatch || countryMatch || regionMatch) {
      cscMatches.push({
        id: `csc-${c.csc}`,
        type: 'samsung_csc',
        title: `${c.csc} — ${c.country}`,
        subtitle: `${c.region} · Package: ${c.multiCscGroup} · ${c.carrier}`,
        model: parsed.model || c.sampleCompatibleModels?.[0] || 'SM-A556E',
        csc: c.csc,
        commercialName: `${c.country} (${c.csc})`,
        brand: 'samsung',
        badge: 'CSC Code',
        familyOrGeneration: c.region,
      });
      if (cscMatches.length >= maxPerCategory) break;
    }
  }

  // 3. Apple Devices suggestions
  const appleMatches: SearchSuggestionItem[] = [];
  for (const a of APPLE_DEVICE_CATALOGUE) {
    const nameMatch = normalizeQuery(a.marketingName).includes(norm);
    const hwMatch = a.hardwareIdentifiers.some(h => normalizeQuery(h).includes(norm) || norm.includes(normalizeQuery(h)));
    const aNumMatch = a.aModelNumbers.some(n => n.toUpperCase().includes(upper));
    const aliasMatch = a.aliases.some(al => normalizeQuery(al).includes(norm));

    if (nameMatch || hwMatch || aNumMatch || aliasMatch) {
      appleMatches.push({
        id: a.id,
        type: 'apple_device',
        title: a.marketingName,
        subtitle: `${a.generation} · ${a.hardwareIdentifiers[0]} · A-Model: ${a.aModelNumbers[0]}`,
        model: a.marketingName,
        commercialName: a.marketingName,
        brand: 'apple',
        badge: 'Apple iOS',
        familyOrGeneration: a.generation,
      });
      if (appleMatches.length >= maxPerCategory) break;
    }
  }

  return {
    samsungDevices: samsungMatches,
    samsungCscs: cscMatches,
    appleDevices: appleMatches,
    totalCount: samsungMatches.length + cscMatches.length + appleMatches.length,
  };
}
