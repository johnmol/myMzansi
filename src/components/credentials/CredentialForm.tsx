"use client"

import React, { useEffect, useState } from 'react'
import { Button, Card, Input } from '@/components/ui'
import type { Credential, NewCredential } from '@/src/types/credential'
import { createCredential, updateCredential, uploadCertificate } from '@/src/services/credentials.service'

type Props = {
  initial?: Credential | null
  onSaved?: (c: Credential) => void
  onCancel?: () => void
}

export default function CredentialForm({ initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<Partial<NewCredential & { user_id?: string }>>({})
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        institution_name: initial.institution_name,
        issue_date: initial.issue_date,
        expiry_date: initial.expiry_date ?? undefined,
        nqf_level: initial.nqf_level ?? undefined,
        file_path: initial.file_path ?? undefined,
        user_id: initial.user_id,
      })
    } else {
      setForm({})
      setFile(null)
    }
  }, [initial])

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    try {
      let fileUrl = form.file_path
      if (file) {
        fileUrl = await uploadCertificate(file, `users/${form.user_id ?? ''}/`)
      }

      const payload: NewCredential = {
        user_id: form.user_id ?? '',
        title: form.title ?? '',
        institution_name: form.institution_name ?? '',
        issue_date: form.issue_date ?? '',
        expiry_date: form.expiry_date ?? null,
        nqf_level: form.nqf_level ?? null,
        file_path: fileUrl ?? null,
      }

      let saved: Credential
      if (initial?.id) {
        saved = await updateCredential(initial.id, payload)
      } else {
        saved = await createCredential(payload)
      }

      if (onSaved) onSaved(saved)
    } catch (err) {
      console.error('Save credential failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Title</label>
          <Input value={form.title ?? ''} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Institution</label>
          <Input value={form.institution_name ?? ''} onChange={(e) => setForm(f => ({ ...f, institution_name: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Issue Date</label>
          <Input type="date" value={form.issue_date ?? ''} onChange={(e) => setForm(f => ({ ...f, issue_date: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Expiry Date</label>
          <Input type="date" value={form.expiry_date ?? ''} onChange={(e) => setForm(f => ({ ...f, expiry_date: e.target.value || null }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">NQF Level</label>
          <Input type="number" value={form.nqf_level ?? ''} onChange={(e) => setForm(f => ({ ...f, nqf_level: e.target.value ? Number(e.target.value) : undefined }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Certificate File</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onCancel && onCancel()} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        </div>
      </form>
    </Card>
  )
}
