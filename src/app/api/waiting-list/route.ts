import { type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { type WaitingListEntry } from '@/core/types/common';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Only create Supabase client if we're not building
const supabase = process.env.NODE_ENV === 'production' 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // In development/build, return mock success
    if (!supabase) {
      return NextResponse.json(
        { message: 'Successfully joined waiting list (mock)', data: { email } },
        { status: 200 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waiting_list')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
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
      return NextResponse.json(
        { error: 'Failed to join waiting list' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as WaitingListEntry });
  } catch (error) {
    console.error('Error processing waiting list request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 