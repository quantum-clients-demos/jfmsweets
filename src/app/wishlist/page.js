"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WishlistRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account?tab=wishlist");
  }, [router]);

  return (
    <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--color-secondary)" }}>
      Loading your royal wishlist...
    </div>
  );
}
