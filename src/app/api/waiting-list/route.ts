import { type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { type WaitingListEntry } from '@/core/types/common';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone } = await request.json();

    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waiting_list')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Insert new entry
    const { data, error } = await supabase
      .from('waiting_list')
      .insert([
        {
          email,
          name,
          phone,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting waiting list entry:', error);
      return Response.json(
        { error: 'Failed to join waiting list' },
        { status: 500 }
      );
    }

    return Response.json({ data: data as WaitingListEntry });
  } catch (error) {
    console.error('Error processing waiting list request:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 