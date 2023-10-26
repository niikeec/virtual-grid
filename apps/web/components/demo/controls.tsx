import { PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sliders } from '@phosphor-icons/react';
import { isMobile } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { buttonVariants } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Label, labelVariants } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const schema = z.object({
  count: z.number().int(),
  size: z.object({
    enabled: z.boolean(),
    width: z.number(),
    height: z.number()
  }),
  columns: z.object({
    enabled: z.boolean(),
    count: z.number().int()
  }),
  padding: z.number(),
  gap: z.number()
});

type Controls = z.infer<typeof schema>;

export const defaults: Controls = {
  count: 100,
  size: { enabled: false, width: 140, height: 140 },
  columns: { enabled: true, count: isMobile ? 3 : 5 },
  padding: 12,
  gap: 8
};

export const Controls = ({
  controls,
  onChange
}: {
  controls: Controls;
  onChange: (val: Controls) => void;
}) => {
  const form = useForm<Controls>({
    resolver: zodResolver(schema),
    defaultValues: controls
  });

  const handleSubmit = form.handleSubmit(onChange);

  const [isSizeEnabled, isColumnsEnabled] = form.watch(['size.enabled', 'columns.enabled']);

  return (
    <Popover>
      <PopoverTrigger
        className={buttonVariants({
          size: 'icon',
          variant: 'outline',
          className:
            '!bg-background group-hover:animate-in group-hover:fade-in data-[state=open]:animate-in fill-mode-forwards fade-out animate-out absolute right-4 top-4 z-20 h-8 w-8 !shadow-md sm:right-7 sm:top-7'
        })}
      >
        <Sliders size={16} />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <Form {...form}>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Section
                label="Size"
                enabled={isSizeEnabled}
                onEnabledChange={async (val) => {
                  form.setValue('size.enabled', val);
                  await handleSubmit();
                }}
              >
                <div className="flex items-center">
                  <Label htmlFor="width" className="flex-1">
                    Width
                  </Label>
                  <FormField
                    control={form.control}
                    name="size.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="width"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <Label htmlFor="height" className="flex-1">
                    Height
                  </Label>
                  <FormField
                    control={form.control}
                    name="size.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="height"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Section>

              <Section
                label="Columns"
                enabled={isColumnsEnabled}
                onEnabledChange={async (val) => {
                  form.setValue('columns.enabled', val);
                  await handleSubmit();
                }}
              >
                <div className="flex items-center">
                  <Label htmlFor="columns" className="flex-1">
                    Columns
                  </Label>
                  <FormField
                    control={form.control}
                    name="columns.count"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="columns"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Section>

              <Section label="Layout">
                <div className="flex items-center">
                  <Label htmlFor="count" className="flex-1">
                    Count
                  </Label>
                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="count"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <Label htmlFor="padding" className="flex-1">
                    Padding
                  </Label>
                  <FormField
                    control={form.control}
                    name="padding"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="padding"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <Label htmlFor="gap" className="flex-1">
                    Gap
                  </Label>
                  <FormField
                    control={form.control}
                    name="gap"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="gap"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={async () => {
                              field.onBlur();
                              await handleSubmit();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Section>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

const Section = ({
  label,
  enabled,
  onEnabledChange,
  children
}: {
  label?: string;
  enabled?: boolean;
  onEnabledChange?: (val: boolean) => void;
} & PropsWithChildren) => {
  return (
    <div className="flex flex-col border-b p-4 last:border-b-0">
      {label && (
        <div className="mb-4 flex items-center justify-between">
          <span className={labelVariants({ className: 'font-medium' })}>{label}</span>

          {enabled !== undefined && onEnabledChange && (
            <Checkbox checked={enabled} onCheckedChange={onEnabledChange} />
          )}
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
};
