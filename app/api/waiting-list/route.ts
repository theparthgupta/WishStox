import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import supabase from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('waiting_list')
      .insert([{ name, email }])
      .select('id, email, created_at');

    if (error && !error.message.includes('duplicate key')) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the user's spot (row number by created_at)
    const { data: all, error: countError } = await supabase
      .from('waiting_list')
      .select('email, created_at')
      .order('created_at', { ascending: true });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const spot = all?.findIndex((entry) => entry.email === email) + 1;
    const count = all?.length || 0;

    // Send thank you email
    await resend.emails.send({
      from: 'WishStox <no-reply@wishstox.in>',
      to: email,
      subject: 'Thanks for joining the WishStox waiting list!',
      html: `<p>Hi${name ? ` ${name}` : ''},<br/><br/>Thank you for joining the WishStox waiting list! You'll be among the first to get access when we launch.<br/><br/>Best,<br/>The WishStox Team</p>`,
    });

    return NextResponse.json({ success: true, count, spot });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function GET() {
  // Return the current waiting list count
  const { data, error } = await supabase
    .from('waiting_list')
    .select('id');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ count: data?.length || 0 });
} 