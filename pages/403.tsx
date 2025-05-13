import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🚫 {t("access_denied.title")}</h1>
      <p className="text-gray-600 mb-6">
        {t("access_denied.message")}
      </p>
      <Button onClick={() => router.push("/")}>{t("go_home")}</Button>
    </div>
  );
}
