// app/page.tsx
import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect root to the intro page
  redirect('/intro');
}
