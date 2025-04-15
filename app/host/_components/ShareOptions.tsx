"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareOptionsProps {
  roomId: string;
}

function copyToClipboard(text: string, toast: any) {
  navigator.clipboard.writeText(text);
  toast({
    title: "Link copiado!",
    description: "Compartilhe este link para permitir que outras pessoas entrem na sua sala.",
  });
}

export function ShareOptions({ roomId }: ShareOptionsProps) {
  const { toast } = useToast();
  const [localIp, setLocalIp] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIp() {
      try {
        const response = await fetch("/api/ip");
        const data = await response.json();
        setLocalIp(data.ip);
      } catch (err) {
        console.error("Falha ao obter o IP local", err);
      }
    }
    fetchIp();
  }, []);

  function copyRoomId() {
    if (roomId) {
      copyToClipboard(roomId, toast);
    }
  }

  function copyShareableLink() {
    if (!localIp || !roomId) return;
    const shareableUrl = `http://${localIp}:3000/join?room=${roomId}`;
    copyToClipboard(shareableUrl, toast);
  }

  const shareableLink =
    roomId && localIp
      ? `http://${localIp}:3000/join?room=${roomId}`
      : "Gerando link...";

  return (
    <div className="space-y-8 p-4 border-b-4 rounded-lg border-[#8DC63F] bg-white shadow-md">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-[#1E1E1E]">
          <span className="font-semibold text-[#00B1B0]">Código da Sala</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#1E1E1E]"
            onClick={copyRoomId}
            disabled={!roomId}
          >
            <Copy className="h-4 w-4" />
            Copiar Código
          </Button>
        </div>
        <code className="block w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-[#1E1E1E]">
          {roomId || "Gerando código da sala..."}
        </code>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[#1E1E1E]">ou</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-[#1E1E1E]">
          <span className="font-semibold text-[#00B1B0]">Link Compartilhável</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#1E1E1E]"
            onClick={copyShareableLink}
            disabled={!roomId || !localIp}
          >
            <LinkIcon className="h-4 w-4" />
            Copiar Link
          </Button>
        </div>
        <code className="block w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-[#1E1E1E] truncate">
          {shareableLink}
        </code>
      </div>
    </div>
  );
}
