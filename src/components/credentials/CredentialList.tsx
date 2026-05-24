"use client"

import React, { useEffect, useState } from 'react'
import { Button, Card, Dialog, DialogContent } from '@/components/ui'
import type { Credential } from '@/src/types/credential'
import { getCredentialsByUser, deleteCredential } from '@/src/services/credentials.service'
import CredentialForm from './CredentialForm'
import { supabase } from '@/lib/supabase'

export default function CredentialList() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Credential | null>(null)

  async function fetchCredentials() {
    setLoading(true)
    try {
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id
      if (!userId) return
      const list = await getCredentialsByUser(userId)
      setCredentials(list)
    } catch (err) {
      console.error('Fetch credentials failed', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredentials()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this credential?')) return
    try {
      await deleteCredential(id)
      setCredentials(c => c.filter(item => item.id !== id))
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  function handleSaved(updated: Credential) {
    setShowForm(false)
    setEditing(null)
    fetchCredentials()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Credentials</h2>
        <Button onClick={() => setShowForm(true)}>Add New</Button>
      </div>

      {loading ? (
        <Card className="p-6 text-sm text-muted-foreground">Loading credentials...</Card>
      ) : credentials.length === 0 ? (
        <Card className="space-y-3 p-6 text-center">
          <div className="text-sm text-muted-foreground">No credentials yet.</div>
          <div className="text-base font-medium">Add your first qualification to make your profile stronger.</div>
          <Button onClick={() => setShowForm(true)}>Add New</Button>
        </Card>
      ) : (
        <div className="grid gap-3">
          {credentials.map((c) => (
            <Card key={c.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">{c.institution_name} — <span className="font-medium">{c.title}</span></div>
                <div className="text-xs text-muted-foreground">Issued: {c.issue_date} {c.nqf_level ? `• NQF ${c.nqf_level}` : ''}</div>
                <div className="pt-2">
                  {c.file_path ? (
                    <a href={c.file_path} target="_blank" rel="noreferrer" className="text-teal-600">View Document</a>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => { setEditing(c); setShowForm(true) }}>Edit</Button>
                <Button variant="outline" onClick={() => handleDelete(c.id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <Dialog onClick={() => setShowForm(false)}>
          <DialogContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <CredentialForm initial={editing ?? undefined} onSaved={handleSaved} onCancel={() => { setShowForm(false); setEditing(null) }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
