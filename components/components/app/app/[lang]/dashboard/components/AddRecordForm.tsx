// components/AddRecordForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  bloodGroup: z.string().min(1),
  allergies: z.string(),
  medications: z.string(),
});

export default function AddRecordForm({ onClose }: { onClose: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { bloodGroup: '', allergies: '', medications: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Save to Firestore
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                <Input placeholder="A+" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Similar for allergies, medications */}
        <Button type="submit">Save Record</Button>
      </form>
    </Form>
  );
}
