type FormatFn = (document: unknown) => boolean;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

const isOas3Document = (document: unknown): document is { openapi: unknown } => {
  if (!isPlainObject(document) || !('openapi' in document)) {
    return false;
  }

  const major = Number.parseInt(String((document as { openapi: unknown }).openapi), 10);

  return Number.isInteger(major) && major === 3;
};

export const oas3_0: FormatFn = document => {
  if (!isOas3Document(document)) {
    return false;
  }

  return /^3\.0(?:\.[0-9]*)?$/.test(String((document as { openapi: unknown }).openapi));
};

(oas3_0 as FormatFn & { displayName?: string }).displayName = 'OpenAPI 3.0.x';

const isPubliccodeDocument = (document: unknown): document is { publiccodeYmlVersion: unknown } => {
  if (!isPlainObject(document) || !('publiccodeYmlVersion' in document)) {
    return false;
  }

  return true;
};

export const publiccode05: FormatFn = document => {
  if (!isPubliccodeDocument(document)) {
    return false;
  }

  const version = String((document as { publiccodeYmlVersion: unknown }).publiccodeYmlVersion);
  return /^(?:0|0\.2(?:\.[0-2])?|0\.3(?:\.0)?|0\.4(?:\.0)?|0\.5(?:\.0)?)$/.test(version);
};

(publiccode05 as FormatFn & { displayName?: string }).displayName = 'publiccode.yml';

export const publiccode07: FormatFn = document => {
  if (!isPubliccodeDocument(document)) {
    return false;
  }

  return /^0\.7(?:\.0)?$/.test(String((document as { publiccodeYmlVersion: unknown }).publiccodeYmlVersion));
};

(publiccode07 as FormatFn & { displayName?: string }).displayName = 'publiccode.yml';
export const oas3_1: FormatFn = document => {
  if (!isOas3Document(document)) {
    return false;
  }

  return /^3\.1(?:\.[0-9]*)?$/.test(String((document as { openapi: unknown }).openapi));
};

(oas3_1 as FormatFn & { displayName?: string }).displayName = 'OpenAPI 3.1.x';
