"use client";

import React, { useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

function ProductRedirectContent() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/shop/${params.id}`);
    } else {
      router.replace("/shop");
    }
  }, [params, router]);

  return (
    <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--color-secondary)" }}>
      Opening royal sweet...
    </div>
  );
}

export default function ProductIdRedirectPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center" }}>Loading...</div>}>
      <ProductRedirectContent />
    </Suspense>
  );
}
