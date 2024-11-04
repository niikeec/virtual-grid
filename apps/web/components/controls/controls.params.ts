import {
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  useQueryStates
} from 'nuqs';
import { isMobile } from 'react-device-detect';

export function useControls() {
  const [controls, setControls] = useQueryStates({
    size: parseAsBoolean.withDefault(false),
    sizeWidth: parseAsFloat.withDefault(140),
    sizeHeight: parseAsFloat.withDefault(140),

    columns: parseAsBoolean.withDefault(true),
    columnsCount: parseAsInteger.withDefault(isMobile ? 3 : 5),

    count: parseAsInteger.withDefault(100),
    padding: parseAsFloat.withDefault(12),
    gap: parseAsFloat.withDefault(8)
  });

  return { controls, setControls, reset: () => setControls(null) };
}
