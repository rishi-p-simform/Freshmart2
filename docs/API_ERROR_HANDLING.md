# API Error Handling Architecture & Loose Coupling

This document explains the design, types, and architecture of the API error handling system implemented in the Freshmart application.

## Goal & Architecture

The application communicates with a backend API using `apisauce` and `axios`. Since backend APIs can evolve, changes in the error response payload structure (such as renaming fields, changing arrays to objects, or changing status codes) must not lead to unpredictable runtime behaviors or crashes in the client.

To protect the client, the error-handling system has been designed with **loose coupling** principles:
1. **Normalization Layer**: All incoming server errors are intercepted and transformed by an isolated parser into a unified client-side error format (`ErrorResponse`).
2. **Type Safety**: Unified TypeScript definitions dictate categories, codes, and details.
3. **Graceful Fallbacks**: The UI is shielded from raw payloads and always receives a valid, standardized structure.

```
+------------------+     +--------------------+     +-----------------------+
|  Raw API Error   | --> |   APIErrorParser   | --> |     ErrorResponse     |
| (Various Shapes) |     |  (Normalization)   |     | (Unified Client Type) |
+------------------+     +--------------------+     +-----------------------+
```

---

## 1. Unified Types & Categories

All error categories are declared in [APIConfigTypes.ts](file:///Users/rishi.patoliya/trainee/Freshmart2/src/configs/APIConfigTypes.ts):

- **`APIErrorCategory`**:
  - `VALIDATION`: Input data/form verification errors (typically HTTP 422 or 400 with details).
  - `UNAUTHORIZED`: Authentication/token expiration issues (HTTP 401).
  - `FORBIDDEN`: Permission/access denied issues (HTTP 403).
  - `NOT_FOUND`: Resource missing errors (HTTP 404).
  - `SERVER`: Server-side crashes or database issues (HTTP 500+).
  - `NETWORK`: Internet connectivity or host unreachable errors.
  - `TIMEOUT`: Request timeout errors.
  - `CANCEL`: Requests cancelled by user navigation or thunk aborts.
  - `UNKNOWN`: Fallback category for unexpected cases.

- **`ErrorResponse`** (defined in [ErrorResponse.ts](file:///Users/rishi.patoliya/trainee/Freshmart2/src/types/ErrorResponse.ts)):
  ```typescript
  export interface ErrorResponse {
    message: string;                            // User-friendly display message
    category?: string;                          // Mapped APIErrorCategory
    code?: string;                              // Machine-readable code (e.g. "TIMEOUT_ERROR")
    statusCode?: number;                        // HTTP Status code
    details?: Record<string, string | string[]>; // Field-specific validation messages
    raw?: any;                                  // Original raw response payload
  }
  ```

---

## 2. Loosely Coupled Parser

The [APIErrorParser.ts](/src/configs/APIErrorParser.ts) module extracts error details safely from different shapes.

### Message Extraction (`extractErrorMessage`)
It searches for messages in the following order of precedence:
1. `data.message` (either as a `string` or an `array` of strings joined by commas).
2. `data.error` (either as a `string` or nested object containing `message`/`description`).
3. `data.error_description` (OAuth2 format).
4. `data.errors` (either string, string array, array of error objects, or object fields).
5. Fallbacks like `data.msg`, `data.description`.
6. Defaults to predefined localized error strings (e.g., `Strings.APIError.somethingWentWrong`).

### Details Extraction (`extractErrorDetails`)
It normalizes field-specific validation errors:
- **Object Shape**: Directly returns `data.errors` or `data.details` if they are key-value objects.
- **Array Shape**: If errors come as `[{ field: "email", message: "invalid" }]`, it automatically groups and formats them into `{ email: ["invalid"] }`.

### Server Error Mapping (`parseServerError`)
Determines the HTTP status code and the `apisauce` network problem, maps it to an `APIErrorCategory`, normalizes the message, extracts details, and attaches the `raw` payload.

---

## 3. Redux Integration

All actions created using `createAsyncThunkWithCancelToken` inside [APIConfig.ts](/src/configs/APIConfig.ts) automatically parse and dispatch this normalized error format on failure:

```typescript
// ThunkApiConfig forces rejectValue to be of type ErrorResponse
export interface ThunkApiConfig {
  rejectValue: ErrorResponse;
}
```

In Redux slices, you can safely read `action.payload` in `.rejected` cases to display specific errors:
```typescript
builder.addCase(login.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload; // action.payload is typed as ErrorResponse
});
```

---

## 4. Testing & Verification

A dedicated suite of unit tests [run-tests.ts](/src/configs/__tests__/run-tests.ts) runs in isolation and checks:
- Multiple validation error response formats (key-value, array of objects, strings).
- Nested error message fields.
- Mappings for status codes and connection problems.
- Robust default values for non-JSON/HTML/empty server bodies.
