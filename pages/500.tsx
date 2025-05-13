import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function ServerErrorPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">💥 {t("server_error.title")}</h1>
      <p className="text-gray-600 mb-6">{t("server_error.message")}</p>
      <Button onClick={() => router.push("/")}>{t("go_home")}</Button>
    </div>
  );
}
