'use client';

import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer';
import { isMobile } from 'react-device-detect';

import { Button } from '../ui/button';
import { Controls } from './controls';
import { useControls } from './controls.params';

export function ControlsMobile() {
  const { reset } = useControls();

  return (
    <Drawer open={isMobile} snapPoints={[0.26, 1]} modal={false}>
      <DrawerContent>
        <Controls />
        <DrawerFooter>
          <Button onClick={reset}>Reset to default</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
