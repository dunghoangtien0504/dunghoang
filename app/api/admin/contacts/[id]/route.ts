import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// PATCH /api/admin/contacts/[id] — cập nhật 1 contact
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await req.json()
    // Không cho phép overwrite id, email (primary key), created_at
    const { id: _, email: __, created_at: ___, ...safe } = updates

    const { data, error } = await supabaseAdmin
      .from('contacts')
      .update({ ...safe, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ contact: data })
  } catch (err) {
    console.error('[admin/contacts PATCH]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE /api/admin/contacts/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('contacts')
      .delete()
      .eq('id', params.id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/contacts DELETE]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
