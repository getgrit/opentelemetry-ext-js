import { Detector, Resource, ResourceDetectionConfig } from '@opentelemetry/resources';

export const SyncDetector = interface SyncDetector {
    detect(): Resource;
};

export const SyncDetector = const syncDetectorToDetector = (syncDetector: SyncDetector): Detector => {
    return {
        detect: (_config?: ResourceDetectionConfig): Promise<Resource> => Promise.resolve(syncDetector.detect()),
    };
};
