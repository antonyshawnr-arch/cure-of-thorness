// app/[lang]/dashboard/page.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table'; // Shadcn
import AddRecordForm from '@/components/AddRecordForm';
import EmergencyView from '@/components/EmergencyView';
import { useTranslation } from 'react-i18next'; // Or next-intl

export default function Dashboard() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([]); // Fetch from Firestore

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
          <p>{t('yourHealthRecords')}</p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => setShowForm(true)}>{t('addRecord')}</Button>
        <Button variant="destructive">{t('emergencyView')}</Button> {/* Renders EmergencyView */}
      </div>

      {records.length > 0 && (
        <DataTable columns={medicalColumns} data={records} />
      )}

      {showForm && <AddRecordForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
