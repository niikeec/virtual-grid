import { NumberInput } from '../ui/number-input';
import { ControlsSection } from './controls-section';
import { ControlsSectionField } from './controls-section-field';
import { useControls } from './controls.params';

export function Controls() {
  const { controls, setControls } = useControls();

  return (
    <div>
      <ControlsSection
        label="Size"
        enabled={controls.size}
        onEnabledChange={(val) => setControls({ size: val })}
      >
        <ControlsSectionField label="Width">
          <NumberInput
            aria-label="Width"
            value={controls.sizeWidth}
            onChange={(val) => setControls({ sizeWidth: val })}
          />
        </ControlsSectionField>

        <ControlsSectionField label="Height">
          <NumberInput
            aria-label="Height"
            value={controls.sizeHeight}
            onChange={(val) => setControls({ sizeHeight: val })}
          />
        </ControlsSectionField>
      </ControlsSection>

      <ControlsSection
        label="Columns"
        enabled={controls.columns}
        onEnabledChange={(val) => setControls({ columns: val })}
      >
        <ControlsSectionField label="Count">
          <NumberInput
            aria-label="Count"
            value={controls.columnsCount}
            onChange={(val) => setControls({ columnsCount: val })}
          />
        </ControlsSectionField>
      </ControlsSection>

      <ControlsSection label="Layout">
        <ControlsSectionField label="Count">
          <NumberInput
            aria-label="Count"
            value={controls.count}
            onChange={(val) => setControls({ count: val })}
          />
        </ControlsSectionField>

        <ControlsSectionField label="Padding">
          <NumberInput
            aria-label="Padding"
            value={controls.padding}
            onChange={(val) => setControls({ padding: val })}
          />
        </ControlsSectionField>

        <ControlsSectionField label="Gap">
          <NumberInput
            aria-label="Gap"
            value={controls.gap}
            onChange={(val) => setControls({ gap: val })}
          />
        </ControlsSectionField>
      </ControlsSection>
    </div>
  );
}
