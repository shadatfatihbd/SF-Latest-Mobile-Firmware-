import React from 'react';
import { FirmwareUpdateCenter } from './FirmwareUpdateCenter';
import { HomepageUpdateWidgets as WidgetsData } from '../types/firmware';

interface HomepageUpdateWidgetsProps {
  widgets: WidgetsData;
  onSelectSamsungModel: (model: string, csc: string) => void;
  onSelectAppleModel: (model: string) => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  onOpenSubscribe?: () => void;
}

export const HomepageUpdateWidgetsComponent: React.FC<HomepageUpdateWidgetsProps> = (props) => {
  return <FirmwareUpdateCenter {...props} />;
};

export { FirmwareUpdateCenter };
