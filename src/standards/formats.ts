// The OpenAPI formats live in @developer-overheid-nl/adr-rulesets; only the
// publiccode.yml formats are still defined here.
type FormatFn = (document: unknown) => boolean;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

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
