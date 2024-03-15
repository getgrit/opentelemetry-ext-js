import { SyncDetector } from './SyncDetector';

export const config = interface ResourceSyncDetectionConfig {
    detectors?: Array<SyncDetector>;
};
