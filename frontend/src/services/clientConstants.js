/* ========================================
     Default Values
   ======================================== */

export const DEFAULT_APP_HOST = 'http://localhost';
export const DEFAULT_SERVER_PORT = 8000;
export const DEFAULT_LOG_DEBUG_CLIENT = 'true';

export const DEFAULT_LOG_PROJECT_NAME = 'Pathology Report Viewer';

export const SERVER_ENV = {
    staging: 'staging',
    production: 'production',
};

export const SERVER_ENV_TITLE = {
    staging: '(Demo/Staging)',
    production: '',
};

/* ==============================================
     http Requests to Python FastAPI Server
   ============================================== */
export const SERVER_ENDPOINT_METHOD_SAVE_UPDATE_PREFIX = ['save', 'deactivate'];

export const SERVER_ENDPOINTS = {

    // --- Get Path Report Data:
    getPublicData: '/v1/public-reports',
    getSyntheticData: '/v1/synthetic-reports',
};

/* =========================
     Warnings and Errors
   ========================= */
export const WARN_MESSAGE_GENERAL = {
    confirm_cancel: 'Do you really want to leave this page? All unsaved changes to this %s will be lost.',
    confirm_deactivate: 'Do you really want to deactivate this %s?',
};

export const ERROR_MESSAGE_GENERAL = {
    is_null_empty: '%s is NULL/undefined/empty.',
    no_data_found: 'No %s data is found.',
    validate_required: '%s is required.',
    validate: '%s is invalid. It should be %s.',
    validate_short: '%s should be %s.',
    date_needs_to_be_before: '%s needs to be before %s',
    date_needs_to_be_after: '%s needs to be after %s',
    date_needs_to_be_before_after: '%s needs to be before %s and after %s',
};

export const ERROR_MESSAGE_HTTP = {
    server_no_response: 'Error occurred while %s. The server returns no response.',
    server_error: 'The server returns error while %s.',
};

/* =========================
    Generic Configurations
   ========================= */
export const DATA_TYPES = {
    public: 'Public', 
    synthetic: 'Synthetic'
};

export const CLIENT_BOOLEAN_VALUES = {
    true: 'true',
    false: 'false',
};
